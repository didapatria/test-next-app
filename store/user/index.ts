import { uiStore } from './ui';
import { useUserStore } from './userStore';

export const userStore = {
  user: useUserStore,
  ui: uiStore,
};
