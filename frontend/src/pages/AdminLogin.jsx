import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import admin from '../component2/adminSection/AdminDashboard'
import { useAdmin } from '../Context/adminContext'



const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { setIsAdmin } = useAdmin();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/adminLogin', formData);

    if (res.data.success) {
      setError('');
      setSuccess('Login successful');
      setIsAdmin(true);
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin');
    }else{
      setError("invalid credentials");
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed');
    setSuccess('');
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-600 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-5">
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-800 hover:cursor-pointer hover:rounded-2xl transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
