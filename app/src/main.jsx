import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Marks that JS is running, which is what hides the reveal-animated elements
// until GSAP brings them in. Without it (JS off, or a failed bundle) the page
// renders plainly visible.
document.documentElement.classList.add('js');

const container = document.getElementById('root');
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The build prerenders the content layer into index.html, so in production
// there is real markup to hydrate rather than replace.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
