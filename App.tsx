import React, { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import ProposalView from './components/ProposalView';
import SuccessView from './components/SuccessView';
import MusicPlayer from './components/MusicPlayer';

const App: React.FC = () => {
  const [yesPressed, setYesPressed] = useState(false);

  return (
    <div className="relative min-h-screen bg-pink-50 overflow-hidden">
      <FloatingHearts />
      <MusicPlayer />
      
      {yesPressed ? (
        <SuccessView reset={() => setYesPressed(false)} />
      ) : (
        <ProposalView onYes={() => setYesPressed(true)} />
      )}
      
      <div className="fixed bottom-2 right-2 text-xs text-pink-300 pointer-events-none">
        Zrobione z ❤️
      </div>
    </div>
  );
};

export default App;