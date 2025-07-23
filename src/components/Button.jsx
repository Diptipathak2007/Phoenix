import PropTypes from "prop-types";
/*
Here by I am creating a common button component */
const Button = ({
  classes = '',
  variant = 'filled',
  color = 'primary',
  children,
  ...rest
}) => {
  return (
    <button
      className={`btn ${variant} ${color} flex justify-center items-center ${classes}`}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  classes: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.any,
};

export { Button };



