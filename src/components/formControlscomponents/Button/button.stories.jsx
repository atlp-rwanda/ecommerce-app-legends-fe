/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import Button from './Button';
// eslint-disable-next-line storybook/story-exports
export default {
  title: 'button/OTP verifyButton',
  component: Button,
};
// eslint-disable-next-line react/function-component-definition
export const OTPverifyButton = () => {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Button
      className="w-full text-xl bg-darkBlueColor py-2 text-white font-semibold rounded-md mt-14"
      btnName="verify your OTP"
    />
  );
};
