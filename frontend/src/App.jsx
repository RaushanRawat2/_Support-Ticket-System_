import {   Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import CreateTicketForm from './component2/userSection/CreateTicketForm';
import Home from './pages/HomePage'
import AdminDashboard from './component2/adminSection/AdminDashboard';
import { Link } from 'react-router-dom';
/*import TicketStatusChecker from './components/user/TicketStatusChecker';
import TicketDetail from './components/user/TicketDetail';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminTicketDetail from './components/admin/AdminTicketDetail';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Login from './components/common/Login';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
*/

import AdminTicketDetail from './component2/adminSection/AdminTicketDetail';
import Nav from './pages/Nav'
import AdminlLogin from './pages/AdminLogin'
import TicketDetail from './component2/userSection/TicketDetail';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="bg-gradient-to-b from-gray-300">
      <Nav/>
      <Routes>
      
        {/* Public Routes */}
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/admin/:id" element={<AdminTicketDetail />} />
        <Route path="/admin/adminTicketdetail" element={<AdminTicketDetail/>} />
        <Route path="/login" element={<AdminlLogin/>}/>
        <Route path="/ticket/:id" element={<TicketDetail/>}/>
    </Routes>
    </div>
  );
}

export default App;