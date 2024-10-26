import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useAuth } from '../App';
import '../styles/Home.css';

const HomePage = () => {
  const navigateTo = useNavigate();
  const { currentUser } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigateTo('/'); 
    } catch (error) {
      console.error('Sign-out failed:', error);
      alert('Error signing out. Please try again.');
    }
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1 className="homepage-title">
          {currentUser ? `Welcome back, ${currentUser.displayName || currentUser.email}` : "Welcome to Our App"}
        </h1>
        <div className="header-row">
          <input className="search-input" type="text" placeholder="Search.." />
          {currentUser ? (
            <button className="nav-btn signout-btn" onClick={handleSignOut}>Sign Out</button>
          ) : (
            <>
              <button className="nav-btn" onClick={() => navigateTo('/login')}>Login</button>
              <button className="nav-btn" onClick={() => navigateTo('/signup')}>Sign Up</button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default HomePage;
