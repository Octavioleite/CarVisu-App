import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export const Input = ({
  label,
  error,
  icon,
  className,
  ...props
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-display tracking-racing uppercase text-chrome-dim mb-2">
          {label}
        </label>
      )}
      <div className="relative group">
        {/* Glow on focus */}
        <div className="absolute inset-0 rounded-md bg-neon/0 group-focus-within:bg-neon/10 blur-md transition-all duration-300 pointer-events-none" />

        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-chrome-dark group-focus-within:text-neon transition-colors duration-200 z-10">
            {icon}
          </div>
        )}
        <input
          className={clsx(
            'relative w-full px-4 py-3 bg-ink-800/80 backdrop-blur border rounded-md text-chrome placeholder-chrome-dark/60 font-medium',
            'border-neon/20 focus:border-neon focus:bg-ink-700/80',
            'focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,43,43,0.15),0_0_24px_rgba(255,43,43,0.25)]',
            'transition-all duration-200',
            icon && 'pl-11',
            error && 'border-red-500/60 focus:border-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-1 font-medium">{error}</p>
      )}
    </div>
  );
};
