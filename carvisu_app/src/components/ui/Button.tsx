import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'chrome';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const base =
    'relative overflow-hidden font-display font-semibold tracking-racing uppercase rounded-md transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';

  const variants = {
    primary:
      'glossy-red text-white border border-neon/50 hover:border-neon hover:scale-[1.02] active:scale-[0.98]',
    secondary:
      'glossy text-chrome border border-neon/20 hover:border-neon/60 hover:text-white hover:shadow-neon-sm',
    ghost:
      'text-chrome-dim hover:text-white bg-transparent border border-transparent hover:border-neon/30 hover:bg-ink-700/50',
    chrome:
      'bg-chrome-gradient text-ink-900 border border-chrome-dim hover:shadow-chrome',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {/* Shimmer effect on primary */}
      {variant === 'primary' && !disabled && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_infinite] pointer-events-none" />
      )}

      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Carregando</span>
          </>
        ) : (
          children
        )}
      </span>
    </motion.button>
  );
};
