import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, ArrowDownToLine, Eye, EyeOff, Flame, Timer, Gift, ChevronRight, Play, Search, Filter } from 'lucide-react';
import { Card, Button, Skeleton, ErrorState, LanguageSwitcher } from '../../shared/components';
import { normalizeApiError } from '../../shared/lib/api-client';
import { DepositModal } from '../deposit/DepositModal';
import { WithdrawalModal } from '../withdrawal/WithdrawalModal';
import { useLanguage } from '../../shared/lib/i18n';

// --- MOCK DATA ---
interface WalletData { balance: string; reserved_balance: string; currency: string; }
async function fetchWallet(): Promise<WalletData> {
  return new Promise((resolve) => setTimeout(() => resolve({ balance: '1500.00', reserved_balance: '150.00', currency: 'ETB' }), 500));
}

const TRENDING_GAMES = [
  { id: 't1', name: 'Aviator', provider: 'Spribe', thumb: 'https://i.pinimg.com/736x/23/42/04/23420488fb869cabc71d55629110c12b.jpg' },
  { id: 't2', name: 'Goal', provider: 'Spribe', thumb: 'https://i.pinimg.com/736x/99/c2/c1/99c2c108201f3ae767e8ea89c6304a3b.jpg' },
  { id: 't3', name: 'Mines', provider: 'Spribe', thumb: 'https://i.pinimg.com/736x/69/00/eb/6900eb0a764f364ee767ded173685a0a.jpg' },
  { id: 't4', name: 'HiLo', provider: 'Spribe', thumb: 'https://i.pinimg.com/736x/fd/ba/f6/fdbaf6ec9f826c8251dca358c13433ab.jpg' },
  { id: 't5', name: 'Mini Roulette', provider: 'Spribe', thumb: 'https://i.pinimg.com/736x/ca/4e/da/ca4eda939c003c041a88f17b3babdde4.jpg' }
];

const HOT_SLOTS = [
  { id: 's1', name: 'Plinko', provider: 'Spribe', thumb: 'https://i.pinimg.com/736x/4a/f0/3c/4af03c2b426d1548cf1eaa77f5d6c2c3.jpg' },
  { id: 's2', name: 'Keno', provider: 'Ahadu', thumb: 'https://i.pinimg.com/736x/d9/7a/aa/d97aaa67e173b31a9a8d2e2df3cc34e5.jpg' },
  { id: 's3', name: 'Dice', provider: 'Turbo', thumb: 'https://i.pinimg.com/736x/51/78/bb/5178bbdb1a6accf54c13feb85cdb42ac.jpg' },
  { id: 's4', name: 'Sweet Bonanza', provider: 'Pragmatic', thumb: 'https://i.pinimg.com/736x/82/e0/a0/82e0a037f2f34610c989a5c549a88648.jpg' },
  { id: 's5', name: 'Gates of Olympus', provider: 'Pragmatic', thumb: 'https://i.pinimg.com/736x/57/45/b4/5745b4762b12998cc3ba7639b95e91ef.jpg' }
];

const MORE_GAMES = [...TRENDING_GAMES.slice(0, 2), ...HOT_SLOTS.slice(0, 4)];

