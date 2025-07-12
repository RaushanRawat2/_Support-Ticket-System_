



import { useState } from 'react';
import axios from 'axios';
import React from 'react';

const CreateTicketForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issue: '',
    screenshot: null
  });
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // NEW STATE

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      screenshot: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('issue', formData.issue);
      if (formData.screenshot) {
        data.append('screenshot', formData.screenshot);
      }

      const res = await axios.post('https://support-ticket-system-backend-06na.onrender.com/api/tickets', data);
      setSubmittedData(res.data);
      setSubmitted(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit ticket');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  if (submitted && submittedData) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <p className="font-bold">Ticket submitted successfully! We'll get back to you soon.</p>
        </div>
        <h3 className="text-lg font-semibold mb-2">Submitted Details:</h3>
        <ul className="text-gray-800 space-y-1">
          <li><strong>Name:</strong> {submittedData.name}</li>
          <li><strong>Email:</strong> {submittedData.email}</li>
          <li><strong>Issue:</strong> {submittedData.issue}</li>
          {submittedData.screenshot && (
            <li>
              <strong>Screenshot:</strong>{' '}
              <a href={submittedData.screenshot} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                View Screenshot
              </a>
            </li>
          )}
          <li><strong>Status:</strong> {submittedData.status || 'Pending'}</li>
          <li><strong>Ticket ID:</strong> {submittedData._id}</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gray-500 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Ticket</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm text-gray-900 text-[20px] font-bold mb-2">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none bg-gray-200 focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-900 text-[20px] text-sm font-bold mb-2">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="issue" className="block text-gray-900 text-[20px] text-sm font-bold mb-2">Issue Description</label>
          <textarea
            id="issue"
            name="issue"
            rows="4"
            placeholder="Describe your issue in detail"
            value={formData.issue}
            onChange={handleChange}
            required
            className="shadow border bg-gray-200 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="screenshot" className="block text-gray-900 text-sm text-[20px] font-bold mb-2">Screenshot (Optional)</label>
          <input
            id="screenshot"
            name="screenshot"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-900 curser-pointer hover:rounded-2xl'
          } text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline`}
        >
          {isLoading ? 'Submitting...' : 'Submit Ticket'}
        </button>
      </form>
    </div>
  );
};

export default CreateTicketForm;
