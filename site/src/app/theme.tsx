import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type SiteTheme = 'light' | 'dark';
/** Examples can additionally be shown in both themes at once. */
export type ExampleTheme = SiteTheme | 'both';

type Ctx = { theme: SiteTheme; setTheme: (t: SiteTheme) => void; exampleTheme: ExampleTheme; setExampleTheme: (t: ExampleTheme) => void };
const ThemeCtx = createContext<Ctx>({ theme: 'light', setTheme: () => {}, exampleTheme: 'light', setExampleTheme: () => {} });

const store = {
  get: (k: string) => {
    try { return localStorage.getItem(k); } catch { return null; }
  },
  set: (k: string, v: string) => {
    try { localStorage.setItem(k, v); } catch { /* private mode: keep in memory */ }
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<SiteTheme>(() => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'));
  const [both, setBoth] = useState(() => store.get('eq-site-both') === '1');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const setTheme = (t: SiteTheme) => {
    setThemeState(t);
    store.set('eq-site-theme', t);
  };
  const exampleTheme: ExampleTheme = both ? 'both' : theme;
  const setExampleTheme = (t: ExampleTheme) => {
    if (t === 'both') {
      setBoth(true);
      store.set('eq-site-both', '1');
    } else {
      setBoth(false);
      store.set('eq-site-both', '0');
      setTheme(t);
    }
  };
  return <ThemeCtx.Provider value={{ theme, setTheme, exampleTheme, setExampleTheme }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
