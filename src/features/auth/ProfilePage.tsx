import { useState } from 'react';
import { User, LogOut, ShieldCheck, Wallet, Landmark, ChevronRight, Headset, Bell, Globe, AlertCircle } from 'lucide-react';
import { Card, cn, Button } from '../../shared/components';

export default function ProfilePage() {
  const [profileCompletion] = useState(80); // 80% complete

  const savedAccounts = [
    { id: 1, name: 'CBE Bank', number: '1000 **** 5678', type: 'bank', icon: Landmark },
    { id: 2, name: 'Telebirr', number: '+251 91 *** 5678', type: 'mobile', icon: Wallet },
  ];

  return (
    <div className="p-4 space-y-8 pb-24 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-64 bg-gold/5 rounded-[100%] blur-3xl pointer-events-none"></div>

      <header className="relative z-10">
        <h1 className="text-2xl font-display font-medium text-ink mb-1">My Profile</h1>
        <p className="text-sm text-ink-muted">Manage your account and preferences.</p>
      </header>

      {/* Hero Profile Card */}
      <Card className="relative z-10 p-1 overflow-hidden bg-gradient-to-br from-gold/20 via-surface to-surface-raised border-0 shadow-2xl">
        <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm z-0 rounded-2xl"></div>
        <div className="relative z-10 p-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-amber-600 p-[2px]">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <User className="w-8 h-8 text-gold" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald text-background rounded-full p-1 border-2 border-background">
                <ShieldCheck className="w-3 h-3" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-ink">Dani A.</h2>
                <span className="bg-gold/10 text-gold text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest border border-gold/20">VIP</span>
              </div>
              <p className="text-sm text-ink-muted mt-0.5">+251 91 234 5678</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-ink-muted font-medium">Profile Completion</span>
              <span className="text-xs text-gold font-bold">{profileCompletion}%</span>
            </div>
            <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-ink/5">
              <div 
                className="h-full bg-gradient-to-r from-gold to-amber-500 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-ink-muted mt-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-bonus-amber" />
              Verify your email to hit 100% and unlock instant withdrawals.
            </p>
          </div>
        </div>
      </Card>

      {/* Saved Wallets / Withdrawal Settings */}
      <section className="relative z-10 space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-display font-medium text-ink">Withdrawal Accounts</h3>
          <button className="text-xs text-gold font-medium hover:underline">Add New</button>
        </div>
        
        <div className="grid gap-3">
          {savedAccounts.map((account) => (
            <Card key={account.id} className="p-4 flex items-center justify-between bg-surface/50 border border-ink/5 hover:bg-surface-raised transition-all cursor-pointer group">
              <div className="flex items-center gap-3 text-ink">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shadow-inner",
                  account.type === 'bank' ? "bg-emerald/10 text-emerald" : "bg-blue-500/10 text-blue-500"
                )}>
                  <account.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{account.name}</h4>
                  <p className="text-xs text-ink-muted font-mono">{account.number}</p>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-surface flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-ink">
                <ChevronRight className="w-4 h-4" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Settings Grid */}
      <section className="relative z-10 grid grid-cols-2 gap-3">
        {[
          { icon: ShieldCheck, label: 'Security & KYC', color: 'text-indigo-400' },
          { icon: Bell, label: 'Notifications', color: 'text-amber-400' },
          { icon: Globe, label: 'Language (EN)', color: 'text-emerald-400' },
          { icon: Headset, label: 'Live Support', color: 'text-sky-400' },
        ].map((item, idx) => (
          <Card key={idx} className="p-4 flex flex-col items-center justify-center text-center bg-surface/40 hover:bg-surface-raised border border-ink/5 transition-all cursor-pointer active:scale-95 group">
            <item.icon className={cn("w-6 h-6 mb-2 transition-transform group-hover:scale-110", item.color)} />
            <span className="text-xs font-medium text-ink">{item.label}</span>
          </Card>
        ))}
      </section>

      {/* Danger Zone */}
      <section className="relative z-10 pt-4">
        <Button variant="secondary" className="w-full flex items-center justify-center gap-2 border-coral/20 text-coral hover:bg-coral/10 hover:text-coral transition-colors">
          <LogOut className="w-4 h-4" />
          Secure Log Out
        </Button>
      </section>
    </div>
  );
}
