import torch

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

    def forward(self, x)

        lstm_out, _ = self.lstm(x)

        last_output = lstm_out[:, -1, :]

        out = self.dropout(last_output)
        out = torch.relu(self.fc1(out))
        out = self.droput(out)
        out = self.sigmoid(self.fc2(out))

        return out