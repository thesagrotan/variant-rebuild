'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useStyles } from '@/components/StylesContext';

interface FrameProps {
    tag?: string;
    children?: React.ReactNode;
    initialX?: number;
    initialY?: number;
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
    rotation = 0,
    className,
    width,
    height,
    scale = 1
}: FrameProps) => {
    const { styles } = useStyles();

    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={{
                x: initialX,
                y: initialY,
                rotate: rotation,
                opacity: 0,
                scale: 0.95,
                filter: 'blur(16px)'
            }}
            animate={{
                x: initialX,
                y: initialY,
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
            style={{ left: 0, top: 0, zIndex: 0 }}
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
    );
};
