// Removed React
import { Gift } from 'lucide-react';
import { Button, Input, Card, EmptyState } from '../../shared/components';

export default function PromotionsPage() {
  return (
    <div className="p-4 space-y-6">
      <header>
        <h1 className="text-2xl font-display font-medium text-ink mb-1">Promotions</h1>
        <p className="text-sm text-ink-muted">Redeem coupons and view active bonuses.</p>
      </header>

      <Card className="p-5 border-bonus-amber/20 bg-gradient-to-br from-surface to-surface-raised">
        <h3 className="text-sm font-medium text-bonus-amber mb-2">Redeem Coupon</h3>
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

      <section>
        <h3 className="font-medium text-ink mb-3">Active Bonuses</h3>
        <EmptyState 
          icon={Gift}
          title="No active bonuses"
          description="Bonus funds unlock after you wager through them — cash funds are always withdrawable."
        />
      </section>
    </div>
  );
}
