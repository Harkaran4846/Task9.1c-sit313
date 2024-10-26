import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import '../styles/Login.css';
import { useAuth } from '../App';

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigateTo = useNavigate();
  const { setCurrentUser } = useAuth();

  const handleUserLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword);
      setCurrentUser(userCredential.user);
      navigateTo('/'); 
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleUserLogin}>
        <h2 className="login-title">Sign In</h2>
        <div className="input-group">
          <label>Email</label>
          <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required />
        </div>
        <button className="login-btn" type="submit">Login</button>
        <p className="signup-redirect">
          Don't have an account? <span onClick={() => navigateTo('/signup')}>Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
