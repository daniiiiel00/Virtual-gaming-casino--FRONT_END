import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { cn } from './Button';

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ title = 'Something went wrong', message, onRetry, className, ...props }: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-6 border border-coral/20 bg-coral/5 rounded-2xl", className)} {...props}>
      <div className="w-12 h-12 rounded-full bg-coral/10 flex items-center justify-center text-coral mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-medium text-ink mb-2">{title}</h3>
      <p className="text-sm text-ink-muted mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
