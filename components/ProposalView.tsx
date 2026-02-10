import React from 'react';
import RunawayButton from './RunawayButton';
import CountdownTimer from './CountdownTimer';

interface ProposalViewProps {
  onYes: () => void;
}

const ProposalView: React.FC<ProposalViewProps> = ({ onYes }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center z-10 relative">
      <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border-4 border-pink-200 max-w-2xl w-full mx-4">
        <div className="mb-8">
            <img 
                src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
                alt="Cute bear asking" 
                className="w-48 h-48 mx-auto object-contain mb-6 rounded-xl"
            />
            <h1 className="text-4xl md:text-6xl font-cursive text-red-500 mb-4 leading-tight">
            Zostaniesz moją Walentynką?
            </h1>
            <p className="text-gray-600 text-lg">Jest tylko jedna poprawna odpowiedź... 😉</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 relative min-h-[100px]">
          <button
            onClick={onYes}
            className="px-10 py-4 bg-red-500 hover:bg-red-600 text-white text-xl font-bold rounded-full transition-all transform hover:scale-110 shadow-lg hover:shadow-red-500/50"
          >
            TAK! 😍
          </button>
          
          <div className="relative">
             <RunawayButton label="Nie 😢" onClick={() => alert("Dobra próba! Ale nie możesz odmówić! 😉")} />
          </div>
        </div>
        
        <div className="mt-8 border-t border-pink-100 pt-6">
          <CountdownTimer />
        </div>
      </div>
    </div>
  );
};

export default ProposalView;