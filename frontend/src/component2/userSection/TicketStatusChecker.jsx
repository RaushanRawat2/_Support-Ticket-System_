/*
import { useState } from 'react';
import axios from 'axios';

const TicketStatusChecker = () => {
  const [email, setEmail] = useState('');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`https://support-ticket-system-backend-06na.onrender.com/api/tickets?email=${email}`);
      setTickets(response.data.data);
    } catch (err) {
      setError('Failed to fetch tickets. Please try again.');
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Check Your Tickets</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex">
          <input
            className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {tickets.length > 0 ? (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg mb-1">Ticket #{ticket._id.slice(-6)}</h3>
              <p><strong>Name:</strong> {ticket.name}</p>
              <p><strong>Email:</strong> {ticket.email}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                  ticket.status === 'open' ? 'bg-green-100 text-green-800' :
                  ticket.status === 'resolved' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {ticket.status}
                </span>
              </p>
              <p className="mt-2"><strong>Issue:</strong></p>
              <p className="text-gray-700 whitespace-pre-line">{ticket.issue}</p>

              {ticket.screenshot && (
                <div className="mt-2">
                  <p><strong>Screenshot:</strong></p>
                  <a 
                    href={ticket.screenshot} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Screenshot
                  </a>
                </div>
              )}

              <div className="mt-2">
                <a 
                  href={`/ticket/${ticket._id}`} 
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-500">No tickets found for this email.</p>
      )}
    </div>
  );
};

export default TicketStatusChecker;
*/


import { useState } from 'react';
import axios from 'axios';
import React from 'react';

const TicketStatusChecker = () => {
  const [email, setEmail] = useState('');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`https://support-ticket-system-backend-06na.onrender.com/api/tickets?email=${email}`);
      setTickets(response.data.data);
    } catch (err) {
      setError('Failed to fetch tickets. Please try again.');
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl bg-gray-300 mx-auto  p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🎫 Check Your Tickets</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 ">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            className="shadow border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 bg-gray-100"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="bg-gray-700 hover:bg-gray-900 hover:rounded-2xl text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 focus:outline-none cursor-pointer shadow-md disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
          {error}
        </div>
      )}

      {tickets.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Ticket #{ticket._id.slice(-6)}</h3>
              <p className="text-sm text-gray-500 mb-2">Submitted by <span className="font-medium text-gray-700">{ticket.name}</span> ({ticket.email})</p>
              
              <div className="mb-3">
                <span className="text-sm text-gray-800 font-medium">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                  ticket.status === 'open' ? 'bg-green-100 text-green-700' :
                  ticket.status === 'resolved' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {ticket.status}
                </span>
              </div>

              <p className="text-sm text-gray-700 whitespace-pre-line"><strong>Issue:</strong><br />{ticket.issue}</p>

              {ticket.screenshot && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700">Screenshot:</p>
                  <a
                    href={ticket.screenshot}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    View Screenshot
                  </a>
                </div>
              )}

              <div className="mt-4 text-right">
                <a
                  href={`/ticket/${ticket._id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Full Details →
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-500 text-center">No tickets found for this email.</p>
      )}
    </div>
  );
};

export default TicketStatusChecker;
