import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OptionsPanel from '../components/OptionPanel';
import ChatPanel from '../components/ChatPanel';
import Form from '../components/Form';

const options = [
  { id: 1, label: 'Home' },
  { id: 2, label: 'KissanGPT' },
  { id: 3, label: 'CropAdvisor' },
];

const Home = () => {
  const [selectedOption, setSelectedOption] = useState(2); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleOptionSelect = (option) => {
    setSelectedOption(option.id);

    if (option.id === 1) {
      navigate('/'); 
    }
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 2:
        return <ChatPanel />;
      case 3:
        return <Form />;
      default:
        return <div className="p-4">Please select an option.</div>;
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const option = searchParams.get('option');
    
    if (option === 'form') {
      setSelectedOption(3);
    } else {
      setSelectedOption(2);
    }
  }, [location.search]);

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
