export interface PokemonCard {
  id: string;
  name: string;
  hp: number;
  types: string[];
  image: string;
  rarity: 'Common' | 'Rare' | 'Holofoil' | 'Ultra Rare';
  description: string;
  subtypes?: string[];
  setId: string;
}

export interface CardSet {
  id: string;
  name: string;
  series: string;
  totalCards: number;
  releaseDate: string;
  coverImage: string;
  cards: PokemonCard[];
}

export interface User {
  username: string;
  role: 'admin' | 'user';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}