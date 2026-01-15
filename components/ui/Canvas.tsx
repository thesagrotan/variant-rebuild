'use client';

import React, { useEffect, useState } from 'react';
import { Frame } from './Frame';
import { RamsClock } from './RamsClock';
import { RadarChart } from './RadarChart';
import { MediaPlayer } from './MediaPlayer';
import { PoeticWeather } from './PoeticWeather';
import { VariantManifesto } from './VariantManifesto';
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
    switch (componentType) {
        case 'VariantLogo':
            return (
                <div className="w-full h-full bg-black flex items-center justify-center p-8">
                    <img src="/assets/designs.svg" alt="Variant Logo" className="w-full h-auto opacity-90 transition-opacity hover:opacity-100" />
                </div>
            );
        case 'ProductivityApp':
            return (
                <img src="/assets/make.svg" alt="Productivity App" className="w-full h-full object-cover p-2 opacity-80" />
            );
        case 'RamsClock':
            return <RamsClock />;
        case 'RadarChart':
            return <RadarChart />;
        case 'PoeticWeather':
            return <PoeticWeather />;
        case 'MediaPlayer':
            return <MediaPlayer />;
        case 'PredictionMarket':
            return (
                <div className="w-full h-full bg-[#0D0D0D] p-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-white/30 uppercase tracking-widest">P/E Ratio</span>
                        <span className="text-[32px] font-light text-white/90">29</span>
                    </div>
                    <div className="flex-1 rounded-[8px] bg-white/5 border border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent" />
                    </div>
                </div>
            );
        case 'NavBar':
            return (
                <div className="w-full h-full bg-[#0F0F0F] flex items-center justify-between px-4">
                    <div className="flex gap-4 items-center">
                        <div className="w-8 h-8 rounded-[8px] bg-white/10 flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5" />
                </div>
            );
        case 'StoriesWidget':
            return (
                <div className="w-full h-full bg-[#111] p-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 to-rose-500 p-[1px]">
                            <div className="w-full h-full rounded-full bg-black" />
                        </div>
                        <span className="text-[11px] font-medium text-white/80">Martina</span>
                    </div>
                </div>
            );
        case 'ScribblePad':
            return (
                <div className="w-full h-full bg-[#111] p-4 flex flex-col items-center justify-center">
                    <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="#FF5722" strokeWidth="2">
                        <path d="M20 50 Q35 20, 50 50 T80 50" opacity="0.6" />
                    </svg>
                </div>
            );
        case 'VariantManifesto':
            return <VariantManifesto />;
        default:
            return null;
    }
};
