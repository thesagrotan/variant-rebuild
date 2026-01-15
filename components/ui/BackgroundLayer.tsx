'use client';

import React from 'react';
import { useStyles } from '../context/StylesContext';

export const BackgroundLayer = () => {
    const { styles } = useStyles();

    // Ensure globals exists
    if (!styles.globals) return null;

    return (
        <div

            className="fixed top-0 left-0 w-screen h-screen -z-50 pointer-events-none transition-colors duration-300 ease-out"
            style={{
                background: styles.globals.background,
            }}
        />
    );
};
