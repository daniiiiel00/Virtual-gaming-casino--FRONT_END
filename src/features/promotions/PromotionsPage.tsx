// Removed React
import { Gift, Trophy, Crown, Star, Medal } from 'lucide-react';
import { Button, Input, Card, cn } from '../../shared/components';

// Mock Leaderboard Data
const leaderboard = [
  { rank: 1, name: 'Alex H.', score: '45,200', avatar: 'https://i.pravatar.cc/150?u=1' },
  { rank: 2, name: 'Sam K.', score: '38,100', avatar: 'https://i.pravatar.cc/150?u=2' },
  { rank: 3, name: 'Dani M.', score: '35,900', avatar: 'https://i.pravatar.cc/150?u=3' },
  { rank: 4, name: 'Chris P.', score: '32,400', avatar: 'https://i.pravatar.cc/150?u=4' },
  { rank: 5, name: 'Jamie T.', score: '29,800', avatar: 'https://i.pravatar.cc/150?u=5' },
  { rank: 6, name: 'Taylor R.', score: '27,100', avatar: 'https://i.pravatar.cc/150?u=6' },
  { rank: 7, name: 'Jordan W.', score: '25,300', avatar: 'https://i.pravatar.cc/150?u=7' },
  { rank: 8, name: 'Casey L.', score: '22,900', avatar: 'https://i.pravatar.cc/150?u=8' },
  { rank: 9, name: 'Morgan B.', score: '21,000', avatar: 'https://i.pravatar.cc/150?u=9' },
];

export default function PromotionsPage() {
  const top3 = [leaderboard[1], leaderboard[0], leaderboard[2]]; // 2nd, 1st, 3rd for UI arrangement
  const rest = leaderboard.slice(3);

  return (
    <div className="p-4 space-y-8 pb-24">
      <header>
        <h1 className="text-2xl font-display font-medium text-ink mb-1">Promotions & Rewards</h1>
        <p className="text-sm text-ink-muted">Climb the leaderboard and claim your prizes.</p>
      </header>

      {/* Leaderboard UI */}
      <section>
        <div className="flex items-center gap-2 mb-10">
          <Trophy className="w-5 h-5 text-gold" />
          <h2 className="text-lg font-display font-medium text-ink">Weekly Top Winners</h2>
        </div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-3 mb-8 h-48 px-2">
          {top3.map((player) => {
            const isFirst = player.rank === 1;
            const isSecond = player.rank === 2;
            const isThird = player.rank === 3;
            
            return (
              <div 
                key={player.rank} 
                className={cn(
                  "relative flex flex-col items-center w-1/3 transition-all duration-500 hover:-translate-y-2",
                  isFirst ? "order-2 z-20" : isSecond ? "order-1 z-10" : "order-3 z-10"
                )}
              >
                {/* Crown / Medal Icon */}
                <div className={cn(
                  "absolute -top-10 animate-[bounce_3s_ease-in-out_infinite]",
                  isFirst ? "text-gold" : isSecond ? "text-slate-300" : "text-amber-600"
                )}>
                  {isFirst ? <Crown className="w-10 h-10 drop-shadow-[0_0_12px_rgba(232,169,59,0.8)]" /> : 
                   isSecond ? <Medal className="w-8 h-8 drop-shadow-md" /> : 
                   <Medal className="w-8 h-8 drop-shadow-md" />}
                </div>

                {/* Avatar */}
                <div className={cn(
                  "relative rounded-full overflow-hidden mb-3 shadow-2xl ring-4 ring-offset-2 ring-offset-background",
                  isFirst ? "w-20 h-20 ring-gold" : "w-14 h-14 ring-surface-raised",
                  isSecond && "ring-slate-300",
                  isThird && "ring-amber-600"
                )}>
                  <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent flex items-end justify-center pb-1">
                    <span className="text-[12px] font-bold text-white shadow-sm">{player.rank}</span>
                  </div>
                </div>
                
                {/* Podium Pillar */}
                <div className={cn(
                  "w-full rounded-t-xl flex flex-col items-center justify-start pt-3 px-1 shadow-[0_0_20px_rgba(0,0,0,0.3)] border-t border-x border-white/5 bg-gradient-to-b from-surface-raised to-background",
                  isFirst ? "h-32 bg-surface-raised border-gold/40" : 
                  isSecond ? "h-24 opacity-95" : 
                  "h-20 opacity-80"
                )}>
                  <span className={cn(
                    "font-medium truncate w-full text-center",
                    isFirst ? "text-sm text-gold" : "text-xs text-ink"
                  )}>{player.name}</span>
                  <span className={cn(
                    "font-bold mt-1 tracking-wider flex items-center gap-1",
                    isFirst ? "text-xs text-ink" : "text-[10px] text-ink-muted"
                  )}>
                    {player.score}
                    {isFirst && <Star className="w-3 h-3 text-gold fill-gold" />}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ranks 4-9 List */}
        <div className="space-y-2 mt-4 relative">
          <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-surface-raised via-surface-raised to-transparent -z-10"></div>
          {rest.map((player) => (
            <div key={player.rank} className="flex items-center justify-between p-3 rounded-2xl bg-surface/50 border border-ink/5 hover:bg-surface-raised/80 transition-colors backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-ink-muted w-4 text-center">{player.rank}</span>
                <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-full border border-ink/10 shadow-sm" />
                <span className="text-sm font-medium text-ink">{player.name}</span>
              </div>
              <div className="flex items-center gap-1 bg-surface px-3 py-1 rounded-full border border-ink/5">
                <span className="text-xs font-bold text-gold">{player.score}</span>
                <Star className="w-3 h-3 text-gold fill-gold opacity-80" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Existing Coupon UI */}
      <Card className="p-5 border-bonus-amber/20 bg-gradient-to-br from-surface to-surface-raised mt-8">
        <h3 className="text-sm font-medium text-bonus-amber mb-2 flex items-center gap-2">
          <Gift className="w-4 h-4" />
          Redeem Coupon
        </h3>
        <p className="text-xs text-ink-muted mb-4">
          Got a promo code? Enter it below to claim your bonus funds.
        </p>
        <div className="flex gap-2">
          <Input placeholder="e.g. WELCOME50" className="flex-1" />
          <Button className="shrink-0 bg-bonus-amber text-background hover:bg-bonus-amber/90">
            Redeem
          </Button>
        </div>
      </Card>
    </div>
  );
}
