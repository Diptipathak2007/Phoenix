import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logodark,logolight } from '../assets/assets';
import React from 'react';

const Logo = ({classes=''}) => {
  return (
    <Link
      to='/'
      className={`min-w-max max-w-max h-[24px]${classes}`}
    >
      <img
        src={logolight}
        width={133}
        height={24}
        alt='Phoenix logo'
        className='dark:hidden '
      />
      <img
        src={logodark}
        width={133}
        height={24}
        alt='Phoenix logo'
        className='hidden dark:block'
      />
    </Link>
  );
};

Logo.propTypes = {
  classes: PropTypes.string,
};

export default Logo;
