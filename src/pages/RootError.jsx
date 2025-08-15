import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

const RouteError = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light-background dark:bg-dark-background text-center p-6">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 max-w-md w-full border border-green-400">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🚧 Page Not Found
        </h1>

        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          {error?.status || 'Error'}
        </p>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {error?.statusText || error?.message || 'The page you are looking for does not exist.'}
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default RouteError;
