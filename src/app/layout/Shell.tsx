import { useState } from 'react';
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

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <div className="flex flex-col h-screen max-w-md mx-auto relative bg-background overflow-hidden">
      {/* Header Signature Line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-md border border-ink/10 rounded-full px-2 py-2 flex justify-between items-center z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all relative",
              isActive ? "text-gold" : "text-ink-muted hover:text-ink hover:bg-surface-raised"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute inset-0 bg-gold/10 rounded-full blur-md"></div>
                )}
                <item.icon className="w-5 h-5 mb-1 relative z-10" />
                <span className="text-[10px] font-medium relative z-10">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
    </>
  );
}
