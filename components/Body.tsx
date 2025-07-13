'use client';

import { useStore } from '@/store/useStore';
import { THEME } from '@/types/Theme';
import Navigation from './Navigation';
import ToastProvider from './ToastProvider';

export default function Body({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useStore.themeStore.theme();

  return (
    <body
      className={`transition-colors duration-200 ${
        theme === THEME.DARK ? 'bg-gray-900' : 'bg-slate-50'
      }`}
    >
      <Navigation />
      {children}
      <ToastProvider />
    </body>
  );
}
