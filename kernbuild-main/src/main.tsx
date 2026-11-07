import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import './shared/styles/index.scss';
import 'lenis/dist/lenis.css';

const root = document.getElementById('root');
if (!root) throw new Error('The React root element was not found.');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
