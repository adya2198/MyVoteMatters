import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { motion } from 'framer-motion';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }
    
    // Mock Database using LocalStorage
    if (isLogin) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.dispatchEvent(new Event('storage')); // Trigger navbar update
        navigate('/');
      } else {
        alert('Invalid credentials. Please sign up if you don\'t have an account.');
      }
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === email)) {
        alert('User already exists!');
      } else {
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      }
    }
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '4rem auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--border)',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    marginBottom: '1rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    fontSize: '1rem',
    outline: 'none',
  };

  return (
    <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <motion.div 
        style={containerStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>Email</label>
            <input 
              type="email" 
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>Password</label>
            <input 
              type="password" 
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          
          <Button type="submit" fullWidth>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: 'var(--primary)', fontWeight: 600, background: 'none', padding: 0 }}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: '#64748B', textAlign: 'center' }}>
          <strong>Note:</strong> We are currently using LocalStorage as a mock database for Phase 1. Real database integration will be done in Phase 2.
        </div>
      </motion.div>
    </div>
  );
};
