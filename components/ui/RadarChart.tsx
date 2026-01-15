'use client';

import React from 'react';

export const RadarChart = () => {
    return (
        <div className="RadarChart w-full h-full p-4 flex flex-col gap-4 bg-transparent">
            <div className="flex-1 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    {/* Background Circles */}
                    {[20, 40, 60, 80, 100].map((r) => (
                        <circle
                            key={r}
                            cx="50"
                            cy="50"
                            r={r / 2}
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="0.5"
                        />
                    ))}
                    {/* Axes */}
                    {[0, 60, 120, 180, 240, 300].map((angle) => (
                        <line
                            key={angle}
                            x1="50"
                            y1="50"
                            x2={50 + 50 * Math.cos((angle * Math.PI) / 180)}
                            y2={50 + 50 * Math.sin((angle * Math.PI) / 180)}
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="0.5"
                        />
                    ))}
                    {/* Data Shape */}
                    <path
                        d="M50 20 L80 40 L70 75 L30 75 L20 40 Z"
                        fill="rgba(255,87,34,0.2)"
                        stroke="#FF5722"
                        strokeWidth="1"
                    />
                </svg>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {[
                    { label: 'Speed', val: '87%' },
                    { label: 'Reliability', val: '92%' },
                    { label: 'Efficiency', val: '78%' },
                    { label: 'Adaptability', val: '63%' },
                ].map((item) => (
                    <div key={item.label} className="flex flex-col">
                        <span className="text-[8px] uppercase tracking-widest text-white/30">{item.label}</span>
                        <span className="text-[12px] font-medium text-white/80">{item.val}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
