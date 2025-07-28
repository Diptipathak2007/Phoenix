import PageTitle from './components/PageTitle';
import React from 'react';
import TopAppBar from './components/TopAppBar';

const App = () => {
  return (
    <>
      <PageTitle title='Phoneix-chat to supercharge your ideas' />
      
      <div className=''>
        {/*sidebar*/}
        <div className=''>
          {/*top app bar*/}
          <TopAppBar/>

          {/* main content */}
          <div className=''>

          </div>
          {/* prompt field */}
          <div className="">
            <p className=''>
              Phoneix may display inaccurate info,including about people,so kindly double-check its responses.
              <a 
              href="https://support.google.com/gemini?p=privacy-notice"
              target='_blank'
              className=''>
              Your Privacy&gemini apps
              </a>
            </p>

          </div>
        </div>
      </div>

    </>
  );
};

export default App;
