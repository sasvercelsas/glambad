// src/App.tsx
import React from 'react';
import { MakeupFunnel } from './components/Makeupquiz';

function App() {
  return (
    <div className="App">
      {/* The funnel is the entry point of the site */}
      <MakeupFunnel />
    </div>
  );
}

export default App;
