import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const Button = memo(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon: Icon,
  fullWidth = false,
  onClick,
  ...props 
}) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    borderRadius: 'var(--radius-full)',
    transition: 'var(--transition)',
    gap: '0.5rem',
    width: fullWidth ? '100%' : 'auto',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--primary)',
      color: 'white',
      boxShadow: 'var(--shadow-md)',
    },
    secondary: {
      backgroundColor: 'var(--secondary)',
      color: 'white',
      boxShadow: 'var(--shadow-md)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--primary)',
      border: '2px solid var(--primary)',
    },
    whatsapp: {
      backgroundColor: '#25D366',
      color: 'white',
      boxShadow: 'var(--shadow-md)',
    }
  };

  const sizes = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    lg: { padding: '1rem 2rem', fontSize: '1.125rem' },
  };

  const combinedStyle = {
    ...baseStyle,
    ...variants[variant],
    ...sizes[size],
  };

  return (
    <motion.button
      style={combinedStyle}
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-hover)' }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {Icon && <Icon size={size === 'lg' ? 24 : 20} />}
      {children}
    </motion.button>
  );
});
