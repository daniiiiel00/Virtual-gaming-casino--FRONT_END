import { useEffect, useState } from 'react';
import { Club, Diamond, Heart, Spade, Gamepad2 } from 'lucide-react';
import { cn } from '../../shared/components';

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Show for 2 seconds, then fade out
    const timer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    // Call onFinish after fade out animation
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-ink overflow-hidden transition-opacity duration-500",
        isFadingOut ? "opacity-0" : "opacity-100"
      )}
    >
      {/* Floating Snowfall / Icons Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => {
          const Icon = [Club, Diamond, Heart, Spade, Gamepad2][i % 5];
          const style = {
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
            animation: `fall ${5 + Math.random() * 5}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.1 + Math.random() * 0.4,
            transform: `scale(${0.5 + Math.random() * 1})`,
          };
          
          return (
            <Icon 
              key={i}
              className="absolute text-gold" 
              style={style}
            />
          );
        })}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="font-display text-5xl text-gold mb-2 border-b-2 border-gold pb-1 tracking-tight">AhaduPlay</h1>
        <p className="font-sans text-ink-muted text-sm uppercase tracking-[0.2em] mt-2">Elevated Gaming</p>
        
        {/* Loading Trail Animation */}
        <div className="w-32 h-[2px] mt-8 bg-surface-raised relative overflow-hidden rounded-full">
          <div className="absolute inset-y-0 left-0 bg-gold w-1/2 animate-[progress_1s_ease-in-out_infinite]" />
        </div>
      </div>
      
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100px) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
