import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Home, LayoutGrid } from 'lucide-react';
import { Button } from '../components/ui';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon rounded-full blur-[120px] opacity-30"
      />

      <div className="relative z-10 text-center max-w-lg">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <AlertCircle className="w-20 h-20 text-neon mx-auto mb-6 glow-red-hard" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display font-black text-7xl md:text-8xl text-chrome uppercase tracking-tight mb-4"
        >
          4<span className="text-glow-red">0</span>4
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-display tracking-extreme uppercase text-xs text-neon mb-2"
        >
          ░░ Pista Bloqueada ░░
        </motion.p>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-display font-bold text-2xl text-chrome uppercase tracking-tight mb-4"
        >
          Esse caminho não existe
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-chrome-dark mb-10"
        >
          Parece que você saiu da pista. Volte e siga o trajeto correto.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button variant="primary" size="lg" onClick={() => navigate('/')}>
            <Home className="w-4 h-4" />
            Início
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/dashboard')}>
            <LayoutGrid className="w-4 h-4" />
            Dashboard
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
