import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CART from '../assets/CART.png';
import GOOGLE from '../assets/GOOGLE.png';

export const URL = `https://ecommerce-app-legends-bn-production.up.railway.app`;
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginButton, setLoginButton] = useState({
    display: 'hidden',
    text: `Login`,
  });
  const navigate = useNavigate();

  // Handle Submit Login credentials
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoginButton({
      display: 'inline-block',
      text: `Loading...`,
    });

    await fetch(`${URL}/api/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          toast.success('Login Successfully', { theme: 'colored' });
          localStorage.setItem('token', JSON.stringify(data.token));
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          toast.error(data.message, { theme: 'colored' });
        }
      })
      .catch((err) => {
        toast.error(err.message, { theme: 'colored' });
      });
    setEmail('');
    setPassword('');

    setLoginButton({
      display: 'hidden',
      text: `Login`,
    });
  };
  return (
    <div className="bg-darkGrey h-[100vh] m-0 p-0 flex items-center w-full overflow-hidden relative">
      {/* <ToastContainer theme="colored" /> */}
      <div className="md:w-full md:rounded-none w-2/3 h-[120vh] bg-darkBlueColor absolute right-0 rounded-[280px] rounded-r overflow-hidden" />
      <div className="flex flex-row-reverse justify-center mx-auto w-[65%] md:w-[95%] sm:w-[100%] h-[75%] bg-imageBgColor">
        <div className=" flex items-center justify-center md:hidden backdrop-blur-3xl bg-imageBgColor w-1/2">
          <img
            src={CART}
            alt=""
            className=" rounded-sm rounded-l-none h-[80%]"
          />
        </div>
        <div className="px-8 py-6 bg-whiteColor w-1/2 backdrop-blur-md rounded-md rounded-r-none shadow-2xl flex flex-col md:w-[90%] md:rounded-r sm:px-2 sm:w-[98%] md:px-10">
          <h1 className="h-fit text-xl font-bold mb-1 text-center">
            Log in to your account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="relative  w-full min-w-[200px] my-2 h-10">
              <label
                htmlFor="email"
                className="before:content[' '] after:content[' '] pointer-events-none my-4"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="peer bg-lightGrey invalid:focus:border-red-400 valid:focus:border-green-400 h-full w-full rounded-[7px] border mt-2 px-3 py-3.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:outline-0 disabled:border-0 disabled:shadow-sm"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative  w-full min-w-[200px] mt-8 h-10">
              <div>
                <label
                  htmlFor="password"
                  className="before:content[' '] after:content[' '] pointer-events-none my-4"
                >
                  Password
                </label>
              </div>
              <input
                id="password"
                className="peer bg-lightGrey invalid:focus:border-red-400 valid:focus:border-green-400 h-full w-full rounded-[7px] border mt-2 px-3 py-3.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:outline-0 disabled:border-0 disabled:shadow-sm"
                placeholder="Enter password here"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full text-xl bg-darkBlueColor py-2 text-white font-semibold rounded-md mt-14"
            >
              <span
                id="spin"
                className={`${loginButton.display} h-5 w-5 animate-spin rounded-full border-white border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mr-3`}
                role="status"
              />
              {loginButton.text}
            </button>
          </form>
          <button
            type="button"
            className="flex flex-row items-center justify-center w-full text-xl bg-lightYellow py-1 text-white font-semibold rounded-md mt-6"
          >
            <img src={GOOGLE} alt="" className="w-[22px] mr-2" />
            Google Login
          </button>
          <p className="mt-3 text-center">
            have an account?
            <NavLink
              to="/sign-up-buyer"
              className="text-darkBlueColor font-bold "
            >
              {` Sign up`}
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
