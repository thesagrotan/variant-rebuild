'use client';

import React from 'react';

export const MediaPlayer = () => {
    return (
        <div className="MediaPlayer w-full h-full bg-[#111] p-4 flex flex-col justify-between border-t border-white/5">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[8px] bg-gradient-to-br from-orange-500/20 to-rose-500/20 border border-white/10 flex items-center justify-center">
                    <div className="w-4 h-4 text-orange-500">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-[14px] font-medium text-white/90">Let's Explore, Variant</span>
                    <span className="text-[11px] text-white/40">Artist Name • 2:10 / 5:32</span>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[40%] bg-orange-500/60" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" /></svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/80"><path d="M8 5v14l11-7z" /></svg>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40"><path d="M13 17l5-5-5-5M6 17l5-5-5-5" /></svg>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
                </div>
            </div>
        </div>
    );
};
