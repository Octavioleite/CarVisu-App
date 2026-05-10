import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '../ui';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  cta?: { text: string; onClick: () => void };
  secondaryCta?: { text: string; onClick: () => void };
  image?: string;
  badge?: string;
}

export const HeroSection = ({
  title,
  subtitle,
  cta,
  secondaryCta,
  image,
  badge,
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 speed-lines pointer-events-none" />

      {/* City glow */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-city-glow pointer-events-none" />

      {/* Animated red orbs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-neon blur-[120px] opacity-30 pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-neon-glow blur-[120px] opacity-25 pointer-events-none"
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/0 via-transparent to-ink pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full surface border-neon/40"
            >
              <span className="pulse-dot" />
              <span className="font-display tracking-extreme uppercase text-[10px] text-chrome">
                {badge}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 uppercase"
          >
            <span className="text-chrome block">{title.split('.')[0]}.</span>
            {title.split('.').slice(1).map((part, i) => part.trim() && (
              <span
                key={i}
                className={i === title.split('.').length - 2 ? 'text-glow-red block' : 'text-chrome block'}
              >
                {part.trim()}.
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-chrome-dim text-lg md:text-xl mb-10 max-w-xl font-medium leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {cta && (
              <Button
                variant="primary"
                size="lg"
                onClick={cta.onClick}
                className="group"
              >
                <Zap className="w-4 h-4" />
                {cta.text}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
            {secondaryCta && (
              <Button variant="secondary" size="lg" onClick={secondaryCta.onClick}>
                {secondaryCta.text}
              </Button>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-8 mt-12 pt-8 border-t border-neon/10"
          >
            {[
              { value: '50K+', label: 'Projetos' },
              { value: '99%', label: 'Satisfação' },
              { value: '<10s', label: 'Render' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="font-display font-black text-2xl text-chrome">
                  {stat.value}
                </p>
                <p className="font-display tracking-extreme uppercase text-[10px] text-neon/80 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right image */}
        {image && (
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* HUD frame */}
            <div className="relative hud-corners p-1 rounded-lg">
              <div className="relative aspect-[4/3] rounded overflow-hidden surface">
                <motion.img
                  src={image}
                  alt="Hero"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full object-cover"
                />

                {/* Scan line overlay */}
                <motion.div
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-neon/20 to-transparent h-32 pointer-events-none"
                />

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* HUD readouts */}
                <div className="absolute top-4 left-4 right-4 flex justify-between font-mono text-[10px]">
                  <div className="bg-ink/80 backdrop-blur px-2 py-1 rounded border border-neon/40">
                    <span className="text-neon">● REC</span>
                    <span className="text-chrome ml-2">04:21</span>
                  </div>
                  <div className="bg-ink/80 backdrop-blur px-2 py-1 rounded border border-neon/40 text-chrome">
                    PROJECT_001
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-ink/80 backdrop-blur px-3 py-2 rounded border border-neon/40 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-chrome">FITMENT</span>
                    <span className="text-neon font-bold">PERFECT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow behind */}
            <div className="absolute inset-0 bg-neon/20 blur-[80px] -z-10 rounded-full" />
          </motion.div>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent pointer-events-none" />
    </section>
  );
};
