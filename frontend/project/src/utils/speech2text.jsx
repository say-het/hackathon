import React, { useState, useRef } from 'react';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');
  const recognitionRef = useRef(null);

  const handleStart = () => {
    if (!isListening) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setText(transcript);
        };

        recognitionRef.current.onend = () => {
          if (isListening) {
            recognitionRef.current.start(); // Restart if still listening
          }
        };

        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  };

  const handleStop = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.onend = null; // Disable the onend handler
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="speech-to-text">
      <button
        onClick={isListening ? handleStop : handleStart}
        className={`py-2 px-4 ${isListening ? 'bg-red-500' : 'bg-blue-500'} text-white`}
      >
        {isListening ? 'Stop' : 'Speak'}
      </button>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your speech will appear here..."
        rows="6"
        className="w-full mt-4 p-2 border border-gray-300"
      />
    </div>
  );
};

export default SpeechToText;
