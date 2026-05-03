import React, { useState } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const PollingLocator = () => {
  const [pinCode, setPinCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (pinCode.length !== 6) return;
    
    setLoading(true);
    setError('');
    
    // Simulate network delay for a realistic feel
    setTimeout(() => {
      setResult({
        name: "Government Primary School, Sector 4",
        address: `Block B, Near Central Park, Area Code: ${pinCode}`,
        distance: "1.2 km away",
        boothNumber: "142-A",
        wait_time: "15 mins (Estimated)"
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <MapPin size={48} className="mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold mb-4">Find Your Polling Station</h1>
        <p className="text-xl text-muted mb-8">Enter your 6-digit PIN code to locate your designated voting center.</p>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <input
            type="text"
            placeholder="Enter PIN Code (e.g. 110001)"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            maxLength={6}
            style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', width: '300px', fontSize: '1.1rem' }}
          />
          <Button type="submit" variant="primary" icon={Search} disabled={pinCode.length !== 6 || loading}>
            {loading ? 'Searching...' : 'Locate'}
          </Button>
        </form>

        {error && <p style={{ color: 'red', marginBottom: '2rem' }}>{error}</p>}

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card>
              <div style={{ textAlign: 'left', padding: '1rem' }}>
                <h3 className="text-2xl font-bold mb-2">{result.name}</h3>
                <p className="text-muted mb-4">{result.address}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                    <p className="font-bold">Booth No.</p>
                    <p>{result.boothNumber}</p>
                  </div>
                  <div style={{ background: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                    <p className="font-bold">Est. Wait Time</p>
                    <p>{result.wait_time}</p>
                  </div>
                </div>
                <Button variant="outline" fullWidth icon={Navigation}>
                  Get Directions
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
