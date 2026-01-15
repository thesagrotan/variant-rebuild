'use client';

import React, { useEffect, useMemo } from 'react';
import { useControls, button, folder, Leva } from 'leva';
import { useStyles } from './StylesContext';

// Helper to flatten/unflatten object for Leva if needed, 
// but Leva supports folders which map nicely to nested objects.
// We'll iterate through the styles object to generate controls.

const createLevaSchema = (obj: any, prefix = '') => {
    const schema: any = {};

    Object.keys(obj).forEach(key => {
        const value = obj[key];
        const path = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'object' && value !== null) {
            schema[key] = folder(createLevaSchema(value, path));
        } else {
            schema[key] = {
                value: value,
                label: key
            };
        }
    });

    return schema;
};


export const StyleTweaker = () => {
    const { styles, updateStyles, resetStyles } = useStyles();

    const [values, set] = useControls(() => {
        return {
            Globals: folder({
                // Prepend space to force Leva to infer String input instead of Color input
                bgValue: { label: 'Background', value: ' ' + styles.globals.background, rows: true },
                text: { value: styles.globals.text },
            }),
            'Gradient Helper': folder({
                useGradient: { value: true, label: 'Enable Gradient' },
                gradientType: { value: 'radial', options: ['linear', 'radial'], label: 'Type' },
                gradientStart: { value: 'rgba(255, 87, 34, 0.12)', label: 'Start Color' },
                gradientEnd: { value: 'rgb(17, 17, 17)', label: 'End Color' },
                gradientAngle: { value: 90, min: 0, max: 360, label: 'Angle (Linear)', render: (get) => get('Gradient Helper.gradientType') === 'linear' },
                gradientPosition: { value: '50% 0%', label: 'Position (Radial)', render: (get) => get('Gradient Helper.gradientType') === 'radial' },
            }, { collapsed: false }),
            'Frame Container': folder({
                frameTag: { value: styles.containers.frame.tag, label: 'Tag Classes' },
                frameBody: { value: styles.containers.frame.body, label: 'Body Classes' },
            }),
            'NavBar Container': folder({
                navRoot: { value: styles.containers.navBar.root, label: 'Root Classes' },
                navNav: { value: styles.containers.navBar.nav, label: 'Nav Classes' },
                navItem: { value: styles.containers.navBar.item, label: 'Item Classes' },
                navItemActive: { value: styles.containers.navBar.itemActive, label: 'Active Item' },
                navItemInactive: { value: styles.containers.navBar.itemInactive, label: 'Inactive Item' },
            }),
            'Chat Container': folder({
                chatWrapper: { value: styles.containers.chat.wrapper, label: 'Wrapper' },
                chatInput: { value: styles.containers.chat.inputForm, label: 'Input Form' },
            }),
            'Actions': folder({
                'Save Changes': button(async (get) => {
                    const newStyles = {
                        globals: {
                            background: typeof get('Globals.bgValue') === 'string' ? get('Globals.bgValue').trim() : get('Globals.bgValue'),
                            text: get('Globals.text'),
                        },
                        containers: {
                            frame: {
                                tag: get('Frame Container.frameTag'),
                                body: get('Frame Container.frameBody'),
                            },
                            navBar: {
                                root: get('NavBar Container.navRoot'),
                                nav: get('NavBar Container.navNav'),
                                item: get('NavBar Container.navItem'),
                                itemActive: get('NavBar Container.navItemActive'),
                                itemInactive: get('NavBar Container.navItemInactive'),
                            },
                            chat: {
                                wrapper: get('Chat Container.chatWrapper'),
                                inputForm: get('Chat Container.chatInput'),
                            }
                        }
                    };

                    const res = await fetch('/api/styles', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newStyles),
                    });

                    if (res.ok) {
                        alert('Styles saved!');
                    } else {
                        alert('Failed to save styles.');
                    }
                }),
                'Reset Session': button(() => {
                    if (confirm('Reset styles to session start? Unsaved changes will be lost.')) {
                        location.reload();
                    }
                }),
                'Factory Reset': button(async () => {
                    if (confirm('Are you sure you want to restore factory default styles? This cannot be undone.')) {
                        await fetch('/api/styles/reset', { method: 'POST' });
                        location.reload();
                    }
                })
            })
        };
    }, []); // Empty dependency array creates controls once.

    // Sync Leva changes back to Context
    useEffect(() => {
        // Ensure globals exist before syncing
        if (!styles.globals) return;

        let background = typeof values.bgValue === 'string' ? values.bgValue.trim() : values.bgValue;

        // Override with gradient if enabled
        if (values.useGradient) {
            if (values.gradientType === 'radial') {
                background = `radial-gradient(circle at ${values.gradientPosition}, ${values.gradientStart} 0%, ${values.gradientEnd} 70%)`;
            } else {
                background = `linear-gradient(${values.gradientAngle}deg, ${values.gradientStart}, ${values.gradientEnd})`;
            }
        }

        const newStyles = {
            globals: {
                background,
                text: values.text,
            },
            containers: {
                frame: {
                    tag: values.frameTag,
                    body: values.frameBody,
                },
                navBar: {
                    root: values.navRoot,
                    nav: values.navNav,
                    item: values.navItem,
                    itemActive: values.navItemActive,
                    itemInactive: values.navItemInactive,
                },
                chat: {
                    wrapper: values.chatWrapper,
                    inputForm: values.chatInput,
                }
            }
        };

        // Check if styles have actually changed to avoid unnecessary updates/loops
        if (JSON.stringify(newStyles) !== JSON.stringify(styles)) {
            updateStyles(newStyles);
        }
    }, [values, updateStyles, styles]);


    return <Leva />;
};
