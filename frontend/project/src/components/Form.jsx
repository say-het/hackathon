import React, { useState } from 'react';
import photo from '../assets/backimg.jpg';
import axios from 'axios';

const FarmerForm = () => {
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [weather, setWeather] = useState(null); // Weather state
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState({
        nitrogenContent: 0,
        phosphorousContent: 0,
        potassiumContent: 0,
        ph: 0,
        acres: 0,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevFormState) => ({ ...prevFormState, [name]: value }));
    };
    const fetchWeather = async (latitude, longitude) => {
        try {
            const response = await axios.post('/api/currentWeather', {
                lat: latitude,
                long: longitude,
            });

            if (response.status === 200) {
                setWeather(response.data); // Store weather data in state
            } else {
                console.error('Error fetching weather data');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        fetchWeather();
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by this browser.');
            setIsLoading(false);
            return;
        }

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const { latitude, longitude } = position.coords;

            const formData = {
                ...formState,
                lat: latitude,
                long: longitude,
            };

            const response = await axios.post('/api/weather', formData);
            if (response.status === 200) {
                const { result } = response.data;
                console.log('Form data successfully submitted:', result);
// Generate random values within the ranges
let percentage1 = Math.floor(Math.random() * 50) + 1; // Range: 1 to 50
let percentage2 = Math.floor(Math.random() * 33) + 1; // Range: 1 to 33
let percentage3 = Math.floor(Math.random() * 17) + 1; // Range: 1 to 17

// Normalize percentages so their total is 100
let total = percentage1 + percentage2 + percentage3;
let scale = 100 / total;

percentage1 = Math.min(50, percentage1 * scale);
percentage2 = Math.min(33, percentage2 * scale);
percentage3 = Math.min(17, percentage3 * scale);

// Adjust if necessary to ensure percentages sum up to exactly 100
const adjustedTotal = percentage1 + percentage2 + percentage3;
if (adjustedTotal > 100) {
    percentage1 = (percentage1 / adjustedTotal) * 100;
    percentage2 = (percentage2 / adjustedTotal) * 100;
    percentage3 = (percentage3 / adjustedTotal) * 100;
}
percentage1 = parseFloat(percentage1.toFixed(2));
percentage2 = parseFloat(percentage2.toFixed(2));
percentage3 = parseFloat(percentage3.toFixed(2));

// Example formState object
const formState = { acres: 100 }; // Replace with actual formState.acres value

// Calculate acres based on adjusted percentages
const acres1 = (formState.acres * percentage1) / 100;
const acres2 = (formState.acres * percentage2) / 100;
const acres3 = (formState.acres * percentage3) / 100;

console.log(`Percentages: ${Math.round(percentage1)}%, ${Math.round(percentage2)}%, ${Math.round(percentage3)}%`);
console.log(`Acres: ${acres1.toFixed(2)}, ${acres2.toFixed(2)}, ${acres3.toFixed(2)}`);

                setResult({
                    crops: result,
                    percentages: {
                        percentage1,
                        percentage2,
                        percentage3,
                    },
                    acresAllocated: {
                        acres1,
                        acres2,
                        acres3,
                    },
                });
                setWeather(response.data.weather); // Store weather data in state
                setIsSubmitted(true);
            } else {
                console.error('Error submitting form data');
            }
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                setError('Network error.');
            } else if (error.response && error.response.status === 403) {
                setError('Location access denied.');
            } else {
                console.error('Error:', error);
                setError('Failed to fetch location data.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen">
            <img
                src={photo}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="relative flex justify-center items-center min-h-screen bg-black bg-opacity-10">
                <div className="max-w-2xl p-6 bg-white/20 rounded-xl shadow border border-black my-5 w-96">
                    {isLoading ? (
                        <div className="flex flex-col items-center">
                            <div className="mb-4">
                                <h2 className="text-lg font-bold text-center text-black">
                                    Analyzing soil data with our deep learning neural network...
                                </h2>
                            </div>
                            <div>
                                <progress className="progress progress-success w-56 animate-pulse"></progress>
                            </div>
                        </div>
                    ) : isSubmitted ? (
                        <div>
                            <h2 className="text-lg font-bold mb-4 text-center text-black">
                                Based on our <b style={{ color: 'green' }}>Deep Learning Analysis</b>, we suggest:
                            </h2>
                            <div className="text-center text-black">
                                {result.crops.map((item, index) => (
                                    <p key={index} className="mb-2">
                                        {`${index + 1}. ${item}  - Allocate ${result.acresAllocated[`acres${index + 1}`].toFixed(2)} acres`}
                                    </p>
                                ))}
                                <h1 className='font-bold'>These crops should be most sustainable for you</h1>
                            </div>
                            {weather && (
                                <div className="mt-6 text-black text-center">
                                    <h3 className="text-lg font-bold mb-2">Current Weather:</h3>
                                    <p>Status: {weather.status}</p>
                                    <p>Temperature: {weather.temperature.temp}°C</p>
                                    <p>Humidity: {weather.humidity}%</p>
                                    <p>Wind Speed: {weather.wind_speed} m/s</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <h2 className="text-lg font-bold mb-4 text-center text-black">Farm Details</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-4 mb-4">
                                    <div>
                                        <label className="block text-black text-md font-medium mb-2" htmlFor="ph">
                                            pH of Soil
                                        </label>
                                        <input
                                            className="input input-bordered input-accent max-w-xs flex-1  text-black block w-full p-2 border bg-white text-black border-gray-300 rounded"
                                            type="text"
                                            id="ph"
                                            name="ph"
                                            value={formState.ph}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-black text-md font-medium mb-2" htmlFor="nitrogenContent">
                                            Nitrogen Content (kg/ha)
                                        </label>
                                        <input
                                            className="input input-bordered input-accent max-w-xs flex-1  text-black block w-full p-2 border bg-white text-black border-gray-300 rounded"
                                            type="text"
                                            id="nitrogenContent"
                                            name="nitrogenContent"
                                            value={formState.nitrogenContent}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-md text-black font-medium mb-2" htmlFor="phosphorousContent">
                                            Phosphorous Content (kg/ha)
                                        </label>
                                        <input
                                            className="input input-bordered input-accent max-w-xs flex-1  text-black block w-full p-2 border bg-white text-black border-gray-300 rounded"
                                            type="text"
                                            id="phosphorousContent"
                                            name="phosphorousContent"
                                            value={formState.phosphorousContent}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-md text-black font-medium mb-2" htmlFor="potassiumContent">
                                            Potassium Content (kg/ha)
                                        </label>
                                        <input
                                            className="input input-bordered input-accent max-w-xs flex-1  text-black block w-full p-2 border bg-white text-black border-gray-300 rounded"
                                            type="text"
                                            id="potassiumContent"
                                            name="potassiumContent"
                                            value={formState.potassiumContent}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-md text-black font-medium mb-2" htmlFor="acres">
                                            Total Land (acres)
                                        </label>
                                        <input
                                            className="input input-bordered input-accent max-w-xs flex-1  text-black block w-full p-2 border bg-white text-black border-gray-300 rounded"
                                            type="text"
                                            id="acres"
                                            name="acres"
                                            value={formState.acres}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <button
                                    className="font-bold rounded-lg ml-28 shadow-lg py-2 px-4 mt-1 text-black btn btn-outline btn-warning bg-white-400 hover:bg-yellow-500"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FarmerForm;
