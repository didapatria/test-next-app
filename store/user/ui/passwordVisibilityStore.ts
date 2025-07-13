import { create } from 'zustand';

interface PasswordVisibilityState {
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
}

export const usePasswordVisibilityStore = create<PasswordVisibilityState>((set) => ({
  isPasswordVisible: false,
  togglePasswordVisibility: () => set((state) => ({ isPasswordVisible: !state.isPasswordVisible })),
}));
