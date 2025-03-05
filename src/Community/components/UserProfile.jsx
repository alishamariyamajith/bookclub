import React, { useState } from 'react';
import './styles/UserProfile.css'; // Import the CSS file

const ProfileCard = ({ user }) => {
  // Sample user data - replace with actual data from your backend
  const defaultUser = {
    name: "Jane Austen",
    username: "janeausten",
    profilePhoto: "/api/placeholder/150/150",
    bio: "Avid reader, book collector, and aspiring writer. I love discussing classic literature and contemporary fiction.",
    followers: 843,
    following: 231,
    favoriteGenre: ["Classic Literature", "Historical Fiction", "Romance"],
    favoriteBooks: ["Pride and Prejudice", "Jane Eyre", "The Great Gatsby"],
    readingStatus: {
      read: ["To Kill a Mockingbird", "1984", "Little Women", "The Hobbit", "The Catcher in the Rye"],
      currentlyReading: ["The Seven Husbands of Evelyn Hugo"],
      toRead: ["The Midnight Library", "Pachinko", "The Song of Achilles"]
    }
  };

  // Use provided user data or fall back to default
  const userData = user || defaultUser;
  
  // State for managing active tab in reading status
  const [activeTab, setActiveTab] = useState('read');

  return (
    <div className="profile-container">
      {/* Profile Header Section */}
      <div className="profile-header">
        {/* Profile Photo */}
        <img 
          src={userData.profilePhoto} 
          alt={`${userData.name}'s profile`} 
          className="profile-picture"
        />
        
        {/* Profile Info */}
        <div className="profile-info">
          <div className="username">
            {userData.username}
            <button className="follow-button">
              Follow
            </button>
          </div>
          
          {/* Followers/Following Stats */}
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-count">{userData.followers}</span> followers
            </div>
            <div className="stat-item">
              <span className="stat-count">{userData.following}</span> following
            </div>
          </div>
          
          {/* Bio */}
          <div className="bio">
            <div className="full-name">{userData.name}</div>
            <p>{userData.bio}</p>
          </div>
        </div>
      </div>
      
      {/* Favorite Genres & Books Section */}
      <div className="favorites-section">
        <h3 className="section-title">Favorite Genres</h3>
        <div className="genre-tags">
          {userData.favoriteGenre.map((genre, index) => (
            <span key={index} className="genre-tag">{genre}</span>
          ))}
        </div>
        
        <h3 className="section-title">Favorite Books</h3>
        <ul className="books-list">
          {userData.favoriteBooks.map((book, index) => (
            <li key={index}>{book}</li>
          ))}
        </ul>
      </div>
      
      {/* Reading Status Section */}
      <div className="reading-status">
        <h3 className="section-title">Reading Status</h3>
        
        {/* Tabs */}
        <div className="status-tabs">
          <button 
            className={`status-tab ${activeTab === 'read' ? 'active' : ''}`}
            onClick={() => setActiveTab('read')}
          >
            Read ({userData.readingStatus.read.length})
          </button>
          <button 
            className={`status-tab ${activeTab === 'currentlyReading' ? 'active' : ''}`}
            onClick={() => setActiveTab('currentlyReading')}
          >
            Currently Reading ({userData.readingStatus.currentlyReading.length})
          </button>
          <button 
            className={`status-tab ${activeTab === 'toRead' ? 'active' : ''}`}
            onClick={() => setActiveTab('toRead')}
          >
            To Read ({userData.readingStatus.toRead.length})
          </button>
        </div>
        
        {/* Book Lists */}
        <div>
          {activeTab === 'read' && (
            <ul>
              {userData.readingStatus.read.map((book, index) => (
                <li key={index} className="book-item">
                  <div className="status-indicator status-read"></div>
                  {book}
                </li>
              ))}
            </ul>
          )}
          
          {activeTab === 'currentlyReading' && (
            <ul>
              {userData.readingStatus.currentlyReading.map((book, index) => (
                <li key={index} className="book-item">
                  <div className="status-indicator status-reading"></div>
                  {book}
                </li>
              ))}
            </ul>
          )}
          
          {activeTab === 'toRead' && (
            <ul>
              {userData.readingStatus.toRead.map((book, index) => (
                <li key={index} className="book-item">
                  <div className="status-indicator status-to-read"></div>
                  {book}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;