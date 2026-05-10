import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui';

interface BeforeAfterShowcaseProps {
  before: string;
  after: string;
  title: string;
  description: string;
}

export const BeforeAfterShowcase = ({
  before,
  after,
  title,
  description,
}: BeforeAfterShowcaseProps) => {
  const [isAfter, setIsAfter] = useState(false);

  return (
    <Card hover className="overflow-hidden group" hud>
      <div
        className="relative aspect-video overflow-hidden cursor-pointer"
        onClick={() => setIsAfter(!isAfter)}
      >
        <motion.img
          src={before}
          alt="Antes"
          animate={{ opacity: isAfter ? 0 : 1, scale: isAfter ? 1.05 : 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.img
          src={after}
          alt="Depois"
          animate={{ opacity: isAfter ? 1 : 0, scale: isAfter ? 1 : 1.05 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-70 pointer-events-none" />

        {/* Status label */}
        <div className="absolute top-3 left-3">
          <motion.div
            animate={{
              borderColor: isAfter ? 'rgba(255, 43, 43, 0.8)' : 'rgba(242, 242, 242, 0.4)',
              backgroundColor: isAfter ? 'rgba(255, 43, 43, 0.15)' : 'rgba(15, 15, 16, 0.8)',
            }}
            transition={{ duration: 0.3 }}
            className="px-2.5 py-1 rounded backdrop-blur-md border font-mono text-[10px] flex items-center gap-1.5"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAfter ? 'bg-neon shadow-[0_0_8px_rgba(255,43,43,0.8)]' : 'bg-chrome-dim'
              }`}
            />
            <span className={`font-display tracking-extreme uppercase ${isAfter ? 'text-neon' : 'text-chrome'}`}>
              {isAfter ? 'Depois' : 'Antes'}
            </span>
          </motion.div>
        </div>

        {/* Toggle hint */}
        <div className="absolute bottom-3 right-3">
          <div className="px-2.5 py-1 rounded backdrop-blur-md border border-neon/30 bg-ink/80 font-display tracking-extreme uppercase text-[9px] text-chrome-dim group-hover:text-neon transition-colors">
            Clique p/ alternar
          </div>
        </div>

        {/* Scan line on hover */}
        <motion.div
          initial={{ y: '-100%', opacity: 0 }}
          whileHover={{ y: '100%', opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent shadow-[0_0_12px_rgba(255,43,43,0.8)] pointer-events-none"
        />
      </div>

      {/* Info */}
      <div className="p-5 relative">
        <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />
        <h3 className="font-display font-bold text-chrome text-base tracking-wide mb-1.5">
          {title}
        </h3>
        <p className="text-chrome-dark text-xs leading-relaxed">{description}</p>
      </div>
    </Card>
  );
};
