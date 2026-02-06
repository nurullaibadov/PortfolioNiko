import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Calendar, Briefcase, Code } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import profileImage from '@/assets/profile-image.png';
import Magnetic from './Magnetic';

const stats = [
  { value: '1.5+', labelKey: 'about.yearsExp', icon: Calendar },
  { value: '20+', labelKey: 'about.projectsCompleted', icon: Briefcase },
  { value: '15+', labelKey: 'about.technologies', icon: Code },
];

const StatCard = ({ stat, index, t }: { stat: any, index: number, t: any }) => (
  <Magnetic>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="p-8 rounded-[3rem] bg-muted/20 border border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-all relative overflow-hidden group shadow-2xl h-full"
    >
      <div className="absolute -top-6 -right-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity transform rotate-12 group-hover:rotate-0 duration-700">
        <stat.icon className="h-40 w-40 text-primary" />
      </div>
      <div className="relative z-10">
        <div className="text-6xl font-black text-primary mb-3 tabular-nums tracking-tighter italic">
          {stat.value}
        </div>
        <div className="text-sm font-black text-muted-foreground uppercase tracking-[0.4em]">
          {t(stat.labelKey)}
        </div>
      </div>
    </motion.div>
  </Magnetic>
);

export default function About() {
  const { t } = useTranslation();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={targetRef} className="py-24 lg:py-60 relative overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary/5 blur-[200px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-primary/10 blur-[180px] rounded-full -z-10" />

      <div className="container mx-auto px-4">
        {/* Section Header - Exhibition Catalogue Style */}
        <div className="flex flex-col items-start mb-40 text-left border-l-2 border-primary/20 pl-12">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-black tracking-[0.8em] uppercase text-primary mb-4"
          >
            Curated Subject: 01
          </motion.div>
          <h2 className="text-8xl sm:text-9xl lg:text-[12rem] font-black tracking-tighter uppercase italic leading-[0.7] text-foreground">
            Digital <br /><span className="text-primary/20">Manifesto</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left - Narrative Piece (The Soul) */}
          <motion.div style={{ y: y2, opacity }} className="lg:col-span-7 space-y-20">
            <div className="space-y-16">
              <h4 className="text-4xl sm:text-5xl font-black italic tracking-tighter uppercase leading-[0.9] text-foreground border-b border-primary/10 pb-12">
                "Code is not a tool, <br /><span className="text-primary italic">it's a medium for art."</span>
              </h4>
              <div className="space-y-8 text-2xl sm:text-3xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                <p>
                  {t('about.description1').split(' ').map((word: string, i: number) => (
                    <span key={i} className="inline-block hover:text-primary transition-colors hover:scale-105 cursor-none mr-[0.5rem]">{word}</span>
                  ))}
                </p>
                <p className="text-xl italic text-foreground/40 border-l-[1px] border-primary/30 pl-10 py-2">
                  {t('about.description2')}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12">
                <div className="space-y-4">
                  <div className="text-[10px] font-black tracking-widest text-primary uppercase">Focus</div>
                  <p className="text-sm font-bold text-muted-foreground">Architecting scalable digital ecosystems where aesthetics meet high-performance engineering.</p>
                </div>
                <div className="space-y-4">
                  <div className="text-[10px] font-black tracking-widest text-primary uppercase">Philosophy</div>
                  <p className="text-sm font-bold text-muted-foreground">Minimalism in design, maximalism in logic. Every line of code should serve a purpose.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Visual & Stats (The Exhibit) */}
          <motion.div style={{ y: y1 }} className="lg:col-span-5 relative">
            <div className="absolute -inset-20 bg-primary/5 blur-[120px] -z-10 rounded-full" />

            <Card className="glass-card border-primary/5 rounded-[4rem] relative z-10 overflow-hidden bg-background shadow-3xl">
              <CardContent className="p-12">
                <div className="flex flex-col gap-12">
                  <div className="relative group">
                    <div className="absolute -inset-4 border border-primary/10 rounded-[3rem] group-hover:border-primary/40 transition-colors duration-700" />
                    <motion.div
                      whileHover={{ scale: 0.98 }}
                      className="w-full aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl relative"
                    >
                      <img
                        src={profileImage}
                        alt="Nurulla Exhibit"
                        className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-6 left-6 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exhibit Active</span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter">Nurulla Ibadov</h3>
                        <div className="text-[10px] font-black uppercase tracking-widest text-primary">Subject Type: Human/Engineer</div>
                      </div>
                      <MapPin className="h-6 w-6 text-primary opacity-40" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                        <span>Creative Intelligence</span>
                        <span>98.2%</span>
                      </div>
                      <div className="h-[2px] w-full bg-primary/5 overflow-hidden">
                        <motion.div
                          initial={{ x: "-100%" }}
                          whileInView={{ x: 0 }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-8 pt-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.labelKey} stat={stat} index={index} t={t} />
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-12 rounded-[3.5rem] bg-foreground text-background col-span-2 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center justify-between group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-1000" />
            <div className="relative z-10 text-center sm:text-left mb-8 sm:mb-0">
              <h4 className="text-3xl font-black italic tracking-tighter uppercase mb-2 text-primary">{t('about.availableTitle') || 'Status: Active'}</h4>
              <p className="font-bold opacity-60 text-base max-w-xs">{t('about.availableDesc') || 'Open for high-impact creative engineering opportunities in 2026.'}</p>
            </div>
            <Magnetic>
              <div className="relative z-10 h-20 w-20 flex items-center justify-center rounded-[2rem] bg-primary text-primary-foreground shadow-2xl group-hover:rotate-12 transition-transform duration-700">
                <Code className="h-10 w-10" />
              </div>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
