import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Efeito de digitação (Typewriter) fluído com cursor único que transita da linha 1 para a linha 2
  const [typedLine1, setTypedLine1] = useState('');
  const [typedLine2, setTypedLine2] = useState('');
  const [activeLine, setActiveLine] = useState<1 | 2>(1);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const runTypewriter = async () => {
      await sleep(200);

      // 1. Digita a primeira linha "Presença Digital" (ritmo suave de ~75ms)
      const line1 = "Presença Digital";
      for (let i = 1; i <= line1.length; i++) {
        if (isCancelled) return;
        setTypedLine1(line1.slice(0, i));
        await sleep(75);
      }

      // Transita o cursor único para a segunda linha
      if (isCancelled) return;
      setActiveLine(2);
      await sleep(150);

      // 2. Digita a segunda linha "Estratégica"
      const line2 = "Estratégica";
      for (let i = 1; i <= line2.length; i++) {
        if (isCancelled) return;
        setTypedLine2(line2.slice(0, i));
        await sleep(75);
      }

      // Mantém o traço piscando por um breve período (~1.8s) no final da frase completa
      await sleep(1800);

      if (isCancelled) return;
      setIsTypingComplete(true);
    };

    runTypewriter();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Configurações imperativas para garantir reprodução automática inline no mobile (iOS/Android)
    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');

    // Função para garantir a reprodução contínua e sem interrupções
    const forcePlay = () => {
      if (video.paused) {
        video.play().catch(() => {
          // Trata silenciosamente caso o SO bloqueie temporariamente
        });
      }
    };

    forcePlay();

    // Eventos para reconectar a reprodução contínua e ao interagir na tela no mobile
    const handlePause = () => forcePlay();
    const handleEnded = () => forcePlay();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        forcePlay();
      }
    };
    const handleTouchOrScroll = () => {
      forcePlay();
    };

    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('touchstart', handleTouchOrScroll, { passive: true, once: true });
    document.addEventListener('scroll', handleTouchOrScroll, { passive: true, once: true });

    return () => {
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('touchstart', handleTouchOrScroll);
      document.removeEventListener('scroll', handleTouchOrScroll);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      {/* Vídeo de Fundo com Foco no Meio/Direita e Esfumaçado Escuro no Canto Esquerdo */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          src="/video header yp.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="w-full h-full object-cover scale-105 pointer-events-none"
        />
        {/* Degradê escuro concentrado EXCLUSIVAMENTE atrás dos textos (lado esquerdo) para leitura perfeita */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[55%] lg:w-[50%] bg-gradient-to-r from-black/95 via-black/85 to-transparent pointer-events-none"></div>
        {/* Degradê sutil no topo e rodapé para encaixar o menu e a transição do fundo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-background/90 pointer-events-none"></div>
      </div>

      {/* Conteúdo Sobreposto Alinhado à Esquerda sobre a Camada Esfumaçada */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <div className="max-w-2xl text-left flex flex-col items-start">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/15 backdrop-blur-md mb-6 shadow-lg shadow-purple-900/20"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs sm:text-sm font-medium text-white/90">Soluções digitais estratégicas</span>
          </motion.div>

          {/* Legenda/Título no canto esquerdo com efeito de digitação Typewriter de cursor único fluído */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] min-h-[110px] sm:min-h-[140px]"
          >
            <span>
              {typedLine1}
              {activeLine === 1 && !isTypingComplete && (
                <span className="inline-block w-1 sm:w-1.5 h-6 sm:h-10 bg-purple-400 rounded-sm animate-[pulse_0.6s_ease-in-out_infinite] ml-1.5 align-baseline shadow-[0_0_10px_#a855f7]" />
              )}
            </span>
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] min-h-[42px]">
              {typedLine2}
              {activeLine === 2 && !isTypingComplete && (
                <span className="inline-block w-1 sm:w-1.5 h-6 sm:h-10 bg-purple-400 rounded-sm animate-[pulse_0.6s_ease-in-out_infinite] ml-1.5 align-baseline shadow-[0_0_10px_#a855f7]" />
              )}
            </span>
          </motion.h1>

          {/* Subtítulo curto complementar */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 sm:mb-10 max-w-xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] font-medium"
          >
            Transforme seu negócio com sites, landing pages e sistemas modernos de alta conversão.
          </motion.p>

          {/* Botões de Ação Alinhados à Esquerda */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-start items-stretch sm:items-center w-full sm:w-auto"
          >
            <motion.button
              onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(124, 58, 237, 0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="px-8 sm:px-10 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 cursor-pointer text-sm sm:text-base border border-white/10"
            >
              Quero mais clientes online
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 sm:px-10 py-3 rounded-xl border border-white/20 bg-black/50 hover:bg-black/70 hover:border-purple-500/50 font-semibold backdrop-blur-md text-white transition-all cursor-pointer text-sm sm:text-base text-center"
            >
              Ver projetos
            </motion.button>
          </motion.div>

          {/* Destaques de Confiança Alinhados em Linha Única sem Quebras (flex-nowrap no Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 sm:mt-14 flex flex-nowrap overflow-x-auto max-w-full items-center justify-start gap-2 sm:gap-6 text-[11px] sm:text-xs md:text-sm text-gray-200 font-medium pb-1 whitespace-nowrap scrollbar-none"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 bg-black/60 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full border border-white/15 backdrop-blur-md shrink-0 whitespace-nowrap shadow-md">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              Sites responsivos
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-black/60 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full border border-white/15 backdrop-blur-md shrink-0 whitespace-nowrap shadow-md">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              SEO otimizado
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-black/60 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full border border-white/15 backdrop-blur-md shrink-0 whitespace-nowrap shadow-md">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              Entrega rápida
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] pointer-events-none z-10"></div>
    </section>
  );
}



