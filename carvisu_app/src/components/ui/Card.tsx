import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  variant?: 'default' | 'elevated' | 'flat';
  hud?: boolean;
  children?: ReactNode;
}

export const Card = ({
  hover = false,
  variant = 'default',
  hud = false,
  className,
  children,
  ...props
}: CardProps) => {
  const variants = {
    default: 'surface',
    elevated: 'surface-elevated',
    flat: 'bg-ink-800 border border-neon/10',
  };

  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow:
                '0 16px 48px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 43, 43, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            }
          : undefined
      }
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        'relative rounded-lg overflow-hidden',
        variants[variant],
        hud && 'hud-corners',
        hover && 'cursor-pointer',
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
};
