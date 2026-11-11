import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const faqItems = [
  {
    question: 'Quais serviços de criação de sites a YourPage oferece em Maceió?',
    answer:
      'A YourPage é especialista em criação de sites profissionais em Maceió/AL, desenvolvendo sites institucionais, landing pages de alta conversão, lojas virtuais (e-commerce), sistemas web sob medida, design UI/UX no Figma e otimização de SEO técnico para colocar sua empresa nas buscas do Google.',
  },
  {
    question: 'A YourPage atende empresas em Maceió, Alagoas e outros estados?',
    answer:
      'Sim! Nossa sede fica em Maceió, Alagoas, atendendo empresas locais de todos os bairros de Maceió (Ponta Verde, Jatiúca, Pajuçara, Farol, Benedito Bentes, Centro e região) e negócios de todo o Brasil com reuniões online e acompanhamento 100% próximo e personalizado.',
  },
  {
    question: 'Os sites criados pela YourPage aparecem no Google e funcionam bem no celular?',
    answer:
      'Sim! Todos os nossos sites são desenvolvidos com abordagem Mobile-First (100% responsivos para celular, tablet e computador), carregamento ultra-rápido e estrutura completa de SEO local e técnico (Schema.org, Sitemap, meta tags e alta performance no Google PageSpeed) para ranquear no Google.',
  },
  {
    question: 'Qual é o prazo médio para entrega de um site profissional ou landing page?',
    answer:
      'O prazo varia conforme a complexidade do projeto: landing pages de alta conversão costumam ser entregues entre 5 a 10 dias úteis, sites institucionais completos entre 2 a 4 semanas, e sistemas web sob medida possuem cronograma planejado por etapas junto ao cliente.',
  },
  {
    question: 'Como solicitar um orçamento de site em Maceió com a YourPage?',
    answer:
      'Você pode solicitar um orçamento gratuito clicando nos botões de WhatsApp aqui no site pelo número (82) 99379-1661 ou preenchendo nosso briefing rápido online. Analisamos sua necessidade e enviamos uma proposta sob medida para o seu negócio.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-16 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-10 sm:mb-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 mb-5">
            <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
            <span className="text-xs sm:text-sm font-medium">Dúvidas Frequentes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Perguntas Frequentes sobre{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Criação de Sites em Maceió
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tire suas dúvidas sobre desenvolvimento de sites profissionais, landing pages e sistemas web sob medida para a sua empresa.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl bg-card border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-purple-600/50 shadow-lg shadow-purple-600/5' : 'border-border hover:border-purple-600/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-foreground pr-2">
                    {item.question}
                  </h3>
                  <div
                    className={`w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-purple-600/15 text-purple-500' : 'text-muted-foreground'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-border/50">
                        <p className="pt-4">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

