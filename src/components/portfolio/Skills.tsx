import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Palette, Database, Wrench, Languages } from 'lucide-react';
import Magnetic from './Magnetic';

const skillCategories = [
  {
    titleKey: 'skills.backend',
    icon: Zap,
    skills: ['C#', 'ASP.NET Core', 'REST API', 'Web API', 'Python', 'Node.js'],
  },
  {
    titleKey: 'skills.frontend',
    icon: Palette,
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    titleKey: 'skills.database',
    icon: Database,
    skills: ['SQL Server', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    titleKey: 'skills.tools',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Linux', 'Docker', 'VS Code', 'Postman', 'Azure'],
  },
];

const spokenLanguages = [
  { name: 'English', flag: '🇬🇧' },
  { name: 'Turkish', flag: '🇹🇷' },
  { name: 'Azerbaijani', flag: '🇦🇿' },
  { name: 'Russian', flag: '🇷🇺' },
];

const SkillCard = ({ category, index, t }: { category: any, index: number, t: any }) => {
  const isLarge = index === 0 || index === 3;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className={`${isLarge ? 'md:col-span-2' : 'md:col-span-1'} h-full`}
    >
      <Magnetic>
        <Card className="glass-card h-full hover:border-primary/40 transition-all duration-700 rounded-[3rem] border-primary/10 shadow-2xl group overflow-hidden relative bg-gradient-to-br from-background/40 to-primary/5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <CardHeader className="pb-8 relative z-10 pt-10 px-8">
            <div className="flex items-center gap-6">
              <div className="p-5 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-6 transition-all duration-500 shadow-[inset_0_0_20px_rgba(var(--primary-rgb),0.1)]">
                <category.icon className="h-8 w-8" />
              </div>
              <CardTitle className="text-3xl font-black tracking-tighter uppercase italic">{t(category.titleKey)}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 px-8 pb-10">
            <div className={`flex flex-wrap gap-3 ${isLarge ? 'grid grid-cols-2 sm:grid-cols-3' : ''}`}>
              {category.skills.map((skill: string) => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.1, rotate: Math.random() * 4 - 2 }}
                >
                  <Badge
                    variant="secondary"
                    className="bg-muted/50 hover:bg-primary hover:text-white transition-all duration-500 cursor-none rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest border border-primary/5 hover:border-primary shadow-lg"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Magnetic>
    </motion.div>
  );
};

export default function Skills() {
  const { t } = useTranslation();

  const allSkills = [...skillCategories[0].skills, ...skillCategories[1].skills, ...skillCategories[2].skills, ...skillCategories[3].skills];

  return (
    <section id="skills" className="py-24 lg:py-60 relative overflow-hidden bg-background">
      {/* Massive Background Text */}
      <div className="absolute top-0 left-0 h-full pointer-events-none select-none opacity-[0.03] flex items-center">
        <h2 className="text-[30rem] font-black tracking-tighter italic origin-center rotate-[-90deg] translate-x-[-15%]">ARSENAL</h2>
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header - Exhibition Catalogue Style */}
        <div className="flex flex-col items-start mb-40 text-left border-l-2 border-primary/20 pl-12">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-black tracking-[0.8em] uppercase text-primary mb-4"
          >
            Technical Exhibit: 02
          </motion.div>
          <h2 className="text-8xl sm:text-9xl lg:text-[12rem] font-black tracking-tighter uppercase italic leading-[0.7] text-foreground">
            System <br /><span className="text-primary/20">Arsenal</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-12 text-xl font-medium text-muted-foreground max-w-xl italic leading-relaxed"
          >
            A curated collection of high-performance technologies, optimized for orchestrating complex digital architecture.
          </motion.p>
        </div>

        {/* Bento Grid Skills */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-20 max-w-7xl mx-auto px-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.titleKey} category={category} index={index} t={t} />
          ))}

          {/* Special Experience Bento Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 lg:col-span-2"
          >
            <Magnetic>
              <Card className="glass-card h-full border-primary/20 bg-primary/5 rounded-[4rem] p-12 flex flex-col justify-center items-center text-center group hover:bg-primary/10 transition-all duration-1000 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1),transparent_70%)]" />
                <div className="mb-10 relative">
                  <div className="absolute inset-0 bg-primary blur-[60px] opacity-20 group-hover:opacity-50 transition-opacity animate-pulse" />
                  <Zap className="h-20 w-20 text-primary relative z-10 animate-bounce" />
                </div>
                <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase italic text-foreground">Future <span className="text-primary">Vision</span></h3>
                <p className="text-xl text-muted-foreground font-medium mb-10 max-w-md italic leading-relaxed"> Seeking to master the frontier of AI Agents and Cloud Native Ecosystems.</p>
                <div className="flex gap-4">
                  <span className="flex items-center gap-3 text-[10px] font-black tracking-[0.3em] px-6 py-3 bg-foreground text-background rounded-full uppercase italic">Open Source</span>
                  <span className="flex items-center gap-3 text-[10px] font-black tracking-[0.3em] px-6 py-3 bg-primary text-white rounded-full uppercase italic">Innovation</span>
                </div>
              </Card>
            </Magnetic>
          </motion.div>
        </div>

        {/* Endless Tech Marquee */}
        <div className="relative py-20 overflow-hidden mt-20">
          <div className="flex whitespace-nowrap overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-20 py-4"
            >
              {[...allSkills, ...allSkills].map((skill, i) => (
                <span key={i} className="text-7xl lg:text-9xl font-black tracking-tighter uppercase italic opacity-5 hover:opacity-100 hover:text-primary transition-all cursor-none select-none">
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>
          <div className="flex whitespace-nowrap overflow-hidden rotate-[-2deg] mt-[-5rem]">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-20 py-4"
            >
              {[...allSkills, ...allSkills].map((skill, i) => (
                <span key={i} className="text-7xl lg:text-9xl font-black tracking-tighter uppercase italic opacity-5 hover:opacity-100 hover:text-primary transition-all cursor-none select-none">
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Languages Expansion */}
        <div className="pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-8 mb-16 justify-center"
          >
            <div className="h-[2px] w-20 bg-primary/20 shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]" />
            <h3 className="text-3xl font-black uppercase tracking-[0.5em] text-foreground italic">{t('skills.languages')}</h3>
            <div className="h-[2px] w-20 bg-primary/20 shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
            {spokenLanguages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-6 p-10 rounded-[3rem] bg-muted/20 border border-primary/5 hover:border-primary/40 hover:bg-primary/5 transition-all group relative overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-7xl mb-2 grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-125 group-hover:rotate-6">{lang.flag}</span>
                <span className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground group-hover:text-primary transition-colors">{lang.name}</span>
                <div className="h-1.5 w-12 bg-primary/20 rounded-full group-hover:w-20 group-hover:bg-primary transition-all duration-700 shadow-lg shadow-primary/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
