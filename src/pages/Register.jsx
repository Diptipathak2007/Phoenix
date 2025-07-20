import React from 'react';
import PageTitle from '../components/PageTitle';
import { Link, Form } from 'react-router-dom';
import { logolight, logodark, banner } from '../assets/assets';
import TextField from '../components/TextField';
import { Button } from '../components/Button';

const Register = () => {
  return (
    <>
      <PageTitle title='Create an Account' />

      <div className='relative w-screen h-dvh p-4 grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] lg:gap-2'>
        <div className='flex flex-col p-4'>
          <Link
            to='/'
            className='max-w-max mx-auto lg:mx-0'
          >
            <img
              src={logolight}
              alt='Phoneix logo'
              width={133}
              height={24}
              className='dark:hidden'
            />
            <img
              src={logodark}
              alt='Phoneix logo'
              width={133}
              height={24}
              className='hidden dark:block'
            />
          </Link>
          <div className='flex flex-col gap-2 max-w-[480px] w-full mx-auto'>
            <h2 className='text-displaysmall font-semibold text-light-onBackground dark:text-dark-onBackground text-center'>Create an Account</h2>
            <p className='text-bodyLarge text-light-onSurfacVariant dark:text-dark-onSurfaceVariant mt-1 mb-5 text-center px-2'>
              Register today and gain access to powerful tools that will
              supercharge your productivity.
            </p>

            <Form
              method='POST'
              className='grid grid-cols-1 gap-4'
            >
              <TextField
                type='text'
                name='name'
                label='Full Name'
                placeholder='Full Name'
                required
                autoFocus
              />
              <TextField
                type='email'
                name='email'
                label='Email Address'
                placeholder='Email Address'
                required
              />
              <TextField
                type='password'
                name='password'
                label='Password'
                placeholder='Enter your Password'
                required
              />
              <Button type='submit'>Create Account</Button>
            </Form>

            <p className='mt-4 text-sm'>
              Already have an account?{' '}
              <Link
                to='/login'
                className='text-blue-600 hover:underline'
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className=''>
          <img
            src={banner}
            alt='Banner'
            className='w-full h-full object-cover rounded-lg'
          />
          <p className='absolute bottom-4 left-4 text-white text-lg bg-black bg-opacity-50 px-3 py-1 rounded'>
            Charge with Phoneix to supercharge your ideas
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
