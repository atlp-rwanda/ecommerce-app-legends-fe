import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import FormInput from '../../components/formControlscomponents/formInput/FormInput';
import Button from '../../components/formControlscomponents/Button/Button';
import { setUser, setRole, setToken } from '../../redux/reducers/AuthUser';
import CART from '../../assets/CART.png';
import GOOGLE from '../../assets/GOOGLE.png';
// eslint-disable-next-line import/no-cycle
import Navbar from '../../components/Navbar';
import Footer from '../../components/FrontFooter';

export const URL = `https://ecommerce-app-legends-bn-production.up.railway.app`;
const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [loginButton, setLoginButton] = useState({
    display: 'hidden',
    text: t('login'),
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
      text: t('loading'),
    });
    await fetch(`${URL}/api/v1/users/login`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
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
          dispatch(setUser(data.data));
          dispatch(setRole(data.role));
          dispatch(setToken(data.token));
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
      text: t('login'),
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
      navigate('/');
    }
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="bg-darkGrey h-[100vh] m-0 p-0 flex items-center justify-center w-full overflow-hidden relative">
          <div className="w-[60vw] h-[150vh]  bg-[#011B32] absolute right-0   -top-[25vh] rounded-[50%] overflow-hidden rounded-r" />
          <div className="flex flex-row-reverse justify-center mx-auto w-[65%] md:w-[95%] sm:w-[100%] bg-imageBgColor mt-8">
            <div className=" flex items-center justify-center py-6 md:hidden backdrop-blur-3xl bg-imageBgColor w-1/2">
              <img
                src={CART}
                alt=""
                className=" rounded-sm rounded-l-none h-[80%]"
              />
            </div>
            <div className="px-8  bg-whiteColor w-1/2 backdrop-blur-md rounded-md rounded-r-none shadow-2xl py-6 flex flex-col md:w-[90%] md:rounded-r sm:px-2 sm:w-[98%] md:px-10 ">
              <h1 className="h-fit text-xl mb-1 text-center font-medium">
                {t('loginText')}
              </h1>
              <form className="my-[1%]" onSubmit={handleSubmit}>
                <div className="relative  w-full min-w-[200px] py-0.5 h-10 mb-10">
                  <label
                    htmlFor="email"
                    className="before:content[' '] after:content[' '] pointer-events-none sm:text-sm font-thin"
                  >
                    {t('emailLabel')}
                  </label>
                  <FormInput
                    id="email"
                    type="email"
                    className="peer bg-lightGrey invalid:focus:border-red-400 valid:focus:border-green-400 h-full w-full rounded-[7px] border mt-2 px-3 py-3.5 sm:py-3 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder:font-thin placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:outline-0 disabled:border-0 disabled:shadow-sm"
                    placeholder={t('emailPlaceholder')}
                    required
                    value={email}
                    onChange={hundleOnChangeEmail}
                  />
                </div>
                <div className="relative  w-full min-w-[200px] py-0.5 mt-10 h-10">
                  <div>
                    <label
                      htmlFor="password"
                      className="before:content[' '] after:content[' '] pointer-events-none sm:text-sm font-thin"
                    >
                      {t('passwordLabel')}
                    </label>
                  </div>
                  <FormInput
                    id="password"
                    className="peer bg-lightGrey invalid:focus:border-red-400 valid:focus:border-green-400 h-full w-full rounded-[7px] border mt-2 px-3 py-3.5 sm:py-3 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder:font-thin placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:outline-0 disabled:border-0 disabled:shadow-sm"
                    placeholder={t('passwordPlaceholder')}
                    type="password"
                    required
                    value={password}
                    onChange={hundleOnChangePassword}
                  />
                </div>
                <Button
                  type="submit"
                  isClicked={isClicked}
                  className="w-full text-xl bg-darkBlueColor py-1 text-white font-semibold rounded-md mt-16"
                  btnName={loginButton.text}
                  display={loginButton.display}
                />
              </form>
              <Link to={`${URL}/auth/google`}>
                <button
                  type="button"
                  className="flex flex-row items-center justify-center w-full text-xl bg-lightYellow py-1 text-white font-semibold rounded-md mt-6"
                >
                  <img src={GOOGLE} alt="" className="w-[22px] mr-2" />
                  {t('googleLogin')}
                </button>
              </Link>
              <p className="mt-3 text-center font-light">
                {t('dontHaveccount')}
                <NavLink
                  to="/sign-up-buyer"
                  className="text-darkBlueColor font-semibold "
                >
                  {` ${t('signup')}`}
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Login;
