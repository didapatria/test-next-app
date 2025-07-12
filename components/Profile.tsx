'use client';

import Link from 'next/link';
import { useStore } from '../store/useStore';
import { THEME } from '@/types/Theme';

export default function Profile() {
  const { user, theme, logout } = useStore();

  if (!user.isAuthenticated) {
    return (
      <div
        className={`my-4 w-full space-y-4 rounded-lg p-6 shadow-lg sm:w-2/3 md:w-1/2 ${
          theme === THEME.DARK ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <div className="space-y-4 text-center">
          <p className={` ${theme === THEME.DARK ? 'text-gray-400' : 'text-gray-500'}`}>
            Please login to view your profile
          </p>
          <div
            className={`mx-4 space-x-1 text-sm ${theme === THEME.DARK ? 'text-gray-500' : 'text-gray-400'}`}
          >
            <span>Go to</span>
            <Link
              href="/test/state-management"
              className={`transition-colors hover:underline ${
                theme === THEME.DARK
                  ? 'text-blue-400 hover:text-blue-500'
                  : 'text-blue-800 hover:text-blue-900'
              }`}
            >
              State Management Page
            </Link>
            <span>or click the Login button in the navigation bar</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`my-4 w-full space-y-6 rounded-lg p-6 shadow-lg sm:w-2/3 md:w-1/2 ${
        theme === THEME.DARK ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-5xl font-bold text-white">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div className="space-y-4 text-left">
          <div className="grid grid-cols-1 gap-4">
            <div
              className={`rounded-lg p-4 ${theme === THEME.DARK ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <label
                className={`mb-1 block text-sm font-medium ${
                  theme === THEME.DARK ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                User ID
              </label>
              <p className="text-lg font-semibold">{user.id}</p>
            </div>

            <div
              className={`rounded-lg p-4 ${theme === THEME.DARK ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <label
                className={`mb-1 block text-sm font-medium ${
                  theme === THEME.DARK ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Username
              </label>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>

            <div
              className={`rounded-lg p-4 ${theme === THEME.DARK ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <label
                className={`mb-1 block text-sm font-medium ${
                  theme === THEME.DARK ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Email
              </label>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>

            <div
              className={`rounded-lg p-4 ${theme === THEME.DARK ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <label
                className={`mb-1 block text-sm font-medium ${
                  theme === THEME.DARK ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Password
              </label>
              <div className="flex items-center space-x-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    theme === THEME.DARK
                      ? 'bg-green-900 text-green-200'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  <span className="mr-1 h-2 w-2 rounded-full bg-green-400"></span>
                  Securely Hashed
                </span>
                <span
                  className={`text-sm ${theme === THEME.DARK ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  ({user.password.length} characters)
                </span>
              </div>
            </div>

            <div
              className={`rounded-lg p-4 ${theme === THEME.DARK ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <label
                className={`mb-1 block text-sm font-medium ${
                  theme === THEME.DARK ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Status
              </label>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  theme === THEME.DARK
                    ? 'bg-green-900 text-green-200'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                <span className="mr-1 h-2 w-2 rounded-full bg-green-400"></span>
                {user.isAuthenticated ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => alert('Edit profile functionality coming soon!')}
            className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Edit Profile
          </button>

          <button
            onClick={() => alert('Settings functionality coming soon!')}
            className="w-full rounded-lg bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
          >
            Settings
          </button>

          <button
            onClick={logout}
            className="w-full rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className={`rounded-lg p-3 ${theme === THEME.DARK ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-2xl font-bold text-blue-500">26</div>
            <div className={`text-sm ${theme === THEME.DARK ? 'text-gray-300' : 'text-gray-600'}`}>
              Projects
            </div>
          </div>
          <div className={`rounded-lg p-3 ${theme === THEME.DARK ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-2xl font-bold text-green-500">07</div>
            <div className={`text-sm ${theme === THEME.DARK ? 'text-gray-300' : 'text-gray-600'}`}>
              Tasks
            </div>
          </div>
          <div className={`rounded-lg p-3 ${theme === THEME.DARK ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-2xl font-bold text-purple-500">1999</div>
            <div className={`text-sm ${theme === THEME.DARK ? 'text-gray-300' : 'text-gray-600'}`}>
              Points
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
