'use client';

import React from 'react';
import { useStyles } from './StylesContext';

export const BackgroundLayer = () => {
    const { styles } = useStyles();

    // Ensure globals exists
    if (!styles.globals) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -50,
                background: styles.globals.background,
                transition: 'background 0.3s ease', // Smooth transition for colors
                pointerEvents: 'none', // Ensure it doesn't block interactions if z-index fails
            }}
        />
    );
};
