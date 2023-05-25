import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Button from '../../components/formControlscomponents/Button/Button';
import FormInput from '../../components/formControlscomponents/formInput/FormInput';
import { URL } from '../auths/Login';
import ChatButton from '../../components/ChatButton';

const UserProfile = () => {
  const { t } = useTranslation();
  const { user, token } = useSelector((state) => state.currentUser);
  const { firstname, lastname, adress, phone, dateofbirth } = user;
  // const [isLoading, setIsLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    firstName: firstname,
    lastName: lastname,
    address: adress,
    phone,
    dateOfBirth: dateofbirth,
  });
  const [isClicked, setIsClicked] = useState(false);
  const [saveButton, setSaveButton] = useState({
    display: 'hidden',
    text: t('save'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);
    setSaveButton({
      display: 'inline-block',
      text: t('loading'),
    });

    await fetch(`${URL}/api/v1/users`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        phone: formValue.phone,
        firstname: formValue.firstName,
        lastname: formValue.lastName,
        adress: formValue.address,
        dateofbirth: formValue.dateOfBirth,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role === 'vendor') {
          toast.success(data.message, { theme: 'colored' });
        } else if (data.status === 'success') {
          toast.success(data.message, { theme: 'colored' });
        } else {
          toast.error(data.message, { theme: 'colored' });
        }
      })
      .catch((err) => {
        toast.error(err.message, { theme: 'colored' });
      });
    setIsClicked(false);
    setSaveButton({
      display: 'hidden',
      text: t('save'),
    });
  };

  const hundleOnChanges = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <div className="py-8">
      <div className="container px-12 flex items-center justify-center md:h-[90vh] text-neutral-800 font-medium mt-[6rem] lg:mt-[8rem]  md:px-8 sm:px-4 flex-grow">
        <div className=" rounded-lg  shadow-lg p-6 w-[60vw] md:w-[80vw] sm:w-[99vw] sm:p-3">
          <h2 className="font-semibold text-xl mb-3 md:text-l sm:mb-1 text-center capitalize sm:text-left">
            {t('profileTitle')}
          </h2>
          <h4 className="mb-3 text-xl md:text-l sm:mb-1 text-center font-light sm:text-left">
            {t('profileSubTitle')}
          </h4>
          <form className="my-[1%]" onSubmit={handleSubmit}>
            <div className="w-full flex flex-row justify-between sm:flex-col mb-4 sm:mb-2">
              <div className="relative   w-[46%] min-w-[200px] mb-10 h-10 sm:w-full sm:h-8">
                <div className="mb-0.5">
                  <label
                    htmlFor="firstName"
                    className="before:content[' '] after:content[' '] pointer-events-none sm:text-sm font-thin"
                  >
                    {t('firstName')}
                  </label>
                </div>
                <FormInput
                  id="firstName"
                  name="firstName"
                  className="peer bg-lightGrey invalid:focus:border-red-400 valid:focus:border-green-400 h-full w-full rounded-[7px] border mt-2 px-3 py-3.5 sm:py-3 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder:font-thin placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:outline-0 disabled:border-0 disabled:shadow-sm"
                  placeholder={t('firstNamePlaceholder')}
                  type="text"
                  value={formValue.firstName}
                  onChange={(e) => hundleOnChanges(e)}
                />
              </div>
              {/* second div */}
              <div className="relative  w-[46%] min-w-[200px] mb-10 h-10 sm:w-full sm:h-8">
                <div className="mb-0.5">
                  <label
                    htmlFor="lastName"
                    className="before:content[' '] after:content[' '] pointer-events-none sm:text-sm font-thin"
                  >
                    {t('lastName')}
                  </label>
                </div>
                <FormInput
                  id="lastName"
                  name="lastName"
                  className="peer bg-lightGrey invalid:focus:border-red-400 valid:focus:border-green-400 h-full w-full rounded-[7px] border mt-2 px-3 py-3.5 sm:py-3 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder:font-thin placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:outline-0 disabled:border-0 disabled:shadow-sm"
                  placeholder={t('lastNamePlaceholder')}
                  type="text"
                  value={formValue.lastName}
                  onChange={(e) => hundleOnChanges(e)}
                />
              </div>
            </div>
            <div className="w-full flex flex-row justify-between sm:flex-col mb-4 sm:mb-2">
              <div className="relative  w-[46%] min-w-[200px] mb-10 h-10 sm:w-full sm:h-8">
                <div className="mb-0.5">
                  <label
                    htmlFor="phone"
                    className="before:content[' '] after:content[' '] pointer-events-none sm:text-sm font-thin"
                  >
                    {t('phoneLabel')}
                  </label>
                </div>
                <FormInput
                  id="phone"
                  name="phone"
                  className="peer bg-lightGrey invalid:focus:border-red-400 valid:focus:border-green-400 h-full w-full rounded-[7px] border mt-2 px-3 py-3.5 sm:py-3 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder:font-thin placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:outline-0 disabled:border-0 disabled:shadow-sm"
                  placeholder={t('phonePlaceholder')}
                  type="text"
                  value={formValue.phone}
                  onChange={(e) => hundleOnChanges(e)}
                />
              </div>
              <div className="relative  w-[46%] min-w-[200px] mb-10 h-10 sm:w-full sm:h-8">
                <NavLink
                  to="/passwordUpdate"
                  className="my-6  md:my-6 md:ml-2 md:mr-0 md:text-center bg-transparent text-denimBlue font-semibold py-2 px-4 border border-denimBlue  rounded "
                >
                  Update Password
                </NavLink>
              </div>
            </div>
            {/* third div */}
            <div className="w-full flex flex-row justify-between sm:flex-col mb-4 sm:mb-2">
              <div className="relative  w-[46%] min-w-[200px] mb-10 h-10 sm:w-full sm:h-8">
                <div className="mb-0.5">
                  <label
                    htmlFor="address"
                    className="before:content[' '] after:content[' '] pointer-events-none sm:text-sm font-thin"
                  >
                    {t('addressLabel')}
                  </label>
                </div>
                <FormInput
                  id="address"
                  name="address"
                  className="peer bg-lightGrey invalid:focus:border-red-400 valid:focus:border-green-400 h-full w-full rounded-[7px] border mt-2 px-3 py-3.5 sm:py-3 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder:font-thin placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:outline-0 disabled:border-0 disabled:shadow-sm"
                  placeholder={t('phonePlaceholder')}
                  type="text"
                  value={formValue.address}
                  onChange={(e) => hundleOnChanges(e)}
                />
              </div>
              <div className="relative  w-[46%] min-w-[200px] mb-10 h-10 sm:w-full sm:h-8">
                <div className="mb-0.5">
                  <label
                    htmlFor="dob"
                    className="before:content[' '] after:content[' '] pointer-events-none sm:text-sm font-thin"
                  >
                    {t('dobLabel')}
                  </label>
                </div>
                <FormInput
                  id="dob"
                  name="dob"
                  className="peer bg-lightGrey invalid:focus:border-red-400 valid:focus:border-green-400 h-full w-full rounded-[7px] border mt-2 px-3 py-3.5 sm:py-3 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder:font-thin placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:outline-0 disabled:border-0 disabled:shadow-sm"
                  placeholder={t('passwordPlaceholder')}
                  type="date"
                  value={formValue.dob}
                  onChange={(e) => hundleOnChanges(e)}
                />
              </div>
            </div>
            {/* fourth div */}
            <div className="w-full flex flex-row ">
              <div className="relative  w-[46%] min-w-[200px] h-10 sm:w-full">
                <Button
                  type="submit"
                  isClicked={isClicked}
                  className="w-full text-xl bg-darkBlueColor py-2 sm:py-1.5 text-white font-semibold rounded-md sm:h-8 sm:text-sm "
                  btnName={saveButton.text}
                  display={saveButton.display}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <ChatButton />
    </div>
  );
};
export default UserProfile;
