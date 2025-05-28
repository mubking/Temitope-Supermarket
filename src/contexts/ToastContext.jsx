import { createContext, useContext, useState, useCallback } from "react";
import Toast from "@/components/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ title, description = "", status = "info", duration = 3000 }) => {
    const id = Date.now();
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        id,
        title,
        description,
        status,
        duration,
        onClose: () => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        },
      },
    ]);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
<div className="fixed top-4 right-4 w-full max-w-lg pr-4 md:pr-0 space-y-2 z-50">
        {toasts.map(({ id, title, description, status, duration, onClose }) => (
          <Toast
            key={id}
            title={title}
            description={description}
            status={status}
            duration={duration}
            onClose={onClose}
          />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
