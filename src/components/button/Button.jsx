
const Button = ({variant, child}) => {
    return (
      <button className={variant}>
          {child}
    </button>
  )
}

export default Button