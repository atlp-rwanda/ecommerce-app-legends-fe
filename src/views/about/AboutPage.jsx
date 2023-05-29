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
      <div className="flex flex-col min-h-screen">
        <section className="py-10 flex-grow">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-800 m-10 text-center">
              {t('aboutUs')}
            </h1>
            <div className="flex justify-between">
              <div className="w-1/3">
                <h1 className="text-2xl font-normal text-gray-800 mb-4 text-center">
                  {t('ourMission')}
                </h1>
                <p className="text-base text-gray-700 mb-8 mx-6 leading-7">
                  {t('ourMissionText')}
                </p>
              </div>
              <div className="w-1/3">
                <h1 className="text-2xl font-normal text-gray-800 mb-4 text-center">
                  {t('ourVision')}
                </h1>
                <p className="text-base text-gray-700 mb-8 mx-6 leading-7">
                  {t('ourVisionText')}
                </p>
              </div>
              <div className="w-1/3">
                <h1 className="text-2xl font-normal text-gray-800 mb-4 text-center">
                  {t('ourVision')}
                </h1>
                <p className="text-base text-gray-700 mb-8 mx-6 leading-7">
                  {t('ourVisionText2')}
                </p>
              </div>
            </div>
          </div>
        </section>
        <ChatButton />
        <Footer className="mt-auto py-3" />
      </div>
    </>
  );
};

export default AboutPage;
