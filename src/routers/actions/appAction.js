import { redirect } from "react-router-dom";
import { account, databases } from "../../lib/appwrite";
import { getConversationTitle, getAiResponse } from "../../api/googleAi";
import generateId from "../../utils/generateId";

// Handles creating a new conversation and its first message
const createConversationAction = async (formData) => {
  const userPrompt = formData.get("user_prompt");
  const user = await account.get();

  // Get AI-generated conversation title
  const conversationTitle = await getConversationTitle(userPrompt);

  let conversation = null;

  try {
    // Create conversation document in Appwrite
    conversation = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      generateId(),
      {
        title: conversationTitle,
        user_id: user.$id,
      }
    );
  } catch (error) {
    console.error(`Error creating conversation: ${error.message}`);
  }

  // Generate AI response
  const aiResponse = await getAiResponse(userPrompt);

  try {
    // Create first chat message linked to this conversation
    await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      "chats",
      generateId(),
      {
        user_prompt: userPrompt,
        ai_response: aiResponse,
        conversation: conversation.$id,
      }
    );
  } catch (err) {
    console.error(`Error creating the chat: ${err.message}`);
  }

  // Redirect to the conversation page
  return redirect(`/${conversation.$id}`);
};

// Handles deleting a conversation
const deleteConversationAction = async (formData) => {
  const conversationId = formData.get("conversation_id");
  const conversationTitle = formData.get("conversation_title");

  try {
    await databases.deleteDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      conversationId
    );
    return { conversationTitle };
  } catch (error) {
    console.error(`Error deleting the conversation: ${error.message}`);
  }
};

// Main action handler
const appAction = async ({ request }) => {
  const formData = await request.formData();
  const requestType = formData.get("request_type");

  if (requestType === "user_prompt") {
    return await createConversationAction(formData);
  }

  if (requestType === "delete_conversation") {
    return await deleteConversationAction(formData);
  }

  console.warn(`Unknown request_type: ${requestType}`);
  return null;
};

export default appAction;
