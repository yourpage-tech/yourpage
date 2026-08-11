import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Send, CheckCircle2, Loader2, Home, Save, X, AlertCircle, Check } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function BriefingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get('plan') || 'Não especificado';

  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    empresa: '', contato: '',
    objetivos: [] as string[], objetivoOutro: '',
  });

  // Carregamento inicial moderno
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Limpa o erro automaticamente após alguns segundos
  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const steps = [
    {
      title: 'Informações Básicas',
      fields: (
        <div className="space-y-4">
          <input type="text" placeholder="Nome da empresa/profissional" className="w-full p-4 rounded-xl bg-accent border border-border focus:border-purple-600 outline-none transition-all" value={formData.empresa} onChange={e => setFormData({...formData, empresa: e.target.value})} />
          <input type="text" placeholder="Contato (WhatsApp/E-mail)" className="w-full p-4 rounded-xl bg-accent border border-border focus:border-purple-600 outline-none transition-all" value={formData.contato} onChange={e => setFormData({...formData, contato: e.target.value})} />
        </div>
      )
    },
    {
      title: 'Qual o principal objetivo?',
      fields: (
        <div className="grid gap-3">
          {['Credibilidade (institucional)', 'Vendas online (e-commerce)', 'Agendamento de consultas', 'Portfólio'].map(item => (
            <label key={item} className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${formData.objetivos.includes(item) ? 'border-purple-600 bg-purple-600/10' : 'border-border bg-accent'}`}>
              <input type="checkbox" className="hidden" checked={formData.objetivos.includes(item)} onChange={() => {
                const news = formData.objetivos.includes(item) ? formData.objetivos.filter(i => i !== item) : [...formData.objetivos, item];
                setFormData({...formData, objetivos: news});
              }} />
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.objetivos.includes(item) ? 'bg-purple-600 border-purple-600' : 'border-muted-foreground'}`}>
                {formData.objetivos.includes(item) && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
              {item}
            </label>
          ))}
          <input type="text" placeholder="Outro objetivo..." className="w-full p-4 rounded-xl bg-accent border border-border outline-none mt-2" value={formData.objetivoOutro} onChange={e => setFormData({...formData, objetivoOutro: e.target.value})} />
        </div>
      )
    },
  ];

  const validateStep = () => {
    switch (currentStep) {
      case 0: return formData.empresa.trim() !== '' && formData.contato.trim() !== '';
      case 1: return formData.objetivos.length > 0 || formData.objetivoOutro.trim() !== '';
      default: return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
      setShowError(false);
      setErrorMessage('');
    } else {
      setErrorMessage('Por favor, preencha os campos obrigatórios antes de prosseguir.');
      setShowError(true);
    }
  };

  const handleSubmit = async () => {
    setIsSending(true);
    
    // Formatação dos dados para o serviço de e-mail
    const templateParams = {
      subject: `Briefing YourPage - ${formData.empresa}`,
      message: `
        Empresa: ${formData.empresa}
        Contato: ${formData.contato}
        Plano: ${selectedPlan}
        Objetivos: ${formData.objetivos.join(', ')} ${formData.objetivoOutro}
      `
    };

    // Verificação de segurança: Impede o envio se as chaves ainda forem os placeholders
    if (['service_qr7o6ep', 'template_h0w6qga', 'Y60wPSyk2dezEILgd'].some(key => key.includes('YOUR_'))) {
      setErrorMessage('Configuração incompleta: As chaves do EmailJS precisam ser preenchidas no código.');
      setShowError(true);
      setIsSending(false);
      return;
    }

    try {
      // Integração com a API do EmailJS para envio ao Gmail
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_qr7o6ep', // Cadastre seu Gmail no emailjs.com e coloque o ID aqui
          template_id: 'template_h0w6qga', // Crie um template e coloque o ID aqui
          user_id: 'Y60wPSyk2dezEILgd', // Sua chave pública do EmailJS
          template_params: {
            to_email: 'yourpage.business.tech@gmail.com',
            ...templateParams,
          },
        }),
      });

      if (!response.ok) throw new Error('Falha ao enviar e-mail');

      // Efeito sonoro e animação de sucesso
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(() => {}); // Catch para evitar erro se o browser bloquear auto-play
      setIsSuccess(true);

      setTimeout(() => navigate('/'), 4000);
    } catch (error) {
      setErrorMessage('Falha na conexão ao enviar. Verifique sua internet ou tente novamente mais tarde.');
      setShowError(true);
    } finally {
      setIsSending(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold text-2xl mb-8 shadow-2xl shadow-purple-500/20"
        >
          YourPage
        </motion.div>
        <div className="flex items-center gap-3 text-muted-foreground animate-pulse">
          <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
          Preparando seu briefing personalizado...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground py-6 sm:py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto mb-8 sm:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs sm:text-sm font-medium hover:text-purple-600 transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4" />
          Voltar ao menu inicial
        </button>
        <div className="text-xs sm:text-sm font-bold text-purple-600 bg-purple-600/10 px-3.5 py-1 rounded-full border border-purple-600/20">
          Plano: {selectedPlan}
        </div>
      </div>

      <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-muted-foreground text-right font-medium">
          Passo {currentStep + 1} de {steps.length}
        </div>
      </div>

      <div className="max-w-3xl mx-auto min-h-[300px] sm:min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {steps[currentStep].title}
              </span>
            </h1>
            
            <div className="mb-8 sm:mb-12">
              {steps[currentStep].fields}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mt-6 sm:mt-8">
        <button
          onClick={() => {
            setCurrentStep(currentStep - 1);
            setIsSaved(false);
          }}
          disabled={currentStep === 0}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${currentStep === 0 ? 'hidden sm:flex opacity-0 pointer-events-none' : 'hover:bg-accent'}`}
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Voltar
        </button>

        {currentStep < steps.length - 1 ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-500/20 cursor-pointer w-full sm:w-auto"
          >
            Próxima pergunta
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        ) : !isSaved ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (validateStep()) {
                setIsSaved(true);
                setShowError(false);
                setErrorMessage('');
              } else {
                setErrorMessage('Selecione ao menos um objetivo ou descreva um antes de salvar.');
                setShowError(true);
              }
            }}
            className="flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-blue-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/20 cursor-pointer w-full sm:w-auto"
          >
            <Save className="w-4 h-4 sm:w-5 sm:h-5" />
            Salvar respostas
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={isSending}
            className="flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-green-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-green-500/20 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed w-full sm:w-auto"
          >
            {isSending ? (
              <>Enviando... <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /></>
            ) : (
              <>Enviar respostas <Send className="w-4 h-4 sm:w-5 sm:h-5" /></>
            )}
          </motion.button>
        )}
      </div>

      {/* Aviso de erro sofisticado (Toast) */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-10 left-1/2 z-[100] flex items-center gap-4 px-6 py-4 rounded-2xl bg-card border border-purple-600/50 shadow-2xl shadow-purple-500/20 backdrop-blur-xl min-w-[320px]"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600/20 text-purple-600 shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">Ação necessária</p>
              <p className="text-xs text-muted-foreground">{errorMessage || "Preencha os campos obrigatórios para continuar."}</p>
            </div>
            <button onClick={() => setShowError(false)} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Sucesso Centralizado */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-md p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-card border border-purple-600/30 p-10 rounded-3xl shadow-2xl shadow-purple-500/20 text-center max-w-sm w-full relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/40"
              >
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              </motion.div>

              <h2 className="text-2xl font-bold mb-2">Briefing Enviado!</h2>
              <p className="text-muted-foreground mb-6">
                Suas respostas foram recebidas! Entraremos em contato em breve para dar vida ao seu projeto.
              </p>

              <div className="flex items-center justify-center gap-2 text-sm text-purple-600 font-medium animate-pulse">
                Voltando ao menu inicial...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      </div>
    </main>
  );
}