import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Car, TrendingUp, CheckSquare, Heart, Building } from 'lucide-react';
import Magnetic from './Magnetic';

const projects = [
  {
    title: 'AzeTrader',
    description: 'A comprehensive trading platform for Azerbaijan market. Features include real-time data, portfolio management, and trading analytics.',
    icon: TrendingUp,
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Trading API'],
    liveUrl: 'https://aze-trader.vercel.app',
    githubUrl: 'https://github.com/nurullaibadov/AzeTrader',
  },
  {
    title: 'CityCars.az',
    description: 'A comprehensive car marketplace platform for Azerbaijan. Features include car listings, advanced search filters, dealer management, and responsive design.',
    icon: Car,
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    liveUrl: 'https://city-cars-az.vercel.app',
    githubUrl: 'https://github.com/nurullaibadov/CityCars.az',
  },
  {
    title: 'CityCars Backend',
    description: 'Robust backend API for the CityCars platform with authentication, car listings management, and admin dashboard.',
    icon: Car,
    technologies: ['ASP.NET', 'C#', 'SQL Server', 'REST API'],
    liveUrl: 'http://citycarssrent-001-site1.rtempurl.com/index.html',
    githubUrl: 'https://github.com/nurullaibadov/RentCityCars',
  },
  {
    title: 'BINA24',
    description: 'Real estate platform with property listings, search functionality, and user-friendly interface for buying, selling, and renting properties in Azerbaijan.',
    icon: Building,
    technologies: ['ASP.NET', 'C#', 'SQL Server', 'JavaScript', 'Bootstrap'],
    liveUrl: 'http://realestateapiii-001-site1.mtempurl.com/index.html',
    githubUrl: 'https://github.com/nurullaibadov/BINA24',
  },
  {
    title: 'TaskMasterToDo',
    description: 'A modern task management application with drag-and-drop functionality, categories, and progress tracking.',
    icon: CheckSquare,
    technologies: ['React', 'JavaScript', 'CSS3', 'LocalStorage'],
    liveUrl: 'https://task-master-to-do.vercel.app',
    githubUrl: 'https://github.com/nurullaibadov/TaskMasterToDo',
  },
  {
    title: 'DatingApp (Mobile)',
    description: 'A mobile dating application with user matching, chat functionality, and profile management built for cross-platform deployment.',
    icon: Heart,
    technologies: ['React Native', 'TypeScript', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/nurullaibadov/DatingApp',
  },
];

const ProjectCard = ({ project, index, t }: { project: any, index: number, t: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["15deg", "-15deg"]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-15deg", "15deg"]));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="h-full perspective-2000 group"
    >
      <Card className="glass-card h-full flex flex-col border-primary/10 group-hover:border-primary/40 transition-all duration-700 rounded-[3rem] shadow-2xl relative overflow-hidden bg-gradient-to-br from-background/80 via-background/40 to-primary/5">
        <div className="absolute -top-10 -right-5 text-[15rem] font-black text-primary/5 select-none pointer-events-none italic tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(var(--primary-rgb),0.15),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardContent className="p-10 flex-1 relative z-10" style={{ transform: "translateZ(100px)" }}>
          <div className="flex items-start justify-between mb-10">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-[inset_0_0_20px_rgba(var(--primary-rgb),0.2)]">
              <project.icon className="h-10 w-10" />
            </div>
            <div className="flex gap-2">
              {project.liveUrl && (
                <Magnetic>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-primary/5 hover:bg-primary hover:text-white transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </Magnetic>
              )}
              <Magnetic>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-primary/5 hover:bg-primary hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </Magnetic>
            </div>
          </div>

          <h3 className="text-3xl font-black mb-4 tracking-tighter italic uppercase group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="text-muted-foreground mb-8 text-lg leading-relaxed font-medium">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/10">
            {project.technologies.map((tech: string, i: number) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
              >
                <Badge
                  variant="outline"
                  className="bg-primary/5 border-primary/20 hover:bg-primary hover:text-white transition-all rounded-lg px-3 py-1 text-xs font-black font-mono tracking-widest uppercase"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-10 pt-0 relative z-10" style={{ transform: "translateZ(50px)" }}>
          <Button asChild className="w-full h-16 rounded-[2rem] font-black text-lg gap-3 glow group/btn shadow-xl shadow-primary/20 relative overflow-hidden">
            <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer">
              <span className="relative z-10 flex items-center gap-3 italic text-primary-foreground">
                {project.liveUrl ? t('projects.viewProject') : t('projects.viewCode')}
                <TrendingUp className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-24 lg:py-48 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.01),transparent_70%)] -z-10" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section Header - Exhibition Catalogue Style */}
        <div className="flex flex-col items-start mb-40 text-left border-l-2 border-primary/20 pl-12">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-black tracking-[0.8em] uppercase text-primary mb-4"
          >
            Visual Gallery: 04
          </motion.div>
          <h2 className="text-8xl sm:text-9xl lg:text-[12rem] font-black tracking-tighter uppercase italic leading-[0.7] text-foreground">
            Featured <br /><span className="text-primary/20">Artworks</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-12 text-xl font-medium text-muted-foreground max-w-xl italic leading-relaxed"
          >
            A curated selection of digital masterpieces, each representing a unique solution to complex architectural challenges.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} t={t} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative py-20 rounded-[4rem] border border-primary/10 bg-muted/20 flex flex-col items-center justify-center text-center overflow-hidden group shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <h3 className="text-4xl sm:text-5xl font-black mb-10 tracking-tighter italic uppercase">Craving More <span className="text-primary underline decoration-primary/20">Code Art</span>?</h3>
          <Magnetic>
            <Button asChild size="lg" className="h-24 px-16 text-2xl font-black rounded-[2.5rem] glow hover:scale-110 transition-all gap-6 shadow-2xl relative overflow-hidden group/m">
              <a href="https://github.com/nurullaibadov" target="_blank" rel="noopener noreferrer">
                <Github className="h-8 w-8 group-hover/m:rotate-12 transition-transform" />
                {t('projects.viewMore')}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/m:translate-x-[100%] transition-transform duration-1000" />
              </a>
            </Button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
