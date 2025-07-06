ALTER TABLE users ADD COLUMN remember_token_hash VARCHAR(255);
ALTER TABLE users ADD COLUMN remember_token_expires TIMESTAMP WITH TIME ZONE;
ALTER TABLE users ADD COLUMN security_version INTEGER DEFAULT 1;

CREATE INDEX idx_users_remember_token ON users(remember_token_hash);