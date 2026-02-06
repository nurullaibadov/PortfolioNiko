import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import Magnetic from './Magnetic';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-6 px-6 pointer-events-none"
      >
        <div className={`flex items-center justify-between gap-12 px-8 py-3 rounded-[2.5rem] border transition-all duration-1000 pointer-events-auto h-20 ${isScrolled
          ? 'glass-card border-primary/20 bg-background/60 shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-full max-w-5xl'
          : 'bg-transparent border-transparent w-full max-w-7xl'
          }`}>

          {/* Institutional Branding Logo */}
          <Magnetic>
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl rotate-3 group-hover:rotate-0 transition-all duration-500 shadow-xl shadow-primary/20">
                NI
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black tracking-tighter uppercase italic group-hover:text-primary transition-colors">Nurulla</span>
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground/60">Digital Art</span>
              </div>
            </a>
          </Magnetic>

          {/* Editorial Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item, index) => (
              <Magnetic key={item.href}>
                <a
                  href={item.href}
                  className="relative px-6 py-2 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all rounded-2xl hover:bg-primary/5 group flex items-center gap-1 overflow-hidden"
                >
                  <motion.span
                    whileHover={{ x: [0, -2, 2, 0] }}
                    transition={{ duration: 0.2 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-primary"
                  >
                    0{index + 1}.
                  </motion.span>
                  <span className="relative z-10">{item.label}</span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary origin-left"
                  />
                </a>
              </Magnetic>
            ))}
          </div>

          {/* Action Hub */}
          <div className="flex items-center gap-4">
            {/* Language Selection */}
            <Magnetic>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl hover:bg-primary/10 transition-all group overflow-hidden border border-transparent hover:border-primary/20">
                    <Globe className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all group-hover:rotate-12" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card border-primary/20 rounded-[2rem] p-3 min-w-[180px] shadow-2xl">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => i18n.changeLanguage(lang.code)}
                      className={`rounded-xl px-5 py-3 mb-1 last:mb-0 transition-all cursor-none ${i18n.language === lang.code ? 'bg-primary text-primary-foreground font-black' : 'hover:bg-primary/10'
                        }`}
                    >
                      <span className="mr-3 text-xl">{lang.flag}</span>
                      <span className="text-xs font-black uppercase tracking-widest">{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </Magnetic>

            {/* Cinematic Theme Toggle */}
            <Magnetic>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="w-12 h-12 rounded-2xl hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20 group relative overflow-hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: 20, opacity: 0, rotate: -20 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: 20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-center h-full w-full"
                  >
                    {theme === 'dark' ? (
                      <Sun className="h-5 w-5 text-primary drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />
                    ) : (
                      <Moon className="h-5 w-5 text-primary" />
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
              </Button>
            </Magnetic>

            <div className="h-8 w-[1px] bg-primary/10 mx-2 hidden sm:block" />

            {/* Mobile Command Toggle */}
            <Magnetic>
              <Button
                variant="default"
                size="icon"
                className="lg:hidden w-12 h-12 rounded-2xl shadow-2xl shadow-primary/20 group overflow-hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMobileMenuOpen ? 'close' : 'menu'}
                    initial={{ opacity: 0, scale: 0.5, rotate: isMobileMenuOpen ? 90 : -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: isMobileMenuOpen ? -90 : 90 }}
                    className="h-full w-full flex items-center justify-center"
                  >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </Magnetic>

            {/* Resume Button - Hidden on mobile */}
            <Magnetic>
              <Button asChild className="hidden lg:flex h-12 rounded-2xl px-8 font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/10 gap-2 overflow-hidden relative group">
                <a href="/Nurulla_Ibadov.pdf" download>
                  <span>Resume</span>
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              </Button>
            </Magnetic>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-3xl lg:hidden flex flex-col items-center justify-center p-10"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-black uppercase tracking-tighter hover:text-primary transition-colors flex items-center gap-4"
                >
                  <span className="text-primary text-sm tracking-widest italic">/0{index + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-20 flex gap-8"
            >
              <Magnetic><Globe className="h-8 w-8 text-primary/40" /></Magnetic>
              <Magnetic><div onClick={toggleTheme} className="cursor-none"><Sun className="h-8 w-8 text-primary/40" /></div></Magnetic>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
