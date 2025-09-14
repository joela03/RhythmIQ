from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr, validator
from typing import Optional
from datetime import datetime
from sqlalchemy import create_engine, or_
from sqlalchemy.orm import sessionmaker, Session
from models import Base, User
import uuid
from passlib.context import CryptContext
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

SQLALCHEMY_DATABASE_URL = (
    f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
    f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
)
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    username: Optional[str] = None
    email_verified: bool
    is_active: bool
    created_at: datetime

class UserResponse(BaseModel):
    user_id: uuid.UUID
    email: str
    first_name: str
    last_name: str
    username: Optional[str]
    email_verified: bool
    is_active: bool
    created_at: datetime
    
    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message" : "Momentum API"}

@app.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):

    username_to_use = user.username or user.email.split('@')[0]

    existing_user = db.query(User).filter(or_(User.email == user.email, User.username == username_to_use)).first()

    if existing_user:
        if existing_user.email == user.email:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
        else:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Username already taken"
            )

    hashed_password = pwd_context.hash(user.password)

    db_user = User(
        email=user.email,
        password_hash=hashed_password,
        first_name=user.first_name,
        last_name=user.last_name,
        username=username_to_use,
        email_verified=False,
        is_active=True
    )

    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user"
        )

