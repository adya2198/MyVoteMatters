import React, { useState } from 'react';
import { Award, Check, X, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const questions = [
  {
    question: "What is the minimum age to be eligible to vote in India?",
    options: ["16 Years", "18 Years", "21 Years", "25 Years"],
    correct: 1
  },
  {
    question: "Which document is primarily required to cast your vote?",
    options: ["Aadhar Card", "Driving License", "EPIC (Voter ID)", "Passport"],
    correct: 2
  },
  {
    question: "What does EVM stand for?",
    options: ["Electronic Voting Machine", "Electoral Verification Method", "Election Value Machine", "Every Vote Matters"],
    correct: 0
  }
];

export const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);

  const handleSelect = (idx) => {
    setSelectedOpt(idx);
    if (idx === questions[currentQ].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOpt(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedOpt(null);
  };

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '700px', margin: '0 auto' }}>
      <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-3">
        Test Your Knowledge
      </h1>

      <Card>
        <div style={{ padding: '2rem', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div key="question" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="text-muted mb-4 font-bold">Question {currentQ + 1} of {questions.length}</div>
                <h2 className="text-2xl font-bold mb-6">{questions[currentQ].question}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {questions[currentQ].options.map((opt, idx) => {
                    let bg = 'var(--background)';
                    let border = '1px solid var(--border)';
                    if (selectedOpt !== null) {
                      if (idx === questions[currentQ].correct) {
                        bg = '#dcfce7'; border = '1px solid #166534';
                      } else if (idx === selectedOpt) {
                        bg = '#fee2e2'; border = '1px solid #991b1b';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedOpt !== null}
                        onClick={() => handleSelect(idx)}
                        style={{
                          padding: '1rem', textAlign: 'left', borderRadius: 'var(--radius-md)',
                          background: bg, border: border, cursor: selectedOpt === null ? 'pointer' : 'default',
                          fontSize: '1.1rem', transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between'
                        }}
                        className={selectedOpt === null ? 'hover:border-primary' : ''}
                      >
                        {opt}
                        {selectedOpt !== null && idx === questions[currentQ].correct && <Check className="text-green-700" />}
                        {selectedOpt !== null && idx === selectedOpt && idx !== questions[currentQ].correct && <X className="text-red-700" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center m-auto">
                <Award size={64} className="mx-auto text-primary mb-4" />
                <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
                <p className="text-xl mb-8">You scored <span className="font-bold text-primary">{score}</span> out of {questions.length}</p>
                <Button onClick={restartQuiz} icon={RefreshCw}>Try Again</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
};
