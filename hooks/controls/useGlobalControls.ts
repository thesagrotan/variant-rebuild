import { useEffect } from 'react';
import { useControls, folder } from 'leva';
import { useStyles } from '@/components/context/StylesContext';

export const useGlobalControls = () => {
    const { styles, patchStyles, theme, setTheme } = useStyles();

    const globals = styles?.globals || { background: '', text: '' };

    const [values] = useControls(() => ({
        Globals: folder({
            Theme: {
                value: theme,
                options: ['dark', 'light'],
                onChange: (v) => setTheme(v as 'dark' | 'light'),
            },
            // Prepend space to force Leva to infer String input instead of Color input
            bgValue: { label: 'Background', value: ' ' + globals.background, rows: true },
            text: { value: globals.text },
            showGuides: { value: globals.showGuides || false, label: 'Show Guides' },
        }),
        'Gradient Helper': folder({
            useGradient: { value: false, label: 'Enable Gradient' },
            gradientType: { value: 'radial', options: ['linear', 'radial'], label: 'Type' },
            gradientStart: { value: 'rgba(255, 87, 34, 0.12)', label: 'Start Color' },
            gradientEnd: { value: 'var(--bg-solid)', label: 'End Color' },
            gradientAngle: { value: 90, min: 0, max: 360, label: 'Angle (Linear)', render: (get) => get('Gradient Helper.gradientType') === 'linear' },
            gradientPosition: { value: '50% 0%', label: 'Position (Radial)', render: (get) => get('Gradient Helper.gradientType') === 'radial' },
        }, { collapsed: false }),
    }), [globals.background, globals.text]);
    // Dependencies need to be correct to re-initialize Leva if state changes externally, 
    // though deeper re-renders might be tricky with Leva's internal state.
    // For now we'll match original behavior of empty dep array if re-init isn't main goal,
    // but here we might want it to update if initial styles change. 
    // Actually original had [] (lines 8, 98), so let's stick to [] for now to avoid resets.
    // Wait, original read initials inside the useControls callback.
    // We'll keep [] for now to avoid frequent remounts of controls.

    useEffect(() => {
        let background = typeof values.bgValue === 'string' ? values.bgValue.trim() : values.bgValue;

        if (values.useGradient) {
            if (values.gradientType === 'radial') {
                background = `radial-gradient(circle at ${values.gradientPosition}, ${values.gradientStart} 0%, ${values.gradientEnd} 70%)`;
            } else {
                background = `linear-gradient(${values.gradientAngle}deg, ${values.gradientStart}, ${values.gradientEnd})`;
            }
        }

        const newGlobals = {
            globals: {
                background,
                text: values.text,
                showGuides: values.showGuides,
            },
        };

        // We can't easily deep compare entire object here without reconstruction
        // But patchStyles handles merging. We should probably only patch if changed.
        // A simple JSON stringify check of just this section:
        if (JSON.stringify(newGlobals.globals) !== JSON.stringify(styles?.globals)) {
            patchStyles(newGlobals);
        }

    }, [values, patchStyles, styles?.globals]);
};
