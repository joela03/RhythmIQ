import torch
import psycopg2
import pandas as pd

class HabitDataset(Dataset):
    def __init__(self, features, targets, sequence_length=7):
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

class HabitPredictionLSTM(nn.Module):
    """LSTM model for habit completion prediction"""

    def __init__(self, input_size, hidden_size=64, num_layers=2, dropout=0.2):
        super(HabitPredictionLSTM, self).__init__()

        self.hidden_size = hidden_size
        self.num_layers = num_layers

        self.lstm = nn.LSTM(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            dropout=dropout if num_layers > 1 else 0,
            batch_first=True
        )

        self.dropout = nn.Dropout(dropout)
        self.fc1 = nn.Linear(hidden_size, 32)
        self.fc2 = nn.Linear(32, 1)
        self.sigmoid = nn.Sigmoid()
    
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

    def forward(self, x)

        lstm_out, _ = self.lstm(x)

        last_output = lstm_out[:, -1, :]

        out = self.dropout(last_output)
        out = torch.relu(self.fc1(out))
        out = self.droput(out)
        out = self.sigmoid(self.fc2(out))

        return out