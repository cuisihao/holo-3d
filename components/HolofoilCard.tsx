import React, { useRef, useState, useCallback } from 'react';
import { PokemonCard } from '../types';
import { TYPE_COLORS } from '../constants';

interface HolofoilCardProps {
  card: PokemonCard;
  onClick?: () => void;
  isActive?: boolean; // If true, it means we are in detail view (larger, more responsive)
}

export const HolofoilCard: React.FC<HolofoilCardProps> = ({ card, onClick, isActive = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (max 20 degrees)
    // Center is (width/2, height/2)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Normalize -1 to 1
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    const rotX = normY * -25; // Invert Y for rotation
    const rotY = normX * 25; 

    setRotate({ x: rotX, y: rotY });

    // Glare position (inverted)
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    setOpacity(1);

  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setOpacity(0);
  }, []);

  const typeGradient = TYPE_COLORS[card.types[0]] || TYPE_COLORS['Normal'];

  return (
    <div
      className={`relative perspective-1000 cursor-pointer group ${isActive ? 'w-full max-w-md aspect-[2.5/3.5]' : 'w-full aspect-[2.5/3.5]'}`}
      style={{ perspective: '1000px' }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="w-full h-full transition-transform duration-100 ease-out shadow-2xl rounded-2xl transform-style-3d relative overflow-hidden"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card Base */}
        <div className={`absolute inset-0 bg-gradient-to-br ${typeGradient} p-2 sm:p-3 rounded-2xl flex flex-col`}>
          {/* Header */}
          <div className="flex justify-between items-center bg-neutral-900/80 backdrop-blur-sm rounded-t-lg px-3 py-1 mb-1 z-10">
            <span className="font-bold text-white text-xs sm:text-sm tracking-wide">{card.name}</span>
            <span className="text-red-400 font-mono text-xs sm:text-sm font-bold">{card.hp} HP</span>
          </div>

          {/* Image Container */}
          <div className="relative flex-grow bg-neutral-900 border-4 border-yellow-500/30 rounded-lg overflow-hidden shadow-inner mb-2 z-10">
             <img 
                src={card.image} 
                alt={card.name} 
                className="w-full h-full object-contain p-2 transform hover:scale-110 transition-transform duration-500" 
             />
          </div>

          {/* Details */}
          <div className="bg-neutral-100/90 rounded-lg p-2 flex-grow-0 min-h-[20%] z-10">
             <div className="flex gap-2 mb-1">
                {card.types.map(t => (
                    <span key={t} className="px-2 py-0.5 text-[10px] uppercase font-bold bg-neutral-800 text-white rounded-full">{t}</span>
                ))}
             </div>
             <p className="text-[10px] text-neutral-800 leading-tight font-serif">
                {card.description}
             </p>
          </div>
          
          {/* Footer */}
          <div className="mt-auto pt-1 flex justify-between items-center px-1 z-10">
            <span className="text-[9px] text-white/70">{card.id}/{card.setId}</span>
            <span className={`text-[9px] font-bold uppercase tracking-wider ${
                card.rarity === 'Ultra Rare' ? 'text-yellow-400' :
                card.rarity === 'Holofoil' ? 'text-purple-300' :
                card.rarity === 'Rare' ? 'text-blue-300' : 'text-neutral-400'
            }`}>
                {card.rarity}
            </span>
          </div>
          
          {/* Decorative Patterns for texture */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* Holo Effect Layer */}
        <div 
            className="card-holo absolute inset-0 pointer-events-none z-20 rounded-2xl transition-opacity duration-300"
            style={{
                '--bg-x': `${(100 - glarePos.x)}%`,
                '--bg-y': `${(100 - glarePos.y)}%`,
                '--card-opacity': opacity,
            } as React.CSSProperties}
        ></div>

        {/* Glare Layer */}
        <div
            className="card-glare absolute inset-0 pointer-events-none z-30 rounded-2xl transition-opacity duration-300"
            style={{
                '--pointer-x': `${glarePos.x}%`,
                '--pointer-y': `${glarePos.y}%`,
                '--card-opacity': opacity * 0.8,
            } as React.CSSProperties}
        ></div>
        
        {/* Thickness simulation (sides) */}
        {isActive && (
            <>
                 <div className="absolute inset-y-0 right-0 w-1 bg-white/20 transform rotate-y-90 origin-right translate-z-[-2px]"></div>
                 <div className="absolute inset-y-0 left-0 w-1 bg-black/20 transform rotate-y-90 origin-left translate-z-[-2px]"></div>
            </>
        )}
      </div>
    </div>
  );
};