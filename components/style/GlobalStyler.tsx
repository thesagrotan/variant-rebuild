'use client';

import { useEffect } from 'react';
import { useStyles } from '../context/StylesContext';

export const GlobalStyler = () => {
    const { styles, theme } = useStyles();

    useEffect(() => {
        // Apply theme class to documentElement
        if (theme === 'light') {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }

        // Apply global styles to body
        if (styles.globals) {
            document.body.style.color = styles.globals.text.startsWith('text-') ? '' : styles.globals.text;
            document.body.style.background = styles.globals.background;
        }

        return () => {
            document.body.style.background = '';
            document.body.style.color = '';
        };
    }, [styles.globals, theme]);

    return null;
};
