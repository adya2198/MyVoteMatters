import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, PlayCircle } from 'lucide-react';
import { Card } from '../components/Card';
import { lessons } from '../data/lessons';
import { motion } from 'framer-motion';

export const Learn = () => {
  const headerStyle = {
    backgroundColor: '#FFF7ED',
    padding: '4rem 0',
    borderBottom: '1px solid #FFEDD5',
    marginBottom: '3rem',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem',
  };

  return (
    <div>
      <div style={headerStyle}>
        <div className="container text-center">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Learn to Vote</h1>
            <p style={{ fontSize: '1.2rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
              Everything you need to know about the democratic process, explained simply.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div style={gridStyle}>
          {lessons.map((lesson, index) => (
            <Card key={lesson.id} delay={index + 1}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FFEDD5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>
                  {index + 1}
                </div>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{lesson.title}</h3>
              </div>
              <p style={{ marginBottom: '1.5rem', flex: 1 }}>{lesson.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.9rem' }}>
                  <PlayCircle size={16} /> Audio available
                </div>
                <Link to={`/learn/${lesson.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                  Read Topic <ArrowRight size={16} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
