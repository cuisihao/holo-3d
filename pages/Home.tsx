import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_SETS } from '../constants';
import { CardSet } from '../types';
import { Layers, ChevronDown } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [visibleSets, setVisibleSets] = useState<CardSet[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Simulate infinite scroll data loading
  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    
    setTimeout(() => {
      // In a real app, we fetch next page. Here we just cycle the mock sets to simulate infinite content.
      const nextSets = [...MOCK_SETS]; 
      setVisibleSets(prev => [...prev, ...nextSets]);
      setPage(prev => prev + 1);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadMore(); // Initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div className="pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 pt-12">
         <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Your Collections</h2>
            <p className="text-neutral-400">Select a deck to view your holographic cards.</p>
         </div>

         <div className="space-y-24">
            {visibleSets.map((set, index) => {
                const isEven = index % 2 === 0;
                return (
                    <div 
                        key={`${set.id}-${index}`} 
                        className="group relative cursor-pointer"
                        onClick={() => navigate(`/set/${set.id}`)}
                    >
                        {/* Deck Visual Representation */}
                        <div className={`relative flex items-center ${isEven ? 'justify-start' : 'justify-end'} transition-transform duration-500 group-hover:scale-105`}>
                            {/* The Card Stack Visuals */}
                            <div className="relative w-64 h-80 sm:w-72 sm:h-96">
                                {/* Background cards in stack */}
                                <div className="absolute top-0 left-0 w-full h-full bg-neutral-800 rounded-2xl border border-neutral-700 transform translate-x-4 translate-y-4 rotate-6 shadow-2xl z-0"></div>
                                <div className="absolute top-0 left-0 w-full h-full bg-neutral-800 rounded-2xl border border-neutral-700 transform -translate-x-2 translate-y-2 -rotate-3 shadow-xl z-10"></div>
                                
                                {/* Main Cover Card */}
                                <div className="absolute top-0 left-0 w-full h-full bg-neutral-900 rounded-2xl border-2 border-neutral-600 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] z-20 transform transition-transform group-hover:-translate-y-4">
                                    <img src={set.coverImage} alt={set.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent">
                                        <div className="absolute bottom-0 left-0 p-6 w-full">
                                            <h3 className="text-2xl font-bold text-white mb-1">{set.name}</h3>
                                            <div className="flex items-center justify-between text-sm text-neutral-400">
                                                <span>{set.series}</span>
                                                <span className="flex items-center gap-1"><Layers size={14}/> {set.totalCards}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                                </div>
                            </div>

                            {/* Description Text (offset) */}
                            <div className={`hidden md:block absolute w-64 ${isEven ? 'left-80 text-left' : 'right-80 text-right'}`}>
                                <span className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-2 block">Release: {set.releaseDate}</span>
                                <p className="text-neutral-400 text-sm leading-relaxed">
                                    Explore the {set.name} collection featuring {set.totalCards} unique cards. 
                                    Contains highly sought-after Holofoil rares from the {set.series} era.
                                </p>
                                <div className={`mt-4 h-0.5 w-12 bg-neutral-700 ${isEven ? '' : 'ml-auto'}`}></div>
                            </div>
                        </div>
                    </div>
                );
            })}
         </div>

         {loading && (
             <div className="flex justify-center py-12">
                 <ChevronDown className="animate-bounce text-neutral-500" size={32} />
             </div>
         )}
      </div>
    </div>
  );
};

export default Home;