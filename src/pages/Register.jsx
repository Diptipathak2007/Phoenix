import React from 'react';
import PageTitle from '../components/PageTitle';
import { Link, Form } from 'react-router-dom';
import { logolight, logodark } from '../assets/assets';
import TextField from '../components/TextField';

const Register = () => {
  return (
    <>
      <PageTitle title='Create an Account' />
      <div className=''>
        <Link>
          <img
            src={logolight}
            alt='Phoneix logo'
            width={133}
            height={24}
            className=''
          />

          <img
            src={logodark}
            alt='Phoneix logo'
            width={133}
            height={24}
            className=''
          />
        </Link>
        <div className=''>
          <h2 className=''>Create an Account</h2>
          <p className=''>
            Register today and gain access to Powerful tools that will
            supercharge your productivity.
          </p>
          <Form
            method='POST'
            className=''
          >
            <TextField
              type='text'
              name='name'
              label='Full Name'
              placeholder='Full Name'
              required={true}
              autofocus={true}
            />
            <TextField
              type='email'
              name='email'
              label='Email Address'
              placeholder='Email Address'
              required={true}/>
            <TextField
              type='password'
              name='password'
              label='Password'
              placeholder='Enter your Password'
              required={true}/>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;