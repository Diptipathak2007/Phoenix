import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/*
  Common Button Component
  Supports variant, color, and custom classes
*/
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

// Icon Button Component
const Iconbtn = ({ classes = '', icon, size = '', children, ...rest }) => {
  return (
    <button
      className={`icon-btn ${size} ${classes}`}
      {...rest}
    >
      {children}
      {!children && (
        <span className='material-symbols-rounded icon'>{icon}</span>
      )}
      <div className='state-layer'></div>
    </button>
  );
};

Iconbtn.propTypes = {
  classes: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.any,
};

const ExtendedFab = ({ href, text, classes = '', ...rest }) => {
  return (
    <Link
      to={href}
      className={`extended-fab ${classes}`}
      {...rest}
    >
      <span className='material-symbols-rounded'>add</span>
      <span className='truncate'>{text}</span>
      <div className='state-layer'></div>
    </Link>
  );
};

ExtendedFab.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
  classes: PropTypes.string,
}

export { Button, Iconbtn, ExtendedFab };
