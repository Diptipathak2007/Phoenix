import {redirect} from 'react-router-dom';
import {account} from '../../lib/appwrite';
const loginAction = async({request})=>{
    const formData = await request.formData();

    try {
        await account.createEmailPasswordSession(
            formData.get('email'),
            formData.get('password')
        );
        return redirect('/');//on successful login, redirect to home page
    } catch (err) {
        return {
            message: err.message,
        };
    }
}

export default loginAction;