export default function WalletPage() {
  const { t } = useLanguage();
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  
  // Fake Cashback Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 30 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else { s = 59; if (m > 0) m--; else { m = 59; if (h > 0) h--; } }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { data: wallet, isLoading, error, refetch } = useQuery({ queryKey: ['wallet'], queryFn: fetchWallet });

  return (
    <div className="flex flex-col min-h-screen bg-background pb-6">
      
      {/* --- TOP HERO WALLET SECTION --- */}
      <section className="px-4 pt-6 pb-2 rounded-b-[2.5rem] bg-surface-raised shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-b border-white/5 relative overflow-hidden z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gold/10 blur-[50px] pointer-events-none rounded-full"></div>
        
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h2 className="text-xl font-display font-bold text-ink drop-shadow-md">AhaduPlay</h2>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <div className="w-10 h-10 rounded-full bg-surface shadow-inner border border-ink/5 overflow-hidden flex items-center justify-center p-0.5">
              <img src="https://i.pravatar.cc/150?u=1" alt="Profile" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        </div>

        {isLoading ? (
          <Skeleton className="h-32 w-full rounded-2xl mb-6" />
        ) : error ? (
          <ErrorState message={normalizeApiError(error).message} onRetry={refetch} />
        ) : wallet ? (
          <Card className="relative p-5 overflow-hidden bg-gradient-to-br from-[#1E1E1E] via-[#121212] to-[#0A0A0A] border border-gold/30 shadow-[0_15px_35px_rgba(232,169,59,0.15)] rounded-3xl mb-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-2xl rounded-full pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-medium text-ink-muted uppercase tracking-widest">{t('totalBalance')}</p>
                <button 
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-ink-muted"
                >
                  {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-display font-bold text-gold drop-shadow-[0_0_15px_rgba(232,169,59,0.4)]">
                  {showBalance ? wallet.balance : '••••••'}
                </span>
                <span className="text-sm font-bold text-gold/70">{wallet.currency}</span>
              </div>

              <div className="flex gap-3 mt-4">
                <Button onClick={() => setIsDepositOpen(true)} className="flex-1 bg-gradient-to-r from-gold to-amber-500 text-background border-0 shadow-[0_5px_15px_rgba(232,169,59,0.4)] rounded-xl py-5 hover:scale-[1.02] transition-transform">
                  <Plus className="w-5 h-5 mr-1" /> {t('deposit')}
                </Button>
                <Button onClick={() => setIsWithdrawalOpen(true)} className="flex-1 bg-surface-raised text-ink border border-white/5 shadow-md rounded-xl py-5 hover:bg-white/5 transition-colors">
                  <ArrowDownToLine className="w-5 h-5 mr-1" /> {t('withdraw')}
                </Button>
              </div>
            </div>
          </Card>
        ) : null}
      </section>

      {/* --- CONTENT SCROLL VIEW --- */}
      <div className="flex-1 px-4 pt-6 space-y-8">
        
        {/* PROMO & CASHBACK WIDGETS */}
        <section className="grid grid-cols-2 gap-3">
          <Card className="p-3 bg-gradient-to-br from-indigo-900/40 to-surface border border-indigo-500/20 rounded-2xl relative overflow-hidden group shadow-lg">
            <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-full bg-indigo-500/20 text-indigo-400">
                <Timer className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">Cashback</span>
            </div>
            <div className="font-mono text-lg font-bold text-white tracking-wider flex items-center gap-1">
              <span>{String(timeLeft.h).padStart(2, '0')}</span><span className="text-indigo-500/50">:</span>
              <span>{String(timeLeft.m).padStart(2, '0')}</span><span className="text-indigo-500/50">:</span>
              <span className="text-indigo-300 animate-pulse">{String(timeLeft.s).padStart(2, '0')}</span>
            </div>
            <p className="text-[9px] text-ink-muted mt-1">{t('availableIn')}</p>
          </Card>

          <Card className="p-3 bg-gradient-to-br from-emerald/10 to-surface border border-emerald/20 rounded-2xl relative overflow-hidden shadow-lg flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-full bg-emerald/20 text-emerald">
                <Gift className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald">{t('redeem')}</span>
            </div>
            <div className="flex bg-background/50 rounded-lg p-1 border border-white/5 focus-within:border-emerald/50 transition-colors">
              <input type="text" placeholder={t('promoCode')} className="bg-transparent w-full text-xs px-2 outline-none text-white placeholder:text-ink-muted/50 uppercase font-bold" />
              <button className="bg-emerald text-background px-2 py-1 rounded text-[9px] font-bold">{t('apply')}</button>
            </div>
          </Card>
        </section>

        {/* --- TRENDING GAMES --- */}
        <section>
          <div className="flex justify-between items-end mb-3 px-1">
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5 flex justify-center items-center">
                <Flame className="w-5 h-5 text-red-500 animate-[bounce_1s_infinite] drop-shadow-[0_0_8px_rgba(239,68,68,1)] absolute" />
                <Flame className="w-4 h-4 text-orange-400 animate-[ping_1.5s_infinite] drop-shadow-[0_0_5px_rgba(249,115,22,1)] absolute opacity-70" />
                <Flame className="w-3 h-3 text-yellow-300 animate-[bounce_0.8s_infinite] absolute z-10" />
              </div>
              <h3 className="text-lg font-display font-bold text-ink">{t('trendingNow')}</h3>
            </div>
            <button className="text-xs font-bold text-ink-muted hover:text-gold flex items-center transition-colors">
              {t('seeAll')} <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 snap-x -mx-4 px-4">
            {TRENDING_GAMES.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* --- MULTI HOT SLOTS --- */}
        <section>
          <div className="flex justify-between items-end mb-3 px-1">
            <h3 className="text-lg font-display font-bold text-ink">{t('multiHotSlots')}</h3>
            <button className="text-xs font-bold text-ink-muted hover:text-gold flex items-center transition-colors">
              {t('more')} <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 snap-x -mx-4 px-4">
            {HOT_SLOTS.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* --- MORE GAMES (ULTRA WOW SECTION) --- */}
        <section className="mt-8 mb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <div>
              <h3 className="text-lg font-display font-bold text-ink drop-shadow-sm">{t('allGames')}</h3>
              <p className="text-[10px] text-ink-muted uppercase tracking-widest font-bold mt-0.5">{t('exploreLibrary')}</p>
            </div>
          </div>

          {/* Search & Filter Actions (Ultra Wow Glassmorphic) */}
          <div className="flex gap-2 mb-6">
            <div className="flex-1 flex items-center bg-surface border border-white/5 rounded-2xl px-3 py-2.5 shadow-sm focus-within:border-gold/50 focus-within:shadow-[0_0_15px_rgba(232,169,59,0.2)] transition-all">
              <Search className="w-4 h-4 text-ink-muted mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder={t('search')} 
                className="bg-transparent border-0 outline-none w-full text-sm text-ink placeholder:text-ink-muted/50" 
              />
            </div>
            <button className="shrink-0 w-11 h-11 bg-surface-raised rounded-2xl border border-white/10 flex items-center justify-center text-ink hover:text-gold shadow-sm transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          {/* 2-Column Grid (Ultra Wow Cards) */}
          <div className="grid grid-cols-2 gap-3">
            {MORE_GAMES.map(game => (
              <Card key={game.id} className="relative aspect-square overflow-hidden group rounded-2xl border-0 shadow-lg ring-1 ring-white/5">
                <img src={game.thumb} alt={game.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                {/* Stunning Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-3">
                  <div className="w-8 h-8 rounded-full bg-gold text-background flex items-center justify-center shadow-[0_0_15px_rgba(232,169,59,1)] mb-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <Play className="w-4 h-4 ml-0.5 fill-background" />
                  </div>
                  <h4 className="font-display font-bold text-white text-sm drop-shadow-md leading-tight">{game.name}</h4>
                  <p className="text-[9px] text-gold font-bold uppercase tracking-widest mt-1 opacity-80">{game.provider}</p>
                </div>
              </Card>
            ))}
          </div>
          
          <button className="w-full mt-6 py-4 rounded-xl border border-white/5 bg-surface hover:bg-surface-raised text-sm font-bold text-ink-muted hover:text-ink transition-all shadow-sm">
            {t('loadMore')}
          </button>
        </section>

      </div>

      {/* Modals */}
      <DepositModal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} />
      {wallet && <WithdrawalModal isOpen={isWithdrawalOpen} onClose={() => setIsWithdrawalOpen(false)} cashBalance={wallet.balance} />}
    </div>
  );
}

// Mini Game Card Component for horizontal scrolling rows
function GameCard({ game }: { game: any }) {
  return (
    <Card className="min-w-[140px] w-[140px] aspect-[3/4] relative overflow-hidden group snap-start bg-surface rounded-2xl border-0 shadow-lg ring-1 ring-white/5">
      <img src={game.thumb} alt={game.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>
      
      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 bg-black/20 backdrop-blur-[2px]">
        <div className="bg-gold text-background p-3 rounded-full shadow-[0_0_20px_rgba(232,169,59,0.8)] scale-75 group-hover:scale-100 transition-transform">
          <Play className="w-5 h-5 ml-0.5 fill-background" />
        </div>
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h4 className="font-display font-bold text-ink text-sm truncate drop-shadow-md">{game.name}</h4>
        <p className="text-[9px] text-gold font-bold uppercase tracking-widest drop-shadow-sm mt-0.5">{game.provider}</p>
      </div>
    </Card>
  );
}
