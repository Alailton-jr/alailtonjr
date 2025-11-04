export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-bg mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
        <div className="text-center text-sm text-muted-fg">
          <p>© {currentYear} Alailton J. Alves Junior. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
