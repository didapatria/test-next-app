import { THEME, Theme } from '@/types/Theme';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  hashPasswordSync,
  validatePassword,
  getPasswordStrength,
  PasswordStrength,
  PasswordValidationRule,
} from '@/utils/password';

interface AppState {
  count: number;
  user: {
    id: string | null;
    name: string;
    username: string;
    email: string;
    password: string;
    isAuthenticated: boolean;
  };
  theme: Theme;
  isLoading: boolean;
  isLoginModalOpen: boolean;
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
  isPasswordVisible: boolean;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  logout: () => void;
  setTheme: (theme: Theme) => void;
  setLoading: (loading: boolean) => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  setLoginFormData: (data: Partial<AppState['loginForm']>) => void;
  setLoginFormErrors: (errors: Partial<AppState['loginFormErrors']>) => void;
  validatePasswordRealTime: (password: string) => void;
  clearLoginForm: () => void;
  submitLoginForm: () => boolean;
  togglePasswordVisibility: () => void;
}

export const useStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        user: {
          id: null,
          name: '',
          username: '',
          email: '',
          password: '',
          isAuthenticated: false,
        },
        theme: THEME.LIGHT,
        isLoading: false,
        isLoginModalOpen: false,
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
        isPasswordVisible: false,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set(() => ({ count: 0 })),
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
        setTheme: (theme) => set(() => ({ theme })),
        setLoading: (isLoading) => set(() => ({ isLoading })),
        openLoginModal: () => set(() => ({ isLoginModalOpen: true })),
        closeLoginModal: () =>
          set(() => ({
            isLoginModalOpen: false,
            loginForm: { username: '', password: '' },
            loginFormErrors: { username: '', password: [] },
            passwordValidation: {
              isValid: false,
              errors: [],
              rules: [],
              strength: PasswordStrength.WEAK,
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
              username: useStore.getState().loginFormErrors.username,
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
          const state = useStore.getState();
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
          useStore.setState({ loginFormErrors: errors });
          if (!errors.username && errors.password.length === 0) {
            try {
              const hashedPassword = hashPasswordSync(loginForm.password);
              useStore.setState({
                user: {
                  id: Date.now().toString(),
                  name: loginForm.username,
                  username: loginForm.username,
                  email: `${loginForm.username}@example.com`,
                  password: hashedPassword,
                  isAuthenticated: true,
                },
                isLoginModalOpen: false,
                loginForm: { username: '', password: '' },
                loginFormErrors: { username: '', password: [] },
                passwordValidation: {
                  isValid: false,
                  errors: [],
                  rules: [],
                  strength: PasswordStrength.WEAK,
                },
              });
              if (typeof window !== 'undefined') {
                window.location.href = '/test/profile';
              }
              return true;
            } catch (error) {
              console.error('Error hashing password:', error);
              useStore.setState({
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
        togglePasswordVisibility: () =>
          set((state) => ({ isPasswordVisible: !state.isPasswordVisible })),
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({
          user: state.user,
          theme: state.theme,
          count: state.count,
        }),
      }
    )
  )
);
