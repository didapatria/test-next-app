'use client';

import ToastContainer from './Toast';
import { useStore } from '@/store/useStore';

const ToastProvider: React.FC = () => {
  const { toasts, removeToast } = useStore.uiStore.toast();

  return <ToastContainer toasts={toasts} onRemoveToast={removeToast} />;
};

export default ToastProvider;
