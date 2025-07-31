import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import React from 'react';
import Logo from './Logo';
import { ExtendedFab } from './Button';
import { Iconbtn } from './Button';

const Sidebar = () => {
  return (
    <>
      <div className='sidebar active'>
        <div className='sidebar-inner'>
          <div className=''>
            <Logo />
          </div>
          <ExtendedFab
            href='/'
            text='New chat'
            classes=''
          />
          <div className=''>
            <p className=''>Recent</p>

            <nav>
              <div className=''>
                <NavLink
                  to=''
                  className='nav-link'
                  title=''
                >
                  <span className='material-symbols-rounded icon-small'>
                    chat-bubble
                  </span>
                  <span className='truncate'>New conversation</span>
                  <div className='state-layer'></div>
                </NavLink>
                <Iconbtn
                  icon='delete'
                  size='small'
                  classes=''
                  title='Delete'
                />
              </div>
            </nav>
          </div>

          <div className=''>&copy; 2025codewithDipti</div>
        </div>
      </div>

      <div className={`overlay`}></div>
    </>
  );
};

export default Sidebar;
