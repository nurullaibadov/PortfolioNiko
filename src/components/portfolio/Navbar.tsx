import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 50);
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

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4`}
      >
        <div className={`flex items-center justify-between gap-8 px-6 py-2 rounded-2xl border transition-all duration-500 ${isScrolled
          ? 'glass border-primary/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] w-full max-w-6xl'
          : 'bg-background/20 backdrop-blur-md border-transparent w-full max-w-7xl'
          }`}>
          {/* Logo */}
          <Magnetic>
            <a href="#home" className="text-2xl font-black tracking-tighter hover:scale-105 transition-transform group block">
              <span className="text-primary group-hover:text-primary/80">&lt;</span>
              <span className="text-foreground tracking-tight">NI</span>
              <span className="text-primary group-hover:text-primary/80">/&gt;</span>
            </a>
          </Magnetic>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Magnetic key={item.href}>
                <a
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-all rounded-xl hover:bg-primary/5 group block"
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </a>
              </Magnetic>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Language Switcher */}
            <Magnetic>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-primary/10 transition-colors">
                    <Globe className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass border-primary/20 rounded-2xl p-2 min-w-[150px]">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => i18n.changeLanguage(lang.code)}
                      className={`rounded-xl px-4 py-2 mb-1 last:mb-0 transition-colors ${i18n.language === lang.code ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-primary/10'
                        }`}
                    >
                      <span className="mr-3 text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </Magnetic>

            {/* Theme Toggle */}
            <Magnetic>
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="w-10 h-10 rounded-xl hover:bg-primary/10 transition-colors">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {theme === 'dark' ? (
                      <Sun className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Moon className="h-5 w-5 text-blue-600" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </Magnetic>

            <div className="h-6 w-px bg-border/50 mx-1 hidden sm:block" />

            {/* Mobile Menu Button */}
            <Magnetic>
              <Button
                variant="default"
                size="icon"
                className="lg:hidden w-10 h-10 rounded-xl shadow-lg shadow-primary/20"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMobileMenuOpen ? 'close' : 'menu'}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </Magnetic>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 glass border-b border-border lg:hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
