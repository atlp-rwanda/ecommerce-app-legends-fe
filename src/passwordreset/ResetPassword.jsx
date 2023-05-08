import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../components/formControlscomponents/formInput/FormInput';
import Button from '../components/formControlscomponents/Button/Button';
import CART from '../assets/CART.png';

export const URL = `https://ecommerce-app-legends-bn-production.up.railway.app`;

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [resetButton, setResetButton] = useState({
    display: 'hidden',
    text: 'Send Reset Link',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);
    setResetButton({
      display: 'inline-block',
      text: 'Loading...',
    });

    await fetch(`${URL}/api/v1/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          const { token } = data; // Extract the token from the response data
          toast.success(data.message, { theme: 'colored' });
          navigate('/login', { state: { token } }); // Pass the token as state to the login route
        } else {
          toast.error(data.message, { theme: 'colored' });
        }
      })
      .catch((err) => {
        toast.error(err.message, { theme: 'colored' });
      });

    setEmail('');
    setIsClicked(false);
    setResetButton({
      display: 'hidden',
      text: 'Send Reset Link',
    });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="bg-darkGrey h-[100vh] m-0 p-0 flex items-center w-full overflow-hidden relative">
      <div className="md:w-full md:rounded-none w-2/3 h-[120vh] bg-darkBlueColor absolute right-0 rounded-[280px] rounded-r overflow-hidden" />
      <div className="flex flex-row-reverse justify-center mx-auto w-[65%] md:w-[95%] sm:w-[100%] h-[75%] bg-imageBgColor">
        <div className="flex items-center justify-center md:hidden backdrop-blur-3xl bg-imageBgColor w-1/2">
          <img
            src={CART}
            alt=""
            className="rounded-sm rounded-l-none h-[80%]"
          />
        </div>
        <div className="px-8 pt-[3.5%] bg-whiteColor w-1/2 backdrop-blur-md rounded-md rounded-r-none shadow-2xl flex flex-col md:w-[90%] md:rounded-r sm:px-2 sm:w-[98%] md:px-10">
          <h1 className="h-fit text-xl font-bold mb-1 text-center">
            Reset Your Password
          </h1>
          <form className="my-[1%]" onSubmit={handleSubmit}>
            <div className="relative w-full min-w-[200px] my-2 h-10">
              <label
                htmlFor="email"
                className="before:content[' '] after:content[' '] pointer-events-none my-4"
              >
                Email
              </label>
              <FormInput
                id="email"
                type="email"
                className="peer bg-lightGrey invalid:focus:border-red-400 valid:focus:border-green-400 h-full w-full rounded-[7px] border mt-2 px-3 py-3.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:outline-0 disabled:border-0 disabled:shadow-sm"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <Button
              type="submit"
              isClicked={isClicked}
              className="w-full text-xl bg-darkBlueColor py-2 text-white font-semibold rounded-md mt-14"
              btnName={resetButton.text}
              display={resetButton.display}
            />
          </form>
          <p className="mt-3 text-center">
            Back to
            <NavLink to="/login" className="text-darkBlueColor font-bold">
              {' '}
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
