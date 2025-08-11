import { redirect } from 'react-router-dom';
import { account, databases } from '../../lib/appwrite';

const conversationLoader = async ({ params }) => {
  const { conversationId } = params;
  
  try {
    // 1. Get current user
    const user = await account.get();
    
    // 2. Get conversation document
    const conversation = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      conversationId
    );

    // 3. Verify conversation exists and has title
    if (!conversation || !conversation.title) {
      throw new Error('Conversation not found or missing title');
    }

    // 4. Return properly structured data
    return {
      user,
      conversation: {
        id: conversation.$id,
        title: conversation.title,
        chats: conversation.chats || [],
        // Include other needed fields
      }
    };

  } catch (err) {
    console.error(`Loader Error: ${err.message}`);
    
    // Handle unauthorized users
    if (err.code === 401) {
      return redirect('/login');
    }
    
    // Handle missing conversations
    if (err.message.includes('not found')) {
      return redirect('/');
    }
    
    // Rethrow other errors
    throw err;
  }
};

export default conversationLoader;