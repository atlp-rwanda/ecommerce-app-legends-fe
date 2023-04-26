import react from 'react';
import Button from './Button';
import '../../index.css';

export default {
  title: 'Button/colors',
  component: Button,
};

export function Primary() {
  return (
    <Button
      variant="px-6 bg-blue-400 rounded-md text-white font-bold py-2"
      child="primary"
      size="lg"
    >
      primary
    </Button>
  );
}

export function Secondary() {
  return (
    <Button
      variant="px-6 bg-blue-600 rounded-md text-white font-bold py-2"
      child="secondary"
    >
      secondary
    </Button>
  );
}

export function Success() {
  return (
    <Button
      variant="px-6 bg-green-800 rounded-md text-white font-bold py-2"
      child="success"
    >
      success
    </Button>
  );
}

export function Danger() {
  return (
    <Button
      variant="px-6 bg-red-400 rounded-md text-white font-bold py-2"
      child="danger"
    >
      danger
    </Button>
  );
}
