import { useLoaderData,useLocation } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { motion } from 'framer-motion'; // ✅ Correct import
import UserPrompt from '../components/UserPrompt';
import AiResponse from '../components/AiResponse';
import PromptPreloader from '../components/PromptPreloader';
import { userPromptPreloader } from '../hooks/usePromptPreloader';

const Conversation = () => {
  const { conversation } = useLoaderData();
  const { promptPreloaderValue } = userPromptPreloader();
  const location=useLocation()
  const title = conversation?.title || 'New Conversation';
  const chats = conversation?.chats || []; // ✅ Defined

  return (
    <>
      <PageTitle title={`${title} | Phoenix`} />
      <motion.div
        className='max-w-[700px] mx-auto !will-change-auto'
        initial={!location.state?._isRedirect&&{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.05, ease: 'easeOut' }}
      >
        {chats.map((chat, index) => (
          <div key={chat.$id}>
            <UserPrompt text={chat.user_prompt} />
            <AiResponse aiResponse={chat.ai_response} />
          </div>
        ))}
      </motion.div>
      {promptPreloaderValue && (
        <PromptPreloader promptValue={promptPreloaderValue} />
      )}
    </>
  );
};

export default Conversation;
