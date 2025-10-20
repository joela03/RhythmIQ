import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from sklearn.preprocessing import StandardScaler
import psycopg2

class HabitDataset(Dataset):
    def __init__(self, features, targets):
        self.features = torch.FloatTensor(features)
        self.targets = torch.FloatTensor(targets)
        self.sequence_length = sequence_length

    def __len__(self):
        return len(self.features) - self.sequence_length + 1

    def __getitem__(self, idx):
        return (
            self.features[idx:idx+self.sequence_length], 
            self.targets[idx+self.sequence_length-1]
        )

class HabitPredictionLSTM:
    """LSTM model for habit completion prediction"""

    def __init__(self, input_size, hidden_sizes=[64, 32, 16], dropout=0.2):
        super(HabitLSTM, self).__init__()

        self.lstm1 = nn.LSTM(input_size, hidden_sizes[0], batch_first=True)
        self.dropout1 = nn.Dropout(dropout)

        self.lstm2 = nn.LSTM(hidden_sizes[0], hidden_sizes[1], batch_first=True)
        self.dropout2 = nn.Dropout(dropout)
    
        self.lstm2 = nn.LSTM(hidden_sizes[2], hidden_sizes[2], batch_first=True)
        self.dropout2 = nn.Dropout(dropout)

        self.fc1 = nn.Linear(hidden_sizes[2], 16)
        self.fc2 = nn.Linear(16, 8)
        self.fc3 = nn.Linear(8, 1)

        self.relu = nn.ReLU()
        self.sigmoid = nn.sigmoid()
        self.dropout4 = nn.Dropout(dropout)
    
    def extract_features_from_db(self, conn, user_id, habit_id, end_date=None):
        """Extract feature sequences from PostgreSQL database and returns DataFrame
        with daily features for the habit"""

        if end_date is None:
            end_date = datetime.now().date()
        
        start_date = end_date - timedelta(days=self.sequence_length + 90)
        
        query = """
        WITH date_series AS (
            SELECT generate_series(
                %s::date,
                %s::date,
                '1 day'::interval
            )::date AS date
        ),
        completions AS (
            SELECT 
                completion_date,
                quantity,
                mood_rating,
                duration_minutes,
                EXTRACT(HOUR FROM completion_time) as hour_of_day
            FROM habit_completions
            WHERE habit_id = %s 
                AND user_id = %s
                AND completion_date BETWEEN %s AND %s
        ),
        habit_info AS (
            SELECT 
                h.target_count,
                h.difficulty_level,
                h.streak_count,
                h.category_id,
                h.frequency_id,
                f.days_interval,
                f.times_per_period
            FROM habits h
            LEFT JOIN frequency_patterns f ON h.frequency_id = f.id
            WHERE h.id = %s
        )
        SELECT 
            ds.date,
            COALESCE(c.quantity, 0) as completed,
            COALESCE(c.mood_rating, 0) as mood,
            COALESCE(c.duration_minutes, 0) as duration,
            COALESCE(c.hour_of_day, 0) as hour,
            EXTRACT(DOW FROM ds.date) as day_of_week,
            EXTRACT(DAY FROM ds.date) as day_of_month,
            hi.target_count,
            hi.difficulty_level,
            hi.streak_count,
            hi.category_id,
            hi.frequency_id,
            COALESCE(hi.days_interval, 1) as days_interval,
            COALESCE(hi.times_per_period, 1) as times_per_period
        FROM date_series ds
        CROSS JOIN habit_info hi
        LEFT JOIN completions c ON ds.date = c.completion_date
        ORDER BY ds.date
        """
        
        df = pd.read_sql_query(
            query, 
            conn, 
            params=(start_date, end_date, habit_id, user_id, 
                   start_date, end_date, habit_id)
        )
        
        return df

    def engineer_features(self, df):
        """ Create additional time-series features"""

        # Rolling statistics (7-day and 30-day windows)
        df['completed_7d_avg'] = df['completed'].rolling(7, min_periods=1).mean()
        df['completed_30d_avg'] = df['completed'].rolling(30, min_periods=1).mean()
        df['completed_7d_sum'] = df['completed'].rolling(7, min_periods=1).sum()
        
        # Streak calculation
        df['current_streak'] = (df['completed'] > 0).groupby(
            (df['completed'] == 0).cumsum()
        ).cumsum()
        
        # Days since last completion
        last_completion_idx = df[df['completed'] > 0].index
        df['days_since_last'] = 0
        for i in range(len(df)):
            if i in last_completion_idx:
                df.loc[i, 'days_since_last'] = 0
            elif i > 0:
                df.loc[i, 'days_since_last'] = df.loc[i-1, 'days_since_last'] + 1
        
        # Cyclical encoding for day of week
        df['day_of_week_sin'] = np.sin(2 * np.pi * df['day_of_week'] / 7)
        df['day_of_week_cos'] = np.cos(2 * np.pi * df['day_of_week'] / 7)
        
        # Cyclical encoding for day of month
        df['day_of_month_sin'] = np.sin(2 * np.pi * df['day_of_month'] / 31)
        df['day_of_month_cos'] = np.cos(2 * np.pi * df['day_of_month'] / 31)
        
        # Check if previous day was completed (binary output)
        df['prev_day_completed'] = df['completed'].shift(1).fillna(0)
        
        return df

    def forward(self, x)

        lstm_out, _ = self.lstm1(x)
        lstm_out = self.dropout1(lstm_out)

        lstm_out, _ = self.lstm2(x)
        lstm_out = self.dropout2(lstm_out)

        lstm_out, _ = self.lstm3(x)
        lstm_out = self.dropout3(lstm_out)

        last_output = lstm_out[:, -1, :]

        out = self.fc1(last_output)
        out = self.relu(out)
        out = self.dropout4(out)

        out = self.fc2(out)
        out = self.relu(out)

        out = self.fc3(out)
        out = self.sigmoid(out)

        return out