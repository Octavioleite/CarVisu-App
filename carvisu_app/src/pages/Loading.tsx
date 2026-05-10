import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Logo } from '../components/ui';

const messages = [
  'INICIALIZANDO ENGINE...',
  'ANALISANDO PROPORÇÕES DO VEÍCULO...',
  'EXTRAINDO REFERÊNCIA DE RODAS...',
  'CALCULANDO FITMENT IDEAL...',
  'APLICANDO SUSPENSÃO E CAMBER...',
  'RENDERIZANDO ILUMINAÇÃO CINEMATOGRÁFICA...',
  'PROCESSANDO REFLEXOS...',
  'FINALIZANDO PREVIEW...',
];

interface LoadingProps {
  onComplete?: () => void;
  redirectTo?: string;
}

export default function Loading({ onComplete, redirectTo }: LoadingProps) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [messageIdx, setMessageIdx] = useState(0);

  useEffect(() => {
    const pi = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(pi);
          if (onComplete) onComplete();
          if (redirectTo) navigate(redirectTo);
          return 100;
        }
        return p + 1;
      });
    }, 35);

    const mi = setInterval(() => {
      setMessageIdx((p) => (p + 1) % messages.length);
    }, 600);

    return () => {
      clearInterval(pi);
      clearInterval(mi);
    };
  }, [navigate, onComplete, redirectTo]);

  return (
    <div className="fixed inset-0 z-50 bg-ink-950 flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 speed-lines" />

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-neon rounded-full blur-[140px] opacity-20"
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <Logo size="lg" glow />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 inline-flex items-center gap-2 px-3 py-1.5 rounded-full surface border-neon/40"
        >
          <span className="pulse-dot" />
          <span className="font-display tracking-extreme uppercase text-[10px] text-chrome">
            Render em Andamento
          </span>
        </motion.div>

        {/* Radar */}
        <div className="relative w-56 h-56 mx-auto mb-12">
          {/* Concentric rings */}
          {[1, 0.75, 0.5].map((scale, i) => (
            <motion.div
              key={i}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 8 - i * 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-neon/30"
              style={{ transform: `scale(${scale})` }}
            />
          ))}

          {/* Outer ring with HUD ticks */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="#ff2b2b"
              strokeWidth="1.5"
              strokeDasharray="301"
              initial={{ strokeDashoffset: 301 }}
              animate={{ strokeDashoffset: 301 - (301 * progress) / 100 }}
              transition={{ duration: 0.2 }}
              style={{ filter: 'drop-shadow(0 0 8px rgba(255, 43, 43, 0.8))' }}
            />
          </svg>

          {/* Center pulse */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-20 h-20 rounded-full glossy-red flex items-center justify-center">
              <Sparkles className="w-9 h-9 text-white" />
              <div className="absolute inset-0 rounded-full bg-neon/40 blur-xl -z-10" />
            </div>
          </motion.div>

          {/* Progress percentage */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded surface border-neon/40 backdrop-blur">
            <span className="font-display font-black text-neon text-sm">{progress}%</span>
          </div>

          {/* Scanning beam */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 origin-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-1/2 bg-gradient-to-b from-neon to-transparent shadow-[0_0_8px_rgba(255,43,43,0.8)]" />
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display font-black text-3xl md:text-4xl text-chrome uppercase tracking-tight mb-3"
        >
          Renderizando<span className="text-glow-red">.</span><span className="text-glow-red">.</span><span className="text-glow-red">.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-chrome-dim mb-10"
        >
          A IA está processando o resultado ultra-realista
        </motion.p>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-display tracking-racing uppercase text-[10px] text-chrome-dim">
              Progresso
            </span>
            <span className="font-mono font-bold text-neon text-sm">{progress}%</span>
          </div>
          <div className="h-1.5 bg-ink-700 rounded-full overflow-hidden border border-neon/15">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
              className="h-full glossy-red relative"
            >
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </motion.div>
          </div>
        </div>

        {/* Status message */}
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIdx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-xs text-neon tracking-wider"
            >
              ▸ {messages[messageIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Hint */}
        <p className="font-display tracking-extreme uppercase text-[10px] text-chrome-dark mt-12">
          Tempo médio · 5 a 10 segundos
        </p>
      </div>
    </div>
  );
}
