import { useScrollContext } from '@/components/ScrollContext';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useStyles } from '@/components/StylesContext';

interface FrameProps {
    tag?: string;
    children?: React.ReactNode;
    initialX?: number;
    initialY?: number;
    relX?: number;
    relY?: number;
    rotation?: number;
    className?: string;
    width?: number;
    height?: number;
    scale?: number;
}

export const Frame = ({
    tag,
    children,
    initialX = 0,
    initialY = 0,
    relX = 0,
    relY = 0,
    rotation = 0,
    className,
    width,
    height,
    scale = 1
}: FrameProps) => {
    const { styles } = useStyles();
    const { scrollY } = useScrollContext();

    // Create motion values for the base position so they can be updated by drag
    // AND by prop changes (resize)
    const baseX = useMotionValue(initialX);
    const baseY = useMotionValue(initialY);

    // Update base position when props change (e.g. window resize)
    useEffect(() => {
        baseX.set(initialX);
        baseY.set(initialY);
    }, [initialX, initialY, baseX, baseY]);

    // Map scroll position to RELATIVE displacement (offset), not absolute position
    // As scroll increases, push frames out based on their relative position from the center
    // Map scroll position to RELATIVE displacement (offset), not absolute position
    // As scroll increases, push frames out based on their relative position from the bottom-left corner
    // We calculate this dynamically based on baseX/baseY so that if the user drags the element,
    // the "explosion" origin updates to match its new position relative to the corner.
    const xOffset = useTransform([baseX, scrollY], ([latestX, latestScroll]) => {
        if (typeof window === 'undefined') return 0;
        // Origin is bottom left (approx where chat is). Let's say 24px from left.
        const originX = 24;

        // Using provided width and scale to find visual center. 
        // Fallback to 0 if width not provided, though it typically is for frames on canvas.
        const elementCenter = (latestX as number) + ((width || 0) * scale / 2);
        const dist = elementCenter - originX;
        const progress = Math.min(Math.max((latestScroll as number) / 800, 0), 1);
        return dist * 0.8 * progress; // Reduced multiplier slightly as distances are larger now
    });

    const yOffset = useTransform([baseY, scrollY], ([latestY, latestScroll]) => {
        if (typeof window === 'undefined') return 0;
        // Origin is bottom (approx where chat is). Let's say window height - 32px.
        const originY = window.innerHeight - 32;

        const elementCenter = (latestY as number) + ((height || 0) * scale / 2);
        const dist = elementCenter - originY;
        const progress = Math.min(Math.max((latestScroll as number) / 800, 0), 1);
        return dist * 0.8 * progress;
    });

    return (
        <motion.div
            className="absolute top-0 left-0 pointer-events-none will-change-transform"
            style={{ x: xOffset, y: yOffset, zIndex: 0 }}
        >
            <motion.div
                drag
                dragMomentum={false}
                initial={{
                    rotate: rotation,
                    opacity: 0,
                    scale: 0.95,
                    filter: 'blur(16px)'
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: rotation,
                    filter: 'blur(0px)'
                }}
                transition={{
                    duration: 0.8,
                    ease: [0.19, 1, 0.22, 1]
                }}
                className={cn("Frame absolute pointer-events-auto select-none", className)}
                style={{ x: baseX, y: baseY }}
            >
                <div className="Frame-animationWrapper flex flex-col gap-[6px]">
                    {tag && (
                        <div className={cn("Frame-tag", styles.containers.frame.tag)}>
                            <span className="text-[12px] font-medium tracking-tight h-full flex items-center">{tag}</span>
                        </div>
                    )}
                    <div
                        className={cn("Frame-body", styles.containers.frame.body)}
                        style={{
                            width,
                            height,
                            transform: `scale(${scale})`,
                            transformOrigin: 'top left'
                        }}
                    >
                        {/* Corner Decorations */}
                        <div className="absolute top-2 left-2 flex gap-[3px] items-center pointer-events-none opacity-40 z-20">
                            <div className="w-[3px] h-[3px] rounded-full bg-white" />
                            <div className="w-[3px] h-[3px] rounded-full bg-white/40" />
                        </div>
                        <div className="absolute top-2 right-2 pointer-events-none opacity-20 z-20">
                            <div className="w-[3px] h-[3px] rounded-full bg-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 pointer-events-none opacity-20 z-20">
                            <div className="w-[3px] h-[3px] rounded-full bg-white" />
                        </div>
                        <div className="absolute bottom-2 right-2 pointer-events-none opacity-20 z-20">
                            <div className="w-[3px] h-[3px] rounded-full bg-white" />
                        </div>

                        {children}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
