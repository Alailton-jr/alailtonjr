import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.tsx';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Projects = lazy(() => import('./pages/Projects').then(m => ({ default: m.Projects })));
const CV = lazy(() => import('./pages/CV').then(m => ({ default: m.CV })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Publications = lazy(() => import('./pages/Publications').then(m => ({ default: m.default })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));
const VIED = lazy(() => import('./pages/projects/vied').then(m => ({ default: m.default })));
const FaultLocator = lazy(() => import('./pages/projects/FaultLocator').then(m => ({ default: m.default })));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-muted-fg">Loading...</div>
  </div>
);

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Projects />
          </Suspense>
        ),
      },
      {
        path: 'cv',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CV />
          </Suspense>
        ),
      },
      {
        path: 'publications',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Publications />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: '/projects/vied',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <VIED />
          </Suspense>
        ),
      },
      {
        path: '/projects/fault-locator',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <FaultLocator />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);
