'use client';

import React, { useEffect, useState } from 'react';

interface InlineSVGProps {
    src: string;
    className?: string;
    'aria-label'?: string;
}

export const InlineSVG = ({ src, className, 'aria-label': ariaLabel }: InlineSVGProps) => {
    const [svgContent, setSvgContent] = useState<string>('');

    useEffect(() => {
        let isMounted = true;

        const fetchSVG = async () => {
            try {
                const response = await fetch(src);
                if (response.ok) {
                    let text = await response.text();
                    if (isMounted) {
                        // Force currentColor ensuring it inherits from parent
                        text = text.replace(/fill="[^"]*"/g, 'fill="currentColor"');
                        text = text.replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
                        // Remove style attributes to avoid inline overrides
                        text = text.replace(/style="[^"]*"/g, '');
                        // Remove width and height to let CSS control it (optional but safer)
                        text = text.replace(/width="[^"]*"/g, '').replace(/height="[^"]*"/g, '');
                        setSvgContent(text);
                    }
                }
            } catch (error) {
                console.error(`Failed to load SVG from ${src}`, error);
            }
        };

        if (src) {
            fetchSVG();
        }

        return () => {
            isMounted = false;
        };
    }, [src]);

    if (!svgContent) {
        // Fallback or placeholder? using empty div for now to maintain layout if sized by parent
        return <div className={className} aria-label={ariaLabel} />;
    }

    return (
        <div
            className={className}
            aria-label={ariaLabel}
            dangerouslySetInnerHTML={{ __html: svgContent }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        />
    );
};
