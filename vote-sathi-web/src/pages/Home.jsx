import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, ArrowRight, BookOpen, Fingerprint } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { motion } from 'framer-motion';

export const Home = () => {
  const navigate = useNavigate();

  const heroStyle = {
    background: 'linear-gradient(135deg, #FFF7ED 0%, #F0FDF4 100%)',
    padding: '6rem 0',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  };

  const featureGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '4rem',
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={heroStyle}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span style={{ 
              display: 'inline-block', 
              padding: '0.5rem 1rem', 
              backgroundColor: 'rgba(255, 153, 51, 0.1)', 
              color: 'var(--primary)', 
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              🇮🇳 Empowering Indian Voters
            </span>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: '#1E293B' }}>
              Your Vote <span style={{ color: 'var(--primary)' }}>Matters.</span><br/>
              Samajh Ke Vote Karo.
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#64748B', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              A simple, multilingual guide to understanding elections, finding services, and getting answers via WhatsApp.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button size="lg" onClick={() => navigate('/learn')} icon={BookOpen}>
                Learn Voting
              </Button>
              <Button size="lg" variant="secondary" onClick={() => navigate('/services')} icon={Fingerprint}>
                Quick Services
              </Button>
            </div>
            
            <div style={{ marginTop: '2rem' }}>
              <Button variant="primary" size="md" icon={MessageCircle} onClick={() => navigate('/assistant')}>
                Chat with AI Assistant
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255, 153, 51, 0.05)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(19, 136, 8, 0.05)', filter: 'blur(40px)' }} />
      </section>

      {/* Features Section */}
      <section className="section container">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>How we help you</h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>We bridge the gap between complex government processes and everyday citizens.</p>
        </div>

        <div style={featureGridStyle}>
          <Card delay={1}>
            <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', backgroundColor: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
              <BookOpen size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Step-by-Step Learning</h3>
            <p style={{ marginBottom: '1.5rem', flex: 1 }}>Simple explanations with audio playback for those who prefer listening over reading.</p>
            <Link to="/learn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              Start Learning <ArrowRight size={16} />
            </Link>
          </Card>

          <Card delay={2}>
            <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--secondary)' }}>
              <Fingerprint size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Official Services</h3>
            <p style={{ marginBottom: '1.5rem', flex: 1 }}>Direct links to official ECI portals to register, check name, and download voter slip.</p>
            <Link to="/services" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--secondary)' }}>
              View Services <ArrowRight size={16} />
            </Link>
          </Card>

          <Card delay={3}>
            <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#4F46E5' }}>
              <MessageCircle size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Web AI Assistant</h3>
            <p style={{ marginBottom: '1.5rem', flex: 1 }}>Have a specific question? Chat directly with our Gemini-powered AI assistant right here on the website.</p>
            <Link to="/assistant" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#4F46E5' }}>
              Try it out <ArrowRight size={16} />
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};
