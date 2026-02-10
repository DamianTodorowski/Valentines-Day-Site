import React, { useState } from 'react';
import { generateRomanticPoem } from '../services/geminiService';

interface SuccessViewProps {
  reset: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ reset }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [poem, setPoem] = useState<string>("");
  const [isLoadingPoem, setIsLoadingPoem] = useState(false);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          setPhoto(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePoem = async () => {
    setIsLoadingPoem(true);
    const newPoem = await generateRomanticPoem();
    setPoem(newPoem);
    setIsLoadingPoem(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center animate-fade-in">
      <h1 className="text-5xl md:text-7xl font-cursive text-red-600 mb-8 drop-shadow-md">
        Kocham Cię &lt;3
      </h1>
      
      <p className="text-xl text-pink-700 mb-8 max-w-lg">
        Jej! Jestem teraz najszczęśliwszą osobą na świecie! 🎉
      </p>

      {/* Photo Frame */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8 group">
        <div className="absolute inset-0 bg-red-200 rounded-full animate-pulse opacity-50 blur-xl"></div>
        <div className="relative w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden bg-pink-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          {photo ? (
            <img src={photo} alt="Us" className="w-full h-full object-cover" />
          ) : (
            <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-pink-400 hover:text-pink-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-semibold">Dodaj nasze zdjęcie</span>
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
          )}
        </div>
      </div>

      {/* AI Poem Section */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-pink-200">
        {poem ? (
          <div className="mb-4">
            <h3 className="text-lg font-bold text-red-500 mb-2 font-cursive">Wiersz dla nas</h3>
            <p className="whitespace-pre-line italic text-gray-700">{poem}</p>
          </div>
        ) : (
          <p className="text-gray-500 italic mb-4">Chcesz specjalną wiadomość?</p>
        )}
        
        <button 
          onClick={handleGeneratePoem}
          disabled={isLoadingPoem}
          className="px-6 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-red-500 hover:to-pink-600 transition-all transform active:scale-95 disabled:opacity-50"
        >
          {isLoadingPoem ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Piszę...
            </span>
          ) : (
            poem ? "Napisz inny ✨" : "Napisz dla nas wiersz ✨"
          )}
        </button>
      </div>

       <button onClick={reset} className="mt-8 text-xs text-gray-400 hover:text-gray-600 underline">
        Resetuj
      </button>
    </div>
  );
};

export default SuccessView;