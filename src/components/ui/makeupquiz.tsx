import React, { useState, useEffect } from 'react';

interface BridgeProps {
  onComplete: () => void;
}

export const SephoraBridge: React.FC<BridgeProps> = ({ onComplete }) => {
  const [view, setView] = useState<'VOTE' | 'VERIFYING'>('VOTE');

  // Automatically triggers the final redirect after the "Verification" animation
  useEffect(() => {
    if (view === 'VERIFYING') {
      const timer = setTimeout(() => {
        onComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [view, onComplete]);

  if (view === 'VERIFYING') {
    return (
      <div style={containerStyle}>
        <div className="pulse-loader"></div>
        <h2 style={{ color: '#FF6B9D', marginBottom: '10px', fontSize: '1.6rem' }}>Verifying Spot...</h2>
        <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.5' }}>
          Checking if YOU are eligible for the <br/> 
          <strong>$750 Reward Program</strong>
        </p>
        <style>{`
          .pulse-loader { 
            width: 60px; height: 60px; background: #FF6B9D; 
            border-radius: 50%; margin: 30px auto; 
            animation: pulse 1s infinite ease-in-out; 
          }
          @keyframes pulse {
            0% { transform: scale(0.8); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(0.8); opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* High-Tension Hook */}
      <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: 'white', fontWeight: '800' }}>
        Is a $20 mascara getting ridiculous? 💸
      </h3>
      
      <p style={{ color: '#bbb', marginBottom: '25px', fontSize: '0.95rem' }}>
        Cast your vote to see if you qualify for a <strong>$750 Sephora Reward</strong> to offset inflation.
      </p>

      <button onClick={() => setView('VERIFYING')} style={btnStyle}>
        YES - IT'S CRAZY
      </button>
      
      <button onClick={() => setView('VERIFYING')} style={btnStyleSecondary}>
        NO - I LOVE THE LUXURY
      </button>

      <div style={{ marginTop: '20px', fontSize: '0.75rem', color: '#666' }}>
        *Survey completion required. First-come, first-served.
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = { 
  maxWidth: '420px', margin: '40px auto', padding: '30px', textAlign: 'center', 
  background: '#121212', // Darker background for "Premium" feel
  border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '28px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
};

const btnStyle: React.CSSProperties = { 
  display: 'block', width: '100%', padding: '18px', margin: '12px 0', 
  cursor: 'pointer', border: 'none', 
  borderRadius: '14px', background: '#FF6B9D', // Sephora Pink
  color: 'white', fontWeight: '800', fontSize: '1.1rem', transition: 'transform 0.1s'
};

const btnStyleSecondary: React.CSSProperties = { 
  ...btnStyle,
  background: 'transparent',
  border: '1px solid #444',
  color: '#888',
  fontWeight: '400',
  fontSize: '0.9rem'
};
