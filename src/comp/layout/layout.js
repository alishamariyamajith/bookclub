import React from 'react';
import Navbar from '../nav/nav';
import './layout.css';  // Create this file

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;