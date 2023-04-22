import react from 'react';
import Button from './Button';
import '../../index.css';

export default {
  title: 'Button/sizes',
  component: Button,
};

export const small = () => (
  <Button
    variant="px-4 bg-blue-400 rounded-md text-white font-bold"
    child="small"
  >
    small
  </Button>
);

export const medium = () => (
  <Button
    variant="px-6 bg-blue-400 rounded-md text-white font-bold py-2"
    child="medium"
  >
    medium
  </Button>
);

export const large = () => (
  <Button
    variant="px-10 bg-blue-400 rounded-2xl text-white font-bold py-2"
    child="large"
  >
    large
  </Button>
);
