import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  hashPasswordSync,
  validatePassword,
  getPasswordStrength,
  PasswordStrength,
  PasswordValidationRule,
} from '@/utils/password';
import { useModalStore } from './ui/modalStore';

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
    password: string[];
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
  submitLoginForm: () => boolean;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: {
          id: null,
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
          password: [],
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
              id: null,
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
              username: useUserStore.getState().loginFormErrors.username,
              password: validation.errors,
            },
          }));
        },
        clearLoginForm: () =>
          set(() => ({
            loginForm: { username: '', password: '' },
            loginFormErrors: { username: '', password: [] },
            passwordValidation: {
              isValid: false,
              errors: [],
              rules: [],
              strength: PasswordStrength.WEAK,
            },
          })),
        submitLoginForm: () => {
          const state = useUserStore.getState();
          const { loginForm, passwordValidation } = state;
          const errors = {
            username: '',
            password: [] as string[],
          };
          if (!loginForm.username.trim()) {
            errors.username = 'Username is required';
          } else if (loginForm.username.length < 3) {
            errors.username = 'Username must be at least 3 characters';
          }
          if (!loginForm.password.trim()) {
            errors.password = ['Password is required'];
          } else {
            errors.password = passwordValidation.errors;
          }
          useUserStore.setState({ loginFormErrors: errors });
          if (!errors.username && errors.password.length === 0) {
            try {
              const hashedPassword = hashPasswordSync(loginForm.password);
              useUserStore.setState({
                user: {
                  id: Date.now().toString(),
                  name: loginForm.username,
                  username: loginForm.username,
                  email: `${loginForm.username}@example.com`,
                  password: hashedPassword,
                  isAuthenticated: true,
                },
              });
              useModalStore.getState().closeLoginModal();
              if (typeof window !== 'undefined') {
                window.location.href = '/test/profile';
              }
              return true;
            } catch (error) {
              console.error('Error hashing password:', error);
              useUserStore.setState({
                loginFormErrors: {
                  ...errors,
                  password: ['Error processing password. Please try again.'],
                },
              });
              return false;
            }
          }
          return false;
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
