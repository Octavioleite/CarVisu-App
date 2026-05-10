import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Zap, LayoutGrid, Image, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button, Logo } from '../ui';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { to: '/generate', label: 'Gerar', icon: Sparkles },
    { to: '/history', label: 'Histórico', icon: Image },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 bg-ink-900/80 backdrop-blur-xl border-b border-neon/15"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group transition-transform hover:scale-[1.02]">
            <Logo size="md" className="group-hover:drop-shadow-[0_0_12px_rgba(255,43,43,0.5)] transition-all duration-300" />
          </Link>

          {/* Center nav links (when authenticated) */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative px-4 py-2 rounded-md font-display tracking-racing uppercase text-xs flex items-center gap-2 transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-neon/10'
                        : 'text-chrome-dim hover:text-white hover:bg-ink-700/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-2 right-2 h-px bg-neon shadow-[0_0_8px_rgba(255,43,43,0.8)]"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right side */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* Credits */}
              <Link
                to="/credits"
                className="relative group hidden sm:flex items-center gap-2 px-3 py-2 rounded-md surface border-neon/30 hover:border-neon transition-all duration-300"
              >
                <Zap className="w-4 h-4 text-neon group-hover:text-neon-glow transition-colors" />
                <span className="font-display font-bold text-chrome text-sm">{user?.credits}</span>
                <span className="text-[10px] font-display tracking-extreme text-chrome-dim uppercase hidden lg:inline">
                  Créditos
                </span>
              </Link>

              {/* Avatar */}
              <Link
                to="/dashboard"
                className="relative flex items-center gap-2 group"
              >
                <div className="relative">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-9 h-9 rounded-full border-2 border-neon/40 group-hover:border-neon transition-all duration-300 bg-ink-800"
                  />
                  <div className="absolute inset-0 rounded-full bg-neon/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              </Link>

              <Button variant="ghost" size="sm" onClick={handleLogout} className="!px-3">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Entrar
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>
                Cadastro
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
