import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  X,
  ArrowRight,
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PortfolioItem {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  mockupDesktop?: string;
  mockupDesktops?: string[];
  mockupMobile?: string;
  pdf?: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    title: 'Grupo Pajuçara Hotéis',
    category: 'Blog & Painel Administrativo CMS',
    description:
      'Blog exclusivo desenvolvido para o Grupo Pajuçara Hotéis em Maceió-AL, englobando o Pajuçara Praia Hotel e o Pajuçara Express. Reúne informações completas dos hotéis, artigos, guia de experiências, FAQ interativo e um Painel Administrativo completo para a equipe gerenciar publicações e conteúdos em tempo real.',
    image: '/pajucaraDesk1.jpg',
    tags: ['Grupo Hoteleiro', 'Blog & Notícias', 'Painel Administrativo CMS', 'FAQ & Experiências'],
    link: 'https://blog.pajucarahotel.com.br/',
    mockupDesktops: ['/pajucaraDesk1.jpg', '/pajucaraDesk2.png', '/pajucaraDesk3.png'],
    mockupMobile: '/pajucaraMobile.jpg',
  },
  {
    title: 'HotelFlow',
    category: 'Gestão Hoteleira & Comunicação Interna',
    description:
      'Sistema de gestão e separação de Solicitações Internas para otimizar a comunicação e criação de projetos entre liderança e diretoria de um hotel. Possui controle de PDCA, auditorias, POPs e treinamentos.',
    image: '/hotelflowDesk.png',
    tags: ['Gestão Hoteleira', 'Solicitações Internas', 'PDCA & Auditorias', 'POPs & Treinamentos'],
    link: 'https://hotel-flow-sable.vercel.app/#/login',
    mockupDesktop: '/hotelflowDesk.png',
    mockupMobile: '/hotelflowMobile.png?v=3',
  },
  {
    title: 'Itukéti',
    category: 'E-commerce & Impacto Social',
    description:
      'Plataforma de e-commerce premium desenvolvida para conectar usuários à arte indígena autêntica do Pantanal brasileiro. O projeto promove sustentabilidade, impacto social e valorização cultural, oferecendo peças feitas à mão diretamente pelas comunidades locais.',
    image: '/ituketiDesk.png',
    tags: ['E-commerce', 'Impacto Social', 'Arte Indígena', 'Sustentabilidade', 'Cultura & Design'],
    link: 'https://ituketi.com/',
    mockupDesktop: '/ituketiDesk.png',
    mockupMobile: '/ituketiMobile.jpg',
  },
  {
    title: 'ANNIS',
    category: 'Plataforma & Impacto Socioambiental',
    description:
      'Associação Nacional de Negócios de Impacto Socioambiental (ANNIS) conecta e fortalece negócios de impacto no Brasil com recursos, networking, eventos e ferramentas educacionais para crescimento e colaboração.',
    image: '/annisDesk.png',
    tags: ['Impacto Socioambiental', 'Networking', 'Ferramentas Educacionais', 'Negócios de Impacto'],
    link: 'https://www.annis.org.br/',
    mockupDesktop: '/annisDesk.png',
    mockupMobile: '/annisMobile.jpg',
  },
];

const STORY_DURATION_MS = 6500;

