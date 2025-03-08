import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import './nav.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const dropdownRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuIconRef = useRef(null);

  // Toggle Dropdown Menu
  const toggleDropdownMenu = () => {
    setIsDropdownOpen(prev => !prev);
  };

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    setIsMobileMenuActive(prev => !prev);
  };

  // Handle Click Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        toggleBtnRef.current && 
        !toggleBtnRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }

      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) &&
        menuIconRef.current && 
        !menuIconRef.current.contains(event.target)
      ) {
        setIsMobileMenuActive(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsMobileMenuActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <header>
      <div className="logo">
        <h1>Book Club Network</h1>
      </div>

      <div className="search-box">
        <form action="" method="GET">
          <input 
            type="text" 
            name="search" 
            id="srch" 
            placeholder="Search books, authors, genres" 
            aria-label="Search"
          />
          <button type="submit" aria-label="Search">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>

      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/community">Community</Link></li>
          <li><Link to="/community/profile">Profile</Link></li>
        </ul>
      </nav>

      {/* Mobile Menu Toggle */}
      <div 
        ref={menuIconRef}
        className="menu-icon" 
        onClick={toggleMobileMenu}
      >
        <FontAwesomeIcon icon={isMobileMenuActive ? faXmark : faBars} />
      </div>

      {/* User Dropdown Toggle */}
      <div 
        ref={toggleBtnRef}
        className="toggle_btn" 
        onClick={toggleDropdownMenu}
      >
        <FontAwesomeIcon icon={isDropdownOpen ? faXmark : faBars} />
      </div>

      {/* Dropdown Menu */}
      <div 
        ref={dropdownRef}
        className={`dropdown_menu ${isDropdownOpen ? 'open' : ''}`}
      >
        <ul>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        ref={mobileMenuRef}
        className={`mobile-menu ${isMobileMenuActive ? 'active' : ''}`}
      >
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/community">Community</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;