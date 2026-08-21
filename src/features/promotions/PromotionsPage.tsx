import { useState, useEffect } from 'react';
import { Trophy, Crown, Star, Medal, Clock, Swords, Ticket } from 'lucide-react';
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
  const top3 = [leaderboard[1], leaderboard[0], leaderboard[2]];
  const rest = leaderboard.slice(3);

  // Tournament Reset Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });
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
    <div className="p-4 space-y-8 pb-6">
      
      {/* Daily Tournament Hero Card */}
      <section className="relative">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-gold/20 blur-[60px] pointer-events-none rounded-full"></div>
        
        <Card className="relative p-1 overflow-hidden bg-gradient-to-br from-[#1E1E1E] via-[#121212] to-[#0A0A0A] border border-gold/30 shadow-[0_15px_40px_rgba(232,169,59,0.2)] rounded-3xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="bg-surface/80 backdrop-blur-xl rounded-[1.35rem] p-5 relative z-10 border border-white/5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Swords className="w-5 h-5 text-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Live Event</span>
                </div>
                <h1 className="text-2xl font-display font-bold text-white drop-shadow-md">Daily Tournament</h1>
              </div>
              
              {/* Prize Pool Badge */}
              <div className="bg-gradient-to-r from-gold to-amber-500 rounded-xl p-[1px] shadow-lg">
                <div className="bg-background/90 backdrop-blur-md rounded-[11px] px-3 py-1.5 flex flex-col items-center">
                  <span className="text-[9px] font-bold uppercase text-ink-muted">Prize Pool</span>
                  <span className="text-sm font-bold text-gold drop-shadow-sm">100,000 ETB</span>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-background/50 rounded-xl p-3 border border-white/5 flex justify-between items-center mt-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface-raised flex items-center justify-center border border-white/10 shadow-inner">
                  <Clock className="w-4 h-4 text-ink-muted" />
                </div>
                <span className="text-xs font-medium text-ink-muted">Ends in:</span>
              </div>
              
              <div className="font-mono text-xl font-bold text-white tracking-wider flex items-center gap-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                <span>{String(timeLeft.h).padStart(2, '0')}</span><span className="text-white/30 text-sm pb-1">h</span>
                <span className="text-white/50 px-0.5">:</span>
                <span>{String(timeLeft.m).padStart(2, '0')}</span><span className="text-white/30 text-sm pb-1">m</span>
                <span className="text-white/50 px-0.5">:</span>
                <span className="text-gold animate-pulse">{String(timeLeft.s).padStart(2, '0')}</span><span className="text-gold/50 text-sm pb-1">s</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Leaderboard UI */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gold animate-pulse" />
            <h2 className="text-lg font-display font-bold text-ink drop-shadow-sm">Global Rankings</h2>
          </div>
          <button className="bg-surface-raised border border-white/10 text-ink text-xs font-bold px-3 py-1.5 rounded-full shadow-sm hover:bg-white/5 transition-colors">
            Your Rank: 142
          </button>
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
      
      {/* Promo Code Floating Input */}
      <section className="pt-4">
        <div className="bg-gradient-to-r from-surface-raised to-surface rounded-2xl p-1 shadow-lg border border-white/5 flex items-center">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 ml-1">
            <Ticket className="w-5 h-5 text-gold" />
          </div>
          <Input 
            placeholder="Enter promo code" 
            className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-sm h-full mx-2 text-white placeholder:text-ink-muted uppercase font-bold" 
          />
          <Button className="shrink-0 rounded-xl bg-gold text-background font-bold shadow-[0_0_15px_rgba(232,169,59,0.5)] px-6">
            Apply
          </Button>
        </div>
      </section>

    </div>
  );
}
