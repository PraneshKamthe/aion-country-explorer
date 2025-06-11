import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (username: string, password: string) => {
        if (username === 'testuser' && password === 'password123') {
          set({ 
            isAuthenticated: true, 
            user: { username } 
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ 
          isAuthenticated: false, 
          user: null 
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);