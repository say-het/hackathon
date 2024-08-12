import torch
import torch.nn as nn
import pandas as pd
from sklearn.model_selection import train_test_split


# Load data
data = pd.read_csv('C:\\Users\\Het Ashishbhai Modi\\Desktop\\project\\backend\\Crop_recommendationEnglish.csv')

# Label encoding
codes = {
    'apple': 0, 'banana': 1, 'blackgram': 2, 'chickpea': 3, 'coconut': 4, 'coffee': 5,
    'corn': 6, 'cotton': 7, 'grapes': 8, 'jute': 9, 'kidneybeans': 10, 'lentil': 11,
    'mango': 12, 'mothbeans': 13, 'mungbean': 14, 'muskmelon': 15, 'orange': 16,
    'papaya': 17, 'pigeonpeas': 18, 'pomegranate': 19, 'rice': 20, 'watermelon': 21
}
data['label'] = data['label'].map(codes)

# Prepare training and testing data
X = data.iloc[:, :-1].values
y = data['label'].values
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

train_data = torch.tensor(X_train).float()
train_labels = torch.tensor(y_train, dtype=torch.int64)
test_data = torch.tensor(X_test).float()
test_labels = torch.tensor(y_test, dtype=torch.int64)

train_dataset = torch.utils.data.TensorDataset(train_data, train_labels)
test_dataset = torch.utils.data.TensorDataset(test_data, test_labels)

batch_size = 60
train_loader = torch.utils.data.DataLoader(dataset=train_dataset, batch_size=batch_size, shuffle=True)
test_loader = torch.utils.data.DataLoader(dataset=test_dataset, batch_size=batch_size, shuffle=True)

# Model definition
class Model(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):  # Corrected __init__ method
        super(Model, self).__init__()
        self.lay1 = nn.Linear(input_size, hidden_size)
        self.lay2 = nn.Linear(hidden_size, hidden_size)
        self.lay3 = nn.Linear(hidden_size, output_size)
        self.relu = nn.ReLU()

    def forward(self, x):
        out = self.lay1(x)
        out = self.relu(out)
        out = self.lay2(out)
        out = self.relu(out)
        out = self.lay3(out)
        return out

# Model instantiation
input_size = X_train.shape[1]
hidden_size = 80
output_size = len(codes)
net = Model(input_size, hidden_size, output_size)

# Check for CUDA
CUDA = torch.cuda.is_available()
if CUDA:
    net = net.cuda()

# Loss and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(net.parameters(), lr=0.005, amsgrad=True)

# Training loop
epochs = 50
for epoch in range(epochs):
    correct_train = 0
    total_train = 0
    for i, (inputs, labels) in enumerate(train_loader):
        if CUDA:
            inputs, labels = inputs.cuda(), labels.cuda()

        output = net(inputs)
        optimizer.zero_grad()

        _, predicted = torch.max(output.data, 1)
        total_train += labels.size(0)
        correct_train += (predicted == labels).sum().item()

        loss = criterion(output, labels)
        loss.backward()
        optimizer.step()

    accuracy = 100 * correct_train / total_train

# Prediction function
def responce(data):
    input = torch.tensor(data).float()
    input = input.unsqueeze(0)
    if CUDA:
        input = input.cuda()
    output = net(input)

    _, predicted = torch.topk(output.data, 3)

    labels_to_names = {
        0: 'apple', 1: 'banana', 2: 'blackgram', 3: 'chickpea', 4: 'coconut',
        5: 'coffee', 6: 'corn', 7: 'cotton', 8: 'grapes', 9: 'jute',
        10: 'kidneybeans', 11: 'lentil', 12: 'mango', 13: 'mothbeans',
        14: 'mungbean', 15: 'muskmelon', 16: 'orange', 17: 'papaya',
        18: 'pigeonpeas', 19: 'pomegranate', 20: 'rice', 21: 'watermelon'
    }

    predicted_crops = [labels_to_names[idx.item()] for idx in predicted[0]]

    return predicted_crops

# Testing the function
data = [90, 42, 43, 20.87974371, 82.00274423, 6.9078, 202.9355362]
print(responce(data))
