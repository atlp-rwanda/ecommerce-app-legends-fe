/* eslint-disable react/function-component-definition */
/* eslint-disable prettier/prettier */
import OTPinput from './OtpInputt';
import '../../../index.css';

// eslint-disable-next-line storybook/story-exports
export default {
  title: 'inputs/OTPInput',
  component: OTPinput,
};
export const OTPInput = () => {
  return (
    <OTPinput styling="m-2 border border-darkBlueColor h-10 w-10 text-center form-control rounded placeholder-gray-400 focus:placeholder-gray-200 number-ring" />
  );
};
