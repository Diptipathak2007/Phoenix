import React from 'react';
import PropTypes from 'prop-types';
import { Iconbtn } from './Button';
import Avatar from './Avatar.jsx';
import Menu from './Menu.jsx';
import MenuItem from './MenuItem.jsx';
import { LinearProgress } from './Progress.jsx';
import Logo from './Logo.jsx';
import deleteConversation from '../utils/deleteConversation.js';
import { AnimatePresence } from 'framer-motion';
import { useToggle } from '../hooks/useToggle.js';
import logout from '../utils/logout.js';
import {
  useNavigation,
  useNavigate,
  useLoaderData,
  useParams,
  useSubmit,
} from 'react-router-dom';

const TopAppBar = ({ toggleSidebar }) => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const params = useParams();
  const submit = useSubmit();
  const { conversations, user } = useLoaderData();

  const [showMenu, setShowMenu] = useToggle();
  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;

  const handleDelete = () => {
    const conversation = conversations?.documents?.find(
      (doc) => doc.$id === params.conversationId
    );
    const title = conversation?.title || 'Untitled Conversation';

    if (window.confirm('Are you sure you want to delete this chat?')) {
      deleteConversation({
        id: params.conversationId,
        title,
        submit,
      });
    }
  };

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

      {params.conversationId && (
        <Iconbtn
          icon='delete'
          classes='ms-auto me-1 lg:hidden'
          onClick={handleDelete}
        />
      )}

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
      <AnimatePresence>
        {isNormalLoad && (
          <LinearProgress classes='absolute top-full left-0 right-0 z-10' />
        )}
      </AnimatePresence>
    </header>
  );
};

TopAppBar.propTypes = {
  toggleSidebar: PropTypes.func,
};

export default TopAppBar;
