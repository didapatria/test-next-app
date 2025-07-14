'use client';

import Profile from '@/components/Profile';
import RedirectButton from '@/components/RedirectButton';
import { DIRECTION } from '@/types/Direction';
import { useStore } from '@/store/useStore';
import { THEME } from '@/types/Theme';

export default function ProfilePage() {
  const { theme } = useStore.themeStore.theme();
  const { user } = useStore.userStore.user();

  return (
    <div
      className={`relative mx-auto flex min-h-[calc(100vh-65px)] flex-col items-center justify-center space-y-4 px-4 text-center md:px-0 ${
        theme === THEME.DARK ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <RedirectButton
        href="/test"
        direction={DIRECTION.BACK}
        label={!user.isAuthenticated ? 'Test Page' : undefined}
        className="absolute top-4 left-4"
      />
      <h2 className="my-4 text-2xl font-bold">User Profile</h2>
      <Profile />
    </div>
  );
}
