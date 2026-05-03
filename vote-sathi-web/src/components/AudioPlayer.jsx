import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const AudioPlayer = ({ textToRead }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }
    
    // Cleanup on unmount
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'en-IN'; // Indian English accent if available
        utterance.rate = 0.9; // Slightly slower for better comprehension
        
        utterance.onend = () => {
          setIsPlaying(false);
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
        };

        window.speechSynthesis.speak(utterance);
      }
      setIsPlaying(true);
    }
  };

  if (!isSupported) {
    return <div style={{ color: 'red', marginTop: '1rem' }}>Audio playback is not supported in your browser.</div>;
  }

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#FFF7ED',
    borderRadius: 'var(--radius-full)',
    border: '1px solid #FFEDD5',
    marginTop: '1.5rem',
  };

  const buttonStyle = {
    backgroundColor: 'var(--primary)',
    color: 'white',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <motion.button 
        style={buttonStyle} 
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
      </motion.button>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Volume2 size={16} /> Listen to this lesson
        </p>
      </div>
    </div>
  );
};
