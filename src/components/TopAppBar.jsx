// src/components/TopAppBar.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Iconbtn } from './Button';
import Avatar from './Avatar.jsx';
import Menu from './Menu.jsx';
import MenuItem from './MenuItem.jsx';
import { LinearProgress } from './Progress.jsx';
import Logo from './Logo.jsx';

import { AnimatePresence } from 'framer-motion';
import { useToggle } from '../hooks/useToggle.js';
import logout from '../utils/logout.js';

import { useNavigation, useNavigate, useLoaderData } from 'react-router-dom';

const TopAppBar = ({ toggleSidebar }) => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const user = useLoaderData(); // Ensure your route has a loader

  const [showMenu, setShowMenu] = useToggle();

  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;

  return (
    <header className='relative flex justify-between items-center h-16 px-4 text-white shadow-md z-10'>
      {/* Left Section: Menu & Logo */}
      <div className='flex items-center gap-2'>
        <Iconbtn
          icon='menu'
          title='Menu'
          classes='lg:hidden'
          onClick={toggleSidebar}
        />
        <Logo classes='hidden sm:block' />
      </div>

      {/* Right Section: Avatar & Menu */}
      <div className='relative'>
        <Iconbtn onClick={setShowMenu}>
          <Avatar
            name={user?.name || 'User'}
            userId={user?.$id || '000'}
          />
        </Iconbtn>

        <Menu classes={showMenu ? 'active' : ''}>
          <MenuItem
            labelText='Log out'
            onClick={() => logout(navigate)}
          />
        </Menu>
      </div>

      {/* Top Loader */}
      <AnimatePresence>{isNormalLoad && <LinearProgress />}</AnimatePresence>
    </header>
  );
};

TopAppBar.propTypes = {
  toggleSidebar: PropTypes.func
};

export default TopAppBar;
