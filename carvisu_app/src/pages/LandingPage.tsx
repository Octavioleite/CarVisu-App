import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Sparkles, Gauge, Shield, Upload, Settings, Image as ImageIcon, Check } from 'lucide-react';
import { Button, Card } from '../components/ui';
import { HeroSection, BeforeAfterShowcase, FeatureCard } from '../components/common';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: 'Customização Infinita',
      description: 'Milhões de combinações de rodas, suspensão, cores e estilos para o seu projeto.',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'IA Ultra-Realista',
      description: 'Renderização fotográfica com precisão cinematográfica em segundos.',
    },
    {
      icon: <Gauge className="w-5 h-5" />,
      title: 'Ajustes Precisos',
      description: 'Controle altura, intensidade, fitment e cada detalhe do projeto.',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Sem Riscos',
      description: 'Visualize como ficará antes de gastar uma única moeda em peças.',
    },
  ];

  const beforeAfters = [
    {
      before: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800',
      after: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&sat=-50',
      title: 'Stance Completo',
      description: 'Rebaixamento extremo + rodas BBS LM + camber agressivo',
    },
    {
      before: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800',
      after: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&sat=-50',
      title: 'Drift Build',
      description: 'Rotiform + over-fender + kit aerodinâmico completo',
    },
    {
      before: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800',
      after: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&sat=-50',
      title: 'JDM Perfect',
      description: 'Estilo clássico JDM com rodas Work e fitment perfeito',
    },
  ];

  const creditPlans = [
    {
      credits: 10,
      price: 19.9,
      bonus: 0,
      label: 'Starter',
      perks: ['10 customizações', 'Sem expiração', 'Render HD'],
    },
    {
      credits: 50,
      price: 79.9,
      bonus: 5,
      label: 'Popular',
      featured: true,
      perks: ['50 customizações', '+5 créditos bônus', 'Render 4K', 'Suporte prioritário'],
    },
    {
      credits: 100,
      price: 149.9,
      bonus: 20,
      label: 'Pro',
      perks: ['100 customizações', '+20 créditos bônus', 'Render 4K HDR', 'Acesso antecipado'],
    },
  ];

  const steps = [
    { icon: <Upload className="w-5 h-5" />, title: 'Envie a foto', desc: 'Upload do seu carro' },
    { icon: <ImageIcon className="w-5 h-5" />, title: 'Escolha a roda', desc: 'Referência de aro' },
    { icon: <Settings className="w-5 h-5" />, title: 'Customize', desc: 'Altura, cor, estilo' },
    { icon: <Sparkles className="w-5 h-5" />, title: 'Resultado', desc: 'Render ultra-realista' },
  ];

  return (
    <div className="relative">
      <HeroSection
        badge="Plataforma #1 em Customização Virtual"
        title="Visualize. Ajuste. Transforme."
        subtitle="Veja como seu carro ficaria com as melhores customizações antes de gastar dinheiro. Renderização cinematográfica com IA em menos de 10 segundos."
        cta={{ text: 'Começar Agora', onClick: () => navigate('/login') }}
        secondaryCta={{ text: 'Ver Galeria', onClick: () => {} }}
        image="https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1200"
      />

      {/* How it works */}
      <section className="relative py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-display tracking-extreme uppercase text-xs text-neon mb-4">
            ░░ Como Funciona ░░
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl text-chrome uppercase tracking-tight mb-4">
            Quatro passos. <span className="text-glow-red">Mil possibilidades.</span>
          </h2>
          <p className="text-chrome-dark text-lg max-w-2xl mx-auto">
            Do upload ao resultado em menos de 30 segundos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="absolute hidden md:block top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card hover className="text-center h-full">
                <div className="p-6">
                  <div className="relative inline-flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full surface-elevated border-neon/40 flex items-center justify-center text-neon shadow-neon-sm">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full glossy-red flex items-center justify-center font-display font-black text-xs text-white">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-chrome tracking-wide mb-2">
                    {step.title}
                  </h3>
                  <p className="text-chrome-dark text-sm">{step.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="relative py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-display tracking-extreme uppercase text-xs text-neon mb-4">
            ░░ Tecnologia ░░
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl text-chrome uppercase tracking-tight mb-4">
            Engineered for <span className="text-glow-red">car culture</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} index={idx} />
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="relative py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-display tracking-extreme uppercase text-xs text-neon mb-4">
            ░░ Galeria ░░
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl text-chrome uppercase tracking-tight mb-4">
            Projetos da <span className="text-glow-red">comunidade</span>
          </h2>
          <p className="text-chrome-dark text-lg">Clique para ver antes/depois</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {beforeAfters.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <BeforeAfterShowcase {...item} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="relative py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-display tracking-extreme uppercase text-xs text-neon mb-4">
            ░░ Pacotes ░░
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl text-chrome uppercase tracking-tight mb-4">
            Escolha seu <span className="text-glow-red">poder</span>
          </h2>
          <p className="text-chrome-dark text-lg">10 créditos por geração · sem mensalidade</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {creditPlans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full glossy-red text-white font-display tracking-racing uppercase text-[10px]">
                  Mais Popular
                </div>
              )}
              <Card
                hover
                variant={plan.featured ? 'elevated' : 'default'}
                className={plan.featured ? 'ring-1 ring-neon/60 shadow-neon-sm' : ''}
              >
                <div className="p-8">
                  <p className="font-display tracking-extreme uppercase text-xs text-neon mb-2">
                    {plan.label}
                  </p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="font-display font-black text-5xl text-chrome">
                      {plan.credits}
                    </h3>
                    <span className="font-display tracking-racing uppercase text-xs text-chrome-dim">
                      Créditos
                    </span>
                  </div>
                  {plan.bonus > 0 && (
                    <p className="text-neon text-sm font-semibold mb-4">
                      + {plan.bonus} bônus
                    </p>
                  )}
                  <div className="my-6 h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />
                  <p className="font-display font-black text-3xl text-chrome mb-6">
                    R$ {plan.price.toFixed(2).replace('.', ',')}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {plan.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-chrome-dim">
                        <Check className="w-4 h-4 text-neon mt-0.5 flex-shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.featured ? 'primary' : 'secondary'}
                    fullWidth
                    onClick={() => navigate('/login')}
                  >
                    Começar
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden" variant="elevated">
          <div className="absolute inset-0 speed-lines opacity-50" />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-neon/30 rounded-full blur-[100px]"
          />

          <div className="relative p-12 md:p-16 text-center">
            <p className="font-display tracking-extreme uppercase text-xs text-neon mb-4">
              ░░ Pronto p/ rodar ░░
            </p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-chrome uppercase tracking-tight mb-6">
              Veja seu projeto <br />
              <span className="text-glow-red">antes de gastar.</span>
            </h2>
            <p className="text-chrome-dark text-lg mb-10 max-w-xl mx-auto">
              Junte-se a milhares de entusiastas que estão transformando seus projetos com CarVisu.
            </p>
            <Button variant="primary" size="lg" onClick={() => navigate('/login')}>
              <Zap className="w-4 h-4" />
              Iniciar gratuitamente
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
