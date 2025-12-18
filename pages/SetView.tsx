import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_SETS } from '../constants';
import { CardSet } from '../types';
import { HolofoilCard } from '../components/HolofoilCard';
import { ArrowLeft } from 'lucide-react';

const SetView: React.FC = () => {
  const { setId } = useParams<{ setId: string }>();
  const navigate = useNavigate();
  const [set, setSet] = useState<CardSet | null>(null);

  useEffect(() => {
    const foundSet = MOCK_SETS.find((s) => s.id === setId);
    // If not found in base mocks (due to infinite scroll logic in Home), just pick first or generate
    // In a real app, we fetch by ID. Here we fallback to first mock if specific one isn't found 
    // (or better, find one that matches the logic).
    // For this demo, we iterate MOCK_SETS.
    setSet(foundSet || MOCK_SETS[0]);
  }, [setId]);

  if (!set) return <div className="min-h-screen flex items-center justify-center">Loading Set...</div>;

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header for Set */}
      <div className="relative h-64 bg-neutral-900 overflow-hidden border-b border-neutral-800">
         <div className="absolute inset-0">
             <img src={set.coverImage} className="w-full h-full object-cover opacity-30 blur-sm" alt="" />
             <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-neutral-950"></div>
         </div>
         
         <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-end pb-8">
             <button 
                onClick={() => navigate('/')}
                className="absolute top-6 left-4 sm:left-8 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
             >
                <ArrowLeft size={20} /> Back to Collections
             </button>
             <h1 className="text-5xl font-bold text-white mb-2">{set.name}</h1>
             <div className="flex items-center gap-4 text-neutral-400 font-mono text-sm">
                 <span className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700">{set.series} Series</span>
                 <span>Released: {set.releaseDate}</span>
                 <span>{set.cards.length} / {set.totalCards} Collected</span>
             </div>
         </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
            {set.cards.map((card) => (
                <div key={card.id} className="flex flex-col gap-3 group">
                    <div className="transform transition-transform duration-300 hover:z-10 hover:scale-105">
                        <HolofoilCard 
                            card={card} 
                            onClick={() => navigate(`/card/${card.id}`)}
                        />
                    </div>
                    <div className="text-center opacity-50 group-hover:opacity-100 transition-opacity">
                        <p className="text-xs font-bold text-white truncate">{card.name}</p>
                        <p className="text-[10px] text-neutral-400">{card.id}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SetView;