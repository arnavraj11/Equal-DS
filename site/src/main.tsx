import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../web/src/tokens/tokens.css';
import '../../web/src/styles/base.css';
import './site.css';
import { RouterProvider } from './app/router';
import { ThemeProvider } from './app/theme';
import { Shell } from './app/Shell';
import { ToastProvider } from './ui/kit';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider>
        <ToastProvider>
          <Shell />
        </ToastProvider>
      </RouterProvider>
    </ThemeProvider>
  </StrictMode>,
);
