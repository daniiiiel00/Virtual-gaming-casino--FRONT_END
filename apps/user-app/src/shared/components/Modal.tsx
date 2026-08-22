import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleBackdropClick = (e: MouseEvent) => {
      if (e.target === dialogRef.current) {
        onClose();
      }
    };
    const dialog = dialogRef.current;
    dialog?.addEventListener('click', handleBackdropClick);
    return () => dialog?.removeEventListener('click', handleBackdropClick);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={cn(
        'backdrop:bg-background/80 backdrop:backdrop-blur-sm',
        'bg-surface text-ink border border-ink/10 rounded-2xl w-[calc(100%-2rem)] max-w-md m-auto p-0',
        'open:animate-in open:fade-in-90 open:zoom-in-95'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-ink/10">
        {title && <h2 className="font-semibold text-lg">{title}</h2>}
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-surface-raised transition-colors ml-auto text-ink-muted hover:text-ink"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4">
        {children}
      </div>
    </dialog>
  );
}
