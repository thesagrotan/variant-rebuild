'use client';

import React from 'react';

export const VariantManifesto = () => {
    return (
        <div className="VariantManifesto w-full h-full p-8 flex flex-col gap-6 bg-transparent text-left overflow-y-auto hidden-scrollbar">
            <p className="text-[14px] leading-relaxed text-white/80 font-medium">
                Creativity doesn't follow a straight line, so why should your ai tools?
            </p>
            <p className="text-[14px] leading-relaxed text-white/60">
                <span className="text-white font-medium italic">Variant</span> gives your ideas room to grow...
                to branch, remix, and become what they're meant to be.
            </p>
            <p className="text-[14px] leading-relaxed text-white/60">
                So you don't just build faster, you build something you're proud of.
            </p>

            <div className="pt-4 mt-auto border-t border-white/5 flex flex-col gap-3">
                <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border border-black bg-white/10 overflow-hidden backdrop-blur-md" />
                    ))}
                </div>
                <div className="flex flex-col">
                    <span className="text-[12px] font-medium text-white/80">Join the collective</span>
                    <span className="text-[11px] text-white/40">Early access available</span>
                </div>
            </div>
        </div>
    );
};
