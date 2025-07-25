import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
const NotFound: React.FC = () => {
  return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 inline-flex items-center">
          <HomeIcon size={20} className="mr-2" />
          Return to Homepage
        </Link>
      </div>
    </div>;
};
export default NotFound;