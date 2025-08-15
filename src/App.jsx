import React, { useEffect, useRef } from 'react';
import PageTitle from './components/PageTitle';
import TopAppBar from './components/TopAppBar';
import { useToggle } from './hooks/useToggle';
import { useSnackbar } from './hooks/useSnackbar';
import Sidebar from './components/Sidebar';
import Greetings from './pages/Greetings';
import { motion } from 'framer-motion';
import PromptField from './components/PromptField';
import { Outlet, useParams, useNavigation, useActionData } from 'react-router-dom';
import { userPromptPreloader } from './hooks/usePromptPreloader';

const App = () => {
  const chatHistoryRef = useRef();

  // Router hooks
  const params = useParams();
  const navigation = useNavigation();
  const actionData = useActionData();

  // Snackbar
  const { showSnackbar } = useSnackbar();
  const [isSidebarOpen, toggleSidebar] = useToggle();

  // Correct hook usage
  const { promptPreloaderValue } = userPromptPreloader();

  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;

  // Auto-scroll effect when prompt changes or conversation changes
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTo({
        top: chatHistoryRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [promptPreloaderValue, params.conversationId]);

  // Snackbar for deletion
  useEffect(() => {
    if (actionData?.conversationTitle) {
      showSnackbar({
        message: `Deleted ${actionData.conversationTitle} conversation`,
      });
    }
  }, [actionData, showSnackbar]);

  return (
    <>
      <PageTitle title="Phoenix-chat to supercharge your ideas" />

      <div className="lg:grid lg:grid-cols-[320px,1fr]">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <div className="h-dvh grid grid-rows-[max-content,minmax(0,1fr),max-content]">
          <TopAppBar toggleSidebar={toggleSidebar} />

          {/* Chat area */}
          <div
            ref={chatHistoryRef}
            className="px-5 pb-5 flex flex-col overflow-y-auto"
          >
            <div className="max-w-[840px] w-full mx-auto grow">
              {isNormalLoad ? null : params.conversationId ? (
                <Outlet />
              ) : (
                <Greetings />
              )}
            </div>
          </div>

          {/* Prompt field */}
          <div className="bg-light-background dark:bg-dark-background">
            <div className="max-w-[870px] px-5 w-full mx-auto">
              <PromptField />
              <motion.p
                initial={{ opacity: 0, translateY: '-4px' }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.2, delay: 0.8, ease: 'easeOut' }}
                className="text-bodySmall text-center text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant p-3"
              >
                Phoenix may display inaccurate info, including about people, so
                kindly double-check its responses.
                <a
                  href="https://support.google.com/gemini?p=privacy-notice"
                  target="_blank"
                  rel="noreferrer"
                  className="inline underline ms-1"
                >
                  Your Privacy & Gemini apps
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
