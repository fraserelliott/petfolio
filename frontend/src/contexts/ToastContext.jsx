import { createContext, useState, useContext } from "react";
import { v4 as uuid } from "uuid";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toastMessages, setToastMessages] = useState([]);

  const addToastMessage = (message, type, delayMs = 2350) => {
    const id = uuid();
    const newMessage = {
      id,
      message,
      delayMs,
      type,
      fading: false,
    };

    setToastMessages((prev) => [...prev, newMessage]);

    // Schedule fading and removal
    setTimeout(() => {
      setToastMessages((prev) =>
        prev.map((msg) => {
          return msg.id === id ? { ...msg, fading: true } : msg;
        })
      );

      setTimeout(() => {
        setToastMessages((prev) => prev.filter((msg) => msg.id !== id));
      }, 150);
    }, delayMs);
  };

  return (
    <ToastContext.Provider value={{ toastMessages, addToastMessage }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
