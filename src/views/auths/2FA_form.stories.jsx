/* eslint-disable react/function-component-definition */
/* eslint-disable prettier/prettier */
import TwoFaForm from './2FaForm';

// eslint-disable-next-line storybook/story-exports
export default {
  title: 'form/two-FA-form',
  component: TwoFaForm,
};
export const twoFaForm = () => {
  return <TwoFaForm />;
};