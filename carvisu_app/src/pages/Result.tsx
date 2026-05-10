import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Download,
  Share2,
  ArrowLeft,
  Zap,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { Button, Card } from '../components/ui';
import { useApp } from '../context/AppContext';

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { generations } = useApp();
  const [copied, setCopied] = useState(false);

  const gen = generations.find((g) => g.id === id);

  if (!gen) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <Card variant="elevated">
          <div className="p-12 text-center">
            <p className="font-display font-bold text-chrome mb-4 uppercase">
              Projeto não encontrado
            </p>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              Voltar ao Dashboard
            </Button>
          </div>
        </Card>
      </main>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(
      `Veja meu projeto no CarVisu! ${gen.settings.style} com ${gen.settings.wheelType}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full surface border-neon/40">
            <span className="pulse-dot" />
            <span className="font-display tracking-extreme uppercase text-[10px] text-chrome">
              Projeto Concluído
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <p className="font-display tracking-extreme uppercase text-xs text-neon mb-2">
            ░ Resultado
          </p>
          <h1 className="font-display font-black text-4xl md:text-5xl text-chrome uppercase tracking-tight">
            {gen.settings.style} <span className="text-glow-red">·</span>{' '}
            {gen.settings.wheelType}
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card variant="elevated" hud className="overflow-hidden">
              {/* Result image */}
              <div className="relative aspect-video overflow-hidden">
                <img src={gen.result} alt="Resultado" className="w-full h-full object-cover" />

                {/* HUD overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between font-mono text-[10px]">
                  <div className="bg-ink/80 backdrop-blur px-2 py-1 rounded border border-neon/40">
                    <span className="text-neon">● RENDER</span>
                    <span className="text-chrome ml-2">FINAL</span>
                  </div>
                  <div className="bg-ink/80 backdrop-blur px-2 py-1 rounded border border-neon/40 text-chrome">
                    {gen.id.slice(0, 8).toUpperCase()}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex gap-2 font-mono text-[10px]">
                  <div className="bg-ink/80 backdrop-blur px-2 py-1 rounded border border-neon/40">
                    <span className="text-chrome-dim">FITMENT </span>
                    <span className="text-neon font-bold">{gen.settings.intensity}%</span>
                  </div>
                  <div className="bg-ink/80 backdrop-blur px-2 py-1 rounded border border-neon/40">
                    <span className="text-chrome-dim">HEIGHT </span>
                    <span className="text-neon font-bold">{gen.settings.height}mm</span>
                  </div>
                </div>
              </div>

              {/* Before/After */}
              <div className="p-6 border-t border-neon/15">
                <p className="font-display tracking-extreme uppercase text-[10px] text-chrome-dim mb-3">
                  Comparação
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-chrome-dim" />
                      <span className="font-display tracking-racing uppercase text-[9px] text-chrome-dim">
                        Antes
                      </span>
                    </div>
                    <img
                      src={gen.originalImage}
                      alt="Antes"
                      className="w-full aspect-video object-cover rounded border border-neon/20"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon shadow-[0_0_8px_rgba(255,43,43,0.8)]" />
                      <span className="font-display tracking-racing uppercase text-[9px] text-neon">
                        Depois
                      </span>
                    </div>
                    <img
                      src={gen.result}
                      alt="Depois"
                      className="w-full aspect-video object-cover rounded border border-neon/40"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-neon/15 flex flex-col sm:flex-row gap-3">
                <Button variant="primary" fullWidth>
                  <Download className="w-4 h-4" />
                  Baixar
                </Button>
                <Button variant="secondary" fullWidth onClick={handleShare}>
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4" /> Copiado!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" /> Compartilhar
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-5"
          >
            {/* Settings */}
            <Card variant="elevated">
              <div className="p-6">
                <p className="font-display tracking-extreme uppercase text-[10px] text-neon mb-4">
                  ░ Configurações
                </p>
                <dl className="space-y-3">
                  {[
                    ['Estilo', gen.settings.style],
                    ['Roda', gen.settings.wheelType],
                    ['Altura', `${gen.settings.height}mm`],
                    ['Intensidade', `${gen.settings.intensity}%`],
                    ['Cor', gen.settings.color],
                  ].map(([k, v]) => (
                    <div
                      key={k as string}
                      className="flex justify-between items-center pb-2 border-b border-neon/10 last:border-0"
                    >
                      <dt className="font-display tracking-racing uppercase text-[10px] text-chrome-dim">
                        {k}
                      </dt>
                      <dd className="font-mono font-semibold text-chrome text-sm">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Card>

            {/* Credits */}
            <Card variant="elevated">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <p className="font-display tracking-extreme uppercase text-[10px] text-neon">
                    ░ Créditos
                  </p>
                  <Zap className="w-4 h-4 text-neon" />
                </div>
                <p className="font-display font-black text-4xl text-chrome">
                  {gen.creditsUsed}
                </p>
                <p className="text-chrome-dark text-xs mt-1">consumidos</p>
              </div>
            </Card>

            <Button variant="primary" fullWidth size="lg" onClick={() => navigate('/generate')}>
              <Sparkles className="w-4 h-4" />
              Nova Customização
            </Button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
