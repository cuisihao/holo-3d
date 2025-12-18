import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_SETS, TYPE_COLORS } from '../constants';
import { PokemonCard } from '../types';
import { HolofoilCard } from '../components/HolofoilCard';
import { X, Share2, Heart, Info } from 'lucide-react';

const CardDetail: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();
  const [card, setCard] = useState<PokemonCard | null>(null);

  useEffect(() => {
    // Flatten all sets to find the card
    let found: PokemonCard | undefined;
    for (const set of MOCK_SETS) {
        found = set.cards.find(c => c.id === cardId);
        if (found) break;
    }
    // Fallback for demo if refreshing on a generated ID that isn't in initial MOCK_SETS
    if (!found && MOCK_SETS[0].cards.length > 0) {
        found = MOCK_SETS[0].cards[0];
    }
    setCard(found || null);
  }, [cardId]);

  if (!card) return <div className="min-h-screen flex items-center justify-center text-white">Searching Archives...</div>;

  const typeColor = TYPE_COLORS[card.types[0]]?.split(' ')[0].replace('from-', 'text-') || 'text-gray-400';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
       {/* Ambient Background based on type */}
       <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${TYPE_COLORS[card.types[0]] || 'from-gray-900 to-black'} z-0 blur-3xl`}></div>

       <button 
         onClick={() => navigate(-1)}
         className="absolute top-6 right-6 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
       >
         <X size={24} />
       </button>

       <div className="flex flex-col lg:flex-row items-center gap-12 z-10 w-full max-w-6xl">
          
          {/* The Main Stage - 3D Card */}
          <div className="flex-1 w-full flex justify-center items-center perspective-container">
             <div className="w-full max-w-[400px] aspect-[2.5/3.5]">
                <HolofoilCard card={card} isActive={true} />
                <p className="text-center text-neutral-500 text-xs mt-6 animate-pulse">
                    Hover or tilt to inspect holographic details
                </p>
             </div>
          </div>

          {/* Info Panel */}
          <div className="flex-1 w-full text-white space-y-8">
             <div>
                 <div className="flex items-center gap-4 mb-2">
                     <span className={`text-sm font-bold uppercase tracking-widest ${typeColor} border border-current px-3 py-1 rounded-full`}>
                        {card.types.join(' / ')}
                     </span>
                     <span className="text-neutral-400 text-sm font-mono">{card.rarity}</span>
                 </div>
                 <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">{card.name}</h1>
                 <p className="text-xl text-neutral-300 leading-relaxed font-light border-l-4 border-white/20 pl-6">
                    "{card.description}"
                 </p>
             </div>

             {/* Stats Grid */}
             <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-md">
                     <span className="text-neutral-400 text-xs uppercase tracking-wider block mb-1">Hit Points</span>
                     <span className="text-2xl font-bold text-red-400">{card.hp}</span>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-md">
                     <span className="text-neutral-400 text-xs uppercase tracking-wider block mb-1">Set Number</span>
                     <span className="text-2xl font-bold">{card.id.split('-')[1]} <span className="text-sm text-neutral-500">/ {card.setId}</span></span>
                 </div>
             </div>

             {/* Actions */}
             <div className="flex gap-4 pt-4">
                 <button className="flex-1 py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                     <Heart className="text-red-500 fill-current" size={20} />
                     Add to Favorites
                 </button>
                 <button className="px-6 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/10">
                     <Share2 size={20} />
                 </button>
                 <button className="px-6 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/10">
                     <Info size={20} />
                 </button>
             </div>
          </div>
       </div>
    </div>
  );
};

export default CardDetail;