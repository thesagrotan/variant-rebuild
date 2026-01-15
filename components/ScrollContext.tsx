'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useMotionValue, MotionValue } from 'framer-motion';

interface ScrollContextType {
    scrollY: MotionValue<number>;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
    const scrollY = useMotionValue(0);

    return (
        <ScrollContext.Provider value={{ scrollY }}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScrollContext = () => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error('useScrollContext must be used within a ScrollProvider');
    }
    return context;
};
