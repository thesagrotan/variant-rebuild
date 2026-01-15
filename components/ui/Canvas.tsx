'use client';

import React, { useEffect, useState } from 'react';
import { Frame } from './Frame';
import { FRAMES } from '@/lib/frames';


export const Canvas = () => {
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
            {/* Background radial gradient - REMOVED, handled by Global Styles */}
            {/* <div className="absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(circle_at_50%_0%,rgba(255,87,34,0.12)_0,transparent_70%)] opacity-80 pointer-events-none" /> */}

            {/* Grid background */}
            <div
                className="Canvas-grid absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'url(/assets/grid.png)', backgroundSize: '128px 128px' }}
            />

            {/* Blur/Grain Layer */}
            <div className="Canvas-overlay absolute inset-0 bg-black/10 backdrop-blur-[0.5px] pointer-events-none" />

            {FRAMES.map((frame) => {
                const { x, y } = getPos(frame.initialX.relX, frame.initialX.relY, frame.initialX.w, frame.initialX.h);

                return (
                    <Frame
                        key={frame.id}
                        tag={frame.tag}
                        initialX={x}
                        initialY={y}
                        width={frame.width}
                        height={frame.height}
                        rotation={frame.rotation}
                        scale={scale}
                    >
                        {renderFrameContent(frame.component)}
                    </Frame>
                );
            })}
        </div>
    );
};

const renderFrameContent = (componentType: string) => {
    return (
        <div className="w-full h-full bg-black/20 relative overflow-hidden group">
            <img
                src="/assets/dummy-frame.png"
                alt="Dummy content"
                className="w-full h-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
    );
};
