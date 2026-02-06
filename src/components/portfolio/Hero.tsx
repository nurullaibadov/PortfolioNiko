import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Linkedin, Github, Instagram, Youtube, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileImage from '@/assets/profile-image.png';
import Magnetic from './Magnetic';

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/nurulla-ibadov-7971732a5/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/nurullaibadov', label: 'GitHub' },
  { icon: Instagram, href: 'https://www.instagram.com/nikomoserr/', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/@Softwareniko21', label: 'YouTube' },
  { icon: Mail, href: 'mailto:ibadnurulla@gmail.com', label: 'Email' },
];

const roles = ['Backend Developer', 'Frontend Developer', 'Software Instructor', 'Full Stack Developer'];

// TypeWriter component
function TypeWriter({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(text.substring(0, currentText.length + 1));
          if (currentText === text) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setCurrentText(text.substring(0, currentText.length - 1));
          if (currentText === '') {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts]);

  return (
    <span>
      {currentText}
      <span className="text-primary animate-pulse">|</span>
    </span>
  );
}

const LetterAnimate = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  return (
    <span className="inline-block overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.33, 1, 0.68, 1]
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

export default function Hero() {
  const { t } = useTranslation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Decorative Orbs */}
      <motion.div
        animate={{
          x: mousePos.x * 50,
          y: mousePos.y * 50,
        }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen"
      />
      <motion.div
        animate={{
          x: mousePos.x * -30,
          y: mousePos.y * -30,
        }}
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] -z-10 mix-blend-screen"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Status Pill */}
            <Magnetic>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-background border border-primary/20 mb-10 shadow-xl shadow-primary/5 backdrop-blur-md relative group cursor-none"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                </span>
                <span className="text-sm font-black tracking-[0.2em] uppercase text-foreground/80">{t('hero.available')}</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </Magnetic>

            {/* Main Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black mb-4 leading-none tracking-tighter italic">
                <span className="block text-foreground/40">{t('hero.greeting')}</span>
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x block">
                  <LetterAnimate text={t('hero.name')} delay={0.5} />
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-muted-foreground/80 mb-10 flex items-center justify-center lg:justify-start gap-4 font-mono"
            >
              <div className="w-12 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
              <TypeWriter texts={roles} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-12 leading-relaxed font-medium"
            >
              Building digital experiences that feel like <span className="text-foreground font-black italic underline decoration-primary/50 decoration-4 underline-offset-4">pure art</span>. Focused on bridging code and creativity.
            </motion.p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mb-16">
              <Magnetic>
                <Button asChild className="h-20 px-12 text-xl font-black rounded-3xl glow hover:scale-105 transition-all gap-4 group relative overflow-hidden shadow-2xl">
                  <a href="#projects">
                    {t('hero.viewWork')}
                    <div className="p-2 bg-white/20 rounded-xl group-hover:translate-y-1 transition-transform">
                      <ArrowDown className="h-6 w-6" />
                    </div>
                  </a>
                </Button>
              </Magnetic>

              <Magnetic>
                <Button asChild variant="outline" className="h-20 px-12 text-xl font-black rounded-3xl gap-4 border-primary/20 hover:bg-primary/5 hover:scale-105 transition-all backdrop-blur-sm group">
                  <a href="/Nurulla_Ibadov.pdf" download>
                    <div className="p-2 bg-primary/10 rounded-xl text-primary group-hover:rotate-12 transition-all">
                      <Download className="h-6 w-6" />
                    </div>
                    {t('hero.downloadResume')}
                  </a>
                </Button>
              </Magnetic>
            </div>
          </div>

          {/* Right - Profile Card with 3D Interaction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 perspective-1000"
          >
            <motion.div
              style={{
                rotateX: mousePos.y * -20,
                rotateY: mousePos.x * 20,
                transformStyle: "preserve-3d",
              }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] mx-auto group"
            >
              {/* Layered Content */}
              <div
                style={{ transform: "translateZ(50px)" }}
                className="absolute inset-0 bg-primary/20 rounded-[4rem] blur-[80px] group-hover:bg-primary/40 transition-colors duration-500 scale-90"
              />

              <div
                style={{ transform: "translateZ(100px)" }}
                className="relative w-full h-full rounded-[4rem] overflow-hidden border-[12px] border-background bg-gradient-to-br from-primary/20 via-background to-primary/10 p-2 shadow-2xl group-hover:border-primary/20 transition-all duration-500"
              >
                <div className="w-full h-full rounded-[3rem] overflow-hidden bg-background relative">
                  <motion.img
                    src={profileImage}
                    alt="Nurulla Ibadov"
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40 group-hover:opacity-0 transition-opacity" />
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <motion.div
                style={{ transform: "translateZ(150px)" }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 15, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-24 h-24 bg-background border border-primary/20 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-md z-20 group-hover:border-primary transition-colors"
              >
                <span className="text-4xl filter drop-shadow-lg">🚀</span>
              </motion.div>

              <motion.div
                style={{ transform: "translateZ(200px)" }}
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -15, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 w-28 h-28 bg-background border border-primary/20 rounded-[2.5rem] flex items-center justify-center shadow-2xl backdrop-blur-md z-20 group-hover:border-primary transition-colors"
              >
                <span className="text-5xl filter drop-shadow-lg">💻</span>
              </motion.div>

              {/* Orbital Ring */}
              <div className="absolute -inset-10 border-2 border-primary/5 rounded-full animate-spin-slow opacity-20 -z-10 group-hover:opacity-100 group-hover:border-primary/20 transition-all duration-1000" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Futuristic Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 mb-2">Scroll to explore Art</div>
        <div className="w-[1px] h-24 bg-gradient-to-b from-primary via-primary/50 to-transparent relative">
          <motion.div
            animate={{ y: [0, 96] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full blur-sm"
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full z-10" />
        </div>
      </motion.div>
    </section>
  );
}
