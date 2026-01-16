'use client';

import React from 'react';
import Image from 'next/image';
import { useStyles } from '@/components/context/StylesContext';
import { AnimatePresence, motion } from 'framer-motion';

export const Guides = () => {
    const { showGuides } = useStyles();

    return (
        <AnimatePresence>
            {showGuides && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] pointer-events-none"
                >
                    <Image
                        src="/guides.svg"
                        alt="Viewport Guides"
                        fill
                        className="object-fill opacity-50"
                        priority
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
