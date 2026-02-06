import React, { useState, useEffect } from 'react';

// YOUR TRACKING LINK
const BASE_OFFER_URL = "https://trkfy.org/aff_c?offer_id=163&aff_id=164586";

export const MakeupFunnel: React.FC = () => {
  const [state, setState] = useState<'QUIZ' | 'ANALYSING'>('QUIZ');
  const [step, setStep] = useState(0);

  const questions = [
    { q: "What is your primary skin concern?", opts: ["Fine Lines", "Dark Spots", "Dryness", "Oily/Acne"] },
    { q: "What is your skin type?", opts: ["Oily", "Dry / Sensitive", "Combination"] },
    { q: "What's your current age?", opts: ["Under 30", "30 - 45", "45+"] }
  ];

  // Logic for automatic redirect
  useEffect(() => {
    if (state === 'ANALYSING') {
      // Prefetch the URL to make the eventual transition faster
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = BASE_OFFER_URL;
      document.head.appendChild(link);

      const redirectTimer = setTimeout(() => {
        window.location.replace(BASE_OFFER_URL);
      }, 3500); // 3.5 seconds of "Analysing"
      
      return () => clearTimeout(redirectTimer);
    }
  }, [state]);

  const handleAnswer = () => {
    if (step < questions.length - 1) {
      setStep(s => s + 1);
    } else {
      setState('ANALYSING');
    }
  };

  // --- VIEW: ANALYSING STATE ---
  if (state === 'ANALYSING') {
    return (
      <div style={containerStyle}>
        <div className="spinner"></div>
        <h2 style={{ color: '#d63384', marginBottom: '15px' }}>Analysing Your Profile...</h2>
        
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          Please wait while we match your skin profile with the current offer database.
        </p>

        {/* The Fallback Text */}
        <p style={fallbackStyle}>
          If you are not redirected automatically, <a href={BASE_OFFER_URL} style={{color: '#d63384', textDecoration: 'underline'}}>click here.</a>
        </p>

        <style>{`
          .spinner {
            width: 50px; height: 50px; border: 5px solid #f3f3f3;
            border-top: 5px solid #d63384; border-radius: 50%;
            margin: 20px auto; animation: spin 1s linear infinite;
          }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  // --- VIEW: QUIZ STATE ---
  return (
    <div style={containerStyle}>
      <div style={progBar}>
        <div style={{ ...progFill, width: `${((step + 1) / questions.length) * 100}%` }}></div>
      </div>
      <h3 style={{ fontSize: '1.4rem', marginBottom: '25px', color: '#333' }}>{questions[step].q}</h3>
      {questions[step].opts.map((opt) => (
        <button key={opt} onClick={handleAnswer} style={btnStyle}>{opt}</button>
      ))}
    </div>
  );
};

// --- STYLING ---
const containerStyle: React.CSSProperties = { 
  maxWidth: '450px', margin: '60px auto', padding: '30px', 
  textAlign: 'center', fontFamily: 'Helvetica, Arial, sans-serif',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)', borderRadius: '15px', background: '#fff' 
};

const btnStyle: React.CSSProperties = { 
  display: 'block', width: '100%', padding: '16px', margin: '12px 0', 
  cursor: 'pointer', border: '2px solid #f0f0f0', borderRadius: '10px', 
  background: '#fff', fontSize: '1rem', fontWeight: '600', transition: 'all 0.2s',
  color: '#444'
};

const progBar: React.CSSProperties = { background: '#f0f0f0', height: '8px', borderRadius: '4px', marginBottom: '30px' };
const progFill: React.CSSProperties = { background: '#d63384', height: '100%', borderRadius: '4px', transition: 'width 0.4s ease-out' };

const fallbackStyle: React.CSSProperties = { 
  fontSize: '0.85rem', color: '#999', marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '15px' 
};
