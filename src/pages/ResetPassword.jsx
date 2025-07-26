import React from 'react';
import PageTitle from '../components/PageTitle';
import { Link } from 'react-router-dom';
import { logolight, logodark, banner } from '../assets/assets';
import TextField from '../components/TextField';
import { Button } from '../components/Button';
import { Form } from 'react-router-dom';
import { useNavigation,useActionData } from 'react-router-dom';
import { CircularProgress,LinearProgress } from '../components/Progress';
import { useEffect } from 'react';
import { useSnackbar } from '../hooks/useSnackbar';
import { AnimatePresence } from 'framer-motion';

const ResetPassword = () => {
  const error=useActionData();
  const {showSnackbar} = useSnackbar();
  useEffect(()=>{
    if(error?.message){
      showSnackbar({
        message: error.message,
        type: 'error',
        timeOut: 500000000,
       
      });
    }
  },[error,showSnackbar])//show the snackbar with the provided error
  
  const navigation = useNavigation();
  console.log(navigation.state);
  return (
    <>
      <PageTitle title='New Password' />

      <div className='relative w-screen h-dvh p-4 grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] lg:gap-2'>
        <div className='flex flex-col p-4'>
          <Link
            to='/'
            className='max-w-max mb-auto mx-auto lg:mx-0'
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
            <h2 className='text-displaysmall font-semibold text-light-onBackground dark:text-dark-onBackground text-center'>
              Set a new Password
            </h2>
            <p className='text-bodyLarge text-light-onSurfacVariant dark:text-dark-onSurfaceVariant mt-1 mb-5 text-center px-2'>
                Please choose a password that has&apos;nt been user before.Must be at least 8 characters long
            </p>

            <Form
              method='POST'
              className='grid grid-cols-1 gap-4'
            >
              
              
              <TextField
                type='password'
                name='password'
                label='Password'
                placeholder='New Password'
                required={true}
                autofocus={true}
              />

              
              <Button 
              type='submit'
              diabled={navigation.state === 'submitting'}
              >
                
                {navigation.state === 'submitting'
                  ? (<CircularProgress size="small"/>)
                  : 'Reset Password'}
              </Button>
            </Form>

            
          </div>
          <p className='mt-auto mx-auto text-light-onSurface dark:text-dark-onSurface text-bodyMedium lg:mx-0'>
            &copy;2025 codewithDipti. All rights reserved
          </p>
        </div>

        <div className='hidden img-box lg:block lg:relative lg:rounded-large lg:overflow-hidden'>
          <img
            src={banner}
            alt=''
            className='w-full h-full object-cover rounded-lg'
          />
          <p className='absolute bottom-10 left-12 right-12 z-10 text-displayLarge font-semibold leading-tight text-right text-light-onSurface drop-shadow-sm 2xl:text[72px]'>
            Charge with Phoneix to supercharge your ideas
          </p>
        </div>
      </div>
      <AnimatePresence>
      {navigation.state === "loading"&&(
        <LinearProgress classes='absolute top-0 left-0 right-0' />
      )}
      </AnimatePresence>

      
    </>
  );
};

export default ResetPassword;
