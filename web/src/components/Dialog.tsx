import type { ReactNode } from 'react';
import { Asset, type AssetName } from '../foundations/Asset';
import { Text } from '../foundations/Text';
import { Button, TextButton } from './Button';

export type DialogProps = {
  open: boolean;
  title: string;
  subject?: string;
  body?: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** overlay covers nearest positioned ancestor; inline renders statically for docs. */
  mode?: 'overlay' | 'inline';
};

/** Decision dialog — title token, body1, text revise + filled commit (rule 4). */
export function Dialog({ open, title, subject, body, confirmLabel, cancelLabel = 'Cancel', destructive, onConfirm, onCancel, mode = 'overlay' }: DialogProps) {
  const box = (
    <div role="alertdialog" aria-label={title} style={{ width: 312, maxWidth: 'calc(100% - 48px)', background: 'var(--eq-bg-surface)', borderRadius: 24, padding: 24, boxShadow: 'var(--eq-shadow-nav)' }}>
      <Text as="h2" variant="title">{title}</Text>
      {subject && <Text as="div" variant="caption" color="tertiary" style={{ marginTop: 2 }}>{subject}</Text>}
      {body && <Text as="p" variant="body1" color="secondary" style={{ marginTop: 12 }}>{body}</Text>}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 20, marginTop: 24 }}>
        <TextButton tone="neutral" onClick={onCancel}>{cancelLabel}</TextButton>
        <Button variant={destructive ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </div>
  );
  if (mode === 'inline') return box;
  if (!open) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--eq-scrim)' }} onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} style={{ display: 'contents' }}>{box}</div>
    </div>
  );
}

/** Snackbar / toast — inverse surface. */
export function Snackbar({ message, actionLabel, onAction }: { message: string; actionLabel?: string; onAction?: () => void }) {
  return (
    <div role="status" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, background: 'var(--eq-text-primary)', boxShadow: 'var(--eq-shadow-nav)' }}>
      <span className="eq-t-body1" style={{ flex: 1, color: 'var(--eq-bg-surface)' }}>{message}</span>
      {actionLabel && (
        <button type="button" className="eq-reset-btn eq-touch eq-t-button" style={{ color: 'var(--eq-button-secondary)' }} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

/** Empty / error state — illustration slot, subheading title, captionWrap body, optional action. */
export function EmptyState({ title, body, illustration, actionLabel, onAction }: { title: string; body?: string; illustration?: AssetName; actionLabel?: string; onAction?: () => void }) {
  return (
    <div style={{ width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 32px' }}>
      {illustration && <Asset name={illustration} size={96} />}
      <Text as="h2" variant="subheading" style={{ marginTop: illustration ? 16 : 0 }}>{title}</Text>
      {body && <Text as="p" variant="captionWrap" color="tertiary" style={{ marginTop: 4, maxWidth: 260 }}>{body}</Text>}
      {actionLabel && (
        <div style={{ marginTop: 20 }}>
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      )}
    </div>
  );
}
