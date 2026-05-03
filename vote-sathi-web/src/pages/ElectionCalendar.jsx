import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const ElectionCalendar = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set mock election date 30 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const events = [
    { date: "Oct 15, 2026", title: "Last Day to Register", type: "deadline" },
    { date: "Oct 25, 2026", title: "Early Voting Begins", type: "event" },
    { date: "Nov 03, 2026", title: "General Election Day", type: "election" },
  ];

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-3">
        <Calendar className="text-primary" size={40} /> Election Calendar
      </h1>

      <div style={{ background: 'var(--primary)', color: 'white', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold mb-6">Countdown to Next Election</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem 2rem', borderRadius: 'var(--radius-md)', minWidth: '100px' }}>
              <div className="text-4xl font-bold">{value}</div>
              <div className="text-sm uppercase tracking-wider">{unit}</div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Upcoming Deadlines</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {events.map((evt, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                <div>
                  <h4 className="font-bold text-lg">{evt.title}</h4>
                  <p className="text-muted">{evt.date}</p>
                </div>
                <Button variant="outline" size="sm" icon={Bell}>Remind Me</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
