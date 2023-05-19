import React from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import Navbar from '../components/Navbar';

const ChatPage = ({ socket }) => {
  return (
    <>
      <Navbar />
      <div className="chat mt-16">
        <ChatBar className="" />
        <div className="chat__main">
          <ChatBody />
          <ChatFooter socket={socket} />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
