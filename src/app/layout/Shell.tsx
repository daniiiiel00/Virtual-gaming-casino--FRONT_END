import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Gamepad2, ChartColumnIncreasing, History, User } from 'lucide-react';
import { cn } from '../../shared/components/Button';
import { SplashScreen } from './SplashScreen';

const navItems = [
 
  { path: '/games', label: 'Games', icon: Gamepad2 },
  { path: '/promotions', label: 'Leaderboard', icon: ChartColumnIncreasing },
   { path: '/', label: 'Home', icon: Home },
  { path: '/history', label: 'History', icon: History },
  { path: '/profile', label: 'Profile', icon: User },
];

export function Shell() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  
  // Initialize Telegram WebApp on mount
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.ready();
    }
  }, []);

  // Determine active index for the sliding curve animation
  const activeIndex = navItems.findIndex(item => item.path === location.pathname);
  const currentActive = activeIndex >= 0 ? activeIndex : 0;

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <div className="flex flex-col h-[100dvh] w-full max-w-md mx-auto relative bg-background overflow-hidden shadow-2xl">
        {/* Header Signature Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50 z-50"></div>
        
        {/* Main Content Area - Padding bottom accounts for tab bar + safe area */}
        <main className="flex-1 overflow-y-auto pb-[calc(5rem+env(safe-area-inset-bottom))] scrollbar-hide overscroll-y-contain relative z-0">
          <Outlet />
        </main>

        {/* Curved Animated Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 z-50 bg-surface rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <div className="relative flex justify-between items-center h-16 px-2 pb-[env(safe-area-inset-bottom)]">
            
            {/* The sliding curved indicator background */}
            <div 
              className="absolute top-0 left-0 w-16 h-16 transition-all duration-500 pointer-events-none"
              style={{
                left: `calc(${currentActive * 20}% + 10% - 32px)`,
              }}
            >
              {/* This creates the curve effect by matching the background color and creating a dip */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-background rounded-full border-[6px] border-surface shadow-inner"></div>
            </div>

            {/* Navigation Items */}
            {navItems.map((item, index) => {
              const isActive = index === currentActive;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center justify-center w-[20%] h-full relative z-10"
                >
                  <div className={cn(
                    "flex items-center justify-center transition-all duration-500 rounded-full",
                    isActive 
                      ? "w-12 h-12 bg-gold text-background -translate-y-6 shadow-[0_4px_15px_rgba(232,169,59,0.5)]" 
                      : "w-8 h-8 bg-transparent text-ink-muted hover:text-ink translate-y-0"
                  )}>
                    <item.icon className={cn(
                      "transition-all duration-500",
                      isActive ? "w-6 h-6" : "w-5 h-5"
                    )} />
                  </div>
                  <span className={cn(
                    "absolute bottom-2 text-[10px] font-bold tracking-widest transition-all duration-500",
                    isActive ? "opacity-100 text-gold translate-y-0" : "opacity-0 translate-y-4"
                  )}>
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
