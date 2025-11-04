import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl text-muted-fg">Page Not Found</p>
      <p className="text-muted-fg max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-fg font-semibold hover:opacity-90 transition-opacity"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
}
