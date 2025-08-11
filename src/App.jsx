import PageTitle from './components/PageTitle';
import React from 'react';
import TopAppBar from './components/TopAppBar';
import { useToggle } from './hooks/useToggle';
import Sidebar from './components/Sidebar';
import Greetings from './pages/Greetings';
import { motion } from 'framer-motion';
import PromptField from './components/PromptField';
import { Outlet, useParams } from 'react-router-dom';
const App = () => {
  //Get the url parameters
  const params = useParams();

  const [isSidebarOpen, toggleSidebar] = useToggle();
  return (
    <>
      <PageTitle title='Phoenix-chat to supercharge your ideas' />

      <div className='lg:grid lg:grid-cols-[320px,1fr] '>
        {/*sidebar*/}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* main content */}
        <div className='h-dvh grid grid-rows-[max-content,minmax(0,1fr),max-content]'>
          {/*top app bar*/}
          <TopAppBar toggleSidebar={toggleSidebar} />

          {/* Greetings */}
          <div className='px-5 pb-5 flex flex-col overflow-y-auto '>
            <div className='max-w-[840px] w-full mx-auto grow'>
              {params.conversationId ? <Outlet /> : <Greetings />}
            </div>
          </div>
          {/* prompt field */}
          <div className='bg-light-background dark:bg-dark-background'>
            <div className='max-w-[870px] px-5 w-full mx-auto '>
              <PromptField />
              <motion.p
                initial={{ opacity: 0, translateY: '-4px' }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.2, delay: '0.8', ease: 'easeOut' }}
                className='text-bodySmall text-center text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant p-3'
              >
                Phoenix may display inaccurate info,including about people,so
                kindly double-check its responses.
                <a
                  href='https://support.google.com/gemini?p=privacy-notice'
                  target='_blank'
                  className='inline underline ms-1 '
                >
                  Your Privacy&gemini apps
                </a>
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
