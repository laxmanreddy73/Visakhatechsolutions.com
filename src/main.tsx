import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Cache-clearing and service worker management
if (import.meta.env.PROD) {
  // Clear existing service workers and caches
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => registration.unregister());
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => caches.delete(cacheName));
      });
    });
  }

  // Force fresh load with cache-busting query parameter
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set('v', Date.now().toString());
  window.history.replaceState({}, document.title, newUrl.toString());
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);