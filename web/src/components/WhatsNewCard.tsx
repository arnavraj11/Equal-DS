import type { ReactNode } from 'react';
import { Asset } from '../foundations/Asset';
import { Text } from '../foundations/Text';
import type { IconName } from '../foundations/icons';
import { FeatureBadge } from './Badge';
import { Button, IconButton } from './Button';

export type WhatsNewCardProps = {
  heading: ReactNode;
  body: ReactNode;
  ctaLabel: string;
  ctaIcon?: IconName;
  onCta?: () => void;
  onDismiss?: () => void;
  badge?: string;
  width?: number | string;
};

// Structure: a flat fill (`whats-new/bg`), then a blurred circle (`whats-new/glow`) in the bottom-right
// corner, then the illustration on top of it. The illustration (robot with scripts around it,
// transparent) sits whole on the right: 125dp square, 4dp from the right and 35dp from the top.
const ART = 125;
const GLOW = 150;

/** Feature announcement card (Component ref #22; Language Preference design). */
export function WhatsNewCard({ heading, body, ctaLabel, ctaIcon = 'star', onCta, onDismiss, badge = 'New feature', width = 322 }: WhatsNewCardProps) {
  return (
    <div style={{ width, maxWidth: '100%', boxSizing: 'border-box', position: 'relative', overflow: 'hidden', isolation: 'isolate', borderRadius: 20, background: 'var(--eq-whats-new-bg)', padding: '18px 16px 18px 18px', minHeight: 172 }}>
      <span aria-hidden style={{ position: 'absolute', right: -36, bottom: -48, width: GLOW, height: GLOW, borderRadius: '50%', background: 'var(--eq-whats-new-glow)', filter: 'blur(32px)', zIndex: -2 }} />
      <Asset
        name="whats-new-illustration"
        size={ART}
        style={{ position: 'absolute', right: 4, top: 35, zIndex: -1 }}
      />
      <div style={{ position: 'relative', maxWidth: 'calc(100% - 112px)' }}>
        <FeatureBadge label={badge} />
        <Text as="h3" variant="title" color="action" style={{ marginTop: 12, fontSize: 18, lineHeight: '24px', fontWeight: 700 }}>{heading}</Text>
        <Text as="p" variant="caption" color="secondary" style={{ marginTop: 4, fontWeight: 400 }}>{body}</Text>
        <div style={{ marginTop: 14 }}>
          <Button leadingIcon={ctaIcon} onClick={onCta}>{ctaLabel}</Button>
        </div>
      </div>
      {onDismiss && (
        <IconButton icon="close" label="Dismiss" onClick={onDismiss} size={32} iconSize={22} style={{ position: 'absolute', top: 8, right: 8, color: 'var(--eq-text-placeholder)' }} />
      )}
    </div>
  );
}
