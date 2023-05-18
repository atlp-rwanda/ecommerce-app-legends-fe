import React from 'react';
import NavBar from '../../components/Navbar';
import Footer from '../../components/FrontFooter';

const AboutPage = () => {
  return (
    <>
      <NavBar />
      <div>
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-800 m-10 text-center">
              About Us
            </h1>
            <p className="text-gray-700 mb-8 mx-[10vw]">
              At ALTP Ecommerce, we believe in providing a platform that enables
              anyone to sell their products easily. Whether you are an
              individual with unique handmade items or a business looking to
              expand your online presence, we have got you covered.
            </p>
            <h1 className="text-2xl font-normal text-gray-800 mb-4 text-center">
              Our mission
            </h1>
            <p className="text-gray-700 mb-8 mx-[10vw]">
              Our mission is to connect buyers and sellers from all around the
              world, fostering a vibrant and diverse online marketplace. We
              prioritize user experience, security, and transparency, ensuring a
              seamless and trustworthy shopping experience for all.
            </p>
            <p className="text-gray-700 mb-8 mx-[10vw]">
              <h1 className="text-2xl font-normal text-gray-800 mb-4 text-center">
                what you can benefit from us
              </h1>
              With ALTP Ecommerce, you can set up your own online store, manage
              your inventory, and reach a wider audience without the
              complexities of building a website from scratch. We provide a
              user-friendly interface, powerful tools, and robust backend
              infrastructure to support your entrepreneurial journey.
            </p>
            <p className="text-gray-700 mb-8 mx-[10vw]">
              Join our community of sellers today and start monetizing your
              products. Whether itis fashion, electronics, art, or any other
              category, ALTP Ecommerce is the platform for you. We are excited
              to have you on board!
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
export default AboutPage;
