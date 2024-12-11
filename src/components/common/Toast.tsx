import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useToastStore } from '../../hooks/useToast';

const TOAST_DURATION = 5000;

const toastStyles = {
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 text-green-800 border-green-200',
  },
  error: {
    icon: XCircle,
    className: 'bg-red-50 text-red-800 border-red-200',
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 text-blue-800 border-blue-200',
  },
};

export function Toast() {
  const { toasts, removeToast } = useToastStore();

  React.useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, TOAST_DURATION);

      return () => clearTimeout(timer);
    });
  }, [toasts, removeToast]);

  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50">
      <AnimatePresence>
        {toasts.map((toast) => {
          const { icon: Icon, className } = toastStyles[toast.type];

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className={`flex items-center px-4 py-3 rounded-lg shadow-lg border ${className}`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <p className="mr-8">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-auto text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}