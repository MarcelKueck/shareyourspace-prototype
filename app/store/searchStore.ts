import { create } from 'zustand';
import { SpaceType } from '../lib/types';

interface SearchState {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  spaceType: SpaceType | null;
  setSearchFilters: (filters: { 
    checkIn: Date | null; 
    checkOut: Date | null; 
    guests: number;
    spaceType: SpaceType | null;
  }) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  checkIn: null,
  checkOut: null,
  guests: 1,
  spaceType: null,
  setSearchFilters: (filters) => set(filters),
}));
