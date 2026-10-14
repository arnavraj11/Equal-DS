import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

// Hash routing (#/components/button) so the static build works on any host with no rewrites.
const read = () => {
  const h = window.location.hash.replace(/^#/, '') || '/';
  const [path, anchor] = h.split('~');
  return { path: path || '/', anchor: anchor || null };
};

type Route = { path: string; anchor: string | null; go: (path: string, anchor?: string) => void };
const Ctx = createContext<Route>({ path: '/', anchor: null, go: () => {} });

export function RouterProvider({ children }: { children: ReactNode }) {
  const [loc, setLoc] = useState(read);
  useEffect(() => {
    const on = () => setLoc(read());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const go = useCallback((path: string, anchor?: string) => {
    const next = `#${path}${anchor ? `~${anchor}` : ''}`;
    if (window.location.hash === next) {
      if (anchor) document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.location.hash = next;
  }, []);
  return <Ctx.Provider value={{ ...loc, go }}>{children}</Ctx.Provider>;
}

export const useRoute = () => useContext(Ctx);

/** In-app link. Renders a real <a href> so middle-click / copy-link work. */
export function Link({ to, anchor, children, className, onClick, ...rest }: { to: string; anchor?: string; children: ReactNode; className?: string; onClick?: () => void } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'>) {
  return (
    <a href={`#${to}${anchor ? `~${anchor}` : ''}`} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
