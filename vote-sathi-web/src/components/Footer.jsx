import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const footerStyle = {
    backgroundColor: '#0F172A',
    color: 'white',
    padding: '4rem 0 2rem 0',
    marginTop: 'auto',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  };

  const linkStyle = {
    color: '#94A3B8',
    display: 'block',
    marginBottom: '0.75rem',
    fontSize: '0.9rem',
  };

  return (
    <footer style={footerStyle}>
      <div className="container">
        <div style={gridStyle}>
          <div>
            <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>VoteSathi</h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
              Samajh ke vote karo. Your reliable companion for voting education.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Quick Links</h4>
            <Link to="/learn" style={linkStyle}>Learn to Vote</Link>
            <Link to="/services" style={linkStyle}>Voter Services</Link>
            <Link to="/faq" style={linkStyle}>FAQs</Link>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Support</h4>
            <Link to="/assistant" style={linkStyle}>Web AI Assistant</Link>
            <Link to="/about" style={linkStyle}>About Us</Link>
          </div>
        </div>
        <div style={{ 
          borderTop: '1px solid #1E293B', 
          paddingTop: '2rem', 
          textAlign: 'center',
          color: '#64748B',
          fontSize: '0.875rem'
        }}>
          <p>© {new Date().getFullYear()} VoteSathi. Not an official government app.</p>
        </div>
      </div>
    </footer>
  );
};
