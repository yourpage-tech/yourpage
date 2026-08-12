import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from './theme-provider';
import { useState, MouseEvent } from 'react';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Timeout garante que o fechamento do menu mobile no Framer Motion não cancele o scroll no celular
    setTimeout(() => {
      const element = document.querySelector(targetId);
      if (element) {
        const headerOffset = window.innerWidth < 768 ? 70 : 85;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("Olá, gostaria de falar com um especialista.");
    window.open(`https://wa.me/5582988736580?text=${message}`, '_blank');
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50"
    >
      <div className="container mx-auto px-4 sm:px-6 py-3.5 md:py-5 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={handleScrollToTop}
          className="flex items-center gap-2"
          style={{ cursor: 'pointer' }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-lg opacity-50"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-lg sm:text-xl">
              YourPage
            </div>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: 'Benefícios', href: '#beneficios' },
            { name: 'Serviços', href: '#servicos' },
            { name: 'Portfólio', href: '#portfolio' },
            { name: 'Como Funciona', href: '#como-funciona' },
            { name: 'Quem Somos', href: '#sobre-nos' },
            { name: 'Orçamentos', href: '#planos' }
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="relative text-foreground/80 hover:text-foreground transition-colors py-1 font-medium group cursor-pointer"
            >
              <span>{item.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 group-hover:w-full shadow-sm shadow-purple-500/50"></span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            aria-label="Alternar Tema"
            className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppContact}
            className="hidden md:block px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-shadow cursor-pointer"
          >
            Falar com especialista
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu"
            className="md:hidden p-2 rounded-lg bg-accent cursor-pointer"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="container mx-auto px-5 py-5 flex flex-col gap-3">
              {[
                { name: 'Benefícios', href: '#beneficios' },
                { name: 'Serviços', href: '#servicos' },
                { name: 'Portfólio', href: '#portfolio' },
                { name: 'Como Funciona', href: '#como-funciona' },
                { name: 'Quem Somos', href: '#sobre-nos' },
                { name: 'Orçamentos', href: '#planos' }
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative text-foreground/80 hover:text-foreground transition-colors py-2.5 px-3 rounded-lg hover:bg-accent/50 text-base font-medium transition-all cursor-pointer block"
                >
                  <span>{item.name}</span>
                </a>
              ))}
              <button
                onClick={handleWhatsAppContact}
                className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-center cursor-pointer shadow-md"
              >
                Falar com especialista
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}