

import { Link } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

// Import components
import CreateTicketForm from '../component2/userSection/CreateTicketForm';
import TicketStatusChecker from '../component2/userSection/TicketStatusChecker';

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="min-h-screen bg-gray-50">
     

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-10 mt-[50px] sm:px-6 lg:px-8 bg-gray-800">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('create')}
              className={`whitespace-nowrap py-4 px-1 border-b-5 text-white text-[16px] font-medium text-sm ${
                activeTab === 'create'
                  ? 'border-gray-700 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-400 cursor-pointer hover:border-gray-300'
              }`}
            >
              Create New Ticket
            </button>
            <button
              onClick={() => setActiveTab('check')}
              className={`whitespace-nowrap py-4 px-1 border-b-5 text-white text-[16px] font-medium text-sm ${
                activeTab === 'check'
                  ? 'border-gray-800 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-400 cursor-pointer hover:border-gray-300'
              }`}
            >
              Check Ticket Status
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className=" shadow rounded-lg p-6 bg-gradient-to-b bg-[url('https://images.pexels.com/photos/583848/pexels-photo-583848.jpeg')] bg-cover bg-center  w-full text-white flex items-center justify-center  ">
          {activeTab === 'create' ? (
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold mb-3 text-gray-800 bg-gray-200  px-6 py-3 rounded-lg shadow-sm">
                 Submit a New Support Ticket
              </h2>
              <p className="text-base text-green-700 mb-6 max-w-xl leading-relaxed">
                Fill out the form below to create a new support ticket. Our support team will get back to you as soon as possible.
              </p>
              <CreateTicketForm />
            </div>
          ) : (
            <div className='flex flex-col items-center'>
              <h2 className="text-xl text-black font-bold mb-4">Check Your Ticket Status</h2>
              <p className="text-orange-500 mb-6 font-bold">
                Enter your email address to view all your submitted tickets and their current status.
              </p>
              <TicketStatusChecker />
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-200 p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-2">How to Submit a Ticket</h3>
              <p className="text-sm text-gray-600">
                Provide detailed information about your issue and attach screenshots if possible.
              </p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-2">Response Time</h3>
              <p className="text-sm text-gray-600">
                We typically respond within 24 hours during business days.
              </p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-2">Contact Support</h3>
              <p className="text-sm text-gray-600">
                For urgent matters, call our support line at +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className=" border-t bg-gray-700 text-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-white ">
            &copy; {new Date().getFullYear()} Help Desk System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
