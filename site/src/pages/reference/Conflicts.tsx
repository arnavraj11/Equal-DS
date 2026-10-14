import { useState } from 'react';
import { conflicts } from '../../data/conflicts';
import { Page } from '../../ui/kit';

export default function Conflicts() {
  const [open, setOpen] = useState(false);
  const list = open ? conflicts.filter((c) => c.tone === 'warn') : conflicts;
  return (
    <Page title="Spec conflicts" lead="Where the designs disagree or leave gaps, and what the code does about it. Each row maps to a token or a component you can change in one place." toc={false}>
      <div className="s-filters">
        <button type="button" className="s-filter" aria-pressed={!open} onClick={() => setOpen(false)}>All <span className="s-num">({conflicts.length})</span></button>
        <button type="button" className="s-filter" aria-pressed={open} onClick={() => setOpen(true)}>Needs design <span className="s-num">({conflicts.filter((c) => c.tone === 'warn').length})</span></button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="s-table">
          <thead><tr><th style={{ width: '22%' }}>Area</th><th>What the sources say</th><th>What the code does</th></tr></thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.area}>
                <td><div style={{ fontWeight: 500 }}>{c.area}</div>{c.tone === 'warn' && <span className="s-pill" style={{ marginTop: 6 }}>needs design</span>}{c.decision.startsWith('Resolved') && <span className="s-pill s-pill--ok" style={{ marginTop: 6 }}>resolved</span>}</td>
                <td>{c.issue}</td>
                <td style={{ color: 'var(--site-ink)' }}>{c.decision}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}
