import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Navbar';
import Footer from '../../components/FrontFooter';
import ChatButton from '../../components/ChatButton';

const Section = ({ titleKey, textKey }) => {
  const { t } = useTranslation();

  return (
    <div className="w-1/3">
      <h1 className="text-3xl font-normal text-gray-800 mb-4 text-center">
        {t(titleKey)}
      </h1>
      <p className="text-lg text-gray-700 mb-8 mx-4">{t(textKey)}</p>
    </div>
  );
};

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <header className="mb-14">
        <Navbar />
      </header>

      <div className="bg-bgCheckout text-center ">
        <h1 className="text-3xl font-bold py-12 text-checkoutMoner ">
          {t('aboutUs')}
        </h1>
      </div>
      <div className="bg-whiteColor shadow-lg mb-28">
        <div className="flex justify-between w-10/12 mx-auto my-20 pb-16">
          <Section titleKey="ourMission" textKey="ourMissionText" />
          <Section titleKey="ourVision" textKey="ourVisionText" />
          <Section titleKey="ourVision" textKey="ourVisionText2" />
        </div>
        <ChatButton />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
