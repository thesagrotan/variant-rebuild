'use client';

import React, { useEffect, useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useScrollContext } from '@/components/context/ScrollContext';
import { useStyles } from '@/components/context/StylesContext';
import { Frame } from './Frame';
import { FrameConfig } from '@/lib/frames'; // Import Type, remove constant import
import { FrameContent } from './FrameContent';

interface CanvasProps {
    frames: FrameConfig[];
}

export const Canvas = ({ frames = [] }: CanvasProps) => {
    const [isClient, setIsClient] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 1440, height: 900 });

    useEffect(() => {
        setIsClient(true);
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { scrollY } = useScrollContext();
    const { showGuides } = useStyles();
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);

    if (!isClient) return <div className="Canvas fixed inset-0 z-0" />;

    // Calculate scale factor
    const scale = Math.max(0.4, Math.min(1.1, windowSize.width / 1440));

    // Scale for position calculation
    const posScale = Math.max(0.4, Math.min(1.2, windowSize.width / 1440));

    const getPos = (relX: number, relY: number, w: number, h: number) => {
        // relX and relY are relative to viewport center on a 1440 basis
        const currentCenterX = windowSize.width / 2;
        const currentCenterY = windowSize.height / 2;

        return {
            x: currentCenterX + (relX * posScale) - (w * scale / 2),
            y: currentCenterY + (relY * posScale) - (h * scale / 2)
        };
    };

    return (
        <div className="Canvas fixed inset-0 z-0 overflow-hidden select-none">
            {/* Grid background */}
            <div
                className="Canvas-grid absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'url(/assets/grid.png)',
                    backgroundSize: showGuides ? 'calc(100% / 12) calc(100% / 12)' : '128px 128px'
                }}
            />

            {/* Blur/Grain Layer */}
            <div className="Canvas-overlay absolute inset-0 bg-[var(--text-primary)]/5 backdrop-blur-[0.5px] pointer-events-none" />

            <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none">
                {frames.map((frame) => {
                    const { x, y } = getPos(frame.initialX.relX, frame.initialX.relY, frame.initialX.w, frame.initialX.h);

                    return (
                        <Frame
                            key={frame.id}
                            tag={frame.tag}
                            initialX={x}
                            initialY={y}
                            relX={frame.initialX.relX}
                            relY={frame.initialX.relY}
                            width={frame.width}
                            height={frame.height}
                            rotation={frame.rotation}
                            scale={scale}
                        >
                            <FrameContent type={frame.type} src={frame.src} />
                        </Frame>
                    );
                })}
            </motion.div>
        </div>
    );
};
