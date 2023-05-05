import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../i18n/i18n';

import {
  faAngleDoubleRight,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faGithub,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/logo.svg';

const FrontFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative  w-full  bg-denimBlue py-2 text-footerTextDim">
      <img className="rounded-t-lg w-20 h-16" src={logo} alt="" />
      <div className="flex md:flex-col flex-wrap w-3/4 justify-between mx-auto">
        <div className="flex-initial w-1/3 md:w-full">
          <h5 className="mb-2 text-xl font-bold pb-5 text-primaryWhiteColor">
            Legends E-commerce
          </h5>
          <div className="flex ">
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              className="text-primaryWhiteColor"
            />
            <p className="ml-5 hover:text-footerText">
              {t('footer_long_message')}
            </p>
          </div>
        </div>
        <div className="flex-initial w-1/6 text-center md:w-full">
          <h5 className="mb-2 text-xl font-bold  pb-5 text-primaryWhiteColor">
            Useful Links
          </h5>
          <div className="flex justify-between lg:flex-col">
            <ul>
              <li className="hover:text-footerText"> {t('home')} </li>
              <li className="hover:text-footerText"> {t('shop')} </li>
              <li className="hover:text-footerText"> {t('cart')} </li>
              <li className="hover:text-footerText"> {t('login')} </li>
            </ul>
            <ul>
              <li className="hover:text-footerText"> {t('about_us')} </li>
              <li className="hover:text-footerText"> {t('sign_up')} </li>
              <li className="hover:text-footerText"> {t('contact_us')} </li>
              <li className="hover:text-footerText"> {t('faq')} </li>
            </ul>
          </div>
        </div>
        <div className="flex-initial">
          <h5 className="mb-2 text-xl font-bold pb-5 text-primaryWhiteColor">
            {t('contacts')}
          </h5>
          <div>
            <ul>
              <li className="hover:text-footerText">
                <span>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-primaryWhiteColor"
                  />
                </span>{' '}
                legendsemail@gmail.com
              </li>
              <li className="hover:text-footerText">
                <span>
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-primaryWhiteColor"
                  />
                </span>{' '}
                078738748374 / 783653657563
              </li>
            </ul>
            <div className="pt-5" />
            <FontAwesomeIcon
              icon={faFacebook}
              className="pr-5 text-primaryWhiteColor"
            />
            <FontAwesomeIcon
              icon={faGithub}
              className="pr-5 text-primaryWhiteColor"
            />
            <FontAwesomeIcon
              icon={faTwitter}
              className="pr-5 text-primaryWhiteColor"
            />
          </div>
        </div>
      </div>
      <hr className="my-5 border-footerLine" />
      <div className="flex px-10 justify-between m-auto">
        <p>&copy; {t('footer_copyright')} </p>
        <img className="rounded-t-lg w-100 h-16" src="/paymethods.png" alt="" />
      </div>
    </footer>
  );
};

export default FrontFooter;
