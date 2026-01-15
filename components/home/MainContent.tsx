'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useStyles } from '@/components/context/StylesContext';
import { useScrollContext } from '@/components/context/ScrollContext';
import { HomeContent } from './HomeContent';
import { ChatWidget } from './ChatWidget';

interface MainContentProps {
    onProjectClick?: (projectId: string) => void;
}

export const MainContent = ({ onProjectClick }: MainContentProps) => {
    const { styles } = useStyles();
    const { scrollY } = useScrollContext();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (scrollRef.current && !scrollRef.current.contains(e.target as Node)) {
                scrollRef.current.scrollTop += e.deltaY;
            }
        };

        window.addEventListener('wheel', handleWheel);
        return () => window.removeEventListener('wheel', handleWheel);
    }, []);

    const handleScroll = () => {
        if (scrollRef.current) {
            scrollY.set(scrollRef.current.scrollTop);
        }
    };

    return (
        <div className={cn("Chat", styles.containers.chat.wrapper)}>
            <style dangerouslySetInnerHTML={{
                __html: `
                .MainContent-scrollArea::-webkit-scrollbar {
                    display: none !important;
                }
                .MainContent-scrollArea {
                    -ms-overflow-style: none !important;
                    scrollbar-width: none !important;
                }
            `}} />
            {/* Scrollable Content Area */}
            <div ref={scrollRef} onScroll={handleScroll} className="MainContent-scrollArea h-screen flex flex-col gap-4 pt-[80vh] justify-start overflow-scroll scrollbar-hide mx-auto pb-32 w-full">
                <HomeContent onProjectClick={onProjectClick} />
            </div>

            {/* Input Area */}
            <ChatWidget />
        </div>
    );
};
