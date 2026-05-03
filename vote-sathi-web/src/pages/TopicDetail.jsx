import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { lessons } from '../data/lessons';
import { AudioPlayer } from '../components/AudioPlayer';
import { motion } from 'framer-motion';

export const TopicDetail = () => {
  const { topicId } = useParams();
  const lesson = lessons.find(l => l.id === topicId);

  if (!lesson) {
    return <Navigate to="/learn" />;
  }

  // Combine text for the audio player to read out loud
  const textToRead = `
    ${lesson.title}. 
    ${lesson.description}. 
    Steps to follow: ${lesson.content.join('. ')}. 
    Dos: ${lesson.dos.join('. ')}. 
    Don'ts: ${lesson.donts.join('. ')}.
  `;

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '4rem 1.5rem',
  };

  const headerStyle = {
    marginBottom: '2rem',
  };

  const contentStyle = {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--border)',
    marginBottom: '2rem',
  };

  const dosDontsGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <Link to="/learn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: '#64748B', fontWeight: 500 }}>
          <ArrowLeft size={20} /> Back to Topics
        </Link>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
        >
          {lesson.title}
        </motion.h1>
        <p style={{ fontSize: '1.2rem', color: '#64748B' }}>{lesson.description}</p>
        
        <AudioPlayer textToRead={textToRead} />
      </div>

      <motion.div 
        style={contentStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 color="var(--primary)" /> Key Points
        </h2>
        
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {lesson.content.map((point, index) => (
            <li key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#F1F5F9', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px', fontSize: '0.875rem', fontWeight: 'bold' }}>
                {index + 1}
              </div>
              <p style={{ margin: 0, color: '#334155', fontSize: '1.1rem', lineHeight: 1.6 }}>{point}</p>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div 
        style={dosDontsGrid}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* DOs Card */}
        <div style={{ backgroundColor: '#F0FDF4', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid #DCFCE7' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#166534', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ThumbsUp size={20} /> Do's
          </h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {lesson.dos.map((item, index) => (
              <li key={index} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="#166534" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span style={{ color: '#14532D', lineHeight: 1.5 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DONTs Card */}
        <div style={{ backgroundColor: '#FEF2F2', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid #FEE2E2' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#991B1B', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ThumbsDown size={20} /> Don'ts
          </h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {lesson.donts.map((item, index) => (
              <li key={index} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#DC2626', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', marginTop: '3px', flexShrink: 0, fontWeight: 'bold' }}>X</div>
                <span style={{ color: '#7F1D1D', lineHeight: 1.5 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};
