import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { Header } from './components/header';
import { HeroSection } from './components/hero-section';
import { BenefitsSection } from './components/benefits-section';
import { ServicesSection } from './components/services-section';
import { PortfolioSection } from './components/portfolio-section';
import { TestimonialsSection } from './components/testimonials-section';
import { AboutSection } from './components/about-section';
import { HowWeWorkSection } from './components/how-we-work-section';
import { CTASection } from './components/cta-section';
import { Footer } from './components/footer';
import { ScrollToTop } from './components/scroll-to-top';
import { CookieBanner } from './components/cookie-banner';
import BriefingPage from './components/BriefingPage';

// Criamos um componente para a Home com todas as seções
function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <BenefitsSection />
      <ServicesSection />
      <PortfolioSection />
      <HowWeWorkSection />
      <TestimonialsSection />
      <AboutSection />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Router>
        <Routes>
          {/* Rota para a página inicial */}
          <Route path="/" element={<HomePage />} />
          
          {/* Rota para o formulário de briefing */}
          <Route path="/briefing" element={<BriefingPage />} />
        </Routes>
        <CookieBanner />
      </Router>
    </ThemeProvider>
  );
}

export default App;
