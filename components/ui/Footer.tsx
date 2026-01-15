'use client';

import React from 'react';

export const Footer = () => {
    return (
        <footer className="Footer fixed bottom-0 left-0 w-full max-w-[400px] p-[24px_16px] flex flex-col gap-4 pointer-events-none z-[60]">
            <div className="pointer-events-auto flex items-center gap-4 text-[12px] text-text-muted opacity-60 font-medium tracking-tight">
                <a href="#" className="hover:text-text-primary transition-all duration-200">Twitter</a>
                <a href="#" className="hover:text-text-primary transition-all duration-200">Terms</a>
                <a href="#" className="hover:text-text-primary transition-all duration-200">Privacy</a>
            </div>
        </footer>
    );
};
