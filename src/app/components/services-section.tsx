import { motion } from 'motion/react';
import { Globe, Database, ShoppingCart, Palette, Code, BarChart } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Criação de Sites Profissionais',
    description: 'Sites corporativos e institucionais sob medida que transmitem credibilidade e geram autoridade para a sua marca.',
    features: ['Design exclusivo', 'Responsivo (Mobile First)', 'SEO local estruturado', 'Painel administrativo (CMS)'],
  },
  {
    icon: Code,
    title: 'Landing Pages Premium',
    description: 'Páginas focadas em conversão, otimizadas para carregamento ultra-rápido (menos de 1 segundo) e alta taxa de vendas.',
    features: ['Design focado em conversão', 'Performance 100/100', 'Formulários inteligentes', 'Pixel Meta & Google Analytics'],
  },
  {
    icon: ShoppingCart,
    title: 'Desenvolvimento de E-commerce',
    description: 'Lojas virtuais modernas com catálogos dinâmicos, checkout simplificado em uma página e painel administrativo intuitivo.',
    features: ['Checkout integrado (Pix/Cartão)', 'Gestão de estoque simples', 'Cálculo de frete automático', 'Notificações por WhatsApp'],
  },
  {
    icon: Database,
    title: 'Sistemas Web sob Medida',
    description: 'Desenvolvimento de aplicações complexas, painéis administrativos, controle de dados, dashboards e SaaS.',
    features: ['Banco de dados seguro', 'Área logada para usuários', 'Integrações via API/Webhooks', 'Automações de processos'],
  },
  {
    icon: Palette,
    title: 'Design de Interface (UI/UX)',
    description: 'Prototipação no Figma baseada na experiência do usuário para validar ideias e fluxos antes de iniciar o código.',
    features: ['Layouts modernos no Figma', 'Protótipos navegáveis', 'Design System exclusivo', 'Foco total em usabilidade'],
  },
  {
    icon: BarChart,
    title: 'Otimização & SEO Técnico',
    description: 'Auditoria de código e melhoria de velocidade de sites lentos para subir posições nas buscas orgânicas do Google.',
    features: ['Auditoria de PageSpeed', 'Refatoração de código antigo', 'SEO On-Page estruturado', 'Instalação de Tags de Analytics'],
  },
];

export function ServicesSection() {
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("Olá, gostaria de solicitar um orçamento personalizado.");
    window.open(`https://wa.me/5582988736580?text=${message}`, '_blank');
  };

  return (
    <section id="servicos" className="py-16 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">
            Nossos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Serviços</span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Soluções completas para fortalecer sua presença digital e conquistar mais clientes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-purple-600/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 rounded-2xl transition-all duration-300"></div>
              
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-semibold mb-2.5 sm:mb-3">{service.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6 leading-relaxed">{service.description}</p>
                
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10 sm:mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleWhatsAppContact}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow cursor-pointer"
          >
            Solicitar orçamento personalizado
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
