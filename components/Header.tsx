
import { NAV_LINKS } from '../constants';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between text-text-primary border border-border-primary rounded-full px-4 sm:px-6 py-3 blur-backdrop shadow-lg">
          <a href="#" className="text-xl font-bold tracking-wider">
            Tessa Studio
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-text-secondary hover:text-text-primary transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="#assistant" className="hidden md:inline-block bg-accent-primary text-primary-text px-5 py-2 rounded-full font-semibold hover:bg-accent-secondary transition-colors duration-300">
              Pide una Consulta
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};