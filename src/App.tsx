import Home from "./pages/Home";

function App() {
  return <Home />;
}

export default App;
// src/App.tsx
import React from 'react';
import { MakeupFunnel } from './components/MakeupFunnel'; // Import your new component

function App() {
  return (
    <div className="App">
      {/* This renders your entire funnel flow */}
      <MakeupFunnel />
    </div>
  );
}

export default App;
