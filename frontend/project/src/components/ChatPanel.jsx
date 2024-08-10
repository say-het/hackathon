import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatPanel = () => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en-US'); // State to toggle language
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [chatLog]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = language; // Set the initial language

      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInput(transcript);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error('SpeechRecognition API not supported in this browser.');
    }
  }, [language]); // Re-run effect when language changes

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog, isLoading]);

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en-US' ? 'hi-IN' : 'en-US');
  };

  const handleStart = () => {
    if (recognition && !isListening) {
      try {
        recognition.lang = language; // Update the language before starting
        recognition.start();
        setIsListening(true);

        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            setMediaStream(stream);
          })
          .catch(err => {
            console.error('Failed to access microphone:', err);
          });
      } catch (err) {
        console.error('Error starting speech recognition:', err);
      }
    }
  };

  const handleStop = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
      handleSendMessage(input);

      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        setMediaStream(null);
      }
    }
  };

  const handleSendMessage = async (message) => {
    if (message.trim() === '') return;

    setChatLog((prevLog) => [...prevLog, { sender: 'user', message }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/ask', { message });

      if (response.status === 200) {
        const { newdata } = response.data;
        setChatLog((prevLog) => [...prevLog, { sender: 'bot', message: newdata }]);
      } else {
        console.error('Error fetching the API');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-white p-4 flex flex-col  h-full overflow-y-auto">
      <h2 className="text-lg font-bold">KisanGPT</h2>
      <div className="flex-1 h-96 overflow-y-scroll p-4 border border-gray-200">
        {chatLog.map((entry, index) => (
          <div key={index} className="mb-2">
            <p className={entry.sender === 'user' ? 'text-right' : 'text-left'}>
              <strong>{entry.sender}:</strong> {entry.message}
            </p>
          </div>
        ))}
        {isLoading && (
          <span className="loading loading-dots loading-lg"></span>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={isListening ? handleStop : handleStart}
          className={`py-2 px-4 ${isListening ? 'btn-error' : 'btn-accent'} mt-1 text-white btn btn-outline btn-accent`}
        >
          {isListening ? 'Stop' : 'Speak'}
        </button>
        <input type="checkbox" class="toggle toggle-success" defaultChecked onClick={toggleLanguage}/>
          Toggle Language (Current: {language})
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage(input);
          }}
          className="input input-bordered input-accent w-full max-w-xs flex-1 text-white"
          placeholder="Type a message..."
        />
        <button
          onClick={() => handleSendMessage(input)}
          className="py-2 px-4  mt-1 text-white btn btn-outline btn-accent"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
