import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const JoinPanel = ({
  showJoinPanel,
  toggleJoinPanel,
  handleSubmit,
  email,
  handleEmailChange,
}) => {
  const [socket, setSocket] = useState(null);
  const [name, setName] = useState('');

  const connectToSocket = () => {
    const newSocket = io(
      'https://ecommerce-app-legends-bn-production.up.railway.app'
    ); // Replace with your server URL
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  };

  // Connect to the socket when the component mounts
  useEffect(() => {
    connectToSocket();
  }, []);

  const handleJoinChat = () => {
    if (socket && name) {
      // Emit the 'user joined' event to the server
      socket.emit('user joined', name);
      console.log(`name: ${name}`);
      // Save the name in local storage
      localStorage.setItem('userName', name);
    }
  };

  return (
    <div>
      {showJoinPanel && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-slate-900 p-4 w-2/5 md:w-5/6 rounded-lg relative">
            <button
              type="button"
              className="absolute top-2 right-2 text-orange-600 hover:text-red-800"
              onClick={toggleJoinPanel}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 font-bold text-white"
                >
                  Join ATLP-Legend chat room
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-white"
                  placeholder="join with your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  onClick={handleJoinChat}
                  className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
                >
                  Join Chat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinPanel;
