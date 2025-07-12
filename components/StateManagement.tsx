'use client';

import { THEME } from '@/types/Theme';
import { useStore } from '@/store/useStore';

export default function StateManagement() {
  const {
    count,
    user,
    theme,
    isLoading,
    increment,
    decrement,
    reset,
    setUser,
    logout,
    setTheme,
    setLoading,
  } = useStore();

  const handleLogin = () => {
    setUser({
      id: '1',
      name: 'Dida Patria',
      email: 'didapatria3@gmail.com',
      isAuthenticated: true,
    });
  };

  const toggleTheme = () => {
    setTheme(theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
  };

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div
      className={`w-full space-y-4 rounded-lg p-6 shadow-lg sm:w-2/3 md:w-1/2 ${theme === THEME.DARK ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
    >
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Counter: {count}</h3>
        <div className="space-x-2">
          <button
            onClick={increment}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Increment
          </button>
          <button
            onClick={decrement}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Decrement
          </button>
          <button
            onClick={reset}
            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">User Authentication</h3>
        {user.isAuthenticated ? (
          <div className="space-y-2">
            <p>Welcome, {user.name}!</p>
            <p>Email: {user.email}</p>
            <button
              onClick={logout}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Login
          </button>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Theme: {theme}</h3>
        <button
          onClick={toggleTheme}
          className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
        >
          Toggle Theme
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Loading State</h3>
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-gray-900"></div>
            <span>Loading...</span>
          </div>
        ) : (
          <button
            onClick={simulateLoading}
            className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
          >
            Simulate Loading
          </button>
        )}
      </div>
    </div>
  );
}
