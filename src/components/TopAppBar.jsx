// src/components/TopAppBar.jsx
import React from 'react';
import { Iconbtn } from './Button';
import {
  useNavigation,
  useNavigate,
  useLoaderData
} from 'react-router-dom';

import Avatar from './Avatar.jsx';
import Menu from './Menu.jsx';
import MenuItem from './MenuItem.jsx';
import { LinearProgress } from './Progress.jsx';
import { AnimatePresence } from 'framer-motion';
import { useToggle } from '../hooks/useToggle.js';
import logout from '../utils/logout.js';
import Logo from './Logo.jsx';

const TopAppBar = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const user = useLoaderData();

  const [showMenu, setShowMenu] = useToggle();

  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;

  return (
    <header className="relative flex justify-between items-center h-16 px-4">
      <div className="flex items-center gap-1">
        <Iconbtn icon="menu" title="Menu" classes="lg:hidden" />
        <Logo classes="lg:hidden" />
      </div>

      <div className="menu-wrapper">
        <Iconbtn onClick={setShowMenu}>
          <Avatar name={user?.name} userId={user?.$id} />
        </Iconbtn>

        <Menu classes={showMenu ? 'active' : ''}>
          <MenuItem labelText="Log out" onClick={() => logout(navigate)} />
        </Menu>
      </div>

      <AnimatePresence>
        {isNormalLoad && <LinearProgress />}
      </AnimatePresence>
    </header>
  );
};

export default TopAppBar;
