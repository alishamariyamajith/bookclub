import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context.js';
import './index.css';
import Home from './pages/Home/Home';
import MainHome from './MainHomeComp/frontend/js/MainHome';
import About from "./pages/About/About";
import BookList from "./Components/BookList/BookList";
import BookDetails from "./Components/BookDetails/BookDetails";
import Community from "./Community/components/Community.js";
import CreateProfile from "./Community/components/CreateProfile.js";
import ProfileCard from "./Community/components/UserProfile.jsx";
import auth from './Login/public/js/auth.js'; // Import the AuthPage component
import "./Community/App.css";
import AuthPage from './Login/public/js/auth.js';
import SearchEngine from './pages/SearchEngine/SearchEngine';
import PrivateMessages from './pages/PrivateMessages/PrivateMessages';
import BookChannels from './pages/BookChannels/BookChannels';
import Polls from './pages/Polls/Polls';

// Custom protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <div className="app-container">
        <div className="main-content">
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<AuthPage initialView="login" />} />
            <Route path="/register" element={<AuthPage initialView="register" />} />
            
            {/* Main Routes */}
            <Route path="/" element={<MainHome />} />
            <Route path="/about" element={<About />} />
            <Route path="/book" element={<BookList />} />
            <Route path="/book/:id" element={<BookDetails />} />
            
            {/* Community Routes - Protected */}
            <Route path="/Community" element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            } />
            
            {/* Create Profile Route - Directed after Registration */}
            <Route path="/Community/Create-Profile" element={
              <ProtectedRoute>
                <CreateProfile />
              </ProtectedRoute>
            } />
            
            <Route path="/Community/profile" element={
              <ProtectedRoute>
                <ProfileCard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </AppProvider>
);