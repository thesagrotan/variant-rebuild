'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { deepMerge } from '@/lib/utils';

// Define the shape of your styles.json
// For now we'll use a flexible type, but you could define the exact interface
type StylesData = any;

interface StylesContextType {
    styles: StylesData;
    theme: 'dark' | 'light';
    updateStyles: (newStyles: StylesData) => void;
    patchStyles: (partialStyles: StylesData) => void;
    toggleTheme: () => void;
    setTheme: (theme: 'dark' | 'light') => void;
    showGuides: boolean;
}

const StylesContext = createContext<StylesContextType | undefined>(undefined);

export const StylesProvider = ({
    children,
    initialStyles
}: {
    children: React.ReactNode;
    initialStyles: StylesData;
}) => {
    const [styles, setStyles] = useState<StylesData>(initialStyles);
    const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            return (saved === 'light' || saved === 'dark') ? saved : 'dark';
        }
        return 'dark';
    });

    const setTheme = useCallback((newTheme: 'dark' | 'light') => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }, [theme, setTheme]);

    const resetStyles = useCallback(() => {
        setStyles(initialStyles);
    }, [initialStyles]);

    const patchStyles = useCallback((partialStyles: StylesData) => {
        setStyles((prevStyles: StylesData) => deepMerge(prevStyles, partialStyles));
    }, []);

    const contextValue = useMemo(() => ({
        styles,
        theme,
        updateStyles: setStyles,
        patchStyles,
        resetStyles,
        toggleTheme,
        setTheme,
        showGuides: styles?.globals?.showGuides || false
    }), [styles, theme, patchStyles, resetStyles, toggleTheme, setTheme]);

    return (
        <StylesContext.Provider value={contextValue}>
            {children}
        </StylesContext.Provider>
    );
};


export const useStyles = () => {
    const context = useContext(StylesContext);
    if (context === undefined) {
        throw new Error('useStyles must be used within a StylesProvider');
    }
    return context;
};
