import { databases } from "../../lib/appwrite";
import { getAiResponse } from "../../api/googleAi";

const conversationAction = async ({ request, params }) => {
  const { conversationId } = params;
  const formData = await request.formData();
  const userPrompt = formData.get("user_prompt"); // fixed

  let chatHistory = [];
  let aiResponse = '';

  // Get existing chats
  try {
    const document = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      conversationId
    );

    chatHistory = document.chats || [];

  } catch (err) {
    console.log(`Error getting chat: ${err.message}`);
  }

  // Get AI response
  try {
    aiResponse = await getAiResponse(userPrompt, chatHistory);
  } catch (err) {
    console.log(`Error getting AI response: ${err.message}`);
  }

  // Append new chat and update conversation
  try {
    chatHistory.push({
      user_prompt: userPrompt,
      ai_response: aiResponse
    });

    await databases.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      conversationId,
      { chats: chatHistory }
    );

  } catch (err) {
    console.log(`Error updating chat: ${err.message}`);
  }

  return null;
};

export default conversationAction;
