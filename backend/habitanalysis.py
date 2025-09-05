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
