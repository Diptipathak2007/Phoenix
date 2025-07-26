import { redirect } from 'react-router-dom';
import { account } from '../../lib/appwrite';

const resetPasswordLoader = async ({request}) => {
    const url = new URL(request.url);
    try {
        //attempt to retrieve the user's account information
        await account.get();
        return redirect('/');
        
    } catch (err) {
        console.log(`Error fetching user: ${err.message}`);
        
    }
    if(!url.searchParams.get('userId') || !url.searchParams.get('secret')) {
        return redirect('/reset-link');
    }
    return null;

    
}

export default resetPasswordLoader;