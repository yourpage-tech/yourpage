import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, MessageCircle, X, ShieldCheck, FileText } from 'lucide-react';

export function Footer() {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const headerOffset = window.innerWidth < 768 ? 70 : 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-xl">
                YourPage
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md text-sm sm:text-base leading-relaxed">
              A YourPage é focada no <strong>desenvolvimento de sites e sistemas sob medida</strong> em <strong>Maceió/AL</strong> e com atendimento em todo o Brasil. Criamos <strong>landing pages premium</strong>, <strong>sites institucionais</strong> e <strong>sistemas web personalizados</strong> com alto desempenho e design exclusivo.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://www.instagram.com/yourpage.tech?igsh=MTR6c3J4MzU4YXozaQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram YourPage"
                className="w-10 h-10 rounded-full bg-accent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 flex items-center justify-center transition-colors hover:text-white cursor-pointer"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://wa.me/5582988736580?text=Ol%C3%A1%2C%20vim%20pelo%20site%20YourPage."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp YourPage"
                className="w-10 h-10 rounded-full bg-accent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 flex items-center justify-center transition-colors hover:text-white cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Links Rápidos</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base">
              <li>
                <a href="#beneficios" onClick={(e) => handleNavClick(e, '#beneficios')} className="text-muted-foreground hover:text-foreground transition-colors">
                  Benefícios
                </a>
              </li>
              <li>
                <a href="#servicos" onClick={(e) => handleNavClick(e, '#servicos')} className="text-muted-foreground hover:text-foreground transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#portfolio" onClick={(e) => handleNavClick(e, '#portfolio')} className="text-muted-foreground hover:text-foreground transition-colors">
                  Portfólio
                </a>
              </li>
              <li>
                <a href="#sobre-nos" onClick={(e) => handleNavClick(e, '#sobre-nos')} className="text-muted-foreground hover:text-foreground transition-colors">
                  Quem Somos
                </a>
              </li>
              <li>
                <a href="#planos" onClick={(e) => handleNavClick(e, '#planos')} className="text-muted-foreground hover:text-foreground transition-colors">
                  Planos
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Contato</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base">
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                <a href="mailto:yourpage.business.tech@gmail.com" className="hover:text-foreground transition-colors break-all">yourpage.business.tech@gmail.com</a>
              </li>
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                <a
                  href="https://wa.me/5582988736580?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors">(82) 98873-6580</a>
              </li>
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                <span>Maceió, AL</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-muted-foreground">
              © 2026 YourPage. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <button
                onClick={() => setActiveModal('privacy')}
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                Política de Privacidade
              </button>
              <button
                onClick={() => setActiveModal('terms')}
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                Termos de Uso
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"></div>

      {/* Modais de Política de Privacidade e Termos de Uso */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-background/80 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-card border border-purple-600/30 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {activeModal === 'privacy' ? (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center text-purple-600">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Política de Privacidade</h3>
                      <p className="text-sm text-muted-foreground">Última atualização: Agosto de 2026</p>
                    </div>
                  </div>

                  <div className="space-y-6 text-muted-foreground leading-relaxed text-sm md:text-base">
                    <p>
                      A <strong>YourPage</strong> tem o compromisso de proteger a sua privacidade e os seus dados pessoais, em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong>.
                    </p>

                    <div>
                      <h4 className="text-foreground font-semibold text-lg mb-2">1. Coleta de Informações</h4>
                      <p>
                        Coletamos informações pessoais que você nos fornece diretamente ao preencher formulários de contato, solicitar briefings de projetos ou entrar em contato via WhatsApp/E-mail. Os dados podem incluir: nome, e-mail, telefone/WhatsApp, nome da empresa e especificações do seu projeto.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-foreground font-semibold text-lg mb-2">2. Uso das Informações</h4>
                      <p>Utilizamos os dados coletados exclusivamente para:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Elaborar propostas comerciais e orçamentos personalizados.</li>
                        <li>Executar o desenvolvimento de sites, landing pages e sistemas contratados.</li>
                        <li>Prestar suporte técnico e atendimento pós-venda.</li>
                        <li>Melhorar continuamente a experiência do usuário em nossas plataformas.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-foreground font-semibold text-lg mb-2">3. Compartilhamento e Proteção de Dados</h4>
                      <p>
                        Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing. Adotamos medidas rígidas de segurança técnica e organizacional para proteger seus dados contra acessos não autorizados ou vazamentos.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-foreground font-semibold text-lg mb-2">4. Direitos do Titular</h4>
                      <p>
                        Você tem o direito de solicitar a confirmação, acesso, correção ou eliminação dos seus dados pessoais armazenados por nós a qualquer momento. Para exercer seus direitos, entre em contato através do e-mail <strong>yourpage.business.tech@gmail.com</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Termos de Uso</h3>
                      <p className="text-sm text-muted-foreground">Última atualização: Agosto de 2026</p>
                    </div>
                  </div>

                  <div className="space-y-6 text-muted-foreground leading-relaxed text-sm md:text-base">
                    <p>
                      Bem-vindo à <strong>YourPage</strong>. Ao acessar nosso site ou utilizar nossos serviços de desenvolvimento de software e sites, você concorda com os seguintes Termos de Uso.
                    </p>

                    <div>
                      <h4 className="text-foreground font-semibold text-lg mb-2">1. Escopo dos Serviços</h4>
                      <p>
                        A YourPage desenvolve landing pages de alta conversão, sites institucionais, lojas virtuais e sistemas web personalizados. Todas as especificações, prazos e entregáveis são definidos formalmente no briefing e contrato de prestação de serviços.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-foreground font-semibold text-lg mb-2">2. Propriedade Intelectual</h4>
                      <p>
                        Todo o conteúdo deste site (textos, código-fonte, identidade visual e materiais promocionais) é de propriedade exclusiva da YourPage. Os projetos desenvolvidos para clientes tornam-se de propriedade do cliente após a quitação integral do projeto contratado, respeitando as licenças de código aberto e bibliotecas utilizadas.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-foreground font-semibold text-lg mb-2">3. Responsabilidades do Usuário</h4>
                      <p>
                        O usuário compromete-se a fornecer informações verdadeiras e atualizadas nos formulários de contato e briefing, garantindo que possui os direitos sobre marcas, imagens e textos disponibilizados para a criação do seu site.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-foreground font-semibold text-lg mb-2">4. Modificações dos Termos</h4>
                      <p>
                        A YourPage reserva-se o direito de alterar estes Termos de Uso periodicamente. Alterações significativas serão refletidas nesta página.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-border flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors cursor-pointer"
                >
                  Entendi e Concordo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
