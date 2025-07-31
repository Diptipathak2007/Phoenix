// src/routes/loaders/appLoader.js
import { redirect } from 'react-router-dom';
import { account } from '../../lib/appwrite';

const appLoader = async () => {
  try {
    const user = await account.get();
    return user; // Pass this to useLoaderData() in TopAppBar etc.
  } catch (err) {
    return redirect('/login');
  }
};

export default appLoader;
