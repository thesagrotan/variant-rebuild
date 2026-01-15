'use client';

import { useEffect } from 'react';
import { useStyles } from './StylesContext';

export const GlobalStyler = () => {
    const { styles } = useStyles();

    useEffect(() => {
        // Apply global styles to body
        if (styles.globals) {
            document.body.style.color = styles.globals.text;
            document.body.style.background = styles.globals.background;
        }

        // Cleanup function to reset if component unmounts (optional, but good practice)
        return () => {
            document.body.style.background = '';
            document.body.style.color = '';
        };
    }, [styles.globals]);

    return null;
};
