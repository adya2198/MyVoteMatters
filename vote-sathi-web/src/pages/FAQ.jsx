import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqs } from '../data/faqs';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQ = () => {
  const [openId, setOpenId] = useState(faqs[0].id);

  const headerStyle = {
    padding: '4rem 0',
    textAlign: 'center',
    marginBottom: '2rem',
  };

  return (
    <div className="container" style={{ maxWidth: '800px', paddingBottom: '5rem' }}>
      <div style={headerStyle}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Frequently Asked Questions</h1>
          <p style={{ fontSize: '1.2rem', color: '#64748B' }}>
            Common doubts about voting in India, answered.
          </p>
        </motion.div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, index) => {
          const isOpen = openId === faq.id;
          
          return (
            <motion.div 
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ 
                backgroundColor: 'white', 
                borderRadius: 'var(--radius-md)', 
                border: `1px solid ${isOpen ? 'var(--primary)' : 'var(--border)'}`,
                boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                overflow: 'hidden',
                transition: 'var(--transition)'
              }}
            >
              <button 
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                style={{ 
                  width: '100%', 
                  padding: '1.5rem', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  textAlign: 'left',
                  color: isOpen ? 'var(--primary)' : 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '1.1rem'
                }}
              >
                {faq.question}
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} color="#64748B" />}
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: '#64748B', lineHeight: 1.6 }}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
