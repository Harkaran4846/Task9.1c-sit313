import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { setDoc, doc } from 'firebase/firestore';
import '../styles/SignUp.css';

const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmUserPassword, setConfirmUserPassword] = useState('');
  const navigateTo = useNavigate();

  const handleUserSignUp = async (event) => {
    event.preventDefault();
    if (userPassword !== confirmUserPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
      const user = userCredential.user;
      await updateProfile(user, { displayName: fullName }); 

      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        userEmail,
      });

      navigateTo('/login'); 
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="signup-wrapper">
      <form className="signup-form" onSubmit={handleUserSignUp}>
        <h2 className="signup-title">Register Account</h2>
        <div className="input-group">
          <label>Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input type="password" value={confirmUserPassword} onChange={(e) => setConfirmUserPassword(e.target.value)} required />
        </div>
        <button className="signup-btn" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
