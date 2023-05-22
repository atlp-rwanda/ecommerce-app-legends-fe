import React from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from '../../components/Navbar';
import Footer from '../../components/FrontFooter';
import ChatButton from '../../components/ChatButton';

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <NavBar />
      <div>
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-800 m-10 text-center">
              {t('aboutUs')}
            </h1>
            <p className="text-gray-700 mb-8 mx-[10vw]">{t('aboutUsText')}</p>
            <h1 className="text-2xl font-normal text-gray-800 mb-4 text-center">
              {t('ourMission')}
            </h1>
            <p className="text-gray-700 mb-8 mx-[10vw]">
              {t('ourMissionText')}
            </p>
            <p className="text-gray-700 mb-8 mx-[10vw]">
              <h1 className="text-2xl font-normal text-gray-800 mb-4 text-center">
                {t('ourVision')}
              </h1>
              {t('ourVisionText')}
            </p>
            <p className="text-gray-700 mb-8 mx-[10vw]">
              {t('ourVisionText2')}
            </p>
          </div>
        </section>
        <ChatButton />
      </div>
      <Footer />
    </>
  );
};
export default AboutPage;
