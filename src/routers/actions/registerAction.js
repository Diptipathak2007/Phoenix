import {account} from '../../lib/appwrite';
import generateId from '../../utils/generateId';
import {redirect } from 'react-router-dom';

const registerAction = async ({ request }) => {
    const formData = await request.formData();
    try{
      await account.create(
        generateId(),//creates a unique user ID
        formData.get('email'),
        formData.get('password'),
        formData.get('name')
      );
    }catch (err) {
        return{
            message: err.message,
        }
    }

    try{
      await account.createEmailPasswordSession(
        formData.get('email'),
        formData.get('password'),
      )
    }catch(err) {
       console.log(`Error creating session: ${err.message}`);
       return redirect('/login')
       
    }
    console.log("Redirecting to homepage...");
    return redirect('/');
}

export default registerAction;