import { motion } from 'motion/react';
import { Sparkles, Linkedin, Instagram, Github } from 'lucide-react';

const team = [
  {
    name: 'Sarah Bomfim',
    role: 'Co-fundadora · Tech Lead · UX/UI Designer',
    image: '/sarah-bomfim.png',
    bio: 'Especialista em Front-end e experiência do usuário, responsável por transformar necessidades de negócio em interfaces modernas, intuitivas e de alta performance.',
    focus: ['UX/UI', 'Front-end', 'Design System', 'Performance'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/sarah-bomfim-b10655270/',
      instagram: 'https://www.instagram.com/sarahbomfimm/',
    }
  },
  {
    name: 'Maria Lisboa',
    role: 'Co-fundadora · Full Stack Developer · Product Manager',
    image: '/maria_lisboa.png',
    bio: 'Especialista em arquitetura de sistemas e desenvolvimento de soluções sob medida, conectando tecnologia, negócio e experiência do usuário.',
    focus: ['Full Stack', 'Arquitetura', 'Integrações', 'Produto'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/maria-lisboa-%F0%9F%91%A9%F0%9F%8F%BC%E2%80%8D%F0%9F%92%BB-b5b221137/',
      instagram: 'https://www.instagram.com/marialisboa.dev/',
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
            <span className="text-xs sm:text-sm font-medium">Por que confiar em nós</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight max-w-3xl">
            Tecnologia com <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">estratégia, design e experiência.</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-medium">
              Somos uma dupla de profissionais de tecnologia que une desenvolvimento, design e visão de produto para transformar ideias em soluções digitais profissionais, rápidas e escaláveis.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto">
              Cada projeto é desenvolvido sob medida, com acompanhamento próximo, comunicação clara e foco no resultado do negócio.
            </p>
          </div>
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
                <span className="text-xs sm:text-sm font-semibold text-purple-600/90 dark:text-purple-400 mb-2 block">
                  {member.role}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Focus Area */}
                <div className="flex flex-col gap-1.5 mb-5 w-full text-left">
                  <span className="text-xs font-bold text-foreground tracking-wider">
                    Foco:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    {member.focus.map((item, idx) => (
                      <span key={idx} className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground font-medium border border-border/80 text-xs">
                          {item}
                        </span>
                        {idx < member.focus.length - 1 && <span className="text-muted-foreground/60 text-xs">·</span>}
                      </span>
                    ))}
                  </div>
                </div>

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
                  {/* <motion.a
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub de ${member.name}`}
                    className="w-9 h-9 rounded-xl bg-secondary hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 flex items-center justify-center text-muted-foreground hover:text-white transition-all cursor-pointer shadow-sm"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
