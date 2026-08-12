import { motion } from 'motion/react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

const plans = [
  {
    name: 'Landing Page Premium',
    description: 'Ideal para campanhas e lançamentos',
    trustText: 'Uma página estratégica para transformar visitantes em oportunidades e aumentar suas conversões.',
    features: [
      'Design exclusivo sob medida',
      'Alta performance e carregamento rápido',
      'SEO técnico para melhor posicionamento no Google',
      'Integração com WhatsApp e ferramentas de marketing',
      'Experiência otimizada para celular'
    ],
    highlight: false,
    buttonLabel: 'Quero uma Landing Page',
  },
  {
    name: 'Site Institucional',
    description: 'Ideal para empresas que querem crescer e ter autonomia',
    trustText: 'Um site profissional que fortalece sua marca e permite que você atualize seus conteúdos sem depender de um desenvolvedor.',
    features: [
      'Site completo e profissional',
      'Painel administrativo fácil de usar',
      'Blog, notícias ou portfólio',
      'Google Analytics e Pixel da Meta',
      'Treinamento para você gerenciar seu site'
    ],
    highlight: true,
    buttonLabel: 'Quero meu site profissional',
  },
  {
    name: 'Sistemas & Plataformas',
    description: 'Para projetos que precisam de tecnologia sob medida',
    trustText: 'Transforme processos complexos em uma solução digital segura, escalável e feita exatamente para o seu negócio.',
    features: [
      'Área restrita e painel do cliente',
      'Banco de dados seguro e escalável',
      'Integrações com APIs e sistemas externos',
      'Automação de processos e regras de negócio',
      'Checkout e meios de pagamento'
    ],
    highlight: false,
    buttonLabel: 'Quero discutir meu projeto',
  },
];

export function TestimonialsSection() {
  const handlePlanSelection = (planName: string) => {
    let message = `Olá! Gostaria de solicitar um orçamento para o plano *${planName}*.`;
    if (planName === 'Conversa sobre Projeto') {
      message = 'Olá! Não sei qual solução é ideal para mim. Gostaria de ajuda para encontrar a melhor solução e preparar uma proposta personalizada.';
    }
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5582993791661?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="planos" className="py-16 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 mb-5 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
            <span className="text-xs sm:text-sm font-medium">Desenvolvimento de alto nível</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">
            Formatos de <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projetos</span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Escolha o modelo ideal para iniciar ou peça um orçamento 100% personalizado
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative p-6 sm:p-8 rounded-2xl bg-card border ${plan.highlight ? 'border-purple-600/50 shadow-lg shadow-purple-600/10' : 'border-border'} hover:border-purple-600/50 transition-all duration-300 flex flex-col`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md">
                  Recomendado
                </div>
              )}

              <div className="mb-5 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-border flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-purple-600 dark:text-purple-400 uppercase">
                    Investimento
                  </span>
                  <div className="text-xl sm:text-2xl font-bold text-foreground mt-0.5">
                    Projeto personalizado
                  </div>
                </div>
                <div className="flex items-start gap-2 mt-3 bg-purple-600/5 dark:bg-purple-600/10 p-3 rounded-lg border border-purple-600/10">
                  <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                    {plan.trustText}
                  </p>
                </div>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanSelection(plan.name)}
                className={`cursor-pointer flex items-center justify-center w-full py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all ${plan.highlight ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-md' : 'bg-secondary hover:bg-secondary/80'}`}
              >
                {plan.buttonLabel}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Banner de Orçamento Personalizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 sm:mt-12 p-6 sm:p-8 md:p-10 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-blue-900/10 border border-purple-500/20 dark:border-purple-600/30 backdrop-blur-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left"
        >
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2.5 sm:mb-3 text-foreground">
              Não sabe qual solução é ideal para você?
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
              Conte o que você precisa. Eu te ajudo a encontrar a melhor solução e preparo uma proposta personalizada.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <button
              onClick={() => handlePlanSelection('Conversa sobre Projeto')}
              className="cursor-pointer flex items-center justify-center gap-2 w-full md:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              Quero conversar sobre meu projeto
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}