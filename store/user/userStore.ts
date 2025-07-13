import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  hashPasswordSync,
  validatePassword,
  getPasswordStrength,
  PasswordStrength,
  PasswordValidationRule,
} from '@/utils/password';
import { uiStore as uiUserStore } from './ui';
import { uiStore } from '../ui';
import { LoginCredentials, LoginResponse } from '@/types/api';

interface UserState {
  user: {
    id: string | null;
    name: string;
    username: string;
    email: string;
    password: string;
    isAuthenticated: boolean;
  };
  loginForm: {
    username: string;
    password: string;
  };
  loginFormErrors: {
    username: string;
    password: string;
    passwordErrors: string[];
  };
  passwordValidation: {
    isValid: boolean;
    errors: string[];
    rules: PasswordValidationRule[];
    strength: PasswordStrength;
  };
  logout: () => void;
  setLoginFormData: (data: Partial<UserState['loginForm']>) => void;
  setLoginFormErrors: (errors: Partial<UserState['loginFormErrors']>) => void;
  validatePasswordRealTime: (password: string) => void;
  clearLoginForm: () => void;
  submitLoginForm: () => Promise<boolean>;
  loginWithAPI: (credentials: LoginCredentials) => Promise<boolean>;
}

const store = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: {
          id: null as string | null,
          name: '',
          username: '',
          email: '',
          password: '',
          isAuthenticated: false,
        },
        loginForm: {
          username: '',
          password: '',
        },
        loginFormErrors: {
          username: '',
          password: '',
          passwordErrors: [],
        },
        passwordValidation: {
          isValid: false,
          errors: [],
          rules: [],
          strength: PasswordStrength.WEAK,
        },
        logout: () =>
          set(() => ({
            user: {
              id: null as string | null,
              name: '',
              username: '',
              email: '',
              password: '',
              isAuthenticated: false,
            },
          })),
        setLoginFormData: (data) =>
          set((state) => ({
            loginForm: { ...state.loginForm, ...data },
          })),
        setLoginFormErrors: (errors) =>
          set((state) => ({
            loginFormErrors: { ...state.loginFormErrors, ...errors },
          })),
        validatePasswordRealTime: (password) => {
          const validation = validatePassword(password);
          const strength = getPasswordStrength(password);

          set(() => ({
            passwordValidation: {
              isValid: validation.isValid,
              errors: validation.errors,
              rules: validation.rules,
              strength: strength,
            },
            loginFormErrors: {
              username: store.getState().loginFormErrors.username,
              password: '',
              passwordErrors: validation.errors,
            },
          }));
        },
        clearLoginForm: () =>
          set(() => ({
            loginForm: { username: '', password: '' },
            loginFormErrors: { username: '', password: '', passwordErrors: [] },
            passwordValidation: {
              isValid: false,
              errors: [],
              rules: [],
              strength: PasswordStrength.WEAK,
            },
          })),
        submitLoginForm: async (): Promise<boolean> => {
          const state = store.getState();
          const { loginForm } = state;
          const errors = {
            username: '',
            password: '',
            passwordErrors: [] as string[],
          };

          if (!loginForm.username.trim()) {
            errors.username = 'Username is required';
          }
          if (!loginForm.password.trim()) {
            errors.password = 'Password is required';
            errors.passwordErrors = ['Password is required'];
          }

          store.setState({ loginFormErrors: errors });

          if (!errors.username && errors.password.length === 0) {
            return await store.getState().loginWithAPI(loginForm);
          }
          return false;
        },
        loginWithAPI: async (credentials: LoginCredentials) => {
          uiStore.loading.getState().startLoading();

          try {
            const response = await fetch('/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials),
            });

            const result: LoginResponse = await response.json();

            if (result.success && result.data) {
              set(() => ({
                user: {
                  ...result.data!,
                  password: hashPasswordSync(credentials.password),
                  isAuthenticated: true,
                },
                loginForm: { username: '', password: '' },
                loginFormErrors: { username: '', password: '', passwordErrors: [] },
                passwordValidation: {
                  isValid: false,
                  errors: [],
                  rules: [],
                  strength: PasswordStrength.WEAK,
                },
              }));

              uiStore.toast.getState().showToast('Login successful', 'success', '/test/profile');
              return true;
            } else {
              set(() => ({
                loginFormErrors: {
                  username: '',
                  password: result.message || 'Login failed',
                  passwordErrors: [],
                },
              }));
              uiStore.toast.getState().showToast(result.message || 'Login failed', 'error');
              return false;
            }
          } catch (error) {
            console.error('Login error:', error);
            set(() => ({
              loginFormErrors: {
                username: '',
                password: 'Network error. Please try again.',
                passwordErrors: [],
              },
            }));
            uiStore.toast.getState().showToast('Network error. Please try again.', 'error');
            return false;
          } finally {
            uiStore.loading.getState().stopLoading();
          }
        },
      }),
      {
        name: 'user-storage',
        partialize: (state) => ({
          user: state.user,
        }),
      }
    )
  )
);

const unsubscribe = store.subscribe((state) => {
  const isAuthenticated = state.user.isAuthenticated;
  if (isAuthenticated) {
    unsubscribe();
    uiUserStore.modal.getState().closeLoginModal();
  }
});

export const useUserStore = store;
