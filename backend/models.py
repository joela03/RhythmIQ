from sqlalchemy import Column, String, Boolean, Text, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import expression
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(50), unique=True)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255))
    google_id = Column(String(100), unique=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    profile_picture_url = Column(String(255))
    bio = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    last_login = Column(DateTime(timezone=True))
    is_active = Column(Boolean, server_default=expression.true())
    email_verified = Column(Boolean, server_default=expression.false())

    __table_args__ = (
        {'check_constraint': '(password_hash IS NOT NULL) OR (google_id IS NOT NULL)'},
    )