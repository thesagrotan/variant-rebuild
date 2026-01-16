'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useStyles } from '@/components/context/StylesContext';
import { useScrollContext } from '@/components/context/ScrollContext';
import { HomeContent } from './HomeContent';
import { ChatWidget } from './ChatWidget';

import { Project } from '@/data/projects';
import { SiteContent } from '@/data/siteContent';

interface MainContentProps {
    onProjectClick?: (projectId: string) => void;
    projects: Project[];
    siteContent: SiteContent;
}

export const MainContent = ({ onProjectClick, projects, siteContent }: MainContentProps) => {
    const { styles } = useStyles();
    const { scrollY } = useScrollContext();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [chatActive, setChatActive] = useState(false);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (scrollRef.current && !scrollRef.current.contains(e.target as Node) && !chatActive) {
                scrollRef.current.scrollTop += e.deltaY;
            }
        };

        window.addEventListener('wheel', handleWheel);
        return () => window.removeEventListener('wheel', handleWheel);
    }, [chatActive]);

    const handleScroll = () => {
        if (scrollRef.current) {
            scrollY.set(scrollRef.current.scrollTop);
        }
    };

    const handleActiveChange = useCallback((active: boolean) => {
        setChatActive(active);
    }, []);

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

            {/* Content fades when chat is active */}
            <motion.div
                ref={scrollRef}
                onScroll={handleScroll}
                animate={{ opacity: chatActive ? 0 : 1, y: chatActive ? -20 : 0 }}
                transition={{ duration: 0.3 }}
                className="MainContent-scrollArea h-screen flex flex-col gap-4 pt-[75vh] justify-start overflow-scroll scrollbar-hide mx-auto pb-32 w-full"
                style={{ pointerEvents: chatActive ? 'none' : 'auto' }}
            >
                <HomeContent
                    onProjectClick={onProjectClick}
                    projects={projects}
                    siteContent={siteContent}
                />
            </motion.div>

            {/* Chat Input */}
            <ChatWidget onActiveChange={handleActiveChange} />
        </div>
    );
};
