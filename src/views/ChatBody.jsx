import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = () => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader fixed">
        <p>WWELCONE LEGENDS</p>
        <button
          type="button"
          className="leaveChat__btn"
          onClick={handleLeaveChat}
        >
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container ml-60 mt-20">
        <div className="message__chats">
          <p className="sender__name">You</p>
          <div className="message__sender">
            <p>Hello there</p>
          </div>
        </div>

        <div className="message__chats">
          <p>Other</p>
          <div className="message__recipient">
            <p>Hey, Im good, you?</p>
          </div>
        </div>

        {/* This is triggered when a user is typing */}
        <div className="message__status">
          <p>Someone is typing...</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
