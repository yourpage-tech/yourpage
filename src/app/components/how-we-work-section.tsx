import { motion } from 'motion/react';
import { MessageSquare, Compass, Code, Rocket, HelpCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Entendemos seu projeto',
    description: 'Você conta o que precisa, seus objetivos e desafios. Alinhamos expectativas e entendemos a fundo o seu modelo de negócio.',
    gradient: 'from-blue-600 to-cyan-500'
  },
  {
    number: '02',
    icon: Compass,
    title: 'Definimos a solução',
    description: 'Analisamos o projeto e recomendamos a melhor abordagem tecnológica e de design para atingir seus objetivos de forma eficiente.',
    gradient: 'from-cyan-500 to-purple-600'
  },
  {
    number: '03',
    icon: Code,
    title: 'Desenvolvemos',
    description: 'Etapa de UI/UX design, desenvolvimento do código e integrações necessárias, com acompanhamento próximo e transparente.',
    gradient: 'from-purple-600 to-pink-500'
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Entregamos e acompanhamos',
    description: 'Você recebe sua solução pronta, testada e publicada, além de suporte dedicado para começar a utilizá-la e gerar resultados.',
    gradient: 'from-pink-500 to-blue-600'
  }
];

export function HowWeWorkSection() {
  return (
    <section id="como-funciona" className="py-16 md:py-32 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/5 to-transparent"></div>
      <div className="absolute -left-20 top-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -right-20 bottom-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 mb-5">
            <HelpCircle className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium">Como Funciona</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight max-w-3xl">
            Do primeiro contato <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">à entrega do seu projeto</span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Reduzimos a insegurança do processo de desenvolvimento com uma metodologia transparente e acompanhamento próximo em cada etapa.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-card border border-border hover:border-purple-600/50 hover:shadow-2xl hover:shadow-purple-600/5 transition-all duration-300 overflow-hidden"
            >
              {/* Giant Watermark Step Number */}
              <div className="absolute top-4 right-4 text-5xl sm:text-6xl font-black text-foreground/5 dark:text-white/5 select-none pointer-events-none group-hover:scale-110 transition-transform duration-300">
                {step.number}
              </div>

              {/* Hover highlight background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-purple-600/5 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div>
                {/* Icon block */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <step.icon className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-3 text-foreground group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
