import { Text, typography, type TypeName } from '@equal/ds';
import { typeRows } from '../../data/typeRows';
import { CopyTag, H2, Page } from '../../ui/kit';
import { FoundationCode } from '../../ui/FoundationCode';

const cls = (t: string) => `eq-t-${t.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())}`;

const pairings: { v: TypeName; c: string; s: string; r: string }[] = [
  { v: 'subheading', c: 'primary', s: 'Instructions', r: 'The name of this row' },
  { v: 'bodyLarge', c: 'primary', s: 'Your family calls you a lot.', r: "The assistant's own voice" },
  { v: 'body1', c: 'primary', s: 'Vijay from NoBroker called with an offer', r: 'Content to read' },
  { v: 'body1', c: 'secondary', s: 'Tomorrow, 9:00 AM', r: 'Supporting detail' },
  { v: 'body2', c: 'primary', s: 'WhatsApp · Amit Nanda', r: 'Who or where it came from' },
  { v: 'body2', c: 'action', s: 'Equal AI', r: 'The assistant is speaking' },
  { v: 'button', c: 'action', s: 'Call back', r: 'Touch this and something happens' },
  { v: 'button', c: 'danger', s: 'Delete', r: 'This cannot be undone' },
  { v: 'caption', c: 'tertiary', s: 'Call Summary', r: 'Names the thing beside it' },
  { v: 'micro', c: 'tertiary', s: '03:21 · Yesterday · 12 July', r: 'When this happened' },
];

export default function Typography() {
  return (
    <Page title="Typography" lead="DM Sans in twelve tokens and five tiers. Text that doesn’t match a token is a bug, not a variant. At the 360dp frame 1px = 1dp = 1sp, so the numbers are what ships." meta={<><CopyTag k="CSS" value=".eq-t-body1" /><CopyTag k="React" value={'<Text variant="body1">'} /><CopyTag k="Kotlin" value="EqualTheme.type.body1" /></>}>
      <H2>The scale</H2>
      <div>
        {typeRows.map((r) => {
          const s = typography[r.token];
          return (
            <div key={r.token} className="s-typerow" id={`type-${r.token}`}>
              <div>
                <div style={{ fontWeight: 500 }}>{r.token}</div>
                <div style={{ fontSize: 12, color: 'var(--site-ink-3)' }}>{r.tier}</div>
              </div>
              <div style={{ minWidth: 0 }}>
                <Text as="div" variant={r.token}>{r.sample}</Text>
                <div style={{ fontSize: 13, color: 'var(--site-ink-3)', marginTop: 6 }}>{r.lives}</div>
              </div>
              <div className="s-typerow__spec">
                {s.size}sp / {s.lineHeight} · {s.weight}
                {'italic' in s && s.italic ? ' italic' : ''}
                <br />
                {s.tracking > 0 ? '+' : ''}
                {s.tracking}em{'uppercase' in s && s.uppercase ? ' · UPPER' : ''}
                {'tabular' in s && s.tabular ? ' · tnum' : ''}
                <div style={{ marginTop: 6 }}><CopyTag value={cls(r.token)} /></div>
              </div>
            </div>
          );
        })}
      </div>

      <H2>Weight and colour carry the hierarchy</H2>
      <p className="s-p">Six tokens resolve to 14 or 16sp, so inside a row size carries no information. Three rules hold the system together: <strong>green means actionable</strong>; <strong>Medium is scanned, Regular is read</strong>, and wrapping text is always Regular; and <strong>two actions at equal weight are one action</strong>, so commit is a filled button and revise is a text action.</p>
      <div className="s-grid" style={{ ['--min' as string]: '260px' }}>
        {pairings.map((p) => (
          <div key={p.v + p.c + p.s} className="s-dd">
            <Text as="div" variant={p.v} color={p.c as 'primary'}>{p.s}</Text>
            <div style={{ fontFamily: 'var(--site-mono)', fontSize: 12, color: 'var(--site-ink-3)', margin: '10px 0 2px' }}>{p.v} · text/{p.c}</div>
            <div style={{ fontSize: 13, color: 'var(--site-ink-2)' }}>{p.r}</div>
          </div>
        ))}
      </div>

      <H2>Weights, tracking and scripts</H2>
      <p className="s-p">Four DM Sans weights are loaded: 400, 500, 600 and 700. SemiBold 600 is used where the designs use it (plan names such as “Equal AI Unlimited”); 700 is for display lines. Everything is DM Sans; nothing is set in Lora. Tracking is −0.026em everywhere except the two uppercase tokens (Overline +0.08em, Badge +0.06em). Devanagari renders through Noto Sans Devanagari: body line heights are 22 so mixed lines fit, and tracking resets to 0em on non-Latin strings (<code>{'<Text nonLatin>'}</code>).</p>
      <div className="s-grid" style={{ ['--min' as string]: '220px' }}>
        {[400, 500, 600, 700].map((w) => (
          <div key={w} className="s-dd">
            <div style={{ font: `${w} 44px/1.1 var(--eq-font-family)`, letterSpacing: '-0.03em' }}>Keshav</div>
            <div style={{ fontFamily: 'var(--site-mono)', fontSize: 12, color: 'var(--site-ink-3)', marginTop: 6 }}>{w} · {w === 400 ? 'Regular, prose and inputs' : w === 500 ? 'Medium, labels and actions' : w === 600 ? 'SemiBold, plan names' : 'Bold, display lines'}</div>
          </div>
        ))}
        <div className="s-dd">
          <Text as="div" variant="body1" nonLatin>विजय ने सेक्टर 12 में एक 2BHK फ्लैट के बारे में कॉल किया था।</Text>
          <div style={{ fontFamily: 'var(--site-mono)', fontSize: 12, color: 'var(--site-ink-3)', marginTop: 6 }}>Devanagari · 0em tracking</div>
        </div>
      </div>

      <H2>Numerals</H2>
      <p className="s-p">Tabular figures wherever a number changes in place or lines up in a column: <code>micro</code>, the count badge, phone numbers, the playback pill, the plan price and pincodes.</p>
      <div style={{ display: 'flex', gap: 48 }}>
        <div>
          {['03:21', '11:11', '10:07', '02:37'].map((t) => <div key={t} className="eq-t-body1" style={{ fontVariantNumeric: 'proportional-nums', textAlign: 'right' }}>{t}</div>)}
          <div style={{ fontSize: 12, color: 'var(--site-ink-3)', marginTop: 6 }}>Proportional</div>
        </div>
        <div>
          {['03:21', '11:11', '10:07', '02:37'].map((t) => <Text key={t} as="div" variant="micro" style={{ fontSize: 14, lineHeight: '22px', textAlign: 'right' }}>{t}</Text>)}
          <div style={{ fontSize: 12, color: 'var(--site-ink-3)', marginTop: 6 }}>Tabular</div>
        </div>
      </div>
      <H2>Code</H2>
      <FoundationCode id="typography" />
    </Page>
  );
}
