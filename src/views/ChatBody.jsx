import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { io } from 'socket.io-client';
import { BiSend } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import {
  setInputMessage,
  sendMessage,
  fetchPreviousMessages,
} from '../redux/reducers/chatSlice';
import {
  connectSocket,
  addMessage,
  disconnectSocket,
  addUser,
} from '../redux/reducers/socketSlice';
import Navbar from '../components/Navbar';
import ChatBar from './ChatBar';
import BurgerButton from '../components/dashboards/admin/bars/BurgerButton';

const socket = io('https://ecommerce-app-legends-bn-production.up.railway.app'); // Replace with your server URL

const ChatBody = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);
  const { users } = useSelector((state) => state.socket);
  const currentUserName = localStorage.getItem('userName');
  const [localInputMessage, setLocalInputMessage] = useState('');
  const messageContainerRef = useRef(null);
  const localName = localStorage.getItem('userName') || '';
  const [isOpen, setIsOpen] = useState(false); // Add the isOpen state
  const isMediumScreen = useMediaQuery({ maxWidth: 768 });

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (localInputMessage.trim() !== '' && localName !== '') {
      dispatch(
        sendMessage({ message: localInputMessage, sender: localName })
      ).then(() => {
        dispatch(fetchPreviousMessages());
        scrollToBottom();
      });
      setLocalInputMessage('');
    }
  };

  function getTimeAgo(createdAt) {
    return moment(createdAt).fromNow();
  }

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    dispatch(disconnectSocket());
    navigate('/');
  };

  useEffect(() => {
    dispatch(fetchPreviousMessages());
    dispatch(connectSocket());

    return () => {
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on('chat message', (data) => {
        const { name: senderName, message } = data; // Rename 'name' variable to 'senderName'
        const newMessage = {
          text: message,
          sender: senderName,
          createdAt: new Date().toISOString(),
        };
        dispatch(setInputMessage(''));
        dispatch(addMessage(newMessage));
        scrollToBottom();
      });
      socket.on('user joined', (name) => {
        dispatch(addUser({ name }));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPreviousMessages());
    dispatch(connectSocket());

    return () => {
      dispatch(disconnectSocket());
    };
  }, [messages, dispatch]);

  return (
    <>
      <Navbar />
      <ChatBar users={users} isOpen={isOpen} />
      <header className="chat__mainHeader h-20  flex w-10/12 md:w-full md:h-14 items-center justify-between  md:space-x-3 p-5 float-right right-0 text-white bg-slate-900 fixed">
        {isMediumScreen && (
          <div className="text-red-500 text-3xl">
            <BurgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        )}
        <p className="text-sm">WELCOME LEGENDS</p>
        <button
          type="button"
          className="leaveChat__btn px-4 md:px-2 md:py-1 py-2 w-36 md:w-28 border-none md:text-sm outline-none bg-orange-600 cursor-pointer text-white"
          onClick={handleLeaveChat}
        >
          LEAVE CHAT
        </button>
      </header>

      <div
        ref={messageContainerRef}
        className="message__container ml-[16%] md:ml-0  mt-16 h-screen pt-28 pb-20 px-16 md:px-2 bg-cover bg-no-repeat bg-center overflow-y-auto"
      >
        {messages.map((message) => (
          <div className="message__chats" key={message.id}>
            {message.sender === currentUserName ? (
              <>
                <p className="sender__name text-white font-bold text-right">
                  You
                </p>
                <div className="message__sender bg-green-200 max-w-[300px] p-2 rounded-lg ml-auto text-base">
                  <p className="text-gray-800">{message.message}</p>
                  <span className="text-gray-500 text-xs">
                    {getTimeAgo(message.createdAt)}
                  </span>
                </div>
              </>
            ) : (
              <>
                <p className="text-white font-bold">{message.sender}</p>
                <div className="message__recipient bg-slate-300 max-w-[300px] p-2 rounded-lg text-base">
                  <p className="text-black">{message.message}</p>
                  <span className="text-gray-500 text-xs">
                    {getTimeAgo(message.createdAt)}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}

        <div className="chat__footer fixed w-10/12 md:w-full right-0 bottom-0 py-1 pl-32 md:pl-3 md:h-12 h-12 backdrop-blur-lg bg-slate-500">
          <form
            className="form w-full h-full flex md:justify-center px-14 md:px-3 md:space-x-1 space-x-3"
            onSubmit={handleSendMessage}
          >
            <input
              type="text"
              placeholder="Write message"
              className="w-full flex-1 h-full bg-gray-800 border bg-opacity-70 backdrop-blur-md rounded-lg border-3 border-white text-white outline-none px-4 md:px-0 py-2 md:py-0"
              value={localInputMessage}
              onChange={(e) => setLocalInputMessage(e.target.value)}
            />

            <button
              type="submit"
              className="sendBtn w-12 py-0 px-0 text-3xl border-none  outline-none text-gray-100 cursor-pointer"
            >
              <BiSend />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
