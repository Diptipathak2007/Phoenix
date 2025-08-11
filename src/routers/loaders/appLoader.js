// src/routes/loaders/appLoader.js
import { redirect } from 'react-router-dom';
import { account, databases } from '../../lib/appwrite';
import { Query } from 'appwrite';

const appLoader = async () => {
  const data = {};

  // ✅ Get logged-in user
  try {
    data.user = await account.get();
  } catch (err) {
    console.log(`Error getting user session: ${err.message}`);
    return redirect('/login');
  }

  // ✅ Get conversations
  try {
    data.conversation = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      [
        Query.select(['$id','title']),
        Query.orderDesc('$createdAt'),
        Query.equal('user_id',data.user.$id),
      ],
    );
    
  } catch (error) {
    console.log(`Error getting conversations: ${error.message}`);
  }

  return data; // returns { user, conversation }
};

export default appLoader;
