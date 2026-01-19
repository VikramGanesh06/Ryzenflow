import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastProps> = ({ toast, onRemove }) => {
  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(() => onRemove(toast.id), toast.duration || 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onRemove]);

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div
      className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg animate-in fade-in slide-in-from-right-4 duration-300 ${
        isSuccess ? 'bg-emerald-50 border border-emerald-200' : ''
      } ${isError ? 'bg-red-50 border border-red-200' : ''} ${
        toast.type === 'info' ? 'bg-blue-50 border border-blue-200' : ''
      }`}
    >
      {isSuccess && <CheckCircle className="text-emerald-600 flex-shrink-0" size={20} />}
      {isError && <AlertCircle className="text-red-600 flex-shrink-0" size={20} />}
      <span
        className={`text-sm font-medium ${
          isSuccess ? 'text-emerald-800' : isError ? 'text-red-800' : 'text-blue-800'
        }`}
      >
        {toast.message}
      </span>
      <button
        onClick={() => onRemove(toast.id)}
        className={`ml-auto flex-shrink-0 ${
          isSuccess ? 'text-emerald-600 hover:text-emerald-800' : ''
        } ${isError ? 'text-red-600 hover:text-red-800' : ''} ${
          toast.type === 'info' ? 'text-blue-600 hover:text-blue-800' : ''
        } transition-colors`}
      >
        <X size={18} />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onRemoveToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemoveToast }) => {
  return (
    <div className="fixed bottom-6 right-6 space-y-3 z-50 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onRemove={onRemoveToast} />
        </div>
      ))}
    </div>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return { toasts, addToast, removeToast };
};
