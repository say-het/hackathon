import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import OptionsPanel from '../components/OptionPanel';
import ChatPanel from '../components/ChatPanel';
import Form from '../components/Form';
import Account from '../components/Account';

const options = [
  { id: 1, label: 'Home' },
  { id: 2, label: 'KissanGPT' },
  { id: 3, label: 'Form' },
];

const Home = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    if (option.id === 1) {
      navigate('/'); // Navigates to the home page when "Home" is selected
    }
  };

  const renderContent = () => {
    switch (selectedOption?.id) {
      case 2:
        return <ChatPanel />;
      case 3:
        return <Form />;
      
      default:
        return <div className="p-4">Please select an option.</div>;
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex flex-1">
        <OptionsPanel 
          options={options} 
          selectedOption={selectedOption} 
          onSelectOption={handleOptionSelect} 
        />
        <main className="flex-1 p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Home;
