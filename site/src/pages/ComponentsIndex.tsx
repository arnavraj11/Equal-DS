import { componentDocs } from '../registry/components';
import { componentGroups } from '../app/nav';
import { Link } from '../app/router';
import { md, Page } from '../ui/kit';

// React 18 has no `inert` typing; the empty string sets the attribute.
const inert = { inert: '' } as object;

export default function ComponentsIndex() {
  const total = componentDocs.reduce((n, d) => n + d.components.length, 0);
  return (
    <Page title="Components" lead={`${componentDocs.length} pages covering ${total} exported components. Every preview is the real component from web/src.`} toc={false}>
      {componentGroups.map((g) => (
        <section key={g.label} className="s-cgroup">
          <h2 className="s-h3">{g.label} <span>{g.pages.length}</span></h2>
          <div className="s-cgrid">
            {g.pages.map((p) => {
              const d = componentDocs.find((x) => `/components/${x.id}` === p.path)!;
              const ex = d.examples[0];
              return (
                <Link key={p.path} to={p.path} className="s-ccard">
                  <div className="s-ccard__stage" aria-hidden {...inert}>
                    <div className="s-ccard__fit" style={{ width: ex?.width ?? 'auto' }}>{ex?.render()}</div>
                  </div>
                  <div className="s-ccard__body">
                    <b>{d.name}</b>
                    <span>{md(d.summary)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </Page>
  );
}
