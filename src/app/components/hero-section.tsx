import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Função para garantir a reprodução contínua e sem interrupções
    const forcePlay = () => {
      if (video.paused) {
        video.play().catch(() => {
          // Trata silenciosamente se o navegador adiar o autoplay
        });
      }
    };

    forcePlay();

    // Reconecta a reprodução caso o navegador pause (ex: modo de economia de energia ou troca de aba)
    const handlePause = () => forcePlay();
    const handleEnded = () => forcePlay();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        forcePlay();
      }
    };

    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      {/* Vídeo de Fundo 100% Nítido e Brilhante (Sem Camadas Escuras Bloqueando a Imagem) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          src="/video header yp.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          className="w-full h-full object-cover scale-105"
        />
        {/* Degradê apenas no topo para a barra de navegação e no rodapé para a transição do fundo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-background"></div>
      </div>

      {/* Conteúdo Sobreposto em Destaque no Centro */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-white/15 backdrop-blur-md mb-6 shadow-lg shadow-purple-900/20"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs sm:text-sm font-medium text-white/90">Soluções digitais estratégicas</span>
        </motion.div>

        {/* Frase mais curta e concisa sobreposta ao vídeo */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
        >
          Presença Digital
          <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Estratégica
          </span>
        </motion.h1>

        {/* Subtítulo curto complementar */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg md:text-xl text-white mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] font-medium"
        >
          Transforme seu negócio com sites, landing pages e sistemas modernos de alta conversão.
        </motion.p>

        {/* Botões de Ação */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto"
        >
          <motion.button
            onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(124, 58, 237, 0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-10 sm:px-12 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 cursor-pointer text-sm sm:text-base border border-white/10"
          >
            Quero mais clientes online
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-10 sm:px-12 py-2.5 sm:py-3 rounded-xl border border-white/20 bg-black/40 hover:bg-black/60 hover:border-purple-500/50 font-semibold backdrop-blur-md text-white transition-all cursor-pointer text-sm sm:text-base"
          >
            Ver projetos
          </motion.button>
        </motion.div>

        {/* Destaques de Confiança */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300/80 font-medium"
        >
          <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            Sites responsivos
          </div>
          <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            SEO otimizado
          </div>
          <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            Entrega rápida
          </div>
        </motion.div>
      </div>

      {/* Decorative grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] pointer-events-none z-10"></div>
    </section>
  );
}



