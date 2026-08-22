import React from 'react';
import { formatMoney } from '../lib/money';
import { cn } from './Button';

interface BalanceFigureProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: string;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function BalanceFigure({ amount, currency = 'ETB', size = 'md', className, ...props }: BalanceFigureProps) {
  const formatted = formatMoney(amount, currency);
  const [val, curr] = formatted.split(' ');

  return (
    <div className={cn("font-display tabular-nums tracking-tight", className)} {...props}>
      <span className={cn(
        "text-ink",
        {
          'text-lg': size === 'sm',
          'text-2xl': size === 'md',
          'text-4xl': size === 'lg',
          'text-5xl md:text-6xl': size === 'xl',
        }
      )}>
        {val}
      </span>
      <span className={cn(
        "text-gold ml-1.5",
        {
          'text-sm': size === 'sm',
          'text-base': size === 'md',
          'text-lg': size === 'lg',
          'text-xl': size === 'xl',
        }
      )}>
        {curr}
      </span>
    </div>
  );
}
