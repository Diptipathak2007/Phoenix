import { databases } from "../../lib/appwrite";
import { getAiResponse } from "../../api/googleAi";
import generateId from "../../utils/generateId";

const conversationAction = async ({ request, params }) => {
  const { conversationId } = params;
  const formData = await request.formData();
  const userPrompt = formData.get("user_prompt");

  let aiResponse = '';

  // Get AI response
  try {
    // We don't strictly need chat history for the response if we want to save bandwidth, 
    // but ideally we should fetch it. For now, let's pass an empty array or fetch it if needed.
    // The original code fetched it. Let's fetch it to maintain context if possible, 
    // but to avoid the previous error, let's just pass [] for now or fetch it correctly.
    // If we fetch it, we should use it for context.
    // Let's fetch the conversation to get the history for context, but NOT for updating.
    
    let chatHistory = [];
    try {
        const document = await databases.getDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            conversationId
        );
        chatHistory = document.chats || [];
    } catch (err) {
        console.log(`Error getting chat context: ${err.message}`);
    }

    aiResponse = await getAiResponse(userPrompt, chatHistory) || "I'm sorry, I couldn't generate a response at this time.";
  } catch (err) {
    console.log(`Error getting AI response: ${err.message}`);
    aiResponse = "I'm sorry, I couldn't generate a response at this time.";
  }

  // Create new chat document
  try {
    await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      "chats",
      generateId(),
      {
        user_prompt: userPrompt,
        ai_response: aiResponse,
        conversations: conversationId,
      }
    );
  } catch (err) {
    console.log(`Error creating chat: ${err.message}`);
  }

  return null;
};

export default conversationAction;
