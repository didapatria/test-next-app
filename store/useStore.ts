import { counterStore } from './counter';
import { themeStore } from './theme';
import { uiStore } from './ui';
import { userStore } from './user';

export const useStore = {
  counterStore: counterStore,
  themeStore: themeStore,
  userStore: userStore,
  uiStore: uiStore,
};
