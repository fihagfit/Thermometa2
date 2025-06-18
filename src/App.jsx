import React, { useState } from 'react';

// Main App component
const App = () => {
    // State variables for thermometer data
    // No Firebase, so data is purely local and resets on page refresh
    const [targetAmount, setTargetAmount] = useState(100000); // Default target to 100,000
    const [currentAmount, setCurrentAmount] = useState(0); // Default current amount
    const [customAmount, setCustomAmount] = useState(''); // For custom donation input
    const [message, setMessage] = useState('Welcome! Start adding donations.'); // Initial message

    // State for reset confirmation modal
    const [showConfirmReset, setShowConfirmReset] = useState(false);

    // Predefined donation amounts
const setAmounts = [1000, 2500, 5000, 10000];

    // Function to add amount to the thermometer (now purely local state)
    const addAmount = (amountToAdd) => {
        const numericAmount = parseFloat(amountToAdd);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setMessage('Please enter a valid positive number.');
            return;
        }

        const newAmount = currentAmount + numericAmount;
        setCurrentAmount(newAmount); // Update local state directly
        setMessage(`Added $${numericAmount.toFixed(2)}. Total: $${newAmount.toFixed(2)}`);
        setCustomAmount(''); // Clear custom amount input

        if (newAmount >= targetAmount) {
            setMessage(`Congratulations! You have reached or exceeded the target of $${targetAmount.toFixed(2)}!`);
        }
    };

    // Function to handle custom amount input change
    const handleCustomAmountChange = (e) => {
        setCustomAmount(e.target.value);
    };

    // Function to handle adding custom amount
    const handleAddCustomAmount = () => {
        addAmount(customAmount);
    };

    // Function to handle setting a new target amount (now purely local state)
    const handleSetTarget = () => {
        const newTarget = parseFloat(prompt("Enter new target amount:"));
        if (isNaN(newTarget) || newTarget <= 0) {
            setMessage('Please enter a valid positive target amount.');
            return;
        }
        setTargetAmount(newTarget); // Update local state directly
        setMessage(`Target amount set to $${newTarget.toFixed(2)}.`);
    };

    // Function to reset the thermometer data (now purely local state)
    const handleResetThermometer = () => {
        setShowConfirmReset(false); // Close the confirmation modal
        setCurrentAmount(0); // Reset local state
        setTargetAmount(100000); // Reset to default target
        setMessage('Thermometer reset successfully!');
    };

    // Calculate fill percentage for the thermometer
    const fillPercentage = Math.min(100, (currentAmount / targetAmount) * 100);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 text-white font-inter flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl text-center text-gray-800 space-y-6">
                <h1 className="text-4xl font-extrabold text-indigo-700">Auction Fundraiser</h1>
                <p className="text-xl text-gray-600">Help us reach our goal!</p>

                {/* Thermometer Display */}
                <div className="flex items-end justify-center h-80 relative w-40 mx-auto border-4 border-indigo-700 rounded-b-full rounded-t-xl overflow-hidden bg-gray-200 shadow-inner">
                    <div
                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-red-500 to-red-600 transition-all duration-700 ease-out flex items-center justify-center text-white font-bold text-lg"
                        style={{ height: `${fillPercentage}%` }}
                    >
                        {/* Current Amount Text overlay */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            ${currentAmount.toFixed(2)}
                        </div>
                    </div>
                    {/* Target amount line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                    {/* Changed text color to white */}
                    <div className="absolute top-0 right-full transform translate-x-2 text-white font-bold text-sm">
                        Target: ${targetAmount.toFixed(2)}
                    </div>
                </div>

                <div className="text-2xl font-bold text-indigo-700 mt-4">
                    <span className="text-red-600">${currentAmount.toFixed(2)}</span> / ${targetAmount.toFixed(2)} Raised
                </div>

                <p className="text-sm text-gray-600">{message}</p>

                {/* Donation Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mt-6">
                    {setAmounts.map((amount) => (
                        <button
                            key={amount}
                            onClick={() => addAmount(amount)}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 active:scale-95"
                        >
                            Add ${amount}
                        </button>
                    ))}
                </div>

                {/* Custom Amount Input */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
                    <input
                        type="number"
                        placeholder="Custom amount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="flex-grow p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800"
                        min="0"
                        step="0.01"
                    />
                    <button
                        onClick={handleAddCustomAmount}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 active:scale-95"
                    >
                        Add Custom Amount
                    </button>
                </div>

                {/* Admin/Target Setting Button and Reset Button */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={handleSetTarget}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 active:scale-95"
                    >
                        Set New Target
                    </button>
                    <button
                        onClick={() => setShowConfirmReset(true)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 active:scale-95"
                    >
                        Reset Thermometer
                    </button>
                </div>

                {/* Reset Confirmation Modal */}
                {showConfirmReset && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl text-center text-gray-800 max-w-sm w-full">
                            <h3 className="text-xl font-bold mb-4">Confirm Reset</h3>
                            <p className="mb-6">Are you sure you want to reset the thermometer? This action cannot be undone.</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={handleResetThermometer}
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300"
                                >
                                    Yes, Reset
                                </button>
                                <button
                                    onClick={() => setShowConfirmReset(false)}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;