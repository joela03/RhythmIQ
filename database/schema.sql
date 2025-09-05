CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    
    password_hash VARCHAR(255), 
    google_id VARCHAR(100) UNIQUE,
    
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    profile_picture_url VARCHAR(255),
    bio TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    
    is_active BOOLEAN DEFAULT true,
    
    CONSTRAINT check_auth_method CHECK (
        (password_hash IS NOT NULL) OR (google_id IS NOT NULL)
    )
);

CREATE TABLE user_sessions (
    session_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    access_token_hash VARCHAR(255),
    refresh_token_hash VARCHAR(255),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_used TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    device_info JSONB,
    is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_expires ON user_sessions(expires_at);
CREATE INDEX idx_user_sessions_active ON user_sessions(is_active) WHERE is_active = true;

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    color VARCHAR(7),
    icon VARCHAR(50),
    type VARCHAR(20) DEFAULT 'general',
    is_system BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id, name)
);

CREATE UNIQUE INDEX idx_categories_system_name ON categories(name) WHERE user_id IS NULL;

CREATE TABLE frequency_patterns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    days_interval INTEGER,
    is_system BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true
);

INSERT INTO frequency_patterns (id, name, description, is_system) VALUES
(5, 'weekdays', 'Monday through Friday', true),
(6, 'weekends', 'Saturday and Sunday', true),
(7, 'twice_weekly', 'Two times per week', true);

CREATE TABLE statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL,
    is_system BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    
    UNIQUE(name, type)
);

CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL,
    abbreviation VARCHAR(10),
    category VARCHAR(20),
    is_system BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE habits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id),
    frequency_id INTEGER REFERENCES frequency_patterns(id),
    unit_id INTEGER REFERENCES units(id),
    status_id INTEGER REFERENCES statuses(id),
    
    name VARCHAR(100) NOT NULL,
    description TEXT,
    
    target_count INTEGER DEFAULT 1,
    reminder_time TIME,
    difficulty_level INTEGER DEFAULT 3 CHECK (difficulty_level BETWEEN 1 AND 5),
    
    streak_count INTEGER DEFAULT 0,
    best_streak INTEGER DEFAULT 0,
    total_completions INTEGER DEFAULT 0,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE habit_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    mood_rating INTEGER CHECK (mood_rating BETWEEN 1 AND 5),
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completion_date DATE NOT NULL,
    quantity INTEGER DEFAULT 1,
    notes TEXT,
    completion_time TIME,
    duration_minutes INTEGER,
    
    UNIQUE(habit_id, completion_date)
);

CREATE TABLE habit_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    frequency_id INTEGER REFERENCES frequency_patterns(id);
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    
    total_expected INTEGER NOT NULL,
    total_completed INTEGER NOT NULL,
    completion_rate DECIMAL(5,4) NOT NULL,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    
    best_day_of_week INTEGER,
    best_time_slot INTEGER, 
    avg_mood DECIMAL(3,2),
    
    trend_direction_id INTEGER REFERENCES trend_directions(id),
    vs_previous_period DECIMAL(5,4),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(habit_id, frequency_id, period_start),
);

CREATE TABLE trend_directions (
    id SERIAL PRIMARY KEY,
    direction VARCHAR(10) NOT NULL UNIQUE,
    value INTEGER NOT NULL UNIQUE
);

INSERT INTO trend_directions (direction, value) VALUES
('improving', 1),
('declining', 2),
('stable', 3);

CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id),
    unit_id INTEGER REFERENCES units(id),
    status_id INTEGER REFERENCES statuses(id),
    
    title VARCHAR(200) NOT NULL,
    description TEXT,
    
    target_value INTEGER,
    current_value INTEGER DEFAULT 0,
    
    start_date DATE,
    target_date DATE,
    completed_date DATE,
    
    is_public BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE goal_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    goal_id UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    target_value INTEGER NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO frequency_patterns (id, name, description, is_system) VALUES
(1, 'daily', 'Every day', true),
(2, 'weekly', 'Once per week', true),
(3, 'monthly', 'Once per month', true),
(4, 'custom', 'Custom interval', true);

INSERT INTO statuses (id, name, description, type, is_system) VALUES
(1, 'active', 'Currently active', 'habit', true),
(2, 'paused', 'Temporarily paused', 'habit', true),
(3, 'archived', 'No longer active', 'habit', true),
(4, 'active', 'Currently active', 'goal', true),
(5, 'completed', 'Successfully completed', 'goal', true),
(6, 'paused', 'Temporarily paused', 'goal', true),
(7, 'cancelled', 'Cancelled before completion', 'goal', true);

INSERT INTO categories (id, user_id, name, description, color, type, is_system) VALUES
(1, NULL, 'Health & Fitness', 'Physical health and exercise', '#4CAF50', 'general', true),
(2, NULL, 'Learning', 'Education and skill development', '#2196F3', 'general', true),
(3, NULL, 'Productivity', 'Work and personal productivity', '#FF9800', 'general', true),
(4, NULL, 'Mindfulness', 'Mental health and meditation', '#9C27B0', 'general', true),
(5, NULL, 'Social', 'Relationships and social activities', '#E91E63', 'general', true),
(6, NULL, 'Finance', 'Money management and savings', '#00BCD4', 'general', true),
(7, NULL, 'Hobbies', 'Creative and recreational activities', '#8BC34A', 'general', true);

INSERT INTO units (id, name, abbreviation, category, is_system) VALUES
(1, 'times', 'x', 'count', true),
(2, 'minutes', 'min', 'time', true),
(3, 'hours', 'hr', 'time', true),
(4, 'pages', 'pg', 'count', true),
(5, 'miles', 'mi', 'distance', true),
(6, 'kilometers', 'km', 'distance', true),
(7, 'pounds', 'lbs', 'weight', true),
(8, 'kilograms', 'kg', 'weight', true),
(9, 'glasses', 'gl', 'count', true),
(10, 'servings', 'srv', 'count', true);

CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_habits_user_id ON habits(user_id);
CREATE INDEX idx_habits_category_id ON habits(category_id);
CREATE INDEX idx_habits_status_id ON habits(status_id);
CREATE INDEX idx_habit_completions_habit_id ON habit_completions(habit_id);
CREATE INDEX idx_habit_completions_completion_date ON habit_completions(completion_date);
CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_category_id ON goals(category_id);
CREATE INDEX idx_goals_status_id ON goals(status_id);
CREATE INDEX idx_goal_milestones_goal_id ON goal_milestones(goal_id);
CREATE INDEX idx_categories_user_id ON categories(user_id);
CREATE INDEX idx_categories_type ON categories(type);

ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN google_refresh_token TEXT; 
ALTER TABLE users ADD COLUMN display_name VARCHAR(150); 