/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: { max: '480px' },
      md: { max: '768px' },
      lg: { max: '976px', min: '769px' },
      xl: { max: '1440px' },
    },
    extend: {
      colors: {
        whiteColor: '#FFFFFF',
        darkBlueColor: '#011B32',
        darkGrey: '#D9D9D9',
        lightGrey: '#F9FAFB',
        imageBgColor: '#DFDFE1',
        lightYellow: '#FF800C',
        denimBlue: '#011b32',
        footerText: '#E7E7E7',
        footerTextDim: '#979797',
        footerLine: '#3E3838',
        cardContainer: '#EBEBF1',
        vendorCard: '#ECECEC',
        bgCheckout: '#FOFOFO',
        checkoutMoner: '#3D3D3D',
      },
    },
  },
  plugins: [],
};
