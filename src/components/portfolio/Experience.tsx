import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';
import Magnetic from './Magnetic';

const workExperience = [
  {
    title: 'Software Instructor',
    company: 'Peerstack',
    location: 'Baku, Azerbaijan',
    period: 'Jan 2026 - Present',
    current: true,
    responsibilities: [
      'Teaching software development fundamentals and advanced concepts',
      'Developing comprehensive curriculum for web development courses',
      'Mentoring aspiring developers and conducting code reviews',
    ],
    skills: ['Teaching', 'React', 'TypeScript', 'Node.js', 'Mentoring'],
  },
  {
    title: 'Backend Developer',
    company: 'Vivisolis',
    location: 'Baku, Azerbaijan',
    period: 'Jan 2025 - May 2025',
    responsibilities: [
      'Implemented RESTful APIs for seamless frontend-backend communication',
      'Conducted code reviews and maintained high code quality standards',
      'Reduced user-reported errors by 15% through bug fixes and optimizations',
    ],
    skills: ['C#', 'ASP.NET', 'REST API', 'SQL Server'],
  },
  {
    title: 'Frontend Developer',
    company: 'Jet Academy',
    location: 'Baku, Azerbaijan',
    period: 'Oct 2024 - Jan 2025',
    responsibilities: [
      'Designed and developed responsive websites using modern technologies',
      'Collaborated with UI/UX designers to integrate design mockups',
      'Enhanced user experience through user-friendly interfaces',
    ],
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind'],
  },
];

const education = [
  {
    degree: "Bachelor's in Information Technology",
    school: 'Azerbaijan Technical University',
    period: 'Sep 2022 - Jun 2026',
    description: 'Strong foundation in computer science, programming, networking, and database management.',
  },
  {
    degree: 'Honor Diploma - Backend Developer',
    school: 'Code Academy',
    period: 'Sep 2024 - Feb 2025',
    description: 'Intensive program focusing on backend development, database management, and system design.',
  },
];
const ExperienceCard = ({ item, index, t, type }: { item: any, index: number, t: any, type: 'work' | 'edu' }) => {
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
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 1 }}
      className="relative pl-24 group mb-16"
    >
      {/* Magnetic Timeline Point */}
      <div className="absolute left-8 top-10 -translate-x-1/2 z-20">
        <Magnetic>
          <div className="p-3">
            <div className={`w-6 h-6 rounded-full border-4 transition-all duration-700 ${item.current
              ? 'bg-primary border-background ring-8 ring-primary/20 scale-125'
              : 'bg-background border-primary/40 group-hover:bg-primary group-hover:border-background group-hover:scale-150'
              }`} />
          </div>
        </Magnetic>
      </div>

      <Card className="glass-card border-primary/5 group-hover:border-primary/30 transition-all duration-700 rounded-[3rem] shadow-2xl overflow-hidden relative bg-gradient-to-br from-background/40 to-primary/5">
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(var(--primary-rgb), 0.1), transparent 40%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        <CardContent className="p-10 sm:p-14 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <h4 className="font-black text-3xl sm:text-4xl tracking-tighter italic uppercase group-hover:text-primary transition-colors">
                  {type === 'work' ? item.title : item.degree}
                </h4>
                {type === 'work' && item.current && (
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xl font-black text-primary/80 italic tracking-tight">
                {type === 'work' ? (
                  <>
                    <Briefcase className="h-5 w-5" />
                    {item.company}
                  </>
                ) : (
                  <>
                    <GraduationCap className="h-5 w-5" />
                    {item.school}
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:items-end gap-3 font-black text-sm uppercase tracking-[0.3em] text-muted-foreground/60">
              <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-muted/50 border border-primary/5 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Calendar className="h-4 w-4" />
                {item.period}
              </div>
              {type === 'work' && (
                <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-muted/50 border border-primary/5">
                  <MapPin className="h-4 w-4" />
                  {item.location}
                </div>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 pt-10 border-t border-primary/5">
            <div className="lg:col-span-8">
              {type === 'work' ? (
                <ul className="space-y-6">
                  {item.responsibilities.map((resp: string, i: number) => (
                    <li key={i} className="text-lg text-muted-foreground/80 flex items-start gap-5 leading-relaxed font-medium group/item">
                      <span className="mt-2.5 h-1.5 w-6 block bg-primary/20 group-hover/item:bg-primary group-hover/item:w-10 transition-all rounded-full" />
                      {resp}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xl text-muted-foreground leading-relaxed font-medium italic border-l-4 border-primary/20 pl-8">{item.description}</p>
              )}
            </div>

            <div className="lg:col-span-4 flex flex-wrap content-start gap-3">
              {type === 'work' && item.skills.map((skill: string) => (
                <Badge
                  key={skill}
                  className="bg-primary/5 hover:bg-primary text-foreground hover:text-white transition-all rounded-[1rem] px-5 py-2.5 font-black text-xs uppercase tracking-widest border border-primary/10"
                >
                  {skill}
                </Badge>
              ))}
              {type === 'edu' && (
                <div className="w-full p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 flex flex-col items-center justify-center text-center gap-4">
                  <GraduationCap className="h-10 w-10 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Certified Excellence</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Experience() {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-24 lg:py-60 relative overflow-hidden bg-background">
      {/* Artistic Side Labels */}
      <div className="absolute top-0 right-0 h-full pointer-events-none select-none opacity-[0.03] flex items-center">
        <h2 className="text-[25rem] font-black tracking-tighter italic origin-center rotate-[90deg] translate-x-1/2">JOURNEY</h2>
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-32 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-block px-6 py-2 rounded-full bg-primary/10 text-primary text-xs font-black tracking-[0.5em] uppercase mb-6 italic">
              {t('experience.subtitle')}
            </div>
            <h2 className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase italic leading-[0.7] text-foreground">
              Life <br /><span className="text-primary underline decoration-primary/20">Timeline</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl text-muted-foreground font-medium lg:text-right max-w-sm italic leading-tight"
          >
            Mapping the intersection of <span className="text-foreground font-black">logic</span> and <span className="text-primary font-black">art</span> over the years.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 sm:gap-32 items-start relative px-10">
          {/* Vertical Timeline Divider */}
          <div className="absolute left-[54px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/40 via-primary/5 to-transparent hidden lg:block" />

          {/* Work Experience */}
          <div className="space-y-16">
            <div className="flex items-center gap-8 mb-12 relative z-10">
              <div className="w-20 h-20 rounded-[2rem] bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] text-primary-foreground rotate-3">
                <Briefcase className="h-10 w-10" />
              </div>
              <h3 className="text-5xl font-black italic tracking-tight uppercase leading-none">{t('experience.work')}</h3>
            </div>

            <div className="space-y-10 group/timeline">
              {workExperience.map((job, index) => (
                <ExperienceCard key={index} item={job} index={index} t={t} type="work" />
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-16 lg:pt-32">
            <div className="flex items-center gap-8 mb-12 relative z-10">
              <div className="w-20 h-20 rounded-[2rem] bg-muted border border-primary/10 flex items-center justify-center text-primary -rotate-3 shadow-2xl">
                <GraduationCap className="h-10 w-10" />
              </div>
              <h3 className="text-5xl font-black italic tracking-tight uppercase leading-none">{t('experience.education')}</h3>
            </div>

            <div className="space-y-10">
              {education.map((edu, index) => (
                <ExperienceCard key={index} item={edu} index={index} t={t} type="edu" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
