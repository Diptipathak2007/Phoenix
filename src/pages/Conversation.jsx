import { useLoaderData } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { motion } from "framer-motion"; // ✅ Correct import
import UserPrompt from "../components/UserPrompt";
import AiResponse from "../components/AiResponse";

const Conversation = () => {
    const { conversation } = useLoaderData();
    const title = conversation?.title || "New Conversation";
    const chats = conversation?.chats || []; // ✅ Defined

    return (
        <>
            <PageTitle title={`${title} | Phoenix`} />
            <motion.div>
                {chats.map((chat, index) => (
                    <div key={chat.$id}>
                        <UserPrompt text={chat.user_prompt}/>
                        <AiResponse aiResponse={chat.ai_response}/>
                    </div>
                ))}
            </motion.div>
        </>
    );
};

export default Conversation;
