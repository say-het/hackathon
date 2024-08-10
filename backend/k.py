import torch
import torch.nn.functional as F
import pickle

class Model:
    __module__ = '__main__'


# Load the PyTorch model using pickle
with open('modelfarming', 'rb') as file:
    mp = pickle.load(file)

data = [90, 42, 43, 20.87974371, 82.00274423, 6.502985292, 202.9355362]

def response(data):
    input_tensor = torch.tensor(data).float()
    input_tensor = input_tensor.unsqueeze(0)  # Add a batch dimension

    # Use the model to make a prediction
    output = mp(input_tensor)

    # Apply softmax to get probabilities if not already applied
    output_probs = F.softmax(output, dim=1)

    # Get the top 3 predictions
    _, predicted_indices = torch.topk(output_probs, 3)

    labels_to_names = {
        0: 'apple', 1: 'banana', 2: 'blackgram', 3: 'chickpea', 4: 'coconut', 
        5: 'coffee', 6: 'corn', 7: 'cotton', 8: 'grapes', 9: 'jute', 
        10: 'kidneybeans', 11: 'lentil', 12: 'mango', 13: 'mothbeans', 
        14: 'mungbean', 15: 'muskmelon', 16: 'orange', 17: 'papaya', 
        18: 'pigeonpeas', 19: 'pomegranate', 20: 'rice', 21: 'watermelon'
    }

    predicted_crops = [labels_to_names[idx.item()] for idx in predicted_indices[0]]

    return predicted_crops

if __name__ == "__main__":
    print(response(data))
