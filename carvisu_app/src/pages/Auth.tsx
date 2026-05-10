import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, LogIn, Code, Zap } from 'lucide-react';
import { Button, Input, Card, Logo } from '../components/ui';
import { useApp } from '../context/AppContext';

export default function Auth() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isSignupRoute = location.pathname === '/signup' || searchParams.get('signup') === 'true';
  const [mode, setMode] = useState<'login' | 'signup'>(isSignupRoute ? 'signup' : 'login');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const { login, signup } = useApp();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(null);
  };

  const switchMode = () => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password);
      }
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Unexpected error. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-neon/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-neon-glow/20 rounded-full blur-[120px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <Card variant="elevated" hud className="overflow-visible">
          <div className="p-10">
            {/* Logo / Header */}
            <div className="text-center mb-8">
              <Logo size="lg" glow className="mb-6 mx-auto" />

              <h1 className="font-display font-black text-3xl text-chrome uppercase tracking-tight">
                {mode === 'login' ? (
                  <>Bem-vindo<span className="text-glow-red"> de volta</span></>
                ) : (
                  <>Crie sua <span className="text-glow-red">conta</span></>
                )}
              </h1>
              <p className="text-chrome-dark text-sm mt-3">
                {mode === 'login'
                  ? 'Acesse sua plataforma de customização'
                  : 'Comece sua jornada agora'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <Input
                  name="name"
                  type="text"
                  label="Nome completo"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  icon={<User className="w-4 h-4" />}
                  required
                />
              )}
              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                icon={<Mail className="w-4 h-4" />}
                required
              />
              <Input
                name="password"
                type="password"
                label="Senha"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                icon={<Lock className="w-4 h-4" />}
                required
              />

              {errorMessage && (
                <div
                  role="alert"
                  className="rounded-md border border-red-500/50 bg-red-500/10 px-3 py-2 text-sm text-red-300"
                >
                  {errorMessage}
                </div>
              )}

              <Button type="submit" variant="primary" fullWidth size="lg" isLoading={isLoading}>
                <Zap className="w-4 h-4" />
                {mode === 'login' ? 'Entrar' : 'Criar Conta'}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6 flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neon/30" />
              <span className="px-3 font-display tracking-extreme uppercase text-[10px] text-chrome-dark">
                Ou
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-neon/30" />
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" className="!px-3">
                <Code className="w-4 h-4" />
                GitHub
              </Button>
              <Button variant="secondary" className="!px-3">
                <LogIn className="w-4 h-4" />
                Google
              </Button>
            </div>

            {/* Mode toggle */}
            <p className="text-center text-chrome-dark text-sm mt-8">
              {mode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
              <button
                type="button"
                onClick={switchMode}
                className="text-neon hover:text-neon-glow font-display font-semibold tracking-racing uppercase text-xs transition-colors"
              >
                {mode === 'login' ? 'Cadastre-se' : 'Faça login'}
              </button>
            </p>
          </div>
        </Card>

        <p className="text-center text-chrome-dark text-xs mt-6">
          Ao continuar você aceita nossos{' '}
          <a href="#" className="text-neon hover:underline">Termos</a> e{' '}
          <a href="#" className="text-neon hover:underline">Privacidade</a>
        </p>
      </motion.div>
    </main>
  );
}
