import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já aceitou cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-2xl"
        >
          <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 pr-8 md:pr-0">
              <div className="flex-1">
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Cookies e Tecnologias:</span>
                  {' '}Utilizamos cookies para melhorar sua experiência, personalizar conteúdo, 
                  analisar tráfego e manter você conectado. Ao continuar navegando, você concorda 
                  com nosso uso de cookies.
                </p>
              </div>

              <div className="flex flex-row gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0 justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleReject}
                  className="flex-1 sm:flex-initial px-4 py-2.5 sm:py-2 rounded-lg border border-border hover:bg-accent/50 text-xs sm:text-sm font-medium transition-colors cursor-pointer text-center"
                >
                  Rejeitar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAccept}
                  className="flex-1 sm:flex-initial px-4 py-2.5 sm:py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-shadow cursor-pointer text-center"
                >
                  Aceitar Tudo
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVisible(false)}
                aria-label="Fechar aviso"
                className="md:hidden p-1.5 rounded-lg bg-accent hover:bg-accent/80 transition-colors absolute top-3.5 right-3.5"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
