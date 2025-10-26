import { Link } from 'wouter';
import { Button } from './ui/Button';
import { useTheme } from '@/contexts/ThemeContext';
import { Music, Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-surface/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Music className="w-8 h-8 text-primary" />
              <div>
                <div className="font-bold text-gradient text-lg">Elevated</div>
                <div className="text-xs tracking-widest">MEDIA HOUSE</div>
              </div>
            </a>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a href="/#pricing" className="text-text-secondary hover:text-text-primary transition-colors">
              Pricing
            </a>
            <Link href="/ai-tools">
              <a className="text-text-secondary hover:text-text-primary transition-colors">
                AI Tools
              </a>
            </Link>
            <a href="/#faq" className="text-text-secondary hover:text-text-primary transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <Link href="/login">
              <Button size="sm">Get Started</Button>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-text-primary"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 border-t border-border">
            <a
              href="/#pricing"
              className="block px-4 py-2 text-text-secondary hover:bg-surface-elevated rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <Link href="/ai-tools">
              <a
                className="block px-4 py-2 text-text-secondary hover:bg-surface-elevated rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Tools
              </a>
            </Link>
            <a
              href="/#faq"
              className="block px-4 py-2 text-text-secondary hover:bg-surface-elevated rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
