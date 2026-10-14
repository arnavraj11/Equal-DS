import { useState } from 'react';
import { Icon } from '../foundations/Icon';
import { Text } from '../foundations/Text';
import { TextButton } from './Button';

export type FeedbackCardProps = {
  question?: string;
  /** Controlled rating 0–5. */
  rating?: number;
  onRate?: (rating: number) => void;
  onShare?: (rating: number) => void;
  width?: number;
};

/** Post-call rating card (Component ref #13). */
export function FeedbackCard({ question = 'How would you rate the call?', rating, onRate, onShare, width = 246 }: FeedbackCardProps) {
  const [internal, setInternal] = useState(0);
  const [hover, setHover] = useState(0);
  const value = rating ?? internal;
  const shown = hover || value;
  return (
    <div style={{ width, background: 'var(--eq-bg-surface)', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '12px 10px 10px' }}>
        <Text as="div" variant="body1">{question}</Text>
        <div role="radiogroup" aria-label="Rating" style={{ display: 'flex', gap: 8, marginTop: 10 }} onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={value === n}
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              className="eq-reset-btn eq-pressable"
              onMouseEnter={() => setHover(n)}
              onClick={() => {
                setInternal(n);
                onRate?.(n);
              }}
            >
              <Icon name={n <= shown ? 'star' : 'star-outline'} size={32} color={n <= shown ? 'var(--eq-rating-star-filled)' : 'var(--eq-text-placeholder)'} style={{ transition: 'fill var(--eq-duration-fast)' }} />
            </button>
          ))}
        </div>
      </div>
      <hr className="eq-divider" />
      <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TextButton trailingIcon="chevron-right" onClick={() => onShare?.(value)}>Share Feedback</TextButton>
      </div>
    </div>
  );
}
