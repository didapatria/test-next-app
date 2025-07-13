import { create } from 'zustand';
import { userStore } from '../';

interface ModalState {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isLoginModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => {
    set({ isLoginModalOpen: false });
    userStore.user.getState().clearLoginForm();
  },
}));
