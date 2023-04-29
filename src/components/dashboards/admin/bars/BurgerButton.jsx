import { FaBars, FaTimes } from 'react-icons/fa';

function BurgerButton({ isOpen, setIsOpen }) {
  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      {isOpen ? (
        <FaTimes onClick={toggleButton} />
      ) : (
        <FaBars onClick={toggleButton} />
      )}
    </div>
  );
}

export default BurgerButton;
