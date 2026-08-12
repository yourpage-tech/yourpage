import { motion } from 'motion/react';
import { Sparkles, Linkedin, Instagram, Github } from 'lucide-react';

const team = [
  {
    name: 'Sarah Bomfim',
    role: 'Co-fundadora & Tech Lead / UX Designer',
    image: '/sarah-bomfim.png',
    bio: 'Especialista em desenvolvimento frontend e design de interfaces. Focada em criar experiências de usuário fluidas, modernas e otimizadas para conversão, garantindo performance máxima (100/100 PageSpeed) e acabamento premium.',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Maria Lisboa',
    role: 'Co-fundadora & Full Stack Developer / Product Manager',
    image: '/maria_lisboa.png',
    bio: 'Especialista em arquitetura de sistemas, banco de dados e integrações. Responsável pela lógica de negócios, segurança das plataformas e por coordenar projetos do briefing à entrega com alto padrão técnico.',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      github: 'https://github.com'
    }
  }
];

export function AboutSection() {
  return (
    <section id="sobre-nos" className="py-16 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/5 to-transparent"></div>
      <div className="absolute -right-20 top-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 bottom-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium">Quem Somos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Por trás da <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">YourPage</span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Conectamos tecnologia de ponta e design estratégico. Sarah e Maria unem forças para entregar soluções digitais personalizadas que geram valor real para sua marca.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 sm:p-8 rounded-3xl bg-card border border-border/80 hover:border-purple-600/50 hover:shadow-2xl hover:shadow-purple-600/10 transition-all duration-300 overflow-hidden"
            >
              {/* Card subtle background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Image container */}
              <div className="relative shrink-0">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-border/50 group-hover:border-purple-600/50 transition-colors duration-300 relative z-10 shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Glow ring under image */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300 -z-0"></div>
              </div>

              {/* Text content */}
              <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left flex-grow">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300">
                  {member.name}
                </h3>
                <span className="text-xs sm:text-sm font-semibold text-purple-600/90 dark:text-purple-400 mb-3 block">
                  {member.role}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {member.bio}
                </p>

                {/* Social icons */}
                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn de ${member.name}`}
                    className="w-9 h-9 rounded-xl bg-secondary hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 flex items-center justify-center text-muted-foreground hover:text-white transition-all cursor-pointer shadow-sm"
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={member.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram de ${member.name}`}
                    className="w-9 h-9 rounded-xl bg-secondary hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 flex items-center justify-center text-muted-foreground hover:text-white transition-all cursor-pointer shadow-sm"
                  >
                    <Instagram className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub de ${member.name}`}
                    className="w-9 h-9 rounded-xl bg-secondary hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 flex items-center justify-center text-muted-foreground hover:text-white transition-all cursor-pointer shadow-sm"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
