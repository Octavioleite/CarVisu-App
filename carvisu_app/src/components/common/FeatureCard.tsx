import { motion } from 'framer-motion';
import { Card } from '../ui';
import type { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index?: number;
}

export const FeatureCard = ({
  icon,
  title,
  description,
  index = 0,
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <Card hover className="h-full group">
        <div className="p-6 relative h-full flex flex-col">
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Icon container */}
          <div className="relative mb-5">
            <div className="relative w-12 h-12 rounded flex items-center justify-center bg-ink-900 border border-neon/30 text-neon group-hover:text-neon-glow group-hover:border-neon transition-all duration-300">
              {icon}
              {/* Glow */}
              <div className="absolute inset-0 bg-neon/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded -z-10" />
            </div>
          </div>

          {/* Content */}
          <h3 className="font-display font-bold text-chrome text-lg mb-2 tracking-wide">
            {title}
          </h3>
          <p className="text-chrome-dark text-sm leading-relaxed flex-grow">
            {description}
          </p>

          {/* Bottom indicator */}
          <div className="mt-4 pt-4 border-t border-neon/10 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-neon/30 to-transparent" />
            <span className="font-display tracking-extreme text-[9px] text-neon/60 uppercase">
              0{(index || 0) + 1}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
