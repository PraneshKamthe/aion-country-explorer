import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Country {
  cca2: string;
  name: {
    common: string;
  };
  flags: {
    svg: string;
    alt?: string;
  };
  population: number;
  region: string;
  capital?: string[];
}

interface FavoritesState {
  favorites: Country[];
  addFavorite: (country: Country) => void;
  removeFavorite: (cca2: string) => void;
  isFavorite: (cca2: string) => boolean;
  toggleFavorite: (country: Country) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (country) => {
        const { favorites } = get();
        if (!favorites.find(fav => fav.cca2 === country.cca2)) {
          set({ favorites: [...favorites, country] });
        }
      },
      removeFavorite: (cca2) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(fav => fav.cca2 !== cca2) });
      },
      isFavorite: (cca2) => {
        const { favorites } = get();
        return favorites.some(fav => fav.cca2 === cca2);
      },
      toggleFavorite: (country) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(country.cca2)) {
          removeFavorite(country.cca2);
        } else {
          addFavorite(country);
        }
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);