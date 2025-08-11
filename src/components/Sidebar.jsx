import PropTypes from 'prop-types';
import { NavLink,useLoaderData } from 'react-router-dom';
import React, { use } from 'react';
import Logo from './Logo';
import { ExtendedFab } from './Button';
import { Iconbtn } from './Button';
import {motion} from 'framer-motion';


const Sidebar = ({isSidebarOpen,toggleSidebar}) => {
  //Extract conversations from loader data if it exists
  const { conversation } = useLoaderData() || {};
  const conversationData = conversation?.documents || [];
  

  return (
    <>
      <motion.div 
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:0.2,ease:'easeOut'}}
      className={`sidebar ${isSidebarOpen?'active':''}`}>
        <div className='sidebar-inner'>
          <div className='h-16 grid items-center px-4 mb-4'>
            <Logo />
          </div>
          <ExtendedFab
            href='/'
            text='New chat'
            classes=''
            onClick={toggleSidebar}
          />
          <div className='overflow-y-auto -me-2 pe-1'>
            <p className='text-titleSmall h-9 grid items-center px-4 '>
              Recent
            </p>

            <nav>
              {conversationData.map((item)=>(
                <div 
                key={item.$id} 
                className='relative group'>
                
                <NavLink
                  to={item.$id}
                  className='nav-link'
                  title={item.title}
                  onClick={toggleSidebar}
                >
                  <span className='material-symbols-rounded icon-small'>
                    chat-bubble
                  </span>
                  <span className='truncate'>{item.title}</span>
                  <div className='state-layer'></div>
                </NavLink>
                <Iconbtn
                  icon='delete'
                  size='small'
                  classes='absolute top-1/2 right-1.5 -translate-y-1/2 z-10 opacity-0 group:hover:opacity-100 group-focus-within:opacity-100 hidden lg:grid'
                  title='Delete'
                />
              </div>
              ))}
              
            </nav>
          </div>

          <div
            className='mt-4 h-14 px-4 grid items-center text-labelLarge
           text-light-onSurfaceVariant
            dark:text-dark-onSurfaceVariant 
            border-t
             border-dark-surfaceContainerHigh 
             dark:border-dark-surfacecContainerHigh 
             truncate'
          >
            &copy; 2025codewithDipti
          </div>
        </div>
      </motion.div>

      <div className={`overlay ${isSidebarOpen?'active':''}`} onClick={toggleSidebar}></div>
    </>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func,
};

export default Sidebar;
