import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import OptionsPanel from '../components/OptionPanel';
import ChatPanel from '../components/ChatPanel';
import Form from '../components/Form';
import Account from '../components/Account';

const options = [
  { id: 1, label: 'KissanGPT' },
  { id: 2, label: 'Form' },
  { id: 3, label: 'Account' },
];

const Home = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption?.id) {
      case 1:
        return <ChatPanel />;
      case 2:
        return <Form />;
      case 3:
        return <Account />;
      default:
        return <div className="p-4">Please select an option.</div>;
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col">
      <Navbar />
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
