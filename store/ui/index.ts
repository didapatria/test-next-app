import { useLoadingStore } from './loadingStore';
import { useToastStore } from './toastStore';

export const uiStore = {
  loading: useLoadingStore,
  toast: useToastStore,
};
