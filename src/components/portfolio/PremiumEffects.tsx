import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';

const FloatingCode = () => {
    const snippets = [
        '{ code: "best" }',
        'const dev = "NI"',
        '<Portfolio />',
        'npm install magic',
        'await success()',
        'export default Art'
    ];

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03] z-[-5] hidden lg:block">
            {snippets.map((text, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        rotate: Math.random() * 360
                    }}
                    animate={{
                        y: ["-10%", "110%"],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: 30 + Math.random() * 50,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute text-primary text-xl font-mono whitespace-nowrap"
                >
                    {text}
                </motion.div>
            ))}
        </div>
    );
};

interface Particle {
    id: number;
    x: number;
    y: number;
}

export default function PremiumEffects() {
    const [cursorVariant, setCursorVariant] = useState('default');
    const [particles, setParticles] = useState<Particle[]>([]);
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const trailX = useSpring(0, { stiffness: 400, damping: 40 });
    const trailY = useSpring(0, { stiffness: 400, damping: 40 });

    const createParticle = useCallback((x: number, y: number) => {
        const id = Date.now();
        setParticles((prev) => [...prev.slice(-15), { id, x, y }]);
        setTimeout(() => {
            setParticles((prev) => prev.filter((p) => p.id !== id));
        }, 800);
    }, []);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            trailX.set(e.clientX);
            trailY.set(e.clientY);

            if (Math.random() > 0.7) {
                createParticle(e.clientX, e.clientY);
            }
        };

        window.addEventListener('mousemove', mouseMove);
        return () => window.removeEventListener('mousemove', mouseMove);
    }, [cursorX, cursorY, trailX, trailY, createParticle]);

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('cursor-pointer')
            ) {
                setCursorVariant('hover');
            } else {
                setCursorVariant('default');
            }
        };

        window.addEventListener('mouseover', handleMouseOver);
        return () => window.removeEventListener('mouseover', handleMouseOver);
    }, []);

    return (
        <>
            <FloatingCode />

            {/* Particle Trail */}
            <div className="fixed inset-0 pointer-events-none z-[9998] hidden lg:block">
                <AnimatePresence>
                    {particles.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0.8, scale: 1 }}
                            animate={{ opacity: 0, scale: 0, y: p.y - 40 }}
                            exit={{ opacity: 0 }}
                            className="absolute w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_hsl(var(--primary))]"
                            style={{ left: p.x, top: p.y }}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Ambient Background Lights */}
            <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[180px]"
                />
                <motion.div
                    animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px]"
                />
            </div>

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-[70] origin-left"
                style={{ scaleX }}
            />

            {/* Main Cursor Dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[10000] hidden lg:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: cursorVariant === 'hover' ? 3 : 1,
                    mixBlendMode: 'difference'
                }}
            />

            {/* Premium Cursor Ring (Trail) */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-primary/30 pointer-events-none z-[9999] hidden lg:block backdrop-blur-[2px]"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: cursorVariant === 'hover' ? 1.4 : 1,
                }}
            >
                {cursorVariant === 'hover' && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.5 }}
                        className="absolute inset-0 border border-primary rounded-full"
                    />
                )}
            </motion.div>

            {/* Custom Mouse Light - Enhanced */}
            <motion.div
                className="fixed top-0 left-0 w-[500px] h-[500px] bg-primary/[0.07] rounded-full blur-[120px] pointer-events-none -z-10 hidden lg:block"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </>
    );
}
