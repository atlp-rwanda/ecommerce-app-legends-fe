import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Icon } from '@iconify/react';
import JoinPanel from './JoinPanel';

const ChatButton = () => {
  const [showJoinPanel, setShowJoinPanel] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const toggleJoinPanel = () => {
    setShowJoinPanel(!showJoinPanel);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmail('');
    toggleJoinPanel();
    navigate('/chat');
  };

  return (
    <div className="fixed bottom-0 right-0 p-2 z-50  ">
      <button
        type="button"
        className="text-md px-2 mx-2 text-center text-green-500 hover:text-green-600 md:mx-1 backdrop-blur-lg rounded-full bg-slate-600"
        onClick={toggleJoinPanel}
      >
        <div className="flex">
          <Icon
            className="text-center h-16 flex items-center p-0 w-12 md:h-12 md:w-8"
            icon="fluent:chat-32-filled"
          />
        </div>
      </button>

      <JoinPanel
        showJoinPanel={showJoinPanel}
        toggleJoinPanel={toggleJoinPanel}
        handleSubmit={handleSubmit}
        email={email}
        handleEmailChange={handleEmailChange}
      />
    </div>
  );
};

export default ChatButton;
