'use client';

import React, { useEffect, useState } from 'react';

export const RamsClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6 + seconds * 0.1;
    const hourDeg = (hours % 12) * 30 + minutes * 0.5;

    return (
        <div className="RamsClock w-full h-full flex items-center justify-center bg-transparent overflow-hidden" style={{ transform: 'rotate(180deg)' }}>
            <div className="clock-container relative w-32 h-32">
                {/* Outer Ring */}
                <div className="notch-ring absolute inset-0 rounded-full border border-white/15 bg-black">
                    {/* Notches */}
                    {[...Array(60)].map((_, i) => {
                        const isHour = i % 5 === 0;
                        return (
                            <div
                                key={i}
                                className={`absolute top-1/2 left-1/2 w-[1px] ${isHour ? 'h-3 w-[1.5px] bg-white/80' : 'h-2 bg-white/60'
                                    }`}
                                style={{
                                    transformOrigin: '50% 0',
                                    transform: `rotate(${i * 6}deg) translateY(-60px) translateX(-50%)`,
                                }}
                            />
                        );
                    })}
                </div>

                {/* Hands */}
                {/* Hour Hand */}
                <div
                    className="absolute top-1/2 left-1/2 w-[2px] h-[30px] bg-white rounded-full origin-top -translate-x-1/2"
                    style={{
                        transform: `rotate(${hourDeg}deg)`,
                    }}
                />

                {/* Minute Hand */}
                <div
                    className="absolute top-1/2 left-1/2 w-[1.5px] h-[45px] bg-white rounded-full origin-top -translate-x-1/2"
                    style={{
                        transform: `rotate(${minuteDeg}deg)`,
                    }}
                />

                {/* Second Hand */}
                <div
                    className="absolute top-1/2 left-1/2 w-[1px] h-[45px] bg-[#ffe000] rounded-full origin-top -translate-x-1/2"
                    style={{
                        transform: `rotate(${secondDeg}deg)`,
                    }}
                />

                {/* Center Dot */}
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#ffe000] rounded-full -translate-x-1/2 -translate-y-1/2 z-10" />
            </div>
        </div>
    );
};
