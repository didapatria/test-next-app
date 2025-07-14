'use client';

import RedirectButton from '@/components/RedirectButton';
import { DIRECTION } from '@/types/Direction';
import { useStore } from '@/store/useStore';
import { THEME } from '@/types/Theme';

export default function Home() {
  const { theme } = useStore.themeStore.theme();

  return (
    <div
      className={`relative container mx-auto flex min-h-[calc(100vh-65px)] flex-col items-center justify-center space-y-4 px-4 text-center md:px-0 ${
        theme === THEME.DARK ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <h1
        className={`text-3xl font-bold sm:text-4xl md:text-5xl md:whitespace-nowrap ${
          theme === THEME.DARK ? 'text-white' : 'text-gray-900'
        }`}
      >
        Welcome to the Test Next App
      </h1>
      <p
        className={`sm:text-lg md:text-xl md:whitespace-nowrap ${
          theme === THEME.DARK ? 'text-gray-300' : 'text-slate-500'
        }`}
      >
        This is a simple Next.js application, intended for practicing state management using
        Zustand.
      </p>
      <RedirectButton href="/test" direction={DIRECTION.FORWARD} label="Test Page" />
    </div>
  );
}
