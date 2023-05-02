import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import OTPinput from '../../components/formControlscomponents/2FAinput/OtpInputt';
// eslint-disable-next-line import/no-unresolved
import Button from '../../components/formControlscomponents/Button/Button';
import { URL } from './Login';
// eslint-disable-next-line react/function-component-definition
const TwoFaForm = () => {
  const [otpFields, setOtpfileds] = useState(['', '', '', '', '', '']);
  const [activeField, setActiveField] = useState(0);
  const [verifyButton, setverifyButton] = useState({
    display: 'hidden',
    text: `verify OTP`,
  });
  const inputRef = useRef(null);
  const navigate = useNavigate();
  //  handle change input field changing events
  const handleChange = (e, index) => {
    const { value } = e.target;
    const newOTP = [...otpFields];
    newOTP[index] = value.substring(value.length - 1);
    setOtpfileds(newOTP);
    // checking whether there is a value in field
    if (!value) setActiveField(index - 1);
    else setActiveField(index + 1);
  };
  //  handle focus every time input needed to the next field
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeField]);
  // handle submition of OTP for verification
  const handleVerify = async () => {
    // eslint-disable-next-line no-alert
    setverifyButton({
      display: 'inline-block',
      text: `Loading...`,
    });
    const inputCodes = otpFields.join('');
    await fetch(`${URL}/api/vendor/verify`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ verificationCode: inputCodes }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          toast.success('here you are vendor!', { theme: 'colored' });
          localStorage.setItem('token', JSON.stringify(data.token));
          navigate('/vendor-dashboard');
        } else if (inputCodes.length !== 6) {
          toast.error('All digits must be completed ', { theme: 'colored' });
        } else {
          toast.error(data.message, { theme: 'colored' });
        }
      })
      .catch((err) => {
        toast.error(err.message, { theme: 'colored' });
      });
    setverifyButton({
      display: 'hidden',
      text: `verify OTP`,
    });
  };
  return (
    <div className="bg-darkGrey h-[100vh] m-0 p-0 flex items-center justify-center w-full overflow-hidden relative">
      {/* <ToastContainer theme="colored" /> */}
      <div className="md:w-full md:rounded-none sm:w-3/3 w-2/3 h-[110vh] bg-darkBlueColor absolute right-[-20%] md:right-0 rounded-full rounded-r overflow-hidden" />
      <div className="px-8 pt-[10vh] -mt-10 bg-whiteColor w-2/4 h-[50vh] md:h-3/4 backdrop-blur-md flex flex-col items-center rounded-md shadow-2xl md:w-[90%] md:rounded-r sm:px-2 sm:w-[98%] md:px-10">
        <h1 className="h-fit text-2xl font-semibold mb-2 text-center capitalize font-light">
          welcome back, vendor!
        </h1>
        <span className="text-md text-center capitalize font-thin">
          verify your OTP to get in.
        </span>
        <div className="flex flex-row justify-around mt-10">
          {otpFields.map((_, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={index}>
                <OTPinput
                  className="m-2 border border-darkBlueColor h-10 w-10 text-center form-control rounded placeholder-gray-400 focus:placeholder-gray-200 number-ring"
                  handleChange={handleChange}
                  index={index}
                  inputRef={inputRef}
                  active={activeField}
                  value={otpFields}
                />
              </React.Fragment>
            );
          })}
        </div>
        <Button
          className="w-3/4 text-md bg-darkBlueColor py-2 text-white font-sans rounded-sm mt-14 uppercase text-sm hover:opacity-50"
          btnName={verifyButton.text}
          display={verifyButton.display}
          handleSend={handleVerify}
        />
      </div>
    </div>
  );
};
export default TwoFaForm;
