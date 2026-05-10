import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Trash2, Archive, Zap, Sparkles } from 'lucide-react';
import { Button, Card, Input } from '../components/ui';
import { useApp } from '../context/AppContext';

const STYLES = ['all', 'Stance', 'Drift', 'JDM', 'Lowrider', 'Off-road', 'Track'];

export default function History() {
  const navigate = useNavigate();
  const { generations } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = generations.filter((g) => {
    const m =
      g.settings.style.toLowerCase().includes(search.toLowerCase()) ||
      g.settings.wheelType.toLowerCase().includes(search.toLowerCase());
    const f = filter === 'all' || g.settings.style === filter;
    return m && f;
  });

  return (
    <main className="relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="font-display tracking-extreme uppercase text-xs text-neon mb-2">
            ░ Arquivo
          </p>
          <h1 className="font-display font-black text-4xl md:text-5xl text-chrome uppercase tracking-tight">
            Seus <span className="text-glow-red">Projetos</span>
          </h1>
          <p className="text-chrome-dark mt-2">
            {generations.length} customizações criadas
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-10"
        >
          <Input
            type="text"
            placeholder="Buscar por estilo ou roda..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />

          <div>
            <p className="font-display tracking-extreme uppercase text-[10px] text-chrome-dim mb-3">
              Filtrar por estilo
            </p>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-4 py-2 rounded font-display tracking-racing uppercase text-xs transition-all duration-200 ${
                    filter === s
                      ? 'glossy-red text-white'
                      : 'surface text-chrome-dim hover:text-white hover:border-neon/60'
                  }`}
                >
                  {s === 'all' ? 'Todos' : s}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Gallery */}
        {filtered.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((gen) => (
              <motion.div
                key={gen.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Card hover hud className="overflow-hidden h-full flex flex-col">
                  <div
                    className="relative aspect-video overflow-hidden cursor-pointer group"
                    onClick={() => navigate(`/result/${gen.id}`)}
                  >
                    <img
                      src={gen.result}
                      alt="Resultado"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent opacity-70" />

                    {/* Style badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded backdrop-blur bg-ink/80 border border-neon/40 font-display tracking-extreme uppercase text-[9px] text-neon">
                      {gen.settings.style}
                    </div>

                    {/* Hover scan */}
                    <motion.div
                      initial={{ y: '-100%' }}
                      whileHover={{ y: '100%' }}
                      transition={{ duration: 1.5 }}
                      className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent shadow-[0_0_12px_rgba(255,43,43,0.8)]"
                    />
                  </div>

                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="font-display font-bold text-chrome text-base tracking-wide mb-3">
                      {gen.settings.wheelType}
                    </h3>

                    <div className="space-y-1.5 mb-4 flex-grow font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-chrome-dim">Altura</span>
                        <span className="text-chrome">{gen.settings.height}mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-chrome-dim">Stance</span>
                        <span className="text-chrome">{gen.settings.intensity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-chrome-dim">Data</span>
                        <span className="text-chrome">
                          {new Date(gen.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-neon/10">
                      <button
                        onClick={() => navigate(`/result/${gen.id}`)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded surface border-neon/30 hover:border-neon hover:text-neon font-display tracking-racing uppercase text-[10px] text-chrome transition-all"
                      >
                        <Archive className="w-3.5 h-3.5" />
                        Abrir
                      </button>
                      <button className="flex items-center justify-center py-2 px-3 rounded surface text-chrome-dark hover:text-red-400 hover:border-red-500/40 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 mt-3 text-[10px] text-neon font-mono">
                      <Zap className="w-3 h-3" />
                      <span>-{gen.creditsUsed} créditos</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Card variant="elevated">
            <div className="p-16 text-center">
              <Sparkles className="w-12 h-12 text-neon/40 mx-auto mb-4" />
              <h3 className="font-display font-bold text-chrome text-lg mb-2 uppercase tracking-wide">
                Nenhum projeto encontrado
              </h3>
              <p className="text-chrome-dark mb-6">
                {search || filter !== 'all'
                  ? 'Tente ajustar os filtros'
                  : 'Crie sua primeira customização'}
              </p>
              <Button variant="primary" onClick={() => navigate('/generate')}>
                <Sparkles className="w-4 h-4" />
                Nova Customização
              </Button>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
