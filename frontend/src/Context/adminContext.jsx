


import React, { createContext, useState, useContext } from 'react';

// Create context
const AdminContext = createContext();

// Create provider
export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

// Create custom hook for easy use
export const useAdmin = () => useContext(AdminContext);
