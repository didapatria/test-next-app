'use client';

import { Toast, ToastType } from '@/types/Toast';
import { FaCheck, FaCircleInfo, FaTriangleExclamation, FaX } from 'react-icons/fa6';

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const handleRemove = () => {
    onRemove(toast.id);
  };

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <FaCheck className="h-5 w-5" />;
      case 'error':
        return <FaX className="h-5 w-5" />;
      case 'warning':
        return <FaTriangleExclamation className="h-5 w-5" />;
      case 'info':
        return <FaCircleInfo className="h-5 w-5" />;
      default:
        return <FaCircleInfo className="h-5 w-5" />;
    }
  };

  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div
      className={`mb-3 transform transition-all duration-300 ease-in-out ${
        toast.isVisible && !toast.isExiting
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
    >
      <div
        className={`flex max-w-sm min-w-80 items-center rounded-lg p-4 shadow-lg ${getToastStyles(toast.type)} `}
      >
        <div className="mr-3 flex-shrink-0">{getToastIcon(toast.type)}</div>

        <div className="mr-3 flex-1">
          <p className="text-sm font-medium">{toast.message}</p>
        </div>

        <button
          onClick={handleRemove}
          className="flex-shrink-0 text-white transition-colors hover:text-gray-200"
        >
          <FaX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onRemoveToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemoveToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemoveToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
