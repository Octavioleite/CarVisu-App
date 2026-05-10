import clsx from 'clsx';
import logoUrl from '../../assets/Logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
}

const sizeMap = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-16',
  xl: 'h-24',
};

export const Logo = ({ className, size = 'md', glow = false }: LogoProps) => {
  return (
    <div className={clsx('relative inline-flex', className)}>
      {glow && (
        <div className="absolute inset-0 bg-neon/30 blur-2xl scale-90 -z-10 pointer-events-none" />
      )}
      <img
        src={logoUrl}
        alt="CarVisu"
        className={clsx(sizeMap[size], 'w-auto object-contain select-none')}
        draggable={false}
      />
    </div>
  );
};
