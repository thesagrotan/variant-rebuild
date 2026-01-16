'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface FadeInSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    fadeOnly?: boolean;
}

export const FadeInSection = ({ children, className = '', delay = 0, fadeOnly = false }: FadeInSectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const yOffset = fadeOnly ? 0 : 12;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: yOffset }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
