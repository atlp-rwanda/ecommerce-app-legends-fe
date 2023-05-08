function Image(props) {
  return (
    <img
      width={props}
      alt={props.alt}
      src={props.src}
      className={props.className}
    />
  );
}

export default Image;
