'use client';

import { ToastProvider } from '../contexts/ToastContext';

export default function ToastWrapper({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}
