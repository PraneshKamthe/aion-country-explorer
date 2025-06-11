import { create } from 'zustand';

interface SearchState {
  searchTerm: string;
  selectedRegion: string;
  setSearchTerm: (term: string) => void;
  setSelectedRegion: (region: string) => void;
  clearFilters: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchTerm: '',
  selectedRegion: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  clearFilters: () => set({ searchTerm: '', selectedRegion: '' }),
}));