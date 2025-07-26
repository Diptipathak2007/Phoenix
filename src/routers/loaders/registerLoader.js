import { redirect } from 'react-router-dom';
import { account } from '../../lib/appwrite';

const registerLoader = async ({  }) => {
    try {
        //attempt to retrieve the user's account information
        await account.get();
        
    } catch (err) {
        console.log(`Error fetching user: ${err.message}`);
        return null;
    }

    //if the user is authenticated, redirect to the home page
    return redirect('/');
}

export default registerLoader;