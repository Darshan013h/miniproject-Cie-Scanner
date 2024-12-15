import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase/firebaseConfig';
import { GoogleSignInButton } from './GoogleSignInButton';
import { authStyles as styles } from '../styles/AuthStyles';
import { BsEnvelope, BsLock } from 'react-icons/bs';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.authCard}>
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Please login to your account</p>
        </div>
        
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
          
          <div style={styles.inputGroup}>
            <BsLock style={styles.icon} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={styles.input}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" style={styles.link}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>

          <div style={{ margin: '20px 0', textAlign: 'center' }}>
            <span>OR</span>
          </div>

          <GoogleSignInButton onSuccess={() => navigate('/dashboard')} />

          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            Don't have an account?{' '}
            <Link to="/register" style={styles.link}>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login; 