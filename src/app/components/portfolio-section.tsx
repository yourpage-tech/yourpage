import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, ArrowRight, Monitor, Smartphone, ChevronLeft, ChevronRight } from 'lucide-react';
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
    description: 'Blog exclusivo desenvolvido para o Grupo Pajuçara Hotéis em Maceió-AL, englobando o Pajuçara Praia Hotel e o Pajuçara Express. Reúne informações completas dos hotéis, artigos, guia de experiências, FAQ interativo e um Painel Administrativo completo para a equipe gerenciar publicações e conteúdos em tempo real.',
    image: '/pajucaraDesk1.jpg',
    tags: ['Grupo Hoteleiro', 'Blog & Notícias', 'Painel Administrativo CMS', 'FAQ & Experiências'],
    link: 'https://blog.pajucarahotel.com.br/',
    mockupDesktops: ['/pajucaraDesk1.jpg', '/pajucaraDesk2.png', '/pajucaraDesk3.png'],
    mockupMobile: '/pajucaraMobile.png'
  },
  {
    title: 'HotelFlow',
    category: 'Gestão Hoteleira & Comunicação Interna',
    description: 'Sistema de gestão e separação de Solicitações Internas para otimizar a comunicação e criação de projetos entre liderança e diretoria de um hotel. Possui controle de PDCA, auditorias, POPs e treinamentos.',
    image: '/hotelflowDesk.png',
    tags: ['Gestão Hoteleira', 'Solicitações Internas', 'PDCA & Auditorias', 'POPs & Treinamentos'],
    link: 'https://hotel-flow-sable.vercel.app/#/login',
    mockupDesktop: '/hotelflowDesk.png',
    mockupMobile: '/hotelflowMobile.png'
  },
  {
    title: 'Itukéti',
    category: 'E-commerce & Impacto Social',
    description: 'Plataforma de e-commerce premium desenvolvida para conectar usuários à arte indígena autêntica do Pantanal brasileiro. O projeto promove sustentabilidade, impacto social e valorização cultural, oferecendo peças feitas à mão diretamente pelas comunidades locais.',
    image: '/ituketiDesk.png',
    tags: ['E-commerce', 'Impacto Social', 'Arte Indígena', 'Sustentabilidade', 'Cultura & Design'],
    link: 'https://ituketi.com/',
    mockupDesktop: '/ituketiDesk.png',
    mockupMobile: '/ituketiMobile.png'
  }
];

export function PortfolioSection() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);

  const handleOpenItem = (item: PortfolioItem) => {
    setSelectedItem(item);
    setActiveDesktopIndex(0);
  };

  const desktopsList = selectedItem
    ? selectedItem.mockupDesktops || (selectedItem.mockupDesktop ? [selectedItem.mockupDesktop] : [])
    : [];

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Projetos que <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">inspiram</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Veja alguns exemplos do nosso trabalho e imagine o potencial do seu negócio
          </p>
        </motion.div>

        {portfolioItems.length > 0 ? (
          <div className={`grid grid-cols-1 ${portfolioItems.length === 1 ? 'max-w-2xl mx-auto' : portfolioItems.length === 2 ? 'md:grid-cols-2 max-w-5xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                onClick={() => handleOpenItem(item)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-purple-600/50 transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    >
                      <ExternalLink className="w-8 h-8 text-white" />
                    </motion.div>
                  </motion.div>
                </div>

                <div className="p-6">
                  <div className="text-sm text-purple-600 font-medium mb-2">{item.category}</div>
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-accent text-sm text-accent-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 rounded-2xl bg-card border border-border/50 max-w-xl mx-auto">
            <p className="text-muted-foreground text-lg font-medium">
              Novos projetos em breve! 🚀
            </p>
          </div>
        )}
      </div>

      {/* Modal de Expansão do Projeto */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-card border border-purple-600/20 rounded-3xl shadow-2xl shadow-purple-900/20 p-6 md:p-10"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors cursor-pointer z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-8">
                <span className="text-purple-600 font-bold mb-2 block text-sm tracking-wider uppercase">{selectedItem.category}</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">{selectedItem.title}</h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl">{selectedItem.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedItem.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-purple-600/10 text-purple-600 text-sm font-medium border border-purple-600/20">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {selectedItem.link && (
                    <motion.a
                      href={selectedItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all cursor-pointer"
                    >
                      Acessar Projeto Online
                      <ArrowRight className="w-5 h-5" />
                    </motion.a>
                  )}
                  {selectedItem.pdf && (
                    <motion.a
                      href={selectedItem.pdf}
                      download
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all cursor-pointer"
                    >
                      Baixar Apresentação
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Área de Mockups (Desktop e Mobile) */}
              {(desktopsList.length > 0 || selectedItem.mockupMobile) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-accent/30 rounded-2xl p-6 border border-border/50">
                  {desktopsList.length > 0 && (
                    <div className="md:col-span-2 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground font-medium">
                          <Monitor className="w-5 h-5" /> Versão Desktop
                        </div>
                        {desktopsList.length > 1 && (
                          <span className="text-xs text-muted-foreground font-medium bg-background px-2.5 py-1 rounded-full border border-border/50">
                            Foto {activeDesktopIndex + 1} de {desktopsList.length}
                          </span>
                        )}
                      </div>

                      <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-sm bg-background aspect-video group">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeDesktopIndex}
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            transition={{ duration: 0.25 }}
                            className="w-full h-full"
                          >
                            <ImageWithFallback
                              src={desktopsList[activeDesktopIndex]}
                              alt={`Desktop View ${activeDesktopIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        </AnimatePresence>

                        {/* Controles de Navegação quando houver mais de 1 foto */}
                        {desktopsList.length > 1 && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDesktopIndex((prev) => (prev === 0 ? desktopsList.length - 1 : prev - 1));
                              }}
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 hover:bg-background backdrop-blur-md border border-border flex items-center justify-center text-foreground transition-all shadow-md hover:scale-105 cursor-pointer z-10"
                              title="Foto anterior"
                            >
                              <ChevronLeft className="w-6 h-6" />
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDesktopIndex((prev) => (prev === desktopsList.length - 1 ? 0 : prev + 1));
                              }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 hover:bg-background backdrop-blur-md border border-border flex items-center justify-center text-foreground transition-all shadow-md hover:scale-105 cursor-pointer z-10"
                              title="Próxima foto"
                            >
                              <ChevronRight className="w-6 h-6" />
                            </button>

                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/50 z-10">
                              {desktopsList.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveDesktopIndex(idx);
                                  }}
                                  className={`h-2 rounded-full transition-all cursor-pointer ${
                                    activeDesktopIndex === idx ? 'w-6 bg-purple-600' : 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground'
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
