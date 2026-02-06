import { useTranslation } from 'react-i18next';
import { Heart, Github, Linkedin, Instagram, Youtube, Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="pt-24 pb-12 bg-background border-t border-primary/10 relative overflow-hidden group">
      {/* Massive Background Logo Interaction */}
      <div className="absolute -bottom-20 -left-20 pointer-events-none opacity-[0.03] select-none group-hover:opacity-[0.05] transition-opacity duration-1000">
        <h2 className="text-[35rem] font-black tracking-tighter italic leading-none">NI/</h2>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] select-none whitespace-nowrap overflow-hidden w-full">
        <motion.div
          animate={{ x: ["0%", "-50%", "0%"] }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="text-[40rem] font-black tracking-tighter uppercase italic flex gap-[10vw]"
        >
          <span>NURULLA IBADOV</span>
          <span>NURULLA IBADOV</span>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          {/* Brand & Mission */}
          <div className="lg:col-span-5 flex flex-col items-start gap-8">
            <Magnetic>
              <a href="#home" className="text-4xl font-black tracking-tighter group flex items-center gap-2">
                <span className="text-primary group-hover:rotate-12 transition-transform">&lt;</span>
                <span className="text-foreground tracking-tight italic">NURULLA</span>
                <span className="text-primary group-hover:-rotate-12 transition-transform">/&gt;</span>
              </a>
            </Magnetic>
            <p className="text-xl text-muted-foreground font-medium max-w-sm leading-relaxed">
              Transforming complex logic into <span className="text-foreground italic font-black underline decoration-primary/30 decoration-4">digital art</span>. Every pixel tells a story of craftsmanship and passion.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Github, href: 'https://github.com/nurullaibadov' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/nurulla-ibadov-7971732a5/' },
                { icon: Instagram, href: 'https://www.instagram.com/nikomoserr/' },
                { icon: Youtube, href: 'https://www.youtube.com/@Softwareniko21' },
              ].map((social, i) => (
                <Magnetic key={i}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-16 w-16 rounded-2xl bg-muted/50 border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xl group/social"
                  >
                    <social.icon className="h-6 w-6 group-hover/social:scale-110 transition-transform" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Quick Links Bento */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {footerLinks.map((link, i) => (
                <Magnetic key={link.name}>
                  <a
                    href={link.href}
                    className="p-8 rounded-[2.5rem] bg-muted/30 border border-primary/5 hover:border-primary/30 transition-all group/link flex flex-col justify-between h-40 shadow-xl"
                  >
                    <span className="text-sm font-black uppercase tracking-widest text-muted-foreground group-hover/link:text-primary transition-colors">0{i + 1}</span>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black italic uppercase tracking-tighter">{link.name}</span>
                      <ArrowUpRight className="h-6 w-6 opacity-0 group-hover/link:opacity-100 transition-all translate-y-2 group-hover/link:translate-y-0 text-primary" />
                    </div>
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-muted-foreground">
            CRAFTED WITH
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="h-5 w-5 text-primary fill-primary" />
            </motion.div>
            BY NURULLA IBADOV
          </div>

          <div className="flex items-center gap-12">
            <div className="text-sm font-mono text-muted-foreground/60">
              © {currentYear} ALL ART RESERVED
            </div>
            <Magnetic>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-5 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-xl group/up"
              >
                <ArrowUpRight className="h-6 w-6 group-hover/up:-translate-y-1 group-hover/up:translate-x-1 transition-transform rotate-[-45deg]" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
