import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Gift, Zap } from 'lucide-react';
import { Button, Card } from '../components/ui';
import { useApp } from '../context/AppContext';

const PLANS = [
  { id: 1, credits: 10, price: 19.9, bonus: 0, label: 'Starter' },
  { id: 2, credits: 50, price: 79.9, bonus: 5, label: 'Popular', featured: true },
  { id: 3, credits: 100, price: 149.9, bonus: 20, label: 'Pro' },
  { id: 4, credits: 500, price: 599.9, bonus: 150, label: 'Enterprise' },
];

export default function Credits() {
  const { user, updateCredits } = useApp();
  const [selected, setSelected] = useState<number | null>(null);

  const handlePurchase = (plan: typeof PLANS[0]) => {
    setSelected(plan.id);
    setTimeout(() => {
      updateCredits(plan.credits + plan.bonus);
      setSelected(null);
    }, 1500);
  };

  return (
    <main className="relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="font-display tracking-extreme uppercase text-xs text-neon mb-2">
            ░ Créditos
          </p>
          <h1 className="font-display font-black text-4xl md:text-5xl text-chrome uppercase tracking-tight">
            Compre seu <span className="text-glow-red">poder</span>
          </h1>
          <p className="text-chrome-dark mt-3 max-w-xl mx-auto">
            10 créditos por geração. Sem expiração. Sem mensalidade.
          </p>
        </motion.div>

        {/* Current */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card variant="elevated" hud className="overflow-hidden">
            <div className="relative p-8 md:p-10">
              <div className="absolute inset-0 speed-lines opacity-30" />
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="font-display tracking-extreme uppercase text-[10px] text-neon mb-2">
                    Saldo Atual
                  </p>
                  <div className="flex items-baseline gap-3 mb-2">
                    <p className="font-display font-black text-6xl text-chrome">
                      {user?.credits}
                    </p>
                    <span className="font-display tracking-racing uppercase text-sm text-chrome-dim">
                      Créditos
                    </span>
                  </div>
                  <p className="text-chrome-dark text-sm">
                    Suficiente para {Math.floor((user?.credits || 0) / 10)} customizações
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm py-2 border-b border-neon/10">
                    <span className="font-display tracking-racing uppercase text-[10px] text-chrome-dim">
                      Última semana
                    </span>
                    <span className="font-mono font-bold text-chrome">-30 créditos</span>
                  </div>
                  <div className="flex justify-between items-center text-sm py-2 border-b border-neon/10">
                    <span className="font-display tracking-racing uppercase text-[10px] text-chrome-dim">
                      Último mês
                    </span>
                    <span className="font-mono font-bold text-chrome">-80 créditos</span>
                  </div>
                  <div className="flex justify-between items-center text-sm py-2">
                    <span className="font-display tracking-racing uppercase text-[10px] text-chrome-dim">
                      Total acumulado
                    </span>
                    <span className="font-mono font-bold text-neon">+250 créditos</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Plans */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="relative"
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full glossy-red text-white font-display tracking-racing uppercase text-[10px] whitespace-nowrap">
                  Mais Popular
                </div>
              )}
              <Card
                hover
                variant="elevated"
                className={
                  plan.featured
                    ? 'ring-1 ring-neon/60 shadow-neon-sm h-full flex flex-col'
                    : 'h-full flex flex-col'
                }
              >
                <div className="p-6 flex flex-col h-full">
                  <p className="font-display tracking-extreme uppercase text-[10px] text-neon mb-3">
                    {plan.label}
                  </p>

                  <div className="mb-1">
                    <p className="font-display font-black text-5xl text-chrome">
                      {plan.credits}
                    </p>
                    <p className="font-display tracking-racing uppercase text-xs text-chrome-dim">
                      Créditos
                    </p>
                  </div>

                  {plan.bonus > 0 && (
                    <div className="mt-4 inline-flex items-center gap-2 px-2.5 py-1 rounded bg-neon/10 border border-neon/30 self-start">
                      <Gift className="w-3 h-3 text-neon" />
                      <span className="font-display tracking-racing uppercase text-[10px] text-neon font-semibold">
                        +{plan.bonus} bônus
                      </span>
                    </div>
                  )}

                  <div className="my-6 h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />

                  <p className="font-display font-black text-3xl text-chrome mb-1">
                    R$ {plan.price.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-chrome-dark text-xs mb-6">
                    R$ {(plan.price / plan.credits).toFixed(2).replace('.', ',')} / crédito
                  </p>

                  <ul className="space-y-2 mb-6 flex-grow">
                    {[
                      `${plan.credits + plan.bonus} customizações`,
                      'Sem expiração',
                      'Render em 4K',
                    ].map((perk, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-chrome-dim">
                        <Check className="w-3.5 h-3.5 text-neon mt-0.5 flex-shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.featured ? 'primary' : 'secondary'}
                    fullWidth
                    isLoading={selected === plan.id}
                    disabled={selected !== null && selected !== plan.id}
                    onClick={() => handlePurchase(plan)}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Comprar
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <p className="font-display tracking-extreme uppercase text-xs text-neon text-center mb-2">
            ░ Perguntas
          </p>
          <h2 className="font-display font-black text-3xl text-chrome uppercase tracking-tight text-center mb-10">
            Dúvidas <span className="text-glow-red">frequentes</span>
          </h2>

          <div className="space-y-3">
            {[
              {
                q: 'Quanto tempo os créditos duram?',
                a: 'Seus créditos não expiram. Use quando quiser.',
              },
              {
                q: 'Posso solicitar reembolso?',
                a: 'Sim. Reembolso integral em até 30 dias.',
              },
              {
                q: 'Quanto custa cada customização?',
                a: '10 créditos por geração, independente da complexidade.',
              },
              {
                q: 'Há desconto em compras maiores?',
                a: 'Sim. Quanto mais créditos, menor o preço por crédito.',
              },
            ].map((item, i) => (
              <Card key={i} variant="default">
                <div className="p-5">
                  <h3 className="font-display font-bold text-chrome text-sm mb-1.5 tracking-wide">
                    {item.q}
                  </h3>
                  <p className="text-chrome-dark text-sm">{item.a}</p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
