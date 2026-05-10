import { motion } from 'framer-motion';
import { Share2, Heart, Code, Zap } from 'lucide-react';
import { Logo } from '../ui';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative bg-ink-900 border-t border-neon/15 mt-20"
    >
      {/* Top glow accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent opacity-50" />

      {/* Speed lines bg */}
      <div className="absolute inset-0 speed-lines opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="md" className="mb-4" />
            <p className="text-chrome-dark text-sm font-medium">
              Plataforma premium de customização automotiva virtual com IA.
            </p>
          </div>

          {/* Produto */}
          <div>
            <h4 className="font-display tracking-racing uppercase text-xs text-chrome mb-4 flex items-center gap-2">
              <Zap className="w-3 h-3 text-neon" />
              Produto
            </h4>
            <ul className="space-y-2">
              {['Features', 'Preços', 'Roadmap', 'API'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-chrome-dark text-sm hover:text-neon transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-display tracking-racing uppercase text-xs text-chrome mb-4 flex items-center gap-2">
              <Zap className="w-3 h-3 text-neon" />
              Empresa
            </h4>
            <ul className="space-y-2">
              {['Sobre', 'Blog', 'Carreiras', 'Contato'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-chrome-dark text-sm hover:text-neon transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display tracking-racing uppercase text-xs text-chrome mb-4 flex items-center gap-2">
              <Zap className="w-3 h-3 text-neon" />
              Comunidade
            </h4>
            <div className="flex gap-2">
              {[Code, Share2, Heart].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-md surface border-neon/20 hover:border-neon hover:shadow-neon-sm transition-all duration-300 flex items-center justify-center text-chrome-dim hover:text-neon"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="divider-red mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-chrome-dark text-xs gap-4">
          <p className="font-medium">
            &copy; {currentYear} CarVisu. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 font-display tracking-racing uppercase">
            <a href="#" className="hover:text-neon transition-colors">Privacidade</a>
            <a href="#" className="hover:text-neon transition-colors">Termos</a>
            <a href="#" className="hover:text-neon transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
