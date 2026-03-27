// swine/components/Toast.tsx
import { CheckCircle2, XCircle } from 'lucide-react';


interface ToastProps {
  message: string;
  type: 'success' | 'error';
  show: boolean;
}

export default function Toast({ message, type, show }: ToastProps) {
  if (!show) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg 
      ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white animate-in fade-in slide-in-from-top-5`}
    >
      {type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
      <span>{message}</span>
    </div>
  );
}
