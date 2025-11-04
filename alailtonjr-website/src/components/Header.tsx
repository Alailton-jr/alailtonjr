import { NavLink } from 'react-router-dom';

export function Header() {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/cv', label: 'CV' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-80 items-center justify-center rounded-xl bg-accent text-accent-fg font-bold text-lg">
              Alailton Alves
            </div>
          </NavLink>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-muted text-fg'
                      : 'text-muted-fg hover:text-fg hover:bg-muted/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu */}
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <select
                onChange={(e) => window.location.href = e.target.value}
                className="px-3 py-2 rounded-lg border border-border bg-card text-sm"
                defaultValue=""
              >
                <option value="" disabled>Menu</option>
                {navLinks.map((link) => (
                  <option key={link.to} value={link.to}>
                    {link.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
