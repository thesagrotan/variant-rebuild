'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of your styles.json
// For now we'll use a flexible type, but you could define the exact interface
type StylesData = any;

interface StylesContextType {
    styles: StylesData;
    updateStyles: (newStyles: StylesData) => void;
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

    const resetStyles = () => {
        setStyles(initialStyles);
    };

    const contextValue = React.useMemo(() => ({
        styles,
        updateStyles: setStyles,
        resetStyles
    }), [styles]);

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
