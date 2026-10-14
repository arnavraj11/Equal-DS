import { useState } from 'react';
import { decisions } from '../../data/decisions';
import { H2, Page } from '../../ui/kit';

/** Every rule the system follows, with the reason it was decided and where it came from. */
export default function Decisions() {
  const [q, setQ] = useState('');
  const term = q.trim().toLowerCase();
  const groups = decisions
    .map((g) => ({ ...g, items: g.items.filter((d) => !term || `${d.rule} ${d.why} ${d.source} ${d.where ?? ''}`.toLowerCase().includes(term)) }))
    .filter((g) => g.items.length);
  const total = decisions.reduce((n, g) => n + g.items.length, 0);
  return (
    <Page
      title="Rules & decisions"
      lead={`The ${total} rules the system follows and why each one was decided. When a design file and the system disagree, look here first; if a rule should change, change it here and in the code together.`}
    >
      <div className="s-decisions__search">
        <input className="s-input" type="search" placeholder="Filter rules (e.g. price, emoji, avatar)" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Filter rules" />
      </div>
      {groups.map((g) => (
        <section key={g.id}>
          <H2 id={g.id}>{g.title}</H2>
          <p className="s-p">{g.intro}</p>
          <ol className="s-decisions">
            {g.items.map((d) => (
              <li key={d.rule}>
                <b>{d.rule}{d.experiment && <span className="s-pill" style={{ marginLeft: 8, verticalAlign: 2 }}>Experiment</span>}</b>
                <p><span className="s-decisions__label">Why</span>{d.why}</p>
                <div className="s-decisions__meta">
                  <span>{d.source}</span>
                  {d.where && <code>{d.where}</code>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}
      {groups.length === 0 && <p className="s-p">No rule matches “{q}”.</p>}
    </Page>
  );
}
