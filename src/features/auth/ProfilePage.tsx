// Removed React import
import { User, LogOut, Settings } from 'lucide-react';
import { Card } from '../../shared/components';

export default function ProfilePage() {
  return (
    <div className="p-4 space-y-6">
      <header>
        <h1 className="text-2xl font-display font-medium text-ink mb-1">Profile</h1>
        <p className="text-sm text-ink-muted">Manage your account settings.</p>
      </header>

      <Card className="p-6 flex items-center gap-4 bg-surface-raised">
        <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 border border-gold/20">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-lg font-medium text-ink">Test User</h2>
          <p className="text-sm text-ink-muted">+251 91 234 5678</p>
        </div>
      </Card>

      <section className="space-y-3">
        <Card className="divide-y divide-ink/10">
          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-surface-raised transition-colors">
            <div className="flex items-center gap-3 text-ink">
              <Settings className="w-5 h-5 text-ink-muted" />
              <span className="font-medium">Account Settings</span>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-surface-raised transition-colors">
            <div className="flex items-center gap-3 text-coral">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
