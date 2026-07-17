import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App.tsx';
import { AuthProvider } from './components/AuthContext';
import { initializePaddleClient } from './paddle';
import './index.css';

initializePaddleClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <SpeedInsights />
    </AuthProvider>
  </StrictMode>,
);
