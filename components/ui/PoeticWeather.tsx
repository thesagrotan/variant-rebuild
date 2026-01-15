'use client';

import React from 'react';

export const PoeticWeather = () => {
    return (
        <div className="PoeticWeather w-full h-full p-6 flex flex-col justify-center bg-transparent">
            <div className="flex items-center gap-2 mb-2 text-white/40">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="9" r="3" /></svg>
                <span className="text-[10px] uppercase tracking-widest font-medium">San Francisco</span>
            </div>
            <h2 className="text-[28px] font-light leading-none text-white/90 mb-4 italic font-serif">52° and rainy gra...</h2>
            <p className="text-[14px] leading-relaxed text-white/60 font-serif italic">
                Sun's return three hours away.
            </p>
        </div>
    );
};
