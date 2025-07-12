import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('https://support-ticket-system-backend-06na.onrender.com/api/tickets');
        setTickets(response.data.data);
      } catch (err) {
        setError('Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const filteredTickets = filter === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === filter);

  const updateTicketStatus = async (id, status) => {
    try {
      await axios.patch(`https://support-ticket-system-backend-06na.onrender.com/api/tickets/${id}/status`, { status });
      setTickets(tickets.map(ticket => 
        ticket._id === id ? { ...ticket, status } : ticket
      ));
    } catch (err) {
      setError('Failed to update ticket status');
    }
  };

  if (loading) return <div className="text-center text-green-900 mt-28 text-[25px] py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto mt-16  p-6">
      <h1 className="text-3xl font-bold text-center mt-3 drop-shadow-2xl text-gray-800 mb-6">Admin Dashboard</h1>
      
      <div className="mb-6 flex items-center cursor-pointer justify-center space-x-2">
        <button
          className={`px-4 py-2 rounded bg-gray-500 font-bold text-white cursor-pointer ${filter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('all')}
        >
          All Tickets
        </button>
        <button
          className={`px-4 py-2 rounded bg-gray-500 font-bold text-white cursor-pointer ${filter === 'open' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('open')}
        >
          Open
        </button>
        <button
          className={`px-4 py-2 rounded bg-gray-500 font-bold text-white cursor-pointer ${filter === 'resolved' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('resolved')}
        >
          Resolved
        </button>
        <button
          className={`px-4 py-2 rounded bg-gray-500 font-bold text-white cursor-pointer ${filter === 'closed' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('closed')}
        >
          Closed
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Ticket ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Issue</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Created</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredTickets.map((ticket) => (
              <tr key={ticket._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">#{ticket._id.slice(-6)}</td>
                <td className="py-3 px-4">{ticket.name}</td>
                <td className="py-3 px-4 max-w-xs truncate">{ticket.issue.substring(0, 50)}...</td>
                <td className="py-3 px-4">
                  <select
                    className={`px-2 py-1 rounded text-sm ${
                      ticket.status === 'open' ? 'bg-green-100 text-green-800' :
                      ticket.status === 'resolved' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                    value={ticket.status}
                    onChange={(e) => updateTicketStatus(ticket._id, e.target.value)}
                  >
                    <option value="open">Open</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-sm">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <Link
                    to={`/admin/${ticket._id}`}
                     state={{ tickets }}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTickets.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tickets found with this filter.
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;