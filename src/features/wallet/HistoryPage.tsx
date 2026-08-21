// Removed React
import { useQuery } from '@tanstack/react-query';
import { History as HistoryIcon,  Gamepad2, Gift, Zap, Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Card, EmptyState, Skeleton, ErrorState, cn } from '../../shared/components';
import { normalizeApiError } from '../../shared/lib/api-client';
import { format, isToday, isYesterday } from 'date-fns';

interface Transaction {
  id: string | number;
  type: 'deposit' | 'bet' | 'win' | 'cashback' | 'withdrawal';
  amount: string;
  created_at: string;
  details?: string;
}

async function fetchHistory(): Promise<Transaction[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, type: 'win', amount: '1250.00', created_at: new Date().toISOString(), details: 'Aviator - 2.5x Multiplier' },
        { id: 2, type: 'bet', amount: '500.00', created_at: new Date(Date.now() - 3600000).toISOString(), details: 'Aviator' },
        { id: 3, type: 'deposit', amount: '2000.00', created_at: new Date(Date.now() - 7200000).toISOString(), details: 'CBE Bank' },
        { id: 4, type: 'cashback', amount: '150.00', created_at: new Date(Date.now() - 86400000).toISOString(), details: 'Weekly VIP Bonus' },
        { id: 5, type: 'withdrawal', amount: '500.00', created_at: new Date(Date.now() - 172800000).toISOString(), details: 'Telebirr' },
      ]);
    }, 600);
  });
}

export default function HistoryPage() {
  const { data: history, isLoading, error, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchHistory,
  });

  const getTxConfig = (type: string) => {
    switch (type) {
      case 'deposit': return { icon: ArrowDownLeft, color: 'text-emerald', bg: 'bg-emerald/10', label: 'Deposit' };
      case 'withdrawal': return { icon: ArrowUpRight, color: 'text-ink-muted', bg: 'bg-surface-raised', label: 'Withdrawal' };
      case 'win': return { icon: Zap, color: 'text-gold', bg: 'bg-gold/10', label: 'Big Win!' };
      case 'bet': return { icon: Gamepad2, color: 'text-coral', bg: 'bg-coral/10', label: 'Wager' };
      case 'cashback': return { icon: Gift, color: 'text-bonus-amber', bg: 'bg-bonus-amber/10', label: 'Cashback' };
      default: return { icon: HistoryIcon, color: 'text-ink', bg: 'bg-surface-raised', label: 'Transaction' };
    }
  };

  const formatTxDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return `Today, ${format(date, 'h:mm a')}`;
    if (isYesterday(date)) return `Yesterday, ${format(date, 'h:mm a')}`;
    return format(date, 'MMM d, h:mm a');
  };

  return (
    <div className="p-4 space-y-6 pb-24 relative overflow-hidden">
      {/* Ambient background styling */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald/5 rounded-full blur-3xl pointer-events-none"></div>

      <header className="relative z-10 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-display font-medium text-ink mb-1">Activity Log</h1>
          <p className="text-sm text-ink-muted">Track your wins, wagers, and payments.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-surface-raised flex items-center justify-center border border-ink/5">
          <HistoryIcon className="w-5 h-5 text-ink" />
        </div>
      </header>

      {/* Hero Stats */}
      <section className="relative z-10 grid grid-cols-2 gap-3">
        <Card className="p-4 bg-gradient-to-br from-surface to-surface-raised border border-emerald/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-emerald" />
            <span className="text-xs text-ink-muted font-medium">Recent Wins</span>
          </div>
          <p className="text-xl font-display font-bold text-ink tracking-tight">+1,250<span className="text-xs text-ink-muted ml-1">ETB</span></p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-surface to-surface-raised border border-ink/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-ink/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-ink-muted" />
            <span className="text-xs text-ink-muted font-medium">Deposited</span>
          </div>
          <p className="text-xl font-display font-bold text-ink tracking-tight">2,000<span className="text-xs text-ink-muted ml-1">ETB</span></p>
        </Card>
      </section>

      {/* Transaction Feed */}
      <section className="relative z-10">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={normalizeApiError(error).message} onRetry={refetch} />
        ) : history && history.length > 0 ? (
          <div className="space-y-3 relative">
            <div className="absolute left-6 top-6 bottom-6 w-[1px] bg-gradient-to-b from-ink/10 via-ink/10 to-transparent -z-10"></div>
            
            {history.map((tx) => {
              const config = getTxConfig(tx.type);
              const isPositive = ['deposit', 'win', 'cashback'].includes(tx.type);
              
              return (
                <Card 
                  key={tx.id} 
                  className={cn(
                    "p-4 flex items-center gap-4 border border-ink/5 bg-surface/80 backdrop-blur-md transition-all duration-300 hover:bg-surface-raised hover:-translate-y-1 hover:shadow-xl",
                    tx.type === 'win' && "border-gold/30 shadow-[0_4px_15px_rgba(232,169,59,0.1)]"
                  )}
                >
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner", config.bg, config.color)}>
                    <config.icon className={cn("w-6 h-6", tx.type === 'win' && "animate-pulse")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={cn("text-sm font-bold truncate", tx.type === 'win' ? "text-gold" : "text-ink")}>{config.label}</h4>
                    {tx.details && (
                      <p className="text-xs text-ink-muted font-medium truncate mb-0.5">{tx.details}</p>
                    )}
                    <p className="text-[10px] text-ink-muted/80 font-mono tracking-wider">{formatTxDate(tx.created_at)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={cn(
                      "font-display text-lg tracking-tight font-bold",
                      tx.type === 'win' ? 'text-gold' : isPositive ? 'text-emerald' : 'text-ink'
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
            description="Your deposits, withdrawals, and game wagers will appear here."
          />
        )}
      </section>
    </div>
  );
}
