'use client';

import { useStore } from '@/store/useStore';
import { THEME } from '@/types/Theme';
import { FaEye, FaEyeSlash, FaRegEye, FaRegEyeSlash, FaCheck, FaX } from 'react-icons/fa6';
import { getPasswordStrengthColor, getPasswordStrengthBgColor } from '@/utils/password';

export default function LoginModal() {
  const { theme } = useStore.themeStore.theme();
  const {
    loginForm,
    loginFormErrors,
    passwordValidation,
    setLoginFormData,
    setLoginFormErrors,
    validatePasswordRealTime,
    submitLoginForm,
    clearLoginForm,
  } = useStore.userStore.user();
  const { isPasswordVisible, togglePasswordVisibility } =
    useStore.userStore.ui.passwordVisibility();
  const { isLoginModalOpen, closeLoginModal } = useStore.userStore.ui.modal();
  const { isLoading } = useStore.uiStore.loading();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData({ [name]: value });
    if (name === 'password') {
      validatePasswordRealTime(value);
    }
    if (name === 'username' && loginFormErrors.username) {
      setLoginFormErrors({ username: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      await submitLoginForm();
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      clearLoginForm();
      closeLoginModal();
    }
  };

  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-transparent backdrop-blur-xs" onClick={handleClose} />

      <div
        className={`relative mx-4 w-full max-w-md rounded-lg p-6 shadow-xl ${
          theme === THEME.DARK ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            className={`text-2xl font-bold ${
              theme === THEME.DARK ? 'text-white' : 'text-gray-900'
            }`}
          >
            Login
          </h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className={`text-sm ${
              theme === THEME.DARK
                ? 'text-gray-300 hover:text-white'
                : 'text-gray-500 hover:text-gray-700'
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <FaX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label
              htmlFor="username"
              className={`mb-1 block text-sm font-medium ${
                theme === THEME.DARK ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginForm.username}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 ${
                theme === THEME.DARK
                  ? `border-gray-600 bg-gray-700 text-white placeholder-gray-400 ${
                      loginFormErrors.username ? 'border-red-500' : 'border-gray-600'
                    }`
                  : `bg-white text-gray-900 placeholder-gray-500 ${
                      loginFormErrors.username ? 'border-red-500' : 'border-gray-300'
                    }`
              }`}
              placeholder="Enter your username"
            />
            {loginFormErrors.username && (
              <p className="mt-1 text-sm text-red-500">{loginFormErrors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className={`mb-1 block text-sm font-medium ${
                theme === THEME.DARK ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                disabled={isLoading}
                autoComplete="off"
                className={`w-full rounded-md border px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 ${
                  theme === THEME.DARK
                    ? `border-gray-600 bg-gray-700 text-white placeholder-gray-400 ${
                        loginFormErrors.password.length > 0 ? 'border-red-500' : 'border-gray-600'
                      }`
                    : `bg-white text-gray-900 placeholder-gray-500 ${
                        loginFormErrors.password.length > 0 ? 'border-red-500' : 'border-gray-300'
                      }`
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
                className={`absolute inset-y-0 right-3 flex items-center disabled:cursor-not-allowed disabled:opacity-50 ${
                  theme === THEME.DARK
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {isPasswordVisible ? (
                  theme === THEME.DARK ? (
                    <FaEyeSlash />
                  ) : (
                    <FaRegEyeSlash />
                  )
                ) : theme === THEME.DARK ? (
                  <FaEye />
                ) : (
                  <FaRegEye />
                )}
              </button>
            </div>
            {loginFormErrors.password && (
              <p className="mt-1 text-sm text-red-500">{loginFormErrors.password}</p>
            )}
            {loginForm.password && (
              <div className="mt-2">
                <div className="mb-1 flex items-center justify-between">
                  <span
                    className={`text-xs font-medium ${
                      theme === THEME.DARK ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    Password Strength
                  </span>
                  <span
                    className={`text-xs font-medium capitalize ${getPasswordStrengthColor(
                      passwordValidation.strength
                    )}`}
                  >
                    {passwordValidation.strength.replace('_', ' ')}
                  </span>
                </div>
                <div
                  className={`h-2 w-full rounded-full bg-gray-200 ${
                    theme === THEME.DARK ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthBgColor(
                      passwordValidation.strength
                    )}`}
                    style={{
                      width: `${(passwordValidation.rules.filter((r) => r.isValid).length / passwordValidation.rules.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {loginForm.password && passwordValidation.rules.length > 0 && (
              <div className="mt-3">
                <h4
                  className={`mb-2 text-xs font-medium ${
                    theme === THEME.DARK ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Password Requirements
                </h4>
                <div className="space-y-1">
                  {passwordValidation.rules.map((rule) => (
                    <div key={rule.id} className="flex items-center space-x-2">
                      <div
                        className={`text-xs ${rule.isValid ? 'text-green-500' : 'text-red-500'}`}
                      >
                        {rule.isValid ? <FaCheck /> : <FaX />}
                      </div>
                      <span
                        className={`text-xs ${
                          rule.isValid
                            ? theme === THEME.DARK
                              ? 'text-green-400'
                              : 'text-green-600'
                            : theme === THEME.DARK
                              ? 'text-red-400'
                              : 'text-red-600'
                        }`}
                      >
                        {rule.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className={`flex-1 rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                theme === THEME.DARK
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex flex-1 items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isLoading ? (
                <>
                  <svg
                    className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
