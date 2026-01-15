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
            // It's a nested object, create a folder
            schema[key] = folder(createLevaSchema(value, path)); // Recursive call
        } else {
            // It's a primitive, create a control
            // We can try to infer type, but for strings (tailwind classes) usually just text input
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

    // We manually construct the schema to ensure we can capture updates
    // For a dynamic schema based on `styles`, we might need a slightly different approach
    // akin to how Leva `useControls` works. 

    // However, `useControls` returns the values. Providing the *entire* state as initial config
    // is tricky if we want two-way binding or just one-way with manual save.

    // Simplest approach: Hardcoded structure derived from known schema or dynamic generation.
    // Let's try to map the top-level keys as folders for Leva.

    // Note: Calling useControls in a loop or conditionally is forbidden.
    // We must respect hooks rules.

    // Since our styles.json structure is relatively known (globals, containers -> frame, navBar, chat),
    // we can make a structured setup. Or use a generic recursive component? (Complexity alert).

    // Let's try a single `useControls` call with the whole object spread?
    // Leva flattens keys with dots by default if we don't use folders.

    // To make this robust and generic for the whole JSON, we might need to construct the schema object once.
    // But since `styles` changes, we want Leva to update? 
    // Actually, usually StyleTweaker drives the styles, not the other way around (except for initial load).

    // Let's assume styles structure doesn't change at runtime, only values.

    const [values, set] = useControls(() => {
        // We can define the schema here based on initial load
        // But to genericize, we might need to iterate.
        // For now, let's hardcode the known structure to ensure High Quality UI grouping.

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
                    // Reconstruct the object
                    // This is a bit manual mapping back to strict structure. 
                    // Ideally we'd use a generic mapper if the JSON gets huge.

                    // Helper to read current controls state (or we can use the `values` from hook if available)
                    // `get` function allows reading values inside button callback

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

                    console.log('Saving styles...', newStyles);
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
            console.log('Gradient Debug:', {
                type: values.gradientType,
                start: values.gradientStart,
                end: values.gradientEnd,
                angle: values.gradientAngle,
                pos: values.gradientPosition
            });

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
