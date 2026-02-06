import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

const FloatingArt = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.05] z-[-5]">
            {/* Abstract Lines */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={`line-${i}`}
                    initial={{ x: "-10%", y: Math.random() * 100 + "%", rotate: Math.random() * 20 - 10 }}
                    animate={{ x: "110%" }}
                    transition={{ duration: 60 + Math.random() * 40, repeat: Infinity, ease: "linear", delay: i * 5 }}
                    className="absolute h-[1px] w-[50%] bg-gradient-to-r from-transparent via-primary to-transparent"
                />
            ))}

            {/* Floating Orbs */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={`orb-${i}`}
                    initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
                    animate={{
                        x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                        y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                    }}
                    transition={{ duration: 40 + Math.random() * 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-[30vw] h-[30vw] rounded-full bg-primary/20 blur-[150px]"
                />
            ))}
        </div>
    );
};

const FloatingCode = () => {
    const snippets = [
        '{ artist: "NI" }',
        'const soul = "0x1"',
        '<Artistry />',
        'await creation()',
        'export default Masterpiece'
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
                    className="absolute text-primary text-2xl font-mono whitespace-nowrap italic"
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
    const { theme } = useTheme();

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

    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Cursor color configuration based on user request
    const cursorColor = theme === 'light' ? '#B8860B' : '#FFD700'; // Dark Goldenrod for Light Mode, Gold for Dark Mode

    return (
        <>
            <FloatingArt />
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
                            className="absolute w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(184,134,11,0.5)]"
                            style={{
                                left: p.x,
                                top: p.y,
                                backgroundColor: cursorColor,
                                boxShadow: `0 0 10px ${cursorColor}`
                            }}
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
                className="fixed top-0 left-0 right-0 h-1 z-[70] origin-left"
                style={{
                    scaleX,
                    backgroundColor: cursorColor
                }}
            />

            {/* Main Cursor Dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[10000] hidden lg:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isClicked ? 1.5 : (cursorVariant === 'hover' ? 3 : 1),
                    backgroundColor: cursorColor,
                    mixBlendMode: 'difference'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />

            {/* Premium Cursor Ring (Trail) */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 pointer-events-none z-[9999] hidden lg:block backdrop-blur-[2px]"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: cursorVariant === 'hover' ? 1.4 : 1,
                    borderColor: cursorColor,
                    opacity: 0.5
                }}
            >
                <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                    <motion.circle
                        cx="20"
                        cy="20"
                        r="18"
                        stroke={cursorColor}
                        strokeWidth="2"
                        fill="transparent"
                        style={{ pathLength: scrollYProgress }}
                        className="opacity-40"
                    />
                </svg>
                {cursorVariant === 'hover' && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.5 }}
                        className="absolute inset-0 border rounded-full"
                        style={{ borderColor: cursorColor }}
                    />
                )}
            </motion.div>

            {/* Custom Mouse Light - Enhanced */}
            <motion.div
                className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none -z-10 hidden lg:block"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: '-50%',
                    translateY: '-50%',
                    backgroundColor: `${cursorColor}11` // Adding low alpha for ambient light
                }}
            />
        </>
    );
}
