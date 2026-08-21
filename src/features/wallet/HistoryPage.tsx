// Removed React
import { useQuery } from '@tanstack/react-query';
import { History as HistoryIcon, ArrowDownToLine, ArrowUpFromLine, Gamepad2, Gift } from 'lucide-react';
import { Card, EmptyState, Skeleton, ErrorState, cn } from '../../shared/components';
import { normalizeApiError } from '../../shared/lib/api-client';
import { format } from 'date-fns';

interface Transaction {
  id: string | number;
  type: 'deposit' | 'bet' | 'win' | 'cashback' | 'withdrawal';
  amount: string;
  created_at: string;
}

async function fetchHistory(): Promise<Transaction[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, type: 'deposit', amount: '500.00', created_at: new Date().toISOString() },
        { id: 2, type: 'bet', amount: '50.00', created_at: new Date(Date.now() - 3600000).toISOString() },
        { id: 3, type: 'win', amount: '120.00', created_at: new Date(Date.now() - 7200000).toISOString() },
        { id: 4, type: 'cashback', amount: '25.00', created_at: new Date(Date.now() - 86400000).toISOString() },
        { id: 5, type: 'withdrawal', amount: '200.00', created_at: new Date(Date.now() - 172800000).toISOString() },
      ]);
    }, 400);
  });
}

export default function HistoryPage() {
  const { data: history, isLoading, error, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchHistory,
  });

  const getTxConfig = (type: string) => {
    switch (type) {
      case 'deposit': return { icon: ArrowDownToLine, color: 'text-emerald', bg: 'bg-emerald/10', label: 'Deposit' };
      case 'withdrawal': return { icon: ArrowUpFromLine, color: 'text-ink-muted', bg: 'bg-surface-raised', label: 'Withdrawal' };
      case 'win': return { icon: Gift, color: 'text-emerald', bg: 'bg-emerald/10', label: 'Win' };
      case 'bet': return { icon: Gamepad2, color: 'text-coral', bg: 'bg-coral/10', label: 'Bet' };
      case 'cashback': return { icon: Gift, color: 'text-bonus-amber', bg: 'bg-bonus-amber/10', label: 'Cashback' };
      default: return { icon: HistoryIcon, color: 'text-ink', bg: 'bg-surface-raised', label: 'Transaction' };
    }
  };

  return (
    <div className="p-4 space-y-6">
      <header>
        <h1 className="text-2xl font-display font-medium text-ink mb-1">History</h1>
        <p className="text-sm text-ink-muted">Your recent account activity.</p>
      </header>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-2xl" />
          ))}
        </div>
      ) : error ? (
        <ErrorState message={normalizeApiError(error).message} onRetry={refetch} />
      ) : history && history.length > 0 ? (
        <div className="space-y-3">
          {history.map((tx) => {
            const config = getTxConfig(tx.type);
            const isPositive = ['deposit', 'win', 'cashback'].includes(tx.type);
            
            return (
              <Card key={tx.id} className="p-4 flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", config.bg, config.color)}>
                  <config.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-ink truncate">{config.label}</h4>
                  <p className="text-xs text-ink-muted">{format(new Date(tx.created_at), 'MMM d, h:mm a')}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className={cn(
                    "font-display tabular-nums tracking-tight",
                    isPositive ? 'text-emerald' : 'text-ink'
                  )}>
                    {isPositive ? '+' : '-'}{tx.amount}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState 
          icon={HistoryIcon}
          title="No activity yet"
          description="Your deposits and games will show up here."
        />
      )}
    </div>
  );
}
