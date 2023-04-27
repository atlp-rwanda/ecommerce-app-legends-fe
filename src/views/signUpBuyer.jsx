import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import CART from '../assets/CART.png';
import { URL } from './auths/Login';
import { login } from '../redux/reducers/user';

class FormField {
  constructor(placeholder, label, type) {
    this.placeholder = placeholder;
    this.label = label;
    this.type = type;
  }
}
function SignUpBuyer() {
  const navigate = useNavigate();
  const [signupButtonState, setsignupButtonState] = useState({
    display: 'hidden',
    text: `Sign Up`,
  });
  // redux for user the state
  const dispatch = useDispatch();

  const allFields = [
    new FormField('Enter first name', 'First name', 'text'),
    new FormField('Enter last name', 'Last name', 'text'),
    new FormField('Enter email', 'Email', 'email'),
    new FormField('Enter phone', 'Phone', 'tel'),
    new FormField('Enter password', 'Password', 'password'),
    new FormField('Confirm password', 'Confirm password', 'password'),
  ];
  const SignUp = async (event) => {
    event.preventDefault();
    const phoneNumberRegex = /[a-zA-Z]/;
    if (phoneNumberRegex.test(event.target[3].value) === true) {
      toast.error('incorrect phone number', { theme: 'colored' });
      event.target[3].focus();
      return;
    }
    if (event.target[4].value !== event.target[5].value) {
      event.target[5].focus();
      toast.error('confirm the correct password', { theme: 'colored' });
      return;
    }
    setsignupButtonState((prevState) => ({
      ...prevState,
      display: 'inline-block',
      text: 'Sign Up',
      disabled: true,
    }));
    const body = {
      firstname: event.target[0].value,
      lastname: event.target[1].value,
      email: event.target[2].value,
      phone: event.target[3].value,
    };
    await fetch(`${URL}/api/v1/register`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body, password: event.target[4].value }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'ok') {
          dispatch(login(body));
          toast.success(res.message, { theme: 'colored' });
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          toast.error(res.message, { theme: 'colored' });
        }
      })
      .catch((err) => {
        toast.error(err.message, { theme: 'colored' });
      });
    setsignupButtonState((prevState) => ({
      ...prevState,
      display: 'hidden',
      text: 'Sign Up',
      disabled: false,
    }));
  };

  return (
    <div className="bg-[#D9D9D9]  min-h-[100vh] pt-20 ">
      <div className="lg:w-full  w-[80em] h-[80em]  bg-[#011B32] fixed  -right-[35vw]   -top-[20em] rounded-[50%] overflow-hidden " />
      <div className=" flex flex-row-reverse justify-center mx-auto ">
        <img
          src={CART}
          alt="cart"
          className="lg:hidden grid backdrop-blur-3xl bg-[#D9D9D9] max-w-[30em] px-6 py-14 rounded-sm rounded-l-none shadow-2xl"
        />
        <div className=" lg:w-[95vw] min-w-[270px] max-w-[30em] w-[40vw] lg:px-4 px-6 h-fit py-10 pt-5 bg-[white] backdrop-blur-md rounded-md lg:rounded-r rounded-r-none shadow-2xl flex flex-col ">
          <h1 className="h-fit text-2xl  font-medium text-[#011B32]">
            Excellent shoppify experience
          </h1>
          <form onSubmit={SignUp}>
            {allFields.map(({ placeholder, label, type }) => {
              return (
                <div
                  key={placeholder}
                  className="relative  w-full min-w-[200px] mt-1 mb-6 h-[2em]"
                >
                  <label className=" text-[#2b2b2b] text-sm ">{label}</label>
                  <input
                    className="invalid:focus:border-red-400 valid:focus:border-green-400 h-full w-full rounded-[5px] border border-blue-gray-200 px-3 py-4 font-sans text-md font-extralight text-blue-gray-400 outline-none outline-[.2px] transition-all  placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:border-blue-500 focus:outline-0  "
                    placeholder={placeholder}
                    type={type}
                    required
                  />
                </div>
              );
            })}

            <button
              type="submit"
              className=" w-full mt-3 text-xl bg-[#011B32] py-1.5 text-white rounded-md active:bg-white active:text-[#011B32] active:border-[#011B32] active:border-2 "
              disabled={signupButtonState.disabled}
            >
              <span
                id="spin"
                className={`${signupButtonState.display} h-5 w-5 animate-spin rounded-full border-white border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mr-3`}
                role="status"
              />
              {signupButtonState.text}
            </button>

            <p className="mt-3 text-center">
              have an account
              <NavLink to="/login" className="text-blue-500 ml-2">
                Login
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpBuyer;
