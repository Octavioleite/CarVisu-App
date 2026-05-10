import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Zap, X, Image as ImageIcon, Settings as SettingsIcon, ArrowRight } from 'lucide-react';
import { Button, Card } from '../components/ui';
import { useApp } from '../context/AppContext';
import Loading from './Loading';

const STEPS = ['Fotos', 'Customização'];
const STYLES = ['Stance', 'Drift', 'JDM', 'Lowrider', 'Off-road', 'Track'];
const WHEEL_TYPES = ['BBS LM', 'Rotiform', 'Work', 'SSR', 'OZ Racing', 'Volk TE37'];

export default function Generate() {
  const navigate = useNavigate();
  const { user, addGeneration } = useApp();
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState({ car: null as File | null, wheel: null as File | null });
  const [previews, setPreviews] = useState({ car: '', wheel: '' });
  const [settings, setSettings] = useState({
    height: -50,
    intensity: 70,
    style: 'Stance',
    wheelType: 'BBS LM',
    color: '#ff2b2b',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFile = (field: 'car' | 'wheel', file: File) => {
    setFiles({ ...files, [field]: file });
    const reader = new FileReader();
    reader.onload = (e) => setPreviews({ ...previews, [field]: e.target?.result as string });
    reader.readAsDataURL(file);
  };

  const handleRemove = (field: 'car' | 'wheel') => {
    setFiles({ ...files, [field]: null });
    setPreviews({ ...previews, [field]: '' });
  };

  const handleGenerate = () => {
    if (!files.car || !files.wheel) {
      alert('Por favor, envie ambas as imagens');
      return;
    }
    if ((user?.credits || 0) < 10) {
      alert('Créditos insuficientes');
      navigate('/credits');
      return;
    }
    setIsGenerating(true);
  };

  const handleLoadingComplete = () => {
    const newGen = {
      id: Date.now().toString(),
      userId: user?.id || '',
      originalImage: previews.car,
      wheelReference: previews.wheel,
      result: previews.car,
      settings,
      creditsUsed: 10,
      createdAt: new Date().toISOString(),
    };
    addGeneration(newGen);
    setIsGenerating(false);
    navigate(`/result/${newGen.id}`);
  };

  if (isGenerating) return <Loading onComplete={handleLoadingComplete} />;

  return (
    <main className="relative min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="font-display tracking-extreme uppercase text-xs text-neon mb-2">
            ░ Novo projeto
          </p>
          <h1 className="font-display font-black text-4xl md:text-5xl text-chrome uppercase tracking-tight">
            Customizar <span className="text-glow-red">Veículo</span>
          </h1>
        </motion.div>

        {/* Step Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex items-center mb-3">
            {STEPS.map((stepName, idx) => {
              const num = idx + 1;
              const completed = step > num;
              const active = step === num;
              return (
                <div key={idx} className="flex items-center flex-1">
                  <button
                    onClick={() => setStep(num)}
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className={`relative w-10 h-10 rounded flex items-center justify-center font-display font-black text-sm transition-all duration-300 ${
                        completed
                          ? 'glossy-red text-white'
                          : active
                          ? 'surface-elevated border-neon shadow-neon-sm text-neon'
                          : 'surface text-chrome-dark'
                      }`}
                    >
                      {completed ? '✓' : num}
                    </div>
                    <span
                      className={`hidden md:inline font-display tracking-racing uppercase text-xs transition-colors ${
                        active ? 'text-chrome' : 'text-chrome-dark'
                      }`}
                    >
                      {stepName}
                    </span>
                  </button>
                  {idx < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-4 transition-colors ${
                        completed ? 'bg-neon' : 'bg-neon/15'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <Card variant="elevated">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <ImageIcon className="w-5 h-5 text-neon" />
                    <h2 className="font-display font-bold text-xl text-chrome uppercase tracking-wide">
                      Envie as imagens
                    </h2>
                  </div>

                  {/* Car Upload */}
                  <div className="mb-6">
                    <label className="block font-display tracking-racing uppercase text-[10px] text-chrome-dim mb-3">
                      Foto do Carro
                    </label>
                    {previews.car ? (
                      <div className="relative group">
                        <img
                          src={previews.car}
                          alt="Carro"
                          className="w-full aspect-video object-cover rounded border border-neon/30"
                        />
                        <button
                          onClick={() => handleRemove('car')}
                          className="absolute top-3 right-3 w-9 h-9 rounded-full glossy-red flex items-center justify-center text-white hover:scale-110 transition-transform"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <div className="border-2 border-dashed border-neon/30 hover:border-neon hover:bg-neon/5 rounded p-12 transition-all duration-300 flex flex-col items-center justify-center text-center group">
                          <div className="w-14 h-14 rounded-full surface border-neon/40 flex items-center justify-center mb-4 group-hover:shadow-neon-sm transition-all">
                            <Upload className="w-6 h-6 text-neon" />
                          </div>
                          <p className="font-display font-semibold text-chrome tracking-wide mb-1">
                            Clique ou arraste a foto
                          </p>
                          <p className="text-chrome-dark text-xs">PNG, JPG · até 10MB</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleFile('car', e.target.files[0])}
                          />
                        </div>
                      </label>
                    )}
                  </div>

                  {/* Wheel Upload */}
                  <div>
                    <label className="block font-display tracking-racing uppercase text-[10px] text-chrome-dim mb-3">
                      Referência da Roda
                    </label>
                    {previews.wheel ? (
                      <div className="relative w-48 group">
                        <img
                          src={previews.wheel}
                          alt="Roda"
                          className="w-full aspect-square object-cover rounded border border-neon/30"
                        />
                        <button
                          onClick={() => handleRemove('wheel')}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full glossy-red flex items-center justify-center text-white hover:scale-110 transition-transform"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block w-48">
                        <div className="border-2 border-dashed border-neon/30 hover:border-neon hover:bg-neon/5 aspect-square rounded transition-all flex flex-col items-center justify-center text-center group p-4">
                          <Upload className="w-6 h-6 text-neon mb-2" />
                          <p className="font-display font-semibold text-chrome text-xs tracking-wide">
                            Foto da roda
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleFile('wheel', e.target.files[0])}
                          />
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <Card variant="elevated">
                <div className="p-8 space-y-8">
                  <div className="flex items-center gap-3">
                    <SettingsIcon className="w-5 h-5 text-neon" />
                    <h2 className="font-display font-bold text-xl text-chrome uppercase tracking-wide">
                      Personalização
                    </h2>
                  </div>

                  {/* Height */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-display tracking-racing uppercase text-[10px] text-chrome-dim">
                        Altura do Carro
                      </label>
                      <span className="font-mono text-neon font-bold text-sm">
                        {settings.height > 0 ? '+' : ''}
                        {settings.height}mm
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-150"
                      max="50"
                      value={settings.height}
                      onChange={(e) => setSettings({ ...settings, height: parseInt(e.target.value) })}
                    />
                    <div className="flex justify-between font-mono text-[10px] text-chrome-dark mt-2">
                      <span>-150mm</span>
                      <span>0</span>
                      <span>+50mm</span>
                    </div>
                  </div>

                  {/* Intensity */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-display tracking-racing uppercase text-[10px] text-chrome-dim">
                        Intensidade Stance
                      </label>
                      <span className="font-mono text-neon font-bold text-sm">{settings.intensity}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.intensity}
                      onChange={(e) => setSettings({ ...settings, intensity: parseInt(e.target.value) })}
                    />
                  </div>

                  {/* Style */}
                  <div>
                    <label className="block font-display tracking-racing uppercase text-[10px] text-chrome-dim mb-3">
                      Estilo
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {STYLES.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSettings({ ...settings, style: s })}
                          className={`p-3 rounded font-display tracking-racing uppercase text-xs transition-all duration-200 ${
                            settings.style === s
                              ? 'glossy-red text-white'
                              : 'surface text-chrome-dim hover:text-white hover:border-neon/60'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Wheel */}
                  <div>
                    <label className="block font-display tracking-racing uppercase text-[10px] text-chrome-dim mb-3">
                      Tipo de Roda
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {WHEEL_TYPES.map((w) => (
                        <button
                          key={w}
                          onClick={() => setSettings({ ...settings, wheelType: w })}
                          className={`p-3 rounded font-display tracking-racing uppercase text-xs transition-all duration-200 ${
                            settings.wheelType === w
                              ? 'glossy-red text-white'
                              : 'surface text-chrome-dim hover:text-white hover:border-neon/60'
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block font-display tracking-racing uppercase text-[10px] text-chrome-dim mb-3">
                      Cor Primária
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={settings.color}
                        onChange={(e) => setSettings({ ...settings, color: e.target.value })}
                        className="w-16 h-16 rounded cursor-pointer"
                      />
                      <span className="font-mono text-chrome">
                        {settings.color.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="ghost"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Voltar
          </Button>

          {step === 1 && (
            <Button
              variant="primary"
              size="lg"
              onClick={() => setStep(2)}
              disabled={!files.car || !files.wheel}
            >
              Próximo
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}

          {step === 2 && (
            <Button variant="primary" size="lg" onClick={handleGenerate}>
              <Zap className="w-4 h-4" />
              Gerar Imagem · 10 créditos
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
