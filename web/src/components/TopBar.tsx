import type { ReactNode } from 'react';
import { EqualLogo } from '../foundations/EqualMark';
import { PlanBadge } from './Badge';

export type TopBarProps = { plan?: string | null; trailing?: ReactNode; /** Red PLAN EXPIRED badge. */ planTone?: 'paid' | 'expired' };

/** Home top bar — logo + plan marker. */
export function TopBar({ plan = 'Unlimited', trailing, planTone }: TopBarProps) {
  return (
    <div style={{ width: '100%', boxSizing: 'border-box', height: 56, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
      <EqualLogo height={20} />
      {plan && <PlanBadge label={plan} tone={planTone} />}
      <span style={{ flex: 1 }} />
      {trailing}
    </div>
  );
}
