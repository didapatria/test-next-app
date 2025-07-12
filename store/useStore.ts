import { THEME, Theme } from '@/types/Theme';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
  count: number;
  user: {
    id: string | null;
    name: string;
    email: string;
    isAuthenticated: boolean;
  };
  theme: Theme;
  isLoading: boolean;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setUser: (user: Partial<AppState['user']>) => void;
  logout: () => void;
  setTheme: (theme: Theme) => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        user: {
          id: null,
          name: '',
          email: '',
          isAuthenticated: false,
        },
        theme: THEME.LIGHT,
        isLoading: false,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set(() => ({ count: 0 })),
        setUser: (userData) =>
          set((state) => ({
            user: { ...state.user, ...userData },
          })),
        logout: () =>
          set(() => ({
            user: {
              id: null,
              name: '',
              email: '',
              isAuthenticated: false,
            },
          })),
        setTheme: (theme) => set(() => ({ theme })),
        setLoading: (isLoading) => set(() => ({ isLoading })),
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({
          user: state.user,
          theme: state.theme,
          count: state.count,
        }),
      }
    )
  )
);
