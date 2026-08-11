import { motion } from 'motion/react';
import { Zap, Users, TrendingUp, Smartphone, Search, MessageCircle, Palette, Rocket } from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: 'Mais clientes online',
    description: 'Atraia e converta visitantes em clientes reais com uma presença digital estratégica.',
  },
  {
    icon: TrendingUp,
    title: 'Credibilidade imediata',
    description: 'Transmita profissionalismo e confiança desde o primeiro acesso ao seu site.',
  },
  {
    icon: Zap,
    title: 'Sites rápidos e responsivos',
    description: 'Performance otimizada em todos os dispositivos, garantindo excelente experiência.',
  },
  {
    icon: Search,
    title: 'SEO otimizado',
    description: 'Apareça nas primeiras posições do Google e seja encontrado pelo seu público.',
  },
  {
    icon: MessageCircle,
    title: 'Integração WhatsApp',
    description: 'Conecte-se diretamente com seus clientes através de canais de comunicação eficientes.',
  },
  {
    icon: Palette,
    title: 'Design personalizado',
    description: 'Identidade visual única que reflete a essência e valores do seu negócio.',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Sites pensados para mobile, onde a maioria dos seus clientes está.',
  },
  {
    icon: Rocket,
    title: 'Escalável e eficiente',
    description: 'Infraestrutura preparada para crescer junto com o seu negócio.',
  },
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-16 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">
            Por que escolher a <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">YourPage</span>?
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Soluções completas e estratégicas para fortalecer sua presença digital
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-purple-600/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
