import { useEffect, useState } from 'react';
import { componentDocs } from '../registry/components';
import composeSnippets from '../registry/compose-snippets.json';
import type { ComponentDoc } from '../registry/types';
import { Link } from '../app/router';
import { CopyTag, DoDont, Example, md, Page, PropsTable } from '../ui/kit';

type Tab = 'overview' | 'props' | 'tokens';
const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'props', label: 'Properties' },
  { id: 'tokens', label: 'Tokens & specs' },
];

export default function ComponentPage({ doc }: { doc: ComponentDoc }) {
  const [tab, setTab] = useState<Tab>('overview');
  useEffect(() => setTab('overview'), [doc.id]);
  const i = componentDocs.findIndex((d) => d.id === doc.id);
  const prev = componentDocs[i - 1];
  const next = componentDocs[i + 1];
  return (
    <Page
      key={doc.id}
      title={doc.name}
      lead={md(doc.summary)}
      toc={false}
      meta={
        <>
          <CopyTag k="Import" value={doc.importLine} label={doc.components.join(', ')} />
          {doc.compose.map((c) => <CopyTag key={c} k="Compose" value={c} />)}
        </>
      }
    >
      <div className="s-tabs" role="tablist" aria-label={`${doc.name} documentation`}>
        {TABS.map((t) => (
          <button key={t.id} type="button" role="tab" id={`tab-${t.id}`} aria-selected={tab === t.id} aria-controls={`panel-${t.id}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="s-tabpanel">
        {tab === 'overview' && (
          <>
            {doc.examples.map((ex) => (
              <Example key={ex.title} title={ex.title} note={ex.note} code={ex.code} compose={(composeSnippets as Record<string, Record<string, string>>)[doc.id]?.[ex.title]} width={ex.width} surface={ex.surface}>
                {ex.render()}
              </Example>
            ))}
            <h2 className="s-h2">Usage</h2>
            <DoDont dos={doc.dos} donts={doc.donts} />
          </>
        )}

        {tab === 'props' &&
          doc.props.map((p) => (
            <section key={p.component} style={{ marginTop: 8 }}>
              <h3 className="s-h3"><code style={{ fontSize: 15 }}>{`<${p.component}>`}</code></h3>
              <div className="s-scroll"><PropsTable rows={p.props} /></div>
            </section>
          ))}

        {tab === 'tokens' && (
          <>
            <p className="s-p">The alias tokens this component reads. Change the value in <code>tokens/tokens.json</code>, not in the component.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {doc.tokens.map((t) => (
                <Link key={t} to="/foundations/colour" anchor={`t-${t.replace(/^component\//, '').replace(/[/_]/g, '-')}`} className="s-tag">{t}</Link>
              ))}
            </div>
            {doc.spec && (
              <>
                <h2 className="s-h2">Spec</h2>
                <p className="s-p">{md(doc.spec)}</p>
              </>
            )}
            <h2 className="s-h2">Compose</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {doc.compose.map((c) => <CopyTag key={c} k="Compose" value={c} />)}
            </div>
          </>
        )}
      </div>

      <nav className="s-prevnext" aria-label="Previous and next component">
        {prev ? <Link to={`/components/${prev.id}`} className="s-arrowlink" style={{ color: 'var(--site-ink-2)' }}>← {prev.name}</Link> : <span />}
        {next && <Link to={`/components/${next.id}`} className="s-arrowlink">{next.name} →</Link>}
      </nav>
    </Page>
  );
}
