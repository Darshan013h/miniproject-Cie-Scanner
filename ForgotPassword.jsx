import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { authStyles as styles } from '../styles/AuthStyles';
import { BsEnvelope } from 'react-icons/bs';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset link sent! Check your email.');
    } catch (error) {
      console.error('Reset password error:', error.message);
      setMessage('Failed to send reset link. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.authCard}>
        <div style={styles.header}>
          <h2 style={styles.title}>Reset Password</h2>
          <p style={styles.subtitle}>Enter your email to receive reset instructions</p>
        </div>

        {message && (
          <div style={{ marginBottom: '20px', textAlign: 'center', color: message.includes('sent') ? 'green' : 'red' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <BsEnvelope style={styles.icon} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Send Reset Link
          </button>

          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            Remember your password?{' '}
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword; 