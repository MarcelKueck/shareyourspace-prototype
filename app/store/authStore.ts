import { create } from 'zustand';
import { User, users } from '../lib/dummy-data';

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  currentUser: null,
  
  login: (email: string) => {
    const user = users.find(u => u.email === email);
    if (user) {
      set({ isAuthenticated: true, currentUser: user });
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({ isAuthenticated: false, currentUser: null });
  },
}));
