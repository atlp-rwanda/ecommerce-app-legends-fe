function Button({ variant, child }) {
  return (
    <button type="button" className={variant}>
      {child}
    </button>
  );
}

export default Button;
