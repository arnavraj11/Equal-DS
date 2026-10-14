import type { ReactNode } from 'react';
import { Text } from '../foundations/Text';

const pill = {
  display: 'inline-flex',
  alignItems: 'center',
  height: 24,
  padding: '0 14px',
  borderRadius: 8,
  background: 'var(--eq-bg-surface)',
  border: '1px solid var(--eq-stroke-subtle)',
} as const;

/** Day divider in a thread ("Today", "12 July"). */
export function DayDivider({ label }: { label: string }) {
  return (
    <div className="eq-center-row" style={{ display: 'flex', justifyContent: 'center' }}>
      <span style={pill}>
        <Text variant="micro">{label}</Text>
      </span>
    </div>
  );
}

/** Thread event ("Call Started 03:31", "Call Ended 03:31"). */
export function ThreadEvent({ label }: { label: string }) {
  return (
    <div className="eq-center-row" style={{ display: 'flex', justifyContent: 'center' }}>
      <span style={pill}>
        <Text variant="micro" color="secondary">{label}</Text>
      </span>
    </div>
  );
}

/** Thread notice ("Call has ended. You are now talking to your AI assistant."). */
export function ThreadNotice({ children }: { children: ReactNode }) {
  return (
    <div className="eq-center-row" style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: 240, padding: '8px 16px', borderRadius: 8, background: 'var(--eq-notice-bg)' }}>
        <Text as="p" variant="captionWrap" color="secondary" align="center">{children}</Text>
      </div>
    </div>
  );
}
