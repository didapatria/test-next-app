'use client';

import RedirectButton from '@/components/RedirectButton';
import { useStore } from '@/store/useStore';
import { DIRECTION } from '@/types/Direction';
import { THEME } from '@/types/Theme';
import Link from 'next/link';

export default function Test() {
  const { theme } = useStore.themeStore.theme();

  return (
    <div
      className={`relative mx-auto flex min-h-screen flex-col items-center justify-center space-y-4 px-4 text-center md:px-0 ${theme === THEME.DARK ? 'text-white' : 'text-gray-900'}`}
    >
      <RedirectButton
        href="/"
        direction={DIRECTION.BACK}
        label="Home Page"
        className="absolute top-4 left-4"
      />
      <h1 className="text-3xl font-bold">Test</h1>
      <ol
        className={`my-4 w-full list-inside list-decimal space-y-4 rounded-lg p-6 text-left shadow-lg sm:w-2/3 md:w-1/2 ${theme === THEME.DARK ? 'bg-gray-800' : 'bg-white'}`}
      >
        <li>
          <Link
            href="/test/state-management"
            className={`transition-colors hover:underline ${
              theme === THEME.DARK
                ? 'text-blue-400 hover:text-blue-500'
                : 'text-blue-800 hover:text-blue-900'
            }`}
          >
            State Management
          </Link>
        </li>
        <li>
          <Link
            href="/test/profile"
            className={`transition-colors hover:underline ${
              theme === THEME.DARK
                ? 'text-blue-400 hover:text-blue-500'
                : 'text-blue-800 hover:text-blue-900'
            }`}
          >
            User Profile
          </Link>
        </li>
        <li>
          <Link
            href="/test/test3"
            className={`transition-colors hover:underline ${
              theme === THEME.DARK
                ? 'text-blue-400 hover:text-blue-500'
                : 'text-blue-800 hover:text-blue-900'
            }`}
          >
            Test 3
          </Link>
        </li>
      </ol>
    </div>
  );
}
