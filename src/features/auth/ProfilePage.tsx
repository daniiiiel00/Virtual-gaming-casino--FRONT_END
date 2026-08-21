import { useState, useEffect } from 'react';
import { 
  User, LogOut, ShieldCheck, Wallet, ChevronRight, Headset, 
  Globe, Flame, Timer, Share2, TrendingUp, 
  Gift, History, Plus, ArrowDownToLine, Gamepad2, Users
} from 'lucide-react';
import { Card, cn, Button, LanguageSwitcher } from '../../shared/components';
import { DepositModal } from '../deposit/DepositModal';
import { WithdrawalModal } from '../withdrawal/WithdrawalModal';
import { useLanguage } from '../../shared/lib/i18n';

const STREAK_DAYS = [
  { day: 'Mon', active: true },
  { day: 'Tue', active: true },
  { day: 'Wed', active: true },
  { day: 'Thu', active: false },
  { day: 'Fri', active: false },
  { day: 'Sat', active: false },
  { day: 'Sun', active: false },
];

const RECENT_TX = [
  { id: 1, type: 'game', title: 'Aviator Win', amount: '+450.00 ETB', date: '2 mins ago', icon: Gamepad2, color: 'text-emerald', bg: 'bg-emerald/10' },
  { id: 2, type: 'wallet', title: 'Deposit (CBE)', amount: '+1000.00 ETB', date: '2 hours ago', icon: Wallet, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 3, type: 'promo', title: 'Happy Hour Bonus', amount: '+50.00 ETB', date: 'Yesterday', icon: Gift, color: 'text-gold', bg: 'bg-gold/10' },
];

