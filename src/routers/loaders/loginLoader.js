// src/routes/loaders/loginLoader.js
import { redirect } from 'react-router-dom';
import { account } from '../../lib/appwrite';

const loginLoader = async () => {
  try {
    const user = await account.get();
    // if session exists, go to home
    return redirect('/');
  } catch (err) {
    console.warn(`Unauthenticated: ${err.message}`);
    // Stay on login page
    return null;
  }
};

export default loginLoader;
