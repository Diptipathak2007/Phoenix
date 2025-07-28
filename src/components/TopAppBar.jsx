import React from 'react';
import { Iconbtn } from './Button';
import { Link,useNavigation } from 'react-router-dom';
import {logolight,logodark} from '../assets/assets.js';
import Avatar from './Avatar.jsx';
import Menu from './Menu.jsx';
import MenuItem from './MenuItem.jsx';
import {LinearProgress} from './Progress.jsx';
const TopAppBar = () => {

    const navigation = useNavigation();
    const isNormalLoad=navigation.state ==='loading'&&!navigation.formData
  return (
    <header className=''>
      <div className=''>
        <Iconbtn
          icon='menu'
          size='large'
        />
        <Link
          to='/'
          className=''
        >
          <img
            src={logolight}
            width={133}
            height={24}
            alt='Phoneix logo'
            className='dark:hidden '

          />
          <img
            src={logodark}
            width={133}
            height={24}
            alt='Phoneix logo'
            className='hidden dark:block'

          />
        </Link>
      </div>
      <div className="menu-wrapper">
        <Icon-btn>
           <Avatar name='CodewithDipti'/>
        </Icon-btn>

        <Menu>
          <MenuItem labelText='Log out'/>
        </Menu>
      </div>
    </header>
  );
};

export default TopAppBar;
