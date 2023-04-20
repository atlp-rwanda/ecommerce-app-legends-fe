/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: { max: '480px' },
      md: { max: '768px' },
      lg: { max: '976px' },
      xl: { max: '1440px' },
    },
    extend: {
      colors: {
        primaryWhiteColor: '#FFFFFF',
        secondaryBlueColor: '#0E98C4',
        blackColor: '#000000',
        brightGrey: '#797777',
        darkGrey: '#D9D9D9',
      },
    },
  },
  plugins: [],
};
