import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Bot, User, LogOut } from 'lucide-react';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const checkUser = () => {
      const userStr = localStorage.getItem('currentUser');
      if (userStr) {
        setCurrentUser(JSON.parse(userStr));
      } else {
        setCurrentUser(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--border)',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const linkContainerStyle = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  };

  const mobileMenuStyle = {
    position: 'fixed',
    top: '5rem',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: '2rem',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    boxShadow: 'var(--shadow-lg)',
    maxHeight: 'calc(100vh - 5rem)',
    overflowY: 'auto'
  };

  const links = [
    { name: t('home'), path: '/' },
    { name: t('learn'), path: '/learn' },
    { name: t('services'), path: '/services' },
    { name: t('locator'), path: '/locator' },
    { name: t('register'), path: '/register' },
    { name: t('calendar'), path: '/calendar' },
    { name: t('quiz'), path: '/quiz' },
    { name: t('candidates'), path: '/candidates' },
  ];

  return (
    <nav style={navStyle}>
      <div className="container" style={containerStyle}>
        <Link to="/" style={logoStyle}>
          <span style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-md)' }}>V</span>
          VoteSathi
        </Link>

        {/* Desktop Nav */}
        <div style={linkContainerStyle} className="hidden md:flex">
          {links.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              style={{ 
                fontWeight: location.pathname === link.path ? 700 : 500,
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-main)',
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/assistant">
            <Button variant="primary" size="sm" icon={Bot}>
              Web Assistant
            </Button>
          </Link>
          
          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)' }}></div>

          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>
                {currentUser.email.split('@')[0]}
              </span>
              <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#EF4444', background: 'none', fontWeight: 600 }}>
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm" icon={User}>
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden" 
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'transparent', padding: '0.5rem' }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            style={mobileMenuStyle}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            {links.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{ 
                  fontWeight: 600,
                  fontSize: '1.25rem',
                  color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-main)',
                }}
              >
                {link.name}
              </Link>
            ))}
            
            <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '0.5rem 0' }}></div>
            
            {currentUser ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                  Logged in as: {currentUser.email.split('@')[0]}
                </span>
                <Button variant="outline" fullWidth icon={LogOut} onClick={() => { handleLogout(); setIsOpen(false); }}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button variant="outline" fullWidth icon={User}>
                  Login / Sign Up
                </Button>
              </Link>
            )}

            <Link to="/assistant" onClick={() => setIsOpen(false)}>
              <Button variant="primary" fullWidth icon={Bot}>
                Web Assistant
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
