import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducers/user';
import FormInput from '../../components/formControlscomponents/formInput/FormInput';
import Button from '../../components/formControlscomponents/Button/Button';
import CART from '../../assets/CART.png';
import GOOGLE from '../../assets/GOOGLE.png';

export const URL = `https://ecommerce-app-legends-bn-production.up.railway.app`;
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [loginButton, setLoginButton] = useState({
    display: 'hidden',
    text: `Login`,
  });
  const navigate = useNavigate();

  // store token in state
  const [userToken, setUserToken] = useState('');
  const [userRole, setUserRole] = useState('');

  // Handle Submit Login credentials
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);
    setLoginButton({
      display: 'inline-block',
      text: `Loading...`,
    });

    await fetch(`${URL}/api/v1/users/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role === 'vendor') {
          toast.success(data.message, { theme: 'colored' });
          navigate('/verify-otp');
        } else if (data.status === 'success') {
          toast.success('Login Successfully', { theme: 'colored' });
          localStorage.setItem('token', JSON.stringify(data.token));
          dispatch(login(data.user));
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
    setIsClicked(false);
    setLoginButton({
      display: 'hidden',
      text: `Login`,
    });
  };

  const hundleOnChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const hundleOnChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const findParams = (param) => {
    const parameter = new URLSearchParams(window.location.search);
    const foundToken = parameter.get(param);
    return foundToken;
  };
  const Token = findParams('token');
  const role = findParams('role');
  if (Token && role) {
    localStorage.setItem('token', JSON.stringify(Token));
    localStorage.setItem('role', JSON.stringify(role));
  }
  // Google Login
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token && role) {
      setUserToken(token);
      setUserRole(role);
    }
  }, [role]);

  if (userToken) {
    if (userRole === 'vendor') {
      navigate('/vendor-dashboard');
    } else if (userRole === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/products');
    }
  }

  return (
    <div className="bg-darkGrey h-[100vh] m-0 p-0 flex items-center w-full overflow-hidden relative">
      <div className="md:w-full md:rounded-none w-2/3 h-[120vh] bg-darkBlueColor absolute right-0 rounded-[280px] rounded-r overflow-hidden" />
      <div className="flex flex-row-reverse justify-center mx-auto w-[65%] md:w-[95%] sm:w-[100%] h-[75%] bg-imageBgColor">
        <div className=" flex items-center justify-center md:hidden backdrop-blur-3xl bg-imageBgColor w-1/2">
          <img
            src={CART}
            alt=""
            className=" rounded-sm rounded-l-none h-[80%]"
          />
        </div>
        <div className="px-8 pt-[3.5%] bg-whiteColor w-1/2 backdrop-blur-md rounded-md rounded-r-none shadow-2xl flex flex-col md:w-[90%] md:rounded-r sm:px-2 sm:w-[98%] md:px-10">
          <h1 className="h-fit text-xl font-bold mb-1 text-center">
            Log in to your account
          </h1>
          <form className="my-[1%]" onSubmit={handleSubmit}>
            <div className="relative  w-full min-w-[200px] my-2 h-10">
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
                onChange={hundleOnChangeEmail}
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
              <FormInput
                id="password"
                className="peer bg-lightGrey invalid:focus:border-red-400 valid:focus:border-green-400 h-full w-full rounded-[7px] border mt-2 px-3 py-3.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:outline-0 disabled:border-0 disabled:shadow-sm"
                placeholder="Enter password here"
                type="password"
                required
                value={password}
                onChange={hundleOnChangePassword}
              />
            </div>
            <Button
              type="submit"
              isClicked={isClicked}
              className="w-full text-xl bg-darkBlueColor py-2 text-white font-semibold rounded-md mt-14"
              btnName={loginButton.text}
              display={loginButton.display}
            />
          </form>
          <Link to={`${URL}/auth/google`}>
            <button
              type="button"
              className="flex flex-row items-center justify-center w-full text-xl bg-lightYellow py-1.5 text-white font-semibold rounded-md mt-8"
            >
              <img src={GOOGLE} alt="" className="w-[22px] mr-2" />
              Google Login
            </button>
          </Link>
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
