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
        whiteColor: '#FFFFFF',
        darkBlueColor: '#011B32',
        darkGrey: '#D9D9D9',
        lightGrey: '#F9FAFB',
        imageBgColor: '#DFDFE1',
        lightYellow: '#CBA008',
      },
    },
  },
  plugins: [],
};
