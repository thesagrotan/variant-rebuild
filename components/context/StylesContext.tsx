'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { deepMerge } from '@/lib/utils';

// Define the shape of your styles.json
// For now we'll use a flexible type, but you could define the exact interface
type StylesData = any;

interface StylesContextType {
    styles: StylesData;
    updateStyles: (newStyles: StylesData) => void;
    patchStyles: (partialStyles: StylesData) => void;
    resetStyles: () => void;
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

    const resetStyles = useCallback(() => {
        setStyles(initialStyles);
    }, [initialStyles]);

    const patchStyles = useCallback((partialStyles: StylesData) => {
        setStyles((prevStyles: StylesData) => deepMerge(prevStyles, partialStyles));
    }, []);

    const contextValue = useMemo(() => ({
        styles,
        updateStyles: setStyles,
        patchStyles,
        resetStyles
    }), [styles, patchStyles, resetStyles]);

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
