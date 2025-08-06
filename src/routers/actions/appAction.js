import { account,databases } from "../../lib/appwrite"
import { getConversationTitle } from "../../api/googleAi";
import generateid from "../../utils/generateId";

const userPromptAction=async(formData)=>{
   const userPrompt=formData.get('user_prompt')
   const user=await account.get();
   const conversationTitle=await getConversationTitle(userPrompt);
   let conversation=null;
   try {
    //creates a new conversation document in the appwrite database
    conversation= await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        
        generateid(),
        {
            title: conversationTitle,
            user_id: user.$id,
            
        }

    )
   } catch (error) {
        console.log(`Error in userPromptAction: ${error.message}`);
   }

   //get a conversation title based on the user prompt

   return null
}

const appAction=async({request})=>{
    const formData=await request.formData();
    const requestType=formData.get('request_type')

    if(requestType==='user_prompt'){
        return await userPromptAction(formData);
    }
}

export default appAction;