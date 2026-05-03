import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const Card = memo(({ children, className = '', hover = true, delay = 0 }) => {
  const style = {
    backgroundColor: 'var(--surface)',
    borderRadius: 'var(--radius-lg)',
    padding: '1.5rem',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--border)',
    transition: 'var(--transition)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const Component = hover ? motion.div : 'div';
  const motionProps = hover ? {
    whileHover: { y: -5, boxShadow: 'var(--shadow-hover)' },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: delay * 0.1 }
  } : {};

  return (
    <Component style={style} className={className} {...motionProps}>
      {children}
    </Component>
  );
});
