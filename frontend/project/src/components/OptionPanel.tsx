import React from 'react';

const OptionsPanel = ({ options, selectedOption, onSelectOption }) => {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="text-lg font-bold">Options</h2>
      <ul>
        {options.map((option) => (
          <li key={option.id}>
            <button
              className={`block w-full py-2 px-4 hover:bg-gray-200 ${
                selectedOption?.id === option.id ? 'bg-gray-200' : ''
              }`}
              onClick={() => onSelectOption(option)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default OptionsPanel;
