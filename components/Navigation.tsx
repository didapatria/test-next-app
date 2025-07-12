'use client';

import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { THEME } from '@/types/Theme';
import { useState } from 'react';
import LoginModal from './LoginModal';

export default function Navigation() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { user, theme } = useStore();

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-40 w-full border-b ${
        theme === THEME.DARK ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link
                href="/"
                className={`text-xl font-bold ${
                  theme === THEME.DARK ? 'text-white' : 'text-gray-900'
                }`}
              >
                Test Next App
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user.isAuthenticated ? (
              <div
                className={`flex items-center space-x-2 ${
                  theme === THEME.DARK ? 'text-white' : 'text-gray-900'
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden text-sm font-medium sm:block">{user.name}</span>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="rounded-md bg-blue-500 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-600"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </nav>
  );
}
