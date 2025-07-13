import { create } from 'zustand';
import { Toast, ToastType } from '@/types/Toast';

interface ToastState {
  toasts: Toast[];
  showToast: (message: string, type: ToastType, href?: string, duration?: number) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

export const useToastStore = create<ToastState>()((set, get) => ({
  toasts: [],
  showToast: (message: string, type: ToastType, href = '/', duration = 5000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    const newToast: Toast = {
      id,
      message,
      type,
      duration,
      timestamp: Date.now(),
      isVisible: false,
      isExiting: false,
    };
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.map((toast) =>
          toast.id === id ? { ...toast, isVisible: true } : toast
        ),
      }));
    }, 50);
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }
    if (type === 'success') {
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = href;
        }
      }, 1500);
    }
  },
  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === id ? { ...toast, isExiting: true } : toast
      ),
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 300);
  },
  clearAllToasts: () => {
    set({ toasts: [] });
  },
}));
