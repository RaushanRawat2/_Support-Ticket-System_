import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminTicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('open');

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`https://support-ticket-system-backend-6g7z.onrender.com/api/tickets/${id}`);
        setTicket(response.data.data);
        setStatus(response.data.data.status);
      } catch (err) {
        setError('Failed to fetch ticket details');
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.patch(`https://support-ticket-system-backend-6g7z.onrender.com/api/tickets/${id}/status`, { status: newStatus });
      setStatus(newStatus);
      setTicket({ ...ticket, status: newStatus });
    } catch (err) {
      setError('Failed to update ticket status');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    try {
      await axios.post(`https://support-ticket-system-backend-6g7z.onrender.com/api/tickets/${id}/reply`, {
        sender: 'support',
        message
      });
      // Refresh the ticket to show the new message
      const response = await axios.get(`https://support-ticket-system-backend-6g7z.onrender.com/api/tickets/${id}`);
      setTicket(response.data.data);
      setMessage('');
    } catch (err) {
      setError('Failed to send reply');
    }
  };

  if (loading) return <div className="text-center mt-32 text-green-800 text-[27px] py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!ticket) return <div className="text-center py-8">Ticket not found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-gray-400 p-6 mt-18 rounded-lg shadow-md">
      <button
        onClick={() => navigate('/admin')}
        className="mb-4 text-white hover:text-gray-700 text-[20px] cursor-pointer"
      >
        &larr; Back to Dashboard
      </button>

      <div className="mb-6 cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl  font-bold">Ticket #{ticket._id.slice(-6)}</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm ">
              Created: {new Date(ticket.createdAt).toLocaleString()}
            </span>
            <select
              className={`px-3 py-1 rounded text-sm font-semibold ${
                status === 'open' ? 'bg-green-100 text-green-800' :
                status === 'resolved' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="open">Open</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-semibold ">Customer:</h3>
            <p>{ticket.name}</p>
            <p className="text-blue-600">{ticket.email}</p>
          </div>
          <div>
            <h3 className="font-semibold ">Issue:</h3>
            <p className="whitespace-pre-wrap">{ticket.issue}</p>
          </div>
        </div>

        {ticket.screenshot && (
          <div className="mb-4">
            <h3 className="font-semibold">Screenshot:</h3>
            <img 
              src={ticket.screenshot} 
              alt="Ticket screenshot" 
              className="max-w-full h-auto rounded border"
            />
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <h3 className="text-xl font-bold mb-4 ">Conversation</h3>
        <div className="space-y-4 mb-6">
          {ticket.conversation.map((msg, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg max-w-3/4 ${
                msg.sender === 'user' 
                  ? 'bg-blue-50 mr-auto' 
                  : 'bg-gray-100 ml-auto'
              }`}
            >
              <div className="font-semibold text-sm mb-1">
                {msg.sender === 'user' ? ticket.name : 'You'}
              </div>
              <p className="whitespace-pre-wrap">{msg.message}</p>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(msg.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-300 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              placeholder="Type your reply..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              className="bg-gray-700 hover:bg-gray-900 hover:rounded-2xl text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              type="submit"
            >
              Send Reply
            </button>
            <button
              type="button"
              className="bg-gray-700 hover:bg-gray-900 hover:rounded-2xl text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              onClick={() => handleStatusChange('resolved')}
              disabled={status === 'resolved' || status === 'closed'}
            >
              Mark as Resolved
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminTicketDetail;
