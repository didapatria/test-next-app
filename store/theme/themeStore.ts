import { THEME, Theme } from '@/types/Theme';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        theme: THEME.LIGHT,
        setTheme: (theme) => set(() => ({ theme })),
      }),
      {
        name: 'theme-storage',
      }
    )
  )
);
