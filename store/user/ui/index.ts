import { useModalStore } from './modalStore';
import { usePasswordVisibilityStore } from './passwordVisibilityStore';

export const uiStore = {
  modal: useModalStore,
  passwordVisibility: usePasswordVisibilityStore,
};
