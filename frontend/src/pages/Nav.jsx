import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../Context/adminContext';

const Nav = () => {
  const { isAdmin } = useAdmin();

  return (
    <div className='fixed top-0 w-full '>
      {/* Header */}
      <header className="bg-white bg-gradient-to-t from-gray-900 to-gray-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="text-2xl text-gray-200 hover:text-gray-400 font-bold">
            Help Desk Portal
          </Link>

          {/*  Only show Admin Login when isAdmin is false */}
          {!isAdmin && (
            <Link
              to="/login"
              className="text-black text-sm font-medium bg-blue-50 py-2 px-2 rounded hover:bg-blue-50 hover:text-gray-900 hover:rounded-2xl"
            >
              Admin Login
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default Nav;
