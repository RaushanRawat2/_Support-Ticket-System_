import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`https://support-ticket-system-backend-6g7z.onrender.com/api/tickets/${id}`);
        setTicket(response.data.data);
      } catch (err) {
        setError('Failed to fetch ticket details');
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    try {
      await axios.post(`https://support-ticket-system-backend-6g7z.onrender.com/api/tickets/${id}/reply`, {
        sender: 'user',
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

  if (loading) return <div className="text-center text-green-900 mt-32 text[27px] py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!ticket) return <div className="text-center py-8">Ticket not found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-gray-400 p-6 mt-18 rounded-lg  shadow-gray-500">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Ticket #{ticket._id.slice(-6)}</h2>
        <div className="flex items-center space-x-4 mb-4">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${
            ticket.status === 'open' ? 'bg-green-100 text-green-800' :
            ticket.status === 'resolved' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {ticket.status}
          </span>
          <span className="text-sm text-gray-900">
            Created: {new Date(ticket.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Issue:</h3>
          <p className="whitespace-pre-wrap">{ticket.issue}</p>
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
        <h3 className="text-xl font-bold mb-4">Conversation</h3>
        <div className="space-y-4 mb-6">
          {ticket.conversation.map((msg, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg max-w-3/4 ${
                msg.sender === 'user' 
                  ? 'bg-blue-50 ml-auto' 
                  : 'bg-gray-100 mr-auto'
              }`}
            >
              <div className="font-semibold text-sm mb-1">
                {msg.sender === 'user' ? 'You' : 'Support Team'}
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              placeholder="Type your reply..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send Reply
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketDetail;
