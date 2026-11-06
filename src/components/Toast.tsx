import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  txHash?: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl backdrop-blur-xl bg-[#0D1017]/95 border border-white/10 shadow-2xl shadow-purple-950/40 text-slate-100 transition-all animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-[#14F195] shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-[#9945FF] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold tracking-tight text-white">{toast.title}</h4>
            {toast.message && (
              <p className="text-xs text-slate-400 mt-0.5 break-words leading-relaxed">{toast.message}</p>
            )}
            {toast.txHash && (
              <a
                href={`https://explorer.solana.com/tx/${toast.txHash}?cluster=devnet`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#14F195] hover:underline mt-1.5 font-mono"
              >
                View on Solana Explorer ↗
              </a>
            )}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-500 hover:text-slate-300 transition-colors p-1"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
