/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Navbar';
import Footer from '../../components/FrontFooter';
import { PsswdUpdate } from '../../redux/reducers/updatePassword';
import '../../i18n/i18n';
import Loading from '../../components/Loading';

const PasswordUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.UpdatePassword);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingPassword, setLoadingPassword] = useState(false);
  useEffect(() => {
    if (status === 'succeeded') {
      setLoadingPassword(false);
      window.location.reload(navigate('/'));
    } else if (status === 'failed') {
      setLoadingPassword(false);
    }
  }, [status]);

  const { t } = useTranslation();
  if (status === 'loading') {
    return <Loading />;
  }
  const handlePasswords = () => {
    if (oldPassword !== '' && newPassword !== '' && confirmPassword !== '') {
      if (newPassword !== confirmPassword) {
        toast.warning('Passwords do not match');
      } else {
        const data = {
          xpassword: oldPassword,
          npassword: newPassword,
        };
        setLoadingPassword(true);
        dispatch(PsswdUpdate(data));
      }
    } else if (oldPassword === '') {
      toast.warning('Fill the old password');
    } else {
      toast.warning('Fill in the new password');
    }
  };

  return (
    <div className="relative">
      <header className="mb-14">
        <Navbar />
      </header>

      <div className="bg-bgCheckout text-center ">
        <h1 className="text-3xl font-bold py-12 text-checkoutMoner ">
          {t('passwordUpdatePassword')}
        </h1>
      </div>
      <div className="bg-whiteColor shadow-lg mb-28">
        <div className="flex w-10/12 mx-auto justify-between my-10">
          <div className="w-5/12">
            <h1 className="text-lg">{t('passwordOldPassword')}:</h1>
            <input
              type="password"
              className="text-xl bg-gray-50 border border-gray-300 text-gray-900  pl-4 rounded-lg mb-8 block w-full p-1 "
              placeholder="old password"
              onChange={(event) => setOldPassword(event.target.value)}
            />
            <h1 className="text-lg ">{t('passwordNewPassword')}:</h1>
            <input
              type="password"
              className="text-xl bg-gray-50 border border-gray-300 text-gray-900  pl-4 rounded-lg  block w-full p-1 "
              placeholder="new password"
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <h1 className="text-lg">{t('passwordConfirmPassword')}:</h1>
            <input
              type="password"
              className="text-xl bg-gray-50 border border-gray-300 text-gray-900  pl-4 rounded-lg  block w-full p-1 "
              placeholder="confirm password"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <button
              type="submit"
              onClick={() => handlePasswords()}
              className="bg-denimBlue hover:bg-black shadow-md p-1 rounded text-xl font-bold text-whiteColor mt-10 mb-16  w-full"
            >
              <span>{t('passwordUpdate')}</span>
              {loadingPassword ? (
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-2 pl-3 inline text-gray-200 animate-spin dark:text-gray-600 fill-denimBlue"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                ''
              )}
            </button>
          </div>
          <div className="w-6/12">
            <h1 className="text-center text-lg font-bold">
              {t('passwordUlT')}:
            </h1>
            <hr />
            <ul className="mt-10 py-3 ml-10 list-disc">
              <li>{t('passwordUlTa')}</li>
              <li>{t('passwordUlTb')}</li>
              <li>{t('passwordUlTc')}</li>
              <li>{t('passwordUlTd')}</li>
              <li>{t('passwordUlTe')}</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PasswordUpdate;
