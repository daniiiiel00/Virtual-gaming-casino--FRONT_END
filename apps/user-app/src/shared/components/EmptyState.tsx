import React from 'react';
import { cn } from './Button';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8", className)} {...props}>
      <div className="relative mb-4">
        {/* Soft horizontal line for "nothing happening yet" */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-[1px] bg-ink/10"></div>
        {Icon && (
          <div className="relative z-10 w-12 h-12 rounded-full bg-surface-raised flex items-center justify-center text-ink-muted">
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
      <h3 className="text-lg font-medium text-ink mb-2">{title}</h3>
      {description && <p className="text-sm text-ink-muted max-w-sm mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
