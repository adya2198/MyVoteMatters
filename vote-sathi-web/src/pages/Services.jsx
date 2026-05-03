import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { Card } from '../components/Card';
import { services } from '../data/services';
import { motion } from 'framer-motion';

export const Services = () => {
  const headerStyle = {
    backgroundColor: '#F0FDF4',
    padding: '4rem 0',
    borderBottom: '1px solid #DCFCE7',
    marginBottom: '3rem',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem',
  };

  return (
    <div>
      <div style={headerStyle}>
        <div className="container text-center">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: 'rgba(19, 136, 8, 0.1)', color: 'var(--secondary)', borderRadius: 'var(--radius-full)', fontWeight: 600, marginBottom: '1rem' }}>
              <ShieldCheck size={18} /> Official Links
            </span>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Voter Services</h1>
            <p style={{ fontSize: '1.2rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
              Direct access to Election Commission of India portals. We don't store any of your data.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div style={gridStyle}>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <a href={service.url} target="_blank" rel="noopener noreferrer" key={service.id} style={{ display: 'block', color: 'inherit' }}>
                <Card delay={index + 1} hover={true} className="service-card">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', backgroundColor: `${service.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: service.color }}>
                      <Icon size={24} />
                    </div>
                    <ExternalLink size={20} color="#94A3B8" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{service.title}</h3>
                  <p style={{ margin: 0 }}>{service.description}</p>
                </Card>
              </a>
            );
          })}
        </div>
        
        <div style={{ backgroundColor: '#F8FAFC', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#64748B' }}>
            <strong>Note:</strong> All service links redirect to official government websites (eci.gov.in). VoteSathi is an educational platform and does not process any applications directly.
          </p>
        </div>
      </div>
    </div>
  );
};
