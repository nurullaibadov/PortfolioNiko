import { motion, useScroll, useSpring } from 'framer-motion';

const sections = [
    { id: 'home', label: '01' },
    { id: 'about', label: '02' },
    { id: 'skills', label: '03' },
    { id: 'experience', label: '04' },
    { id: 'projects', label: '05' },
    { id: 'contact', label: '06' },
];

export default function SectionNavigator() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed right-10 top-1/2 -translate-y-1/2 z-[1001] hidden xl:flex flex-col items-center gap-8">
            <div className="h-40 w-[1px] bg-primary/10 relative overflow-hidden">
                <motion.div
                    style={{ scaleY }}
                    className="absolute top-0 left-0 right-0 h-full bg-primary origin-top"
                />
            </div>

            <div className="flex flex-col gap-6">
                {sections.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="group relative flex items-center justify-center h-8 w-8"
                    >
                        <span className="text-[10px] font-black text-muted-foreground/40 group-hover:text-primary transition-colors italic">
                            {section.label}
                        </span>
                        <div className="absolute -right-4 h-1 w-0 bg-primary group-hover:w-4 transition-all" />
                    </a>
                ))}
            </div>

            <div className="h-40 w-[1px] bg-primary/10" />
        </div>
    );
}
