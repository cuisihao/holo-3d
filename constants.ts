import { CardSet, PokemonCard } from './types';

// Helper to generate mock cards
const generateCards = (setId: string, count: number): PokemonCard[] => {
  const bases: Partial<PokemonCard>[] = [
    { name: 'Charizard', types: ['Fire'], hp: 120, rarity: 'Ultra Rare', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png' },
    { name: 'Blastoise', types: ['Water'], hp: 100, rarity: 'Rare', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png' },
    { name: 'Venusaur', types: ['Grass', 'Poison'], hp: 100, rarity: 'Rare', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png' },
    { name: 'Pikachu', types: ['Lightning'], hp: 60, rarity: 'Common', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' },
    { name: 'Mewtwo', types: ['Psychic'], hp: 130, rarity: 'Holofoil', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png' },
    { name: 'Gengar', types: ['Ghost', 'Poison'], hp: 80, rarity: 'Holofoil', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png' },
    { name: 'Eevee', types: ['Normal'], hp: 50, rarity: 'Common', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png' },
    { name: 'Snorlax', types: ['Normal'], hp: 140, rarity: 'Rare', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png' },
    { name: 'Gyarados', types: ['Water', 'Flying'], hp: 130, rarity: 'Holofoil', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png' },
    { name: 'Dragonite', types: ['Dragon', 'Flying'], hp: 150, rarity: 'Ultra Rare', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png' },
  ];

  return Array.from({ length: count }).map((_, i) => {
    const base = bases[i % bases.length];
    return {
      id: `${setId}-${i + 1}`,
      name: base.name || 'Unknown',
      hp: base.hp || 50,
      types: base.types || ['Normal'],
      image: base.image || '',
      rarity: i % 3 === 0 ? 'Holofoil' : 'Common',
      description: `A powerful ${base.name} card with unique abilities suitable for any deck.`,
      setId: setId
    };
  });
};

export const MOCK_SETS: CardSet[] = [
  {
    id: 'base-set',
    name: 'Base Set Origins',
    series: 'Original',
    totalCards: 102,
    releaseDate: '1999-01-09',
    coverImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png', // Charizard cover
    cards: generateCards('base-set', 24)
  },
  {
    id: 'jungle',
    name: 'Jungle Expansion',
    series: 'Original',
    totalCards: 64,
    releaseDate: '1999-06-16',
    coverImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/123.png', // Scyther cover
    cards: generateCards('jungle', 24)
  },
  {
    id: 'fossil',
    name: 'Fossil Excavation',
    series: 'Original',
    totalCards: 62,
    releaseDate: '1999-10-10',
    coverImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/142.png', // Aerodactyl cover
    cards: generateCards('fossil', 24)
  },
  {
    id: 'rocket',
    name: 'Team Rocket',
    series: 'Original',
    totalCards: 82,
    releaseDate: '2000-04-24',
    coverImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png', // Arbok cover
    cards: generateCards('rocket', 24)
  }
];

export const TYPE_COLORS: Record<string, string> = {
  Fire: 'from-orange-500 to-red-600',
  Water: 'from-blue-400 to-blue-600',
  Grass: 'from-green-400 to-green-600',
  Lightning: 'from-yellow-300 to-yellow-500',
  Psychic: 'from-purple-400 to-purple-600',
  Fighting: 'from-orange-700 to-red-800',
  Darkness: 'from-gray-700 to-black',
  Metal: 'from-gray-300 to-gray-500',
  Dragon: 'from-indigo-500 to-purple-700',
  Fairy: 'from-pink-300 to-pink-500',
  Normal: 'from-gray-400 to-gray-500',
  Ghost: 'from-purple-800 to-indigo-900',
  Poison: 'from-purple-500 to-pink-600'
};