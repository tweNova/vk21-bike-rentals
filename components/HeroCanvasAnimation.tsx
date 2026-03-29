import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, useMotionValue } from 'framer-motion';

export default function HeroCanvasAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    // Scroll progress tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Mouse tracking for parallax and spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set((clientX / innerWidth) - 0.5);
            mouseY.set((clientY / innerHeight) - 0.5);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Parallax transforms for Section 1
    const textX = useTransform(smoothMouseX, [-0.5, 0.5], [20, -20]);
    const textY = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]);
    const spotlightX = useTransform(smoothMouseX, [-0.5, 0.5], ['0%', '100%']);
    const spotlightY = useTransform(smoothMouseY, [-0.5, 0.5], ['0%', '100%']);

    // Frame preloading
    useEffect(() => {
        const startFrame = 3;
        const endFrame = 76;
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;
        const totalToLoad = endFrame - startFrame + 1;

        for (let i = startFrame; i <= endFrame; i++) {
            const img = new Image();
            const frameNum = i.toString().padStart(3, '0');
            img.src = `/frames/ezgif-frame-${frameNum}.jpg`;

            img.onload = () => {
                loadedImages[i - startFrame] = img;
                loadedCount++;
                if (loadedCount === totalToLoad) {
                    // Filter out any potential undefined spots if any failed
                    setImages(loadedImages.filter(Boolean));
                }
            };

            img.onerror = () => {
                console.error(`Failed to load frame ${frameNum}`);
                loadedCount++; // Increment anyway to finish the sequence
                if (loadedCount === totalToLoad) {
                    setImages(loadedImages.filter(Boolean));
                }
            };
        }
    }, []);

    // Canvas rendering
    useMotionValueEvent(smoothProgress, "change", (latest: number) => {
        if (images.length === 0 || !canvasRef.current) return;

        const context = canvasRef.current.getContext('2d');
        if (!context) return;

        const frameIndex = Math.max(0, Math.min(
            images.length - 1,
            Math.floor(latest * images.length)
        ));

        const img = images[frameIndex];
        if (!img) return;

        // Redraw on canvas
        const canvas = canvasRef.current;
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, img.width, img.height,
            centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
    });

    // Initial draw
    useEffect(() => {
        if (images.length > 0 && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                const img = images[0];
                if (!img) return;

                const canvas = canvasRef.current;
                if (!canvas) return;

                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);
                const centerShiftX = (canvas.width - img.width * ratio) / 2;
                const centerShiftY = (canvas.height - img.height * ratio) / 2;
                context.drawImage(img, 0, 0, img.width, img.height,
                    centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
            }
        }
    }, [images]);

    // Opacity effect for the whole canvas
    const opacity = useTransform(smoothProgress, [0, 0.9, 1], [1, 1, 0.4]);

    // Text animations
    const section1Opacity = useTransform(smoothProgress, [0, 0.15, 0.2], [1, 1, 0]);
    const section2Opacity = useTransform(smoothProgress, [0.3, 0.45, 0.5], [0, 1, 0]);
    const section3Opacity = useTransform(smoothProgress, [0.6, 0.75, 0.8], [0, 1, 0]);
    const section4Opacity = useTransform(smoothProgress, [0.9, 0.98, 1], [0, 1, 1]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-adventure-bg">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Adventure Hero Canvas Animation */}
                <motion.div
                    style={{ opacity }}
                    className="absolute inset-0 w-full h-full"
                >
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full object-cover"
                    />

                    {/* Spotlight Mask */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                            background: useTransform(
                                smoothProgress,
                                [0, 0.1],
                                [
                                    `radial-gradient(var(--spotlight-size, 600px) circle at var(--x) var(--y), transparent 0%, rgba(27, 38, 26, 0.95) 100%)`,
                                    `radial-gradient(1200px circle at 50% 50%, transparent 0%, rgba(27, 38, 26, 0) 100%)`
                                ]
                            ),
                            // @ts-ignore - CSS variables in Framer Motion
                            '--x': useTransform(smoothMouseX, [-0.5, 0.5], ['20%', '80%']),
                            // @ts-ignore - CSS variables in Framer Motion
                            '--y': useTransform(smoothMouseY, [-0.5, 0.5], ['20%', '80%']),
                        } as any}
                    />

                    {/* Topographic Overlay */}
                    <motion.div
                        style={{ opacity: useTransform(smoothProgress, [0, 0.1], [0.15, 0]) }}
                        className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
                    >
                        <svg className="w-full h-full text-adventure-accent/20" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 500 Q 250 400 500 500 T 1000 500" fill="none" stroke="currentColor" strokeWidth="1" />
                            <path d="M0 600 Q 250 500 500 600 T 1000 600" fill="none" stroke="currentColor" strokeWidth="1" />
                            <path d="M0 700 Q 250 600 500 700 T 1000 700" fill="none" stroke="currentColor" strokeWidth="1" />
                            <path d="M0 400 Q 250 300 500 400 T 1000 400" fill="none" stroke="currentColor" strokeWidth="1" />
                        </svg>
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-adventure-bg/10 to-adventure-bg z-30" />
                </motion.div>

                {/* Overlays */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center pt-20 z-40">
                    <motion.div
                        style={{
                            opacity: section1Opacity,
                            x: textX,
                            y: textY
                        }}
                        className="text-center px-4 max-w-5xl"
                    >
                        <motion.span
                            initial={{ opacity: 0, letterSpacing: '1.5em' }}
                            animate={{ opacity: 1, letterSpacing: '0.4em' }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="block text-adventure-accent font-black uppercase mb-4 md:mb-6 drop-shadow-2xl text-[10px] md:text-xs text-nowrap md:text-wrap"
                        >
                            Experience the <span className="text-[#FFD700]">GOA</span> Beaches on Magical Two Wheels
                        </motion.span>
                        <h1 className="text-3xl md:text-9xl font-playfair font-black text-adventure-mist mb-6 md:mb-8 tracking-tighter uppercase leading-[0.9] md:leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] px-2">
                            The Great <br />
                            <motion.span
                                style={{ x: useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]) }}
                                className="inline-block"
                            >
                                Trans <span className="text-[#FFD700]">GOA</span> Beaches
                            </motion.span>
                            <br />
                            <span className="text-adventure-accent">Expedition</span>
                        </h1>
                        <p className="text-base md:text-2xl text-adventure-mist font-inter font-medium italic max-w-3xl mx-auto drop-shadow-xl leading-relaxed opacity-80 px-4">
                            "One day you will wake up and there won't be any more time to do the things you've always wanted. <span className="text-adventure-accent font-bold">Do it now.</span>"
                        </p>
                    </motion.div>

                    <motion.div style={{ opacity: section2Opacity }} className="absolute inset-0 flex items-center justify-start px-6 md:px-24">
                        <div className="max-w-2xl bg-adventure-bg/60 md:bg-adventure-bg/40 backdrop-blur-md md:backdrop-blur-sm p-6 md:p-10 border-l-4 border-adventure-accent shadow-2xl">
                            <h2 className="text-4xl md:text-8xl font-playfair font-black text-adventure-mist mb-4 md:mb-6 leading-none drop-shadow-xl uppercase">
                                Pure <br /> Exploration
                            </h2>
                            <p className="text-sm md:text-2xl text-adventure-mist font-inter leading-relaxed drop-shadow-md">
                                From the dusty trails of Spiti to the high-altitude passes of Ladakh, ride the world's highest motorable roads. Higher than Everest Base Camp.
                            </p>
                            <div className="mt-8 flex items-center gap-4 text-adventure-accent font-bold uppercase tracking-widest text-sm">
                                <span className="drop-shadow-sm">Unmapped Routes</span>
                                <div className="w-12 h-[1px] bg-adventure-accent shadow-sm" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div style={{ opacity: section3Opacity }} className="absolute inset-0 flex items-center justify-end px-6 md:px-24">
                        <div className="max-w-2xl text-right bg-adventure-bg/60 md:bg-adventure-bg/40 backdrop-blur-md md:backdrop-blur-sm p-6 md:p-10 border-r-4 border-adventure-accent shadow-2xl">
                            <h2 className="text-4xl md:text-8xl font-playfair font-black text-adventure-mist mb-4 md:mb-6 leading-none drop-shadow-xl uppercase">
                                Rugged <br /> Reliability
                            </h2>
                            <p className="text-sm md:text-2xl text-adventure-mist font-inter leading-relaxed drop-shadow-md">
                                We keep the adventure raw and original. Experience the wilderness beyond expectation, beyond imagination. The ride of your life.
                            </p>
                            <div className="mt-8 flex items-center gap-4 justify-end text-adventure-accent font-bold uppercase tracking-widest text-sm">
                                <div className="w-12 h-[1px] bg-adventure-accent shadow-sm" />
                                <span className="drop-shadow-sm">24/7 Field Support</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div style={{ opacity: section4Opacity }} className="text-center px-4 max-w-4xl">
                        <h2 className="text-4xl md:text-8xl font-playfair font-black text-adventure-mist mb-8 md:mb-10 leading-tight drop-shadow-2xl uppercase">
                            Your Epic <br /> Starts Here
                        </h2>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: '#E9F0F4', color: '#1B261A', letterSpacing: '0.5em' }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 md:px-16 py-4 md:py-6 bg-adventure-accent text-adventure-bg rounded-none text-xl md:text-2xl font-black uppercase tracking-widest transition-all pointer-events-auto shadow-2xl"
                        >
                            Explore Fleet
                        </motion.button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-10 flex items-center gap-4 text-adventure-accent/60">
                    <div className="w-12 h-[2px] bg-adventure-accent/40" />
                    <p className="text-xs font-bold uppercase tracking-[0.3em]">Scroll into the Wild</p>
                </div>
            </div>
        </div>
    );
}
