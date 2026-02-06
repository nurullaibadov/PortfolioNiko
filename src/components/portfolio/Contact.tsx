import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Linkedin, Github, Instagram, Youtube, ExternalLink, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import Magnetic from './Magnetic';

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/nurulla-ibadov-7971732a5/', label: 'LinkedIn', color: 'hover:bg-blue-500' },
  { icon: Github, href: 'https://github.com/nurullaibadov', label: 'GitHub', color: 'hover:bg-gray-700' },
  { icon: Instagram, href: 'https://www.instagram.com/nikomoserr/', label: 'Instagram', color: 'hover:bg-pink-500' },
  { icon: Youtube, href: 'https://www.youtube.com/@Softwareniko21', label: 'YouTube', color: 'hover:bg-red-500' },
];

const ContactCard = ({ children, type, icon: Icon, title, subtitle, link }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="glass-card h-full border-primary/10 hover:border-primary/50 transition-all duration-500 rounded-[3rem] group overflow-hidden shadow-xl hover:shadow-primary/20 relative"
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(var(--primary-rgb), 0.1), transparent 40%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
        <CardContent className="p-10 flex flex-col items-center text-center relative z-10">
          <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
            <Icon className="h-10 w-10" />
          </div>
          <h3 className="text-3xl font-black mb-3 italic tracking-tighter uppercase">{title}</h3>
          {children ? children : (
            <a
              href={link}
              className="text-lg font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group/link"
            >
              <span>{subtitle}</span>
              <ExternalLink className="h-4 w-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
            </a>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('ibadnurulla@gmail.com');
    setCopied(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 lg:py-40 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.03),transparent_70%)] -z-10" />
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10"
      />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase mb-4"
          >
            {t('contact.subtitle')}
          </motion.div>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter uppercase italic">{t('contact.title')}</h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <ContactCard
              icon={Mail}
              title={t('contact.emailMe')}
              type="email"
            >
              <div className="flex flex-col items-center gap-4">
                <span className="text-lg font-bold text-muted-foreground">ibadnurulla@gmail.com</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyEmail}
                  className="rounded-xl border-primary/20 hover:bg-primary/10 gap-2 font-black uppercase text-[10px] tracking-widest"
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied' : 'Copy Email'}
                </Button>
              </div>
            </ContactCard>

            <ContactCard
              icon={MapPin}
              title={t('contact.location')}
              subtitle="Baku, Azerbaijan"
              link="#"
            />
          </div>

          {/* Social Links & Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center bg-muted/20 p-12 sm:p-20 rounded-[4rem] border border-primary/10 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-1000" />

            <h3 className="text-3xl font-black mb-12 tracking-tighter uppercase italic">{t('contact.findMe')}</h3>
            <div className="flex justify-center flex-wrap gap-4 sm:gap-8 mb-16">
              {socialLinks.map((social) => (
                <Magnetic key={social.label}>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`h-24 w-24 rounded-[2rem] bg-background border border-primary/10 shadow-xl flex items-center justify-center ${social.color} hover:text-white transition-all duration-500 group/social relative overflow-hidden`}
                    aria-label={social.label}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover/social:opacity-10 transition-opacity bg-white" />
                    <social.icon className="h-10 w-10 relative z-10" />
                  </motion.a>
                </Magnetic>
              ))}
            </div>

            <Magnetic>
              <Button asChild className="h-24 px-16 text-2xl font-black rounded-[2.5rem] glow hover:scale-105 transition-all gap-6 shadow-primary/40 group relative overflow-hidden">
                <a href="mailto:ibadnurulla@gmail.com">
                  <div className="p-3 bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  {t('contact.emailMe')}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </a>
              </Button>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
