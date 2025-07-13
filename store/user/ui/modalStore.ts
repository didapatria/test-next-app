import { create } from 'zustand';
import { useUserStore } from '../userStore';

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
    useUserStore.getState().clearLoginForm();
  },
}));
