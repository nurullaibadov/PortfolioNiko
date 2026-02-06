import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function MuseumOverlay() {
    const { i18n } = useTranslation();

    return (
        <>
            {/* Museum Exhibition Frame */}
            <div className="museum-frame" />

            {/* Editorial HUD */}
            <div className="fixed inset-0 z-[1001] pointer-events-none p-10 hidden lg:flex flex-col justify-between uppercase font-black text-[10px] tracking-[0.4em] text-muted-foreground/40 italic">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <div>Exhibition No. 2026-NI</div>
                        <div>Subject: Creative Engineering</div>
                    </div>
                    <div className="text-right space-y-2">
                        <div>Curator: System AI</div>
                        <div>Status: Live Application</div>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <div className="text-primary opacity-60">Dimensions: Virtual Reality</div>
                        <div>Loc: 40.4093° N, 49.8671° E</div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <div className="flex gap-4 mb-2">
                            <span>EN</span>
                            <span>AZ</span>
                            <span>RU</span>
                        </div>
                        <div>© 2026 Nurulla Ibadov. All rights reserved.</div>
                    </div>
                </div>
            </div>

            {/* Coordinate Trackers (Corners) */}
            <motion.div
                className="fixed top-20 left-10 z-[1001] text-[8px] font-mono opacity-20 hidden xl:block"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                LAT: 40.4093 N <br />
                LON: 49.8671 E
            </motion.div>

            <motion.div
                className="fixed bottom-20 right-10 z-[1001] text-[8px] font-mono opacity-20 hidden xl:block"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            >
                V: 8.4.2 <br />
                CORE: 0x92f
            </motion.div>
        </>
    );
}
