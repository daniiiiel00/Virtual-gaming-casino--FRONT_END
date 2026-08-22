import { useEffect, useState } from 'react';
import { Club, Diamond, Heart, Spade, Gamepad2, Dices, Coins, Trophy, Swords, Crown } from 'lucide-react';
import { cn } from '../../shared/components';

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Show for slightly longer to let user appreciate the cool UI
    const timer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3000);

    // Call onFinish after fade out animation
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  // Expanded set of gaming icons
  const icons = [Club, Diamond, Heart, Spade, Gamepad2, Dices, Coins, Trophy, Swords, Crown];

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500",
        // A premium dark background with a subtle gold glow in the center
        "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface via-background to-background",
        isFadingOut ? "opacity-0" : "opacity-100"
      )}
    >
      {/* Intense Floating Snowfall / Icons Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(35)].map((_, i) => {
          const Icon = icons[i % icons.length];
          // Randomize sizes, starting positions, and animation duration for organic snowfall
          const size = 20 + Math.random() * 30; // 20px to 50px
          const leftPos = Math.random() * 100; // 0% to 100% width
          const animDuration = 3 + Math.random() * 5; // 3s to 8s
          const animDelay = -Math.random() * 5; // Negative delay so some start already on screen
          const drift = Math.random() > 0.5 ? 50 : -50;
          
          return (
            <div 
              key={i}
              className="absolute"
              style={{
                left: `${leftPos}%`,
                top: '-10%', // Always start above the screen
                animation: `snowfall ${animDuration}s linear infinite`,
                animationDelay: `${animDelay}s`,
                // Pass a CSS variable for the drift amount so keyframes can use it
                '--drift': `${drift}px`,
              } as React.CSSProperties}
            >
              <Icon 
                size={size}
                strokeWidth={2.5} // Bold icons
                className={cn(
                  "text-gold drop-shadow-[0_0_12px_rgba(232,169,59,0.8)]",
                  i % 3 === 0 ? "opacity-100" : "opacity-70" // Varying opacities for depth
                )}
                style={{
                  animation: `spin ${4 + Math.random() * 4}s linear infinite`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Center UI with Glassmorphism */}
      <div className="relative z-10 flex flex-col items-center p-10 bg-background/40 backdrop-blur-md rounded-3xl border border-gold/30 shadow-[0_0_50px_rgba(232,169,59,0.2)]">
        
        {/* Animated logo wrapper */}
        <div className="relative group mb-6">
          <div className="absolute -inset-2 bg-gradient-to-r from-gold via-yellow-200 to-gold rounded-full blur-md opacity-70 animate-pulse"></div>
          <div className="relative bg-surface rounded-full p-5 ring-1 ring-gold/50 shadow-2xl flex items-center justify-center">
             <Gamepad2 className="w-14 h-14 text-gold animate-bounce" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="font-display text-6xl text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-gold to-yellow-600 font-bold tracking-tight filter drop-shadow-[0_2px_15px_rgba(232,169,59,0.6)]">
          AhaduPlay
        </h1>
        
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent mt-3 mb-4"></div>
        
        <p className="font-sans text-gold text-sm font-black uppercase tracking-[0.35em] drop-shadow-[0_0_5px_rgba(232,169,59,0.5)]">
          Elevated Gaming
        </p>
        
        {/* Ultra Cool Loading Trail */}
        <div className="w-56 h-1.5 mt-12 bg-background/80 relative overflow-hidden rounded-full shadow-inner border border-gold/30">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-gold to-transparent w-full animate-[loading_1.2s_ease-in-out_infinite]" />
        </div>
      </div>
      
      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(-50px) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(115vh) translateX(var(--drift)); opacity: 0; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
