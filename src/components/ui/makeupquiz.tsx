import React, { useState, useEffect } from 'react';

// Using 'export const' ensures the build tool can find the identifier "MakeupQuiz"
export const MakeupQuiz: React.FC = () => {
  const [state, setState] = useState<'QUIZ' | 'ANALYSING'>('QUIZ');
  const [step, setStep] = useState(0);

  const questions = [
    { q: "What is your primary skin concern?", opts: ["Fine Lines", "Dark Spots", "Dryness", "Oily/Acne"] },
    { q: "What is your skin type?", opts: ["Oily", "Dry / Sensitive", "Combination"] },
    { q: "What's your current age?", opts: ["Under 30", "30 - 45", "45+"] }
  ];

  const OFFER_URL = "https://trkfy.org/aff_c?offer_id=163&aff_id=164586";

  useEffect(() => {
    if (state === 'ANALYSING') {
      const timer = setTimeout(() => {
        window.location.replace(OFFER_URL);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [state]);

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
        <h2 style={{ color: '#FF6B9D', marginBottom: '15px' }}>Analysing Profile...</h2>
        <p style={{ color: '#ccc' }}>Matching your answers with the database.</p>
        <p style={{ fontSize: '0.7rem', color: '#666', marginTop: '30px' }}>
          If not redirected, <a href={OFFER_URL} style={{color: '#FF6B9D'}}>click here</a>
        </p>
        <style>{`.spinner { width: 40px; height: 40px; border: 4px solid #333; border-top: 4px solid #FF6B9D; border-radius: 50%; margin: 20px auto; animation: spin 1s linear infinite; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '25px', color: 'white' }}>{questions[step].q}</h3>
      {questions[step].opts.map((opt) => (
        <button key={opt} onClick={handleAnswer} style={btnStyle}>{opt}</button>
      ))}
    </div>
  );
};

const containerStyle: React.CSSProperties = { 
  maxWidth: '400px', margin: '0 auto', padding: '30px', textAlign: 'center', 
  background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '24px' 
};

const btnStyle: React.CSSProperties = { 
  display: 'block', width: '100%', padding: '16px', margin: '12px 0', 
  cursor: 'pointer', border: '1px solid rgba(255, 255, 255, 0.2)', 
  borderRadius: '12px', background: 'rgba(255, 107, 157, 0.1)', 
  color: 'white', fontWeight: '600' 
};
