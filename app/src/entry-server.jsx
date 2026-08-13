import { renderToString } from 'react-dom/server';
import App from './App.jsx';

// Prerender entry. Renders the home page's content layer to static HTML at
// build time so the site is readable with JavaScript disabled — GitHub Pages
// has no server, so this is the only way to meet that requirement.
export function render() {
  return renderToString(<App />);
}
