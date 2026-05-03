import React, { useState } from 'react';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const RegistrationChecker = () => {
  const [step, setStep] = useState(1);
  const [isCitizen, setIsCitizen] = useState(null);
  const [isAdult, setIsAdult] = useState(null);
  const [epicNumber, setEpicNumber] = useState('');
  const [status, setStatus] = useState(null);

  const handleCheck = () => {
    if (epicNumber.length > 5) {
      setStatus('registered');
    } else {
      setStatus('not_found');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="step1">
            <h2 className="text-2xl font-bold mb-4">Are you a citizen of India?</h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Button variant={isCitizen === true ? 'primary' : 'outline'} onClick={() => setIsCitizen(true)}>Yes</Button>
              <Button variant={isCitizen === false ? 'primary' : 'outline'} onClick={() => setIsCitizen(false)}>No</Button>
            </div>
            {isCitizen !== null && (
              <Button style={{ marginTop: '2rem' }} onClick={() => setStep(2)}>Next</Button>
            )}
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="step2">
            <h2 className="text-2xl font-bold mb-4">Are you 18 years of age or older?</h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Button variant={isAdult === true ? 'primary' : 'outline'} onClick={() => setIsAdult(true)}>Yes</Button>
              <Button variant={isAdult === false ? 'primary' : 'outline'} onClick={() => setIsAdult(false)}>No</Button>
            </div>
            {isAdult !== null && (
              <Button style={{ marginTop: '2rem' }} onClick={() => setStep(3)}>Next</Button>
            )}
          </motion.div>
        );
      case 3:
        if (!isCitizen || !isAdult) {
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="step3-fail">
              <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Not Eligible</h2>
              <p className="text-muted">You must be an Indian citizen and at least 18 years old to register to vote.</p>
              <Button style={{ marginTop: '2rem' }} onClick={() => setStep(1)}>Start Over</Button>
            </motion.div>
          );
        }
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="step3-success">
            <h2 className="text-2xl font-bold mb-4">Check Your Voter ID Status</h2>
            <p className="text-muted mb-4">Enter your EPIC Number (Voter ID Number)</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <input
                type="text"
                placeholder="ABC1234567"
                value={epicNumber}
                onChange={(e) => setEpicNumber(e.target.value)}
                style={{ padding: '0.8rem', width: '300px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
              <Button variant="primary" onClick={handleCheck} disabled={!epicNumber}>Check Status</Button>
            </div>

            {status && (
              <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: 'var(--radius-md)', background: status === 'registered' ? '#dcfce7' : '#fee2e2', color: status === 'registered' ? '#166534' : '#991b1b' }}>
                {status === 'registered' ? (
                  <><CheckCircle className="mx-auto mb-2" size={32} /><h3 className="font-bold text-xl">You are Registered!</h3><p>Your name is on the electoral roll.</p></>
                ) : (
                  <><AlertCircle className="mx-auto mb-2" size={32} /><h3 className="font-bold text-xl">Record Not Found</h3><p>We couldn't find your EPIC number. Please register using Form 6.</p></>
                )}
              </div>
            )}
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 className="text-4xl font-bold text-center mb-8">Voter Registration Checker</h1>
      <Card>
        <div style={{ padding: '2rem', textAlign: 'center', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
};