export function PortfolioSection() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activePreviewDesktopIndex, setActivePreviewDesktopIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progressPct, setProgressPct] = useState(0);

  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [activeModalDesktopIndex, setActiveModalDesktopIndex] = useState(0);
  const pillsContainerRef = useRef<HTMLDivElement | null>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentProject = portfolioItems[activeProjectIndex] || portfolioItems[0];
  const currentProjectDesktops =
    currentProject.mockupDesktops ||
    (currentProject.mockupDesktop ? [currentProject.mockupDesktop] : [currentProject.image]);

  const goToProject = (index: number) => {
    const normalized = (index + portfolioItems.length) % portfolioItems.length;
    setActiveProjectIndex(normalized);
    setActivePreviewDesktopIndex(0);
    setProgressPct(0);
  };

  const handleNextProject = () => goToProject(activeProjectIndex + 1);
  const handlePrevProject = () => goToProject(activeProjectIndex - 1);

  const handleOpenItem = (item: PortfolioItem, initialDesktopIdx = 0) => {
    setSelectedItem(item);
    setActiveModalDesktopIndex(initialDesktopIdx);
  };

  // Auto-avanço do carrossel estilo Stories
  useEffect(() => {
    if (!isAutoPlaying || selectedItem) return;

    const tickMs = 50;
    const step = (tickMs / STORY_DURATION_MS) * 100;

    const interval = setInterval(() => {
      setProgressPct((prev) => {
        if (prev + step >= 100) {
          setActiveProjectIndex((idx) => (idx + 1) % portfolioItems.length);
          setActivePreviewDesktopIndex(0);
          return 0;
        }
        return prev + step;
      });
    }, tickMs);

    return () => clearInterval(interval);
  }, [isAutoPlaying, selectedItem, activeProjectIndex]);

  // Mantém a pílula do projeto ativo centralizada no carrossel horizontal sem rolar a página
  useEffect(() => {
    const container = pillsContainerRef.current;
    const activePill = pillRefs.current[activeProjectIndex];
    if (!container || !activePill) return;

    const targetLeft =
      activePill.offsetLeft - container.clientWidth / 2 + activePill.clientWidth / 2;
    container.scrollTo({ left: targetLeft, behavior: 'smooth' });
  }, [activeProjectIndex]);

  // Fecha o modal ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const modalDesktopsList = selectedItem
    ? selectedItem.mockupDesktops || (selectedItem.mockupDesktop ? [selectedItem.mockupDesktop] : [])
    : [];

  return (
    <section id="portfolio" className="py-16 md:py-28 relative overflow-hidden">
      {/* Decoração de fundo seguindo a paleta YourPage */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/5 to-transparent pointer-events-none" />
      <div className="absolute -left-24 top-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-24 bottom-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="text-xs sm:text-sm font-medium">Portfólio Interativo</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">
            Projetos que{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              inspiram
            </span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Navegue pelos sites e sistemas desenvolvidos pela YourPage nas versões mobile e desktop
          </p>
        </motion.div>

        {/* Carrossel horizontal em linha única (sem quebra de linha) */}
        <div className="relative mx-auto mb-8 sm:mb-10 flex max-w-3xl items-center gap-2">
          <button
            type="button"
            onClick={handlePrevProject}
            aria-label="Projeto anterior"
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm transition hover:border-purple-600/50 hover:text-purple-500"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={pillsContainerRef}
            className="flex flex-1 flex-nowrap items-center gap-2 overflow-x-auto scrollbar-none scroll-smooth py-1 px-1"
          >
            {portfolioItems.map((item, idx) => {
              const isActive = idx === activeProjectIndex;
              return (
                <button
                  key={item.title}
                  ref={(el) => {
                    pillRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => goToProject(idx)}
                  className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg shadow-purple-600/25'
                      : 'bg-card/80 text-muted-foreground border-border hover:border-purple-600/40 hover:text-foreground'
                  }`}
                >
                  <span className="opacity-70 mr-1.5">0{idx + 1}.</span>
                  {item.title}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNextProject}
            aria-label="Próximo projeto"
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm transition hover:border-purple-600/50 hover:text-purple-500"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* ================= PALCO INTERATIVO: CELULAR + DESKTOP ================= */}
        <div className="grid grid-cols-1 items-center gap-8 lg:gap-10 lg:grid-cols-12">
          {/* ESQUERDA (5 Colunas): Simulador Interativo de iPhone Stories */}
          <div className="flex flex-col items-center lg:col-span-5">
            <div className="relative w-full max-w-[325px]">
              {/* Brilho atrás do celular com a paleta YourPage */}
              <div className="pointer-events-none absolute -inset-3 rounded-[52px] bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-400 opacity-30 blur-xl" />

              {/* Moldura iPhone Pro */}
              <div className="relative overflow-hidden rounded-[44px] border-[6px] border-zinc-800 dark:border-zinc-800 bg-zinc-950 shadow-2xl shadow-purple-900/30">
                {/* Dynamic Island */}
                <div className="pointer-events-none absolute left-1/2 top-3 z-30 flex h-[22px] w-[96px] -translate-x-1/2 items-center justify-between rounded-full bg-black px-2.5">
                  <span className="size-2 rounded-full bg-zinc-800" />
                  <span
                    className={`size-2 rounded-full bg-purple-500 ${
                      isAutoPlaying ? 'animate-pulse' : 'opacity-50'
                    }`}
                  />
                </div>

                {/* Barras de Progresso discretas estilo Stories */}
                <div className="absolute left-3.5 right-3.5 top-10 z-30 flex gap-1.5">
                  {portfolioItems.map((item, idx) => {
                    const fillWidth =
                      idx < activeProjectIndex
                        ? '100%'
                        : idx === activeProjectIndex
                          ? `${progressPct}%`
                          : '0%';
                    return (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => goToProject(idx)}
                        aria-label={`Ver projeto ${item.title}`}
                        className="group relative h-1 flex-1 cursor-pointer overflow-hidden rounded-full bg-black/25 backdrop-blur-sm"
                      >
                        <span
                          className="block h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                          style={{
                            width: fillWidth,
                            transition: idx === activeProjectIndex ? 'none' : 'width 200ms ease-out',
                          }}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Tela Mobile (100% limpa, sem textos tampando o design do site) */}
                <div className="relative aspect-[472/1024] w-full bg-zinc-950 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProject.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-purple-950/30"
                    >
                      {currentProject.mockupMobile && (
                        <ImageWithFallback
                          src={currentProject.mockupMobile}
                          alt={`Versão Mobile - ${currentProject.title}`}
                          className="size-full object-cover object-top"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Zonas invisíveis para avançar / voltar ao tocar nas laterais */}
                  <button
                    type="button"
                    aria-label="Projeto anterior"
                    onClick={handlePrevProject}
                    className="absolute inset-y-16 left-0 z-20 w-1/3 cursor-pointer bg-transparent"
                  />
                  <button
                    type="button"
                    aria-label="Próximo projeto"
                    onClick={handleNextProject}
                    className="absolute inset-y-16 right-0 z-20 w-1/3 cursor-pointer bg-transparent"
                  />
                </div>
              </div>

              {/* Controles discretos abaixo do celular (fora da tela para não poluir a imagem) */}
              <div className="mt-3 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying((prev) => !prev)}
                  aria-label={isAutoPlaying ? 'Pausar carrossel' : 'Continuar carrossel'}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-purple-600/40 hover:text-foreground"
                >
                  {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isAutoPlaying ? 'Pausar' : 'Reproduzir'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenItem(currentProject, activePreviewDesktopIndex)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-purple-600/40 hover:text-foreground"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Ver Detalhes</span>
                </button>
              </div>
            </div>
          </div>

          {/* DIREITA (7 Colunas): Mockup de Notebook 16:9 + Bloco Explicativo Separado Abaixo */}
          <div className="flex flex-col gap-5 sm:gap-6 lg:col-span-7">
            {/* Mockup Realista de Notebook (estilo MacBook) */}
            <div className="relative w-full">
              {/* Brilho atrás do notebook seguindo a paleta YourPage */}
              <div className="pointer-events-none absolute -inset-2 sm:-inset-3 rounded-3xl bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-400 opacity-25 blur-xl" />

              <div className="relative flex flex-col items-center">
                {/* Tampa / Tela do Notebook */}
                <div className="relative w-[96%] overflow-hidden rounded-t-2xl sm:rounded-t-[22px] border-[6px] sm:border-[8px] border-zinc-800 bg-zinc-950 shadow-2xl shadow-purple-900/25">
                  {/* Barra superior da moldura com Webcam / Notch */}
                  <div className="relative flex items-center justify-center bg-zinc-950 py-1.5 border-b border-white/5">
                    <div className="flex items-center gap-1.5 rounded-full bg-black px-3 py-0.5">
                      <span className="size-1.5 rounded-full bg-zinc-700" />
                      <span className="size-1.5 rounded-full bg-purple-500/80" />
                    </div>
                  </div>

                  {/* Tela Desktop 16:9 */}
                  <div className="group relative aspect-video w-full overflow-hidden bg-zinc-950">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${currentProject.title}-${activePreviewDesktopIndex}`}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: 0.3 }}
                        className="size-full cursor-pointer"
                        onClick={() => handleOpenItem(currentProject, activePreviewDesktopIndex)}
                      >
                        <ImageWithFallback
                          src={currentProjectDesktops[activePreviewDesktopIndex] || currentProject.image}
                          alt={`Versão Desktop - ${currentProject.title}`}
                          className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Badge discreta no canto superior esquerdo da tela */}
                    <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md border border-white/10">
                      <span className="size-1.5 animate-ping rounded-full bg-emerald-400" />
                      <span>DESKTOP</span>
                    </div>

                    {/* Botão de expandir discreto no canto superior direito */}
                    <button
                      type="button"
                      onClick={() => handleOpenItem(currentProject, activePreviewDesktopIndex)}
                      aria-label="Expandir galeria"
                      title="Expandir galeria"
                      className="absolute right-3 top-3 z-20 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/15 transition hover:bg-purple-600"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Setas e bolinhas caso o projeto tenha múltiplas fotos Desktop */}
                    {currentProjectDesktops.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePreviewDesktopIndex((prev) =>
                              prev === 0 ? currentProjectDesktops.length - 1 : prev - 1
                            );
                          }}
                          aria-label="Tela desktop anterior"
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/15 transition hover:bg-purple-600"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePreviewDesktopIndex((prev) =>
                              prev === currentProjectDesktops.length - 1 ? 0 : prev + 1
                            );
                          }}
                          aria-label="Próxima tela desktop"
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/15 transition hover:bg-purple-600"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
                          {currentProjectDesktops.map((_, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActivePreviewDesktopIndex(idx);
                              }}
                              aria-label={`Ver tela ${idx + 1} de ${currentProject.title}`}
                              className={`h-2 rounded-full transition-all cursor-pointer ${
                                activePreviewDesktopIndex === idx
                                  ? 'w-6 bg-gradient-to-r from-blue-500 to-purple-500'
                                  : 'w-2 bg-white/40 hover:bg-white/70'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Base metálica do Notebook com recorte central */}
                <div className="relative h-3.5 sm:h-4 w-full rounded-b-xl bg-gradient-to-b from-zinc-600 via-zinc-700 to-zinc-900 border-t border-zinc-500/40 shadow-[0_18px_35px_-10px_rgba(0,0,0,0.75)]">
                  <div className="mx-auto h-1.5 w-16 sm:w-24 rounded-b-md bg-zinc-900/90 border-x border-b border-zinc-600/30" />
                </div>
              </div>
            </div>

            {/* Barra compacta abaixo do Notebook (apenas navegação e link) */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevProject}
                  aria-label="Projeto anterior"
                  className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-purple-600/50 hover:text-purple-500"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Projeto <strong className="text-foreground">{activeProjectIndex + 1}</strong> de {portfolioItems.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextProject}
                  aria-label="Próximo projeto"
                  className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-purple-600/50 hover:text-purple-500"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {currentProject.link && (
                <motion.a
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all cursor-pointer"
                >
                  <span>Acessar Projeto Online</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL DE EXPANSÃO DO PROJETO ================= */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-background/80 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-card border border-purple-600/20 rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-900/20 p-5 sm:p-8 md:p-10"
            >
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Fechar galeria"
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors cursor-pointer z-20"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="mb-6 sm:mb-8 pr-8 sm:pr-0">
                <span className="text-purple-600 dark:text-purple-400 font-bold mb-1.5 block text-xs sm:text-sm tracking-wider uppercase">
                  {selectedItem.category}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                  {selectedItem.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-5 sm:mb-6 max-w-3xl leading-relaxed">
                  {selectedItem.description}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                  {selectedItem.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-purple-600/10 text-purple-600 dark:text-purple-400 text-xs sm:text-sm font-medium border border-purple-600/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {selectedItem.link && (
                    <motion.a
                      href={selectedItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all cursor-pointer w-full sm:w-auto"
                    >
                      Acessar Projeto Online
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Área de Mockups (Desktop e Mobile) */}
              {(modalDesktopsList.length > 0 || selectedItem.mockupMobile) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 bg-accent/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border/50">
                  {modalDesktopsList.length > 0 && (
                    <div className="md:col-span-2 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground font-medium">
                          <Monitor className="w-5 h-5" /> Versão Desktop
                        </div>
                        {modalDesktopsList.length > 1 && (
                          <span className="text-xs text-muted-foreground font-medium bg-background px-2.5 py-1 rounded-full border border-border/50">
                            Foto {activeModalDesktopIndex + 1} de {modalDesktopsList.length}
                          </span>
                        )}
                      </div>

                      <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-sm bg-background aspect-video group">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeModalDesktopIndex}
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            transition={{ duration: 0.25 }}
                            className="w-full h-full"
                          >
                            <ImageWithFallback
                              src={modalDesktopsList[activeModalDesktopIndex]}
                              alt={`Desktop View ${activeModalDesktopIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        </AnimatePresence>

                        {modalDesktopsList.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveModalDesktopIndex((prev) =>
                                  prev === 0 ? modalDesktopsList.length - 1 : prev - 1
                                );
                              }}
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 hover:bg-background backdrop-blur-md border border-border flex items-center justify-center text-foreground transition-all shadow-md hover:scale-105 cursor-pointer z-10"
                              title="Foto anterior"
                            >
                              <ChevronLeft className="w-6 h-6" />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveModalDesktopIndex((prev) =>
                                  prev === modalDesktopsList.length - 1 ? 0 : prev + 1
                                );
                              }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 hover:bg-background backdrop-blur-md border border-border flex items-center justify-center text-foreground transition-all shadow-md hover:scale-105 cursor-pointer z-10"
                              title="Próxima foto"
                            >
                              <ChevronRight className="w-6 h-6" />
                            </button>

                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/50 z-10">
                              {modalDesktopsList.map((_, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveModalDesktopIndex(idx);
                                  }}
                                  className={`h-2 rounded-full transition-all cursor-pointer ${
                                    activeModalDesktopIndex === idx
                                      ? 'w-6 bg-purple-600'
                                      : 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground'
                                  }`}
                                  title={`Ir para foto ${idx + 1}`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedItem.mockupMobile && (
                    <div className="md:col-span-1 flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-muted-foreground font-medium">
                        <Smartphone className="w-5 h-5" /> Versão Mobile
                      </div>
                      <div className="rounded-2xl overflow-hidden border border-border/50 shadow-md bg-background/80 mx-auto w-full max-w-[300px] flex items-center justify-center p-2">
                        <ImageWithFallback
                          src={selectedItem.mockupMobile}
                          alt="Mobile View"
                          className="w-full h-auto max-h-[520px] object-contain rounded-xl"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
