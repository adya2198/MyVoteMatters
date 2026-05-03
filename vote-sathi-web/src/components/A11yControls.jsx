import React from 'react';
import { useA11y } from '../context/A11yContext';
import { useTranslation } from 'react-i18next';
import { Type, Moon, Sun, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const A11yControls = () => {
  const { highContrast, toggleHighContrast, increaseFontSize, decreaseFontSize } = useA11y();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const containerStyle = {
    position: 'fixed',
    bottom: '2rem',
    left: '2rem',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    backgroundColor: 'var(--surface)',
    padding: '0.5rem',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--border)'
  };

  const buttonStyle = {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    backgroundColor: 'var(--background)',
    color: 'var(--text-main)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: 'var(--shadow-sm)',
  };

  return (
    <motion.div 
      style={containerStyle}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <button 
        style={buttonStyle} 
        onClick={toggleLanguage}
        title="Toggle Language"
        className="hover:bg-primary/10"
      >
        <Globe size={20} />
      </button>
      <button 
        style={buttonStyle} 
        onClick={toggleHighContrast}
        title="Toggle High Contrast"
        className="hover:bg-primary/10"
      >
        {highContrast ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <button 
        style={{...buttonStyle, fontSize: '1.2rem', fontWeight: 'bold'}} 
        onClick={increaseFontSize}
        title="Increase Text Size"
        className="hover:bg-primary/10"
      >
        A+
      </button>
      <button 
        style={{...buttonStyle, fontSize: '0.9rem', fontWeight: 'bold'}} 
        onClick={decreaseFontSize}
        title="Decrease Text Size"
        className="hover:bg-primary/10"
      >
        A-
      </button>
    </motion.div>
  );
};