export default function ProfilePage() {
  const { t } = useLanguage();
  
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);

  // Fake Cashback Timer
  const [timeLeft, setTimeLeft] = useState({ h: 14, m: 22, s: 10 });
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

  return (
    <div className="p-4 space-y-6 pb-6 relative overflow-hidden bg-background min-h-screen">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-64 bg-gold/10 rounded-[100%] blur-[80px] pointer-events-none"></div>

      <header className="relative z-10 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-display font-black text-white drop-shadow-md">{t('profile')}</h1>
          <p className="text-sm text-ink-muted font-medium mt-1">{t('desc')}</p>
        </div>
        
        {/* Language Switcher */}
        <LanguageSwitcher />
      </header>

      {/* Hero Profile & Actions Card */}
      <Card className="relative z-10 p-5 overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#0a0a0a] border border-gold/30 shadow-[0_15px_30px_rgba(232,169,59,0.15)] rounded-[2rem]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-2xl rounded-full pointer-events-none"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-amber-600 p-[2px] shadow-[0_0_15px_rgba(232,169,59,0.5)]">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <User className="w-8 h-8 text-gold" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald text-background rounded-full p-1 border-2 border-background shadow-md">
              <ShieldCheck className="w-3 h-3" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white drop-shadow-md">Dani A.</h2>
              <span className="bg-gold text-background text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest shadow-[0_0_10px_rgba(232,169,59,0.5)]">VIP</span>
            </div>
            <p className="text-xs text-ink-muted mt-0.5 font-mono">+251 91 234 5678</p>
          </div>
        </div>

        {/* Deposit/Withdraw Actions inside Hero */}
        <div className="flex gap-3 mt-6 relative z-10">
          <Button onClick={() => setIsDepositOpen(true)} className="flex-1 bg-gradient-to-r from-gold to-amber-500 text-background border-0 shadow-[0_5px_15px_rgba(232,169,59,0.4)] rounded-xl py-5 hover:scale-[1.02] transition-transform">
            <Plus className="w-5 h-5 mr-1" /> {t('deposit')}
          </Button>
          <Button onClick={() => setIsWithdrawalOpen(true)} className="flex-1 bg-surface/80 backdrop-blur-md text-white border border-white/10 shadow-md rounded-xl py-5 hover:bg-white/5 transition-colors">
            <ArrowDownToLine className="w-5 h-5 mr-1" /> {t('withdraw')}
          </Button>
        </div>
      </Card>

      {/* Gamification Grid (Streak & Cashback) */}
      <section className="grid grid-cols-2 gap-3 relative z-10">
        {/* Daily Streak */}
        <Card className="p-4 bg-surface-raised border border-white/5 rounded-[1.5rem] shadow-lg flex flex-col justify-between group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">{t('streak')}</h3>
          </div>
          <div className="flex justify-between items-center relative z-10">
            {STREAK_DAYS.slice(0, 5).map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all shadow-sm",
                  d.active ? "bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.5)] scale-110" : "bg-background border border-white/10 text-ink-muted"
                )}>
                  {d.active ? '✓' : ''}
                </div>
                <span className="text-[8px] text-ink-muted uppercase">{d.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Daily Cashback Timer */}
        <Card className="p-4 bg-surface-raised border border-white/5 rounded-[1.5rem] shadow-lg flex flex-col justify-between group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <Timer className="w-4 h-4 text-indigo-400" />
            <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">{t('cashback')}</h3>
          </div>
          <div className="font-mono text-xl font-bold text-white tracking-wider flex items-center gap-1 drop-shadow-md relative z-10">
            <span>{String(timeLeft.h).padStart(2, '0')}</span><span className="text-white/30 text-sm pb-1">h</span>
            <span className="text-white/50 px-0.5">:</span>
            <span>{String(timeLeft.m).padStart(2, '0')}</span><span className="text-white/30 text-sm pb-1">m</span>
          </div>
        </Card>
      </section>

      {/* Affiliate / Growth Dashboard Card */}
      <section className="relative z-10">
        <Card className="relative overflow-hidden bg-gradient-to-br from-emerald/10 to-surface border border-emerald/30 rounded-[2rem] p-5 shadow-[0_10px_30px_rgba(16,185,129,0.1)]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-emerald" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">{t('invite')}</h3>
              </div>
              <p className="text-[11px] text-white/70 font-medium">{t('inviteDesc')}</p>
            </div>
            <div className="bg-emerald/20 text-emerald px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-emerald/30">
              <TrendingUp className="w-3 h-3" /> +150 ETB
            </div>
          </div>

          {/* Fake Growth Bar Chart */}
          <div className="flex items-end gap-2 h-12 mt-4 mb-4 opacity-80">
            {[30, 45, 25, 60, 40, 80, 50].map((h, i) => (
              <div key={i} className="flex-1 bg-emerald/20 rounded-t-sm relative group cursor-pointer hover:bg-emerald/40 transition-colors" style={{ height: `${h}%` }}>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-surface px-2 py-1 rounded text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 z-10">
                  Day {i+1}
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full bg-emerald text-background hover:bg-emerald/90 border-0 shadow-[0_5px_15px_rgba(16,185,129,0.4)] rounded-xl font-bold">
            <Share2 className="w-4 h-4 mr-2" /> Share Referral Link
          </Button>
        </Card>
      </section>

      {/* Promos Row */}
      <section className="relative z-10">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-lg font-display font-bold text-white">{t('promos')}</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-gradient-to-br from-pink-900/40 to-surface border border-pink-500/20 rounded-[1.5rem] hover:border-pink-500/40 transition-colors cursor-pointer group shadow-lg">
            <Gift className="w-6 h-6 text-pink-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-white text-sm">Happy Hour</h4>
            <p className="text-[10px] text-ink-muted mt-1">2x Deposit Match</p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-sky-900/40 to-surface border border-sky-500/20 rounded-[1.5rem] hover:border-sky-500/40 transition-colors cursor-pointer group shadow-lg">
            <Globe className="w-6 h-6 text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-white text-sm">Free Spins</h4>
            <p className="text-[10px] text-ink-muted mt-1">On Sweet Bonanza</p>
          </Card>
        </div>
      </section>

      {/* Mini Recent Transactions */}
      <section className="relative z-10">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-ink-muted" />
            <h3 className="text-lg font-display font-bold text-white">{t('recent')}</h3>
          </div>
          <button className="text-xs text-gold font-bold flex items-center hover:underline">
            View All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        
        <Card className="rounded-[1.5rem] bg-surface-raised border border-white/5 shadow-lg overflow-hidden divide-y divide-white/5">
          {RECENT_TX.map(tx => (
            <div key={tx.id} className="p-3.5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-inner", tx.bg, tx.color)}>
                  <tx.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm drop-shadow-sm">{tx.title}</h4>
                  <p className="text-[10px] text-ink-muted mt-0.5">{tx.date}</p>
                </div>
              </div>
              <span className={cn("text-xs font-black drop-shadow-sm", tx.color)}>{tx.amount}</span>
            </div>
          ))}
        </Card>
      </section>

      {/* Support & Logout */}
      <section className="relative z-10 flex gap-3 pt-4">
        <Button variant="secondary" className="flex-1 bg-surface-raised border border-white/5 text-ink hover:text-white transition-colors rounded-xl">
          <Headset className="w-4 h-4 mr-2" /> Support
        </Button>
        <Button variant="secondary" className="flex-1 bg-coral/10 border border-coral/20 text-coral hover:bg-coral/20 transition-colors rounded-xl font-bold">
          <LogOut className="w-4 h-4 mr-2" /> {t('logout')}
        </Button>
      </section>

      {/* Modals */}
      <DepositModal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} />
      <WithdrawalModal isOpen={isWithdrawalOpen} onClose={() => setIsWithdrawalOpen(false)} cashBalance="1500.00" />
    </div>
  );
}
