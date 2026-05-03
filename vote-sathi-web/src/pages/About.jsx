import React from 'react';
import { Heart, Globe, Users } from 'lucide-react';
import { Card } from '../components/Card';
import { motion } from 'framer-motion';

export const About = () => {
  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '4rem 1.5rem',
  };

  return (
    <div style={containerStyle}>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>About VoteSathi</h1>
        
        <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Our Mission</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            VoteSathi was born from a simple observation: while the government provides all necessary services online, many citizens—especially in rural areas—find the process complex and text-heavy.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            We believe that understanding how to vote shouldn't be a barrier to participating in our democracy. By combining simple explanations, audio playback, and a WhatsApp voice assistant, we aim to make voting education accessible to every Indian.
          </p>
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <Card delay={1} hover={false} className="text-center">
          <Globe color="var(--primary)" size={32} style={{ margin: '0 auto 1rem' }} />
          <h3>Multilingual</h3>
          <p style={{ fontSize: '0.9rem' }}>Breaking language barriers with Hindi & English support.</p>
        </Card>
        
        <Card delay={2} hover={false} className="text-center">
          <Users color="var(--secondary)" size={32} style={{ margin: '0 auto 1rem' }} />
          <h3>Accessible</h3>
          <p style={{ fontSize: '0.9rem' }}>Voice-first design for those who prefer listening over reading.</p>
        </Card>

        <Card delay={3} hover={false} className="text-center">
          <Heart color="#EF4444" size={32} style={{ margin: '0 auto 1rem' }} />
          <h3>Free Forever</h3>
          <p style={{ fontSize: '0.9rem' }}>Built as a public utility to strengthen our democracy.</p>
        </Card>
      </div>

      <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', color: '#64748B' }}>
        <p style={{ margin: 0 }}>
          <strong>Disclaimer:</strong> VoteSathi is an independent educational platform. We are not affiliated with the Election Commission of India or any government body.
        </p>
      </div>
    </div>
  );
};
