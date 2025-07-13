'use client';

import RedirectButton from '@/components/RedirectButton';
import StateManagement from '@/components/StateManagement';
import { useStore } from '@/store/useStore';
import { DIRECTION } from '@/types/Direction';
import { THEME } from '@/types/Theme';

export default function StateManagementPage() {
  const { theme } = useStore.themeStore.theme();

  return (
    <div
      className={`relative mx-auto flex min-h-screen flex-col items-center justify-center space-y-4 px-4 text-center md:px-0 ${theme === THEME.DARK ? 'text-white' : 'text-gray-900'}`}
    >
      <RedirectButton
        href="/test"
        direction={DIRECTION.BACK}
        label="Test Page"
        className="absolute top-4 left-4"
      />
      <h1 className="text-3xl font-bold">State Management</h1>
      <StateManagement />
    </div>
  );
}
