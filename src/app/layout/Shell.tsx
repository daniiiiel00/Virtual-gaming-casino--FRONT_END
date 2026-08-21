import { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, Gamepad2, Gift, History, User } from 'lucide-react';
import { cn } from '../../shared/components/Button';
import { SplashScreen } from './SplashScreen';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/games', label: 'Games', icon: Gamepad2 },
  { path: '/promotions', label: 'Promos', icon: Gift },
  { path: '/history', label: 'History', icon: History },
  { path: '/profile', label: 'Profile', icon: User },
];

export function Shell() {
  const [showSplash, setShowSplash] = useState(true);

  // Initialize Telegram WebApp on mount
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.ready();
    }
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <div className="flex flex-col h-[100dvh] w-full max-w-md mx-auto relative bg-background overflow-hidden shadow-2xl">
        {/* Header Signature Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50 z-50"></div>
        
        {/* Main Content Area - Padding bottom accounts for tab bar + safe area */}
        <main className="flex-1 overflow-y-auto pb-[calc(4rem+env(safe-area-inset-bottom))] scrollbar-hide overscroll-y-contain">
          <Outlet />
        </main>

        {/* Ultra Elegant Floating Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-50 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-10 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none">
          <nav className="flex justify-between items-center bg-surface/70 backdrop-blur-2xl border border-white/10 rounded-[2rem] px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] pointer-events-auto relative overflow-hidden">
            {/* Inner subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 pointer-events-none"></div>
            
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex flex-col items-center justify-center w-[18%] h-14 rounded-2xl transition-all duration-500 relative group z-10",
                  isActive ? "text-gold" : "text-ink-muted hover:text-ink active:scale-90"
                )}
              >
                {({ isActive }) => (
                  <>
                    {/* Active Background Pill */}
                    <div className={cn(
                      "absolute inset-0 rounded-2xl transition-all duration-500",
                      isActive ? "bg-gold/15 shadow-inner scale-100 opacity-100" : "scale-50 opacity-0 group-hover:bg-white/5 group-hover:scale-100 group-hover:opacity-100"
                    )}></div>
                    
                    {/* Icon Container with Floating Animation */}
                    <div className={cn(
                      "relative transition-all duration-500 ease-out flex items-center justify-center",
                      isActive ? "-translate-y-3" : "translate-y-0 group-hover:-translate-y-1"
                    )}>
                      <item.icon className={cn(
                        "w-5 h-5 transition-all duration-500",
                        isActive ? "drop-shadow-[0_0_8px_rgba(232,169,59,0.8)]" : ""
                      )} />
                    </div>

                    {/* Active Label & Dot Indicator */}
                    <div className={cn(
                      "absolute bottom-2 flex flex-col items-center transition-all duration-500",
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}>
                      <span className="text-[9px] font-bold tracking-widest uppercase mb-0.5">{item.label}</span>
                      <div className="w-1 h-1 rounded-full bg-gold shadow-[0_0_5px_rgba(232,169,59,1)]"></div>
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
