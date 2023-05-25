import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const JoinPanel = ({ showJoinPanel, toggleJoinPanel, handleSubmit }) => {
  const { user } = useSelector((state) => state.currentUser);
  const joinedUser = `${user?.firstname} ${user?.lastname}`;
  const [socket, setSocket] = useState(null);
  const [name, setName] = useState(joinedUser);
  const handleUserLoggedIn = () => {
    return !!joinedUser;
  };
  const connectToSocket = () => {
    const newSocket = io(
      'https://ecommerce-app-legends-bn-production.up.railway.app'
    );
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  };

  useEffect(() => {
    connectToSocket();
  }, []);

  const handleJoinChat = () => {
    if (socket && name) {
      socket.emit('user joined', name);
      console.log(`name: ${name}`);
      // Save the name in local storage
      localStorage.setItem('userName', name);
    }
  };

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
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
                  <h1 className="font font-bold text-2xl md:text-sm text-center">
                    Welcome to ATLP-Legend Chat room
                  </h1>
                  {handleUserLoggedIn() && (
                    <p className="font font-light mt-4 text-center">
                      you are going to join as:
                    </p>
                  )}
                </label>
                {handleUserLoggedIn() && (
                  <input
                    type="text"
                    id="email"
                    className="w-full px-3 py-2 border text-center border-gray-300 rounded-md focus:outline-none focus:border-white"
                    placeholder="join with your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    readOnly
                    required
                  />
                )}

                {!handleUserLoggedIn() && (
                  <p className="font font-light mt-4 text-center text-white">
                    You are not yet logged in
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                {handleUserLoggedIn() && (
                  <button
                    type="submit"
                    onClick={handleJoinChat}
                    className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
                  >
                    Join Chat
                  </button>
                )}
                {!handleUserLoggedIn() && (
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
                  >
                    Login First
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinPanel;
