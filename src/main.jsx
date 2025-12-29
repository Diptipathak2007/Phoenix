import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import router from './routers/routes.jsx';
import { CircularProgress } from './components/Progress';
import SnackbarProvider from './contexts/SnackbarContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider>
      <RouterProvider router={router} fallbackElement={<div className="h-dvh w-screen grid place-items-center"><CircularProgress /></div>} />
    </SnackbarProvider>
  </StrictMode>,
);
