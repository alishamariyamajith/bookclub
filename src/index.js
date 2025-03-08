import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context.js';
import Layout from './comp/layout/layout';
import './index.css';
import Home from './pages/Home/Home';
import MainHome from './MainHomeComp/frontend/MainHome';
import BookList from "./Components/BookList/BookList";
import BookDetails from "./Components/BookDetails/BookDetails";
import Community from "./Community/components/Community.js";
import CreateProfile from "./Community/components/CreateProfile.js";
import ProfileCard from "./Community/components/UserProfile.jsx";
import "./Community/components/styles/Community.css";
import AuthPage from './Login/auth.js';
// import SearchEngine from './pages/SearchEngine/SearchEngine';
// import PrivateMessages from './pages/PrivateMessages/PrivateMessages';
// import BookChannels from './pages/BookChannels/BookChannels';
// import Polls from './pages/Polls/Polls';

// Custom protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
    <Layout>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<AuthPage initialView="login" />} />
             <Route path="/register" element={<AuthPage initialView="register" />} />
            
            {/* Main Routes */}
            <Route path="/" element={<MainHome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/book" element={<BookList />} />
            <Route path="/book/:id" element={<BookDetails />} />
            
            {/* Community Routes - Protected */}
            <Route path="/Community" element={
                <Community />
            } />
            
            {/* Create Profile Route - Directed after Registration */}
            <Route path="/Community/Create-Profile" element={
                <CreateProfile />
            } />
            
            <Route path="/Community/profile" element={
                <ProfileCard />
            } />
          </Routes>
          </Layout>
    </BrowserRouter>
  </AppProvider>
);