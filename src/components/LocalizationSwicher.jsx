import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from './Image';
import FrLog from '../assets/flags/fr.svg';
import EngLog from '../assets/flags/eng.svg';
import { setLanguage } from '../redux/reducers/languageSlice';
import i18n from '../i18n/i18n';

const LocalizationSwicher = () => {
  const languages = [
    { name: 'En', code: 'en', flag: EngLog },
    { name: 'Fr', code: 'fr', flag: FrLog },
  ];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.language.lang);
  const handleLanguageSelect = (lan) => {
    // setCurrentLanguage(lan);
    setIsDropdownOpen(false);
    dispatch(setLanguage(lan));
    i18n.changeLanguage(lan.code);
  };

  return (
    <div className="relative z-50 text-neutral-600 hover:text-neutral-900 ">
      <button
        type="button"
        className="flex items-center justify-between h-auto px-2 py-1 md:h-fit md:px-1 md:py-0 border border-gray-200 rounded-full cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Image
          width="1"
          className="w-4 md:w-fit m-2 md:m-0 md-p-0 md:hidden rounded-lg shadow-xl sm:shadow-none md:shadow-xl lg:shadow-xl xl:shadow-xl 2xl:shadow-xl -mx-2 sm:mx-0 md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 "
          src={currentLanguage.flag}
        />

        <span className="mr-2 md:text-[12px]">{currentLanguage.name}</span>
        <svg
          className={`fill-current h-4 w-4 md:w-2 md:h-2 transition-transform duration-200 transform ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 15.333l-5.333-10L15.333 5l-5.333 10z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isDropdownOpen && (
        <ul className="absolute text-base w-full top-full left-0 right-0 bg-white border border-gray-200 rounded-b-md shadow-md z-[9999] ">
          {languages.map((lan) => (
            <button
              type="button"
              key={lan.code}
              className="flex items-center w-full px-3 py-2 text-base cursor-pointer hover:bg-gray-200"
              onClick={() => handleLanguageSelect(lan)}
            >
              <Image className="h-5 w-4 mr-2 sm:hidden" src={lan.flag} />
              <span className="md:text-[12px] text-[14px]">{lan.name}</span>
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocalizationSwicher;
