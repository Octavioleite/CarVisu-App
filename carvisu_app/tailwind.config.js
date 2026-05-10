/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep blacks
        ink: {
          DEFAULT: '#050505',
          950: '#020202',
          900: '#0a0a0b',
          800: '#0f0f10',
          700: '#15151a',
          600: '#1c1c22',
          500: '#26262e',
        },
        // Neon red (signature)
        neon: {
          DEFAULT: '#ff2b2b',
          glow: '#ff3d3d',
          dim: '#cc2222',
          dark: '#8a1414',
          900: '#ff5050',
        },
        // Chrome / metallic
        chrome: {
          DEFAULT: '#f2f2f2',
          dim: '#d4d4d4',
          dark: '#8a8a8a',
          shadow: '#5a5a5a',
        },
        // Aliases (compat)
        'neon-red': {
          DEFAULT: '#ff2b2b',
          dark: '#cc2222',
          light: '#ff3d3d',
        },
        dark: {
          DEFAULT: '#050505',
          900: '#020202',
          800: '#0a0a0b',
          700: '#0f0f10',
          600: '#15151a',
          500: '#1c1c22',
        },
      },
      fontFamily: {
        sans: ['"Rajdhani"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Orbitron"', '"Rajdhani"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'glow-radial': 'radial-gradient(circle at center, rgba(255, 43, 43, 0.25) 0%, transparent 60%)',
        'chrome-gradient': 'linear-gradient(180deg, #f2f2f2 0%, #8a8a8a 50%, #5a5a5a 100%)',
        'red-gradient': 'linear-gradient(135deg, #ff3d3d 0%, #ff2b2b 50%, #cc2222 100%)',
        'red-shine': 'linear-gradient(135deg, #ff5050 0%, #ff2b2b 100%)',
        'ink-gradient': 'linear-gradient(180deg, #0f0f10 0%, #050505 100%)',
        'speed-lines': 'repeating-linear-gradient(135deg, transparent 0, transparent 40px, rgba(255, 43, 43, 0.03) 40px, rgba(255, 43, 43, 0.03) 41px)',
        'grid-fade': 'linear-gradient(180deg, transparent 0%, rgba(5,5,5,0.8) 100%)',
        'city-glow': 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255, 43, 43, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(255, 43, 43, 0.5), 0 0 40px rgba(255, 43, 43, 0.25)',
        'neon-sm': '0 0 12px rgba(255, 43, 43, 0.4)',
        'neon-lg': '0 0 30px rgba(255, 43, 43, 0.7), 0 0 60px rgba(255, 43, 43, 0.35), 0 0 100px rgba(255, 43, 43, 0.2)',
        'neon-inset': 'inset 0 0 20px rgba(255, 43, 43, 0.15)',
        'chrome': '0 4px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glossy': 'inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.4)',
        'glossy-red': 'inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 43, 43, 0.4)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'card-hover': '0 16px 48px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 43, 43, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'scan': 'scan 3s ease-in-out infinite',
        'speed': 'speedLines 1.2s linear infinite',
        'rotate-slow': 'spin 20s linear infinite',
        'rotate-reverse': 'rotateReverse 15s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 43, 43, 0.4), 0 0 40px rgba(255, 43, 43, 0.2)',
            opacity: '1',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(255, 43, 43, 0.7), 0 0 60px rgba(255, 43, 43, 0.4)',
            opacity: '0.95',
          },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(255, 43, 43, 0.6)' },
          '50%': { textShadow: '0 0 20px rgba(255, 43, 43, 0.9), 0 0 40px rgba(255, 43, 43, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        scan: {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        speedLines: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(40px)' },
        },
        rotateReverse: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
      letterSpacing: {
        'racing': '0.15em',
        'extreme': '0.25em',
      },
    },
  },
  plugins: [],
}
