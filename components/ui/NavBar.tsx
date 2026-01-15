'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useStyles } from '@/components/StylesContext';

const navItems = [
    {
        id: 'chat', icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        )
    },
    {
        id: 'work', icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
        )
    },
    {
        id: 'manifesto', icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
        )
    },
];

export const NavBar = () => {
    const { styles } = useStyles();
    const [activeTab, setActiveTab] = useState('chat');

    return (
        <div className={styles.containers.navBar.root}>
            <nav className={cn("NavBar", styles.containers.navBar.nav)}>
                {/* Sliding background */}
                <motion.div
                    className="absolute h-12 rounded-[12px] bg-white/10"
                    initial={false}
                    animate={{
                        x: navItems.findIndex(item => item.id === activeTab) * (64 + 4),
                        width: 64,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                    }}
                />

                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                            "relative w-16 h-12 flex items-center justify-center rounded-[12px] transition-all duration-200",
                            activeTab === item.id ? styles.containers.navBar.itemActive : styles.containers.navBar.itemInactive
                        )}
                    >
                        {item.icon}
                    </button>
                ))}

                <div className="w-[1px] h-6 bg-white/10 mx-1" />

                <button className="w-16 h-12 flex items-center justify-center group transition-all duration-200 hover:bg-white/5 rounded-[12px]">
                    <div className="NavBar-profileImage w-6 h-6 rounded-full border border-white/10 overflow-hidden group-hover:border-white/40 transition-all duration-200">
                        <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600" />
                    </div>
                </button>
            </nav>
        </div>
    );
};
