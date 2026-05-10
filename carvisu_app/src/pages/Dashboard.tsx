import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Zap, TrendingUp, Image, Sparkles } from 'lucide-react';
import { Button, Card } from '../components/ui';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { user, generations } = useApp();
  const navigate = useNavigate();

  const recent = generations.slice(0, 3);

  const stats = [
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Créditos',
      value: user?.credits ?? 0,
      sub: `${Math.floor((user?.credits || 0) / 10)} customizações`,
      action: { text: 'Comprar', onClick: () => navigate('/credits') },
    },
    {
      icon: <Image className="w-5 h-5" />,
      label: 'Projetos',
      value: generations.length,
      sub: 'Criações totais',
      action: { text: 'Histórico', onClick: () => navigate('/history') },
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Membro desde',
      value: new Date(user?.createdAt || '').toLocaleDateString('pt-BR', {
        month: 'short',
        year: 'numeric',
      }),
      sub: 'Comunidade CarVisu',
    },
  ];

  return (
    <main className="relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4"
        >
          <div>
            <p className="font-display tracking-extreme uppercase text-xs text-neon mb-2">
              ░ Painel de Controle
            </p>
            <h1 className="font-display font-black text-4xl md:text-5xl text-chrome uppercase tracking-tight">
              E aí, <span className="text-glow-red">{user?.name.split(' ')[0]}</span>
            </h1>
            <p className="text-chrome-dark mt-2">
              Pronto para criar seu próximo projeto?
            </p>
          </div>
          <Button variant="primary" size="lg" onClick={() => navigate('/generate')}>
            <Plus className="w-4 h-4" />
            Nova Customização
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid md:grid-cols-3 gap-5 mb-12"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card variant="elevated" className="h-full">
                <div className="p-6 relative h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <p className="font-display tracking-extreme uppercase text-[10px] text-chrome-dark">
                      {stat.label}
                    </p>
                    <div className="w-10 h-10 rounded surface border-neon/40 flex items-center justify-center text-neon shadow-neon-sm">
                      {stat.icon}
                    </div>
                  </div>
                  <p className="font-display font-black text-4xl text-chrome mb-2">
                    {stat.value}
                  </p>
                  <p className="text-chrome-dark text-sm flex-grow">{stat.sub}</p>
                  {stat.action && (
                    <Button
                      variant="secondary"
                      fullWidth
                      size="sm"
                      onClick={stat.action.onClick}
                      className="mt-4"
                    >
                      {stat.action.text}
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-display tracking-extreme uppercase text-[10px] text-neon mb-1">
                ░ Recente
              </p>
              <h2 className="font-display font-black text-2xl text-chrome uppercase tracking-wide">
                Suas Criações
              </h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/history')}>
              Ver Tudo
            </Button>
          </div>

          {recent.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-5">
              {recent.map((gen, idx) => (
                <motion.div
                  key={gen.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <Card hover hud className="overflow-hidden h-full" onClick={() => navigate(`/result/${gen.id}`)}>
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={gen.result}
                        alt="Resultado"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent opacity-60" />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded backdrop-blur bg-ink/80 border border-neon/40 font-display tracking-extreme uppercase text-[9px] text-neon">
                        {gen.settings.style}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-bold text-chrome text-sm tracking-wide mb-2">
                        {gen.settings.wheelType}
                      </h3>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-chrome-dark">
                          {new Date(gen.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="text-neon font-semibold flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {gen.creditsUsed}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card variant="elevated">
              <div className="p-16 text-center">
                <Sparkles className="w-12 h-12 text-neon/40 mx-auto mb-4" />
                <h3 className="font-display font-bold text-chrome text-lg mb-2 uppercase tracking-wide">
                  Nenhum projeto ainda
                </h3>
                <p className="text-chrome-dark mb-6">
                  Crie sua primeira customização agora
                </p>
                <Button variant="primary" onClick={() => navigate('/generate')}>
                  <Sparkles className="w-4 h-4" />
                  Começar
                </Button>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </main>
  );
}
