import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// Remove unused imports
import { Plus, ArrowDownToLine } from 'lucide-react';
import { Card, Button, BalanceFigure, Skeleton, ErrorState } from '../../shared/components';
import { normalizeApiError } from '../../shared/lib/api-client';
import { DepositModal } from '../deposit/DepositModal';
import { WithdrawalModal } from '../withdrawal/WithdrawalModal';
import { GamesList } from '../games/GamesList';

interface WalletData {
  balance: string;
  reserved_balance: string;
  currency: string;
}

async function fetchWallet(): Promise<WalletData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        balance: '1500.00',
        reserved_balance: '150.00',
        currency: 'ETB'
      });
    }, 500);
  });
}

export default function WalletPage() {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);

  const { data: wallet, isLoading, error, refetch } = useQuery({
    queryKey: ['wallet'],
    queryFn: fetchWallet,
  });

  return (
    <div className="p-4 space-y-6">
      {/* Wallet Balance Hero Card */}
      <section>
        <h2 className="text-xl font-display font-medium mb-3 tracking-tight">Your Wallet</h2>
        {isLoading ? (
          <Skeleton className="h-40 w-full rounded-2xl" />
        ) : error ? (
          <ErrorState message={normalizeApiError(error).message} onRetry={refetch} />
        ) : wallet ? (
          <Card className="relative p-6 overflow-hidden bg-gradient-to-br from-surface to-surface-raised border-gold/20">
            {/* The Ascending Line Animation Background */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 0,100 C 30,100 40,50 100,20"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="150"
                strokeDashoffset="150"
                className="animate-[draw-line_1.5s_ease-out_forwards]"
              />
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E8A93B" stopOpacity="0" />
                  <stop offset="100%" stopColor="#E8A93B" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <p className="text-sm font-medium text-ink-muted mb-1">Cash Balance</p>
                <BalanceFigure amount={wallet.balance} currency={wallet.currency} size="xl" />
              </div>
              <div className="mt-6 flex justify-between items-end">
                <div>
                  <p className="text-xs text-bonus-amber font-medium">Bonus (wagering required)</p>
                  <BalanceFigure amount={wallet.reserved_balance} currency={wallet.currency} size="sm" className="text-bonus-amber" />
                </div>
              </div>
            </div>
          </Card>
        ) : null}
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 gap-3">
        <Button variant="primary" className="w-full flex gap-2" onClick={() => setIsDepositOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Funds
        </Button>
        <Button variant="secondary" className="w-full flex gap-2" onClick={() => setIsWithdrawalOpen(true)}>
          <ArrowDownToLine className="w-4 h-4" />
          Withdraw
        </Button>
      </section>

      {/* Games Catalog directly on Home */}
      <section>
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-medium text-ink">Popular Games</h3>
          <button className="text-sm text-gold hover:underline">View All</button>
        </div>
        <GamesList />
      </section>

      {/* Modals */}
      <DepositModal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} />
      {wallet && (
        <WithdrawalModal 
          isOpen={isWithdrawalOpen} 
          onClose={() => setIsWithdrawalOpen(false)} 
          cashBalance={wallet.balance} 
        />
      )}
    </div>
  );
}
