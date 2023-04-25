import react from "react";
import Button from "./Button";
import '../../index.css'

export default {
  title: "Button/colors",
  component: Button,
};

export const Primary = () => (
  <Button variant="px-6 bg-blue-400 rounded-md text-white font-bold py-2" child="primary" size='lg'>
    primary
  </Button>
);

export const Secondary = () => (
  <Button
    variant="px-6 bg-blue-600 rounded-md text-white font-bold py-2"
    child="secondary"
  >
    secondary
  </Button>
);

export const Success = () => (
  <Button
    variant="px-6 bg-green-800 rounded-md text-white font-bold py-2"
    child="success"
  >
    success
  </Button>
);

export const Danger = () => (
  <Button
    variant="px-6 bg-red-400 rounded-md text-white font-bold py-2"
    child="danger"
  >
    danger
  </Button>
);
