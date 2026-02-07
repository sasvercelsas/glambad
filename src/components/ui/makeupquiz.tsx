import React, { useState, useEffect } from 'react';

interface QuizProps {
  onComplete: () => void;
}

export const MakeupQuiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [state, setState] = useState<'QUIZ' | 'ANALYSING'>('QUIZ');
  const [step, setStep] = useState(0);

  const questions = [
    { q: "What is your primary skin concern?", opts: ["Fine Lines", "Dark Spots", "Dryness", "Oily/Acne"] },
    { q: "What is your skin type?", opts: ["Oily", "Dry / Sensitive", "Combination"] },
    { q: "Have you shopped at Sephora in the last 12 months?", opts: ["Yes, frequently", "Once or twice", "Not yet"] },
    { q: "What's your current age?", opts: ["Under 30", "30 - 45", "45+"] }
  ];

  useEffect(() => {
    if (state === 'ANALYSING') {
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state, onComplete]);

  const handleAnswer = () => {
    if (step < questions.length - 1) {
      setStep(s => s + 1);
    } else {
      setState('ANALYSING');
    }
  };

  if (state === 'ANALYSING') {
    return (
      <div style={containerStyle}>
        <div className="spinner"></div>
        <h2 style={{ color: '#FF6B9D', marginBottom: '15px', fontSize: '1.5rem' }}>Analysing Profile...</h2>
        <p style={{ color: '#ccc' }}>Checking gift card availability in your region.</p>
        <style>{`.spinner { width: 50px; height: 50px; border: 4px solid #333; border-top: 4px solid #FF6B9D; border-radius: 50%; margin: 20px auto; animation: spin 1s linear infinite; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: '20px', fontSize: '0.8rem', color: '#FF6B9D', fontWeight: 'bold' }}>
        QUESTION {step + 1} OF {questions.length}
      </div>
      <h3 style={{ fontSize: '1.3rem', marginBottom: '25px', color: 'white', lineHeight: '1.4' }}>{questions[step].q}</h3>
      {questions[step].opts.map((opt) => (
        <button key={opt} onClick={handleAnswer} style={btnStyle}>{opt}</button>
      ))}
    </div>
  );
};

const containerStyle: React.CSSProperties = { 
  maxWidth: '450px', margin: '0 auto', padding: '30px', textAlign: 'center', 
  background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '24px' 
};

const btnStyle: React.CSSProperties = { 
  display: 'block', width: '100%', padding: '16px', margin: '12px 0', 
  cursor: 'pointer', border: '1px solid rgba(255, 255, 255, 0.2)', 
  borderRadius: '12px', background: 'rgba(255, 107, 157, 0.1)', 
  color: 'white', fontWeight: '600', fontSize: '1rem', transition: 'all 0.2s'
};
