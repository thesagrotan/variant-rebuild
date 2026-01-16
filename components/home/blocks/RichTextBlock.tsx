'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { parseBold } from '@/data/siteContent';
import { FadeInSection } from '@/components/ui/FadeInSection';

interface RichTextBlockProps {
    content: string;
    style?: 'default' | 'lead';
    delay?: number;
}

export const RichTextBlock = ({ content, style = 'default', delay = 0 }: RichTextBlockProps) => {
    return (
        <FadeInSection
            className={cn(
                "flex flex-col gap-8 leading-[1.5]",
                style === 'lead'
                    ? "text-4xl font-medium tracking-tight mb-8"
                    : "text-2xl text-text-muted mt-8"
            )}
            delay={delay}
            fadeOnly={style === 'lead'}
        >
            <p className={style === 'lead' ? "leading-[1.3]" : "whitespace-pre-wrap"}>
                {parseBold(content).map(({ text, bold, key }) => (
                    <span
                        key={key}
                        className={cn(
                            style === 'lead'
                                ? (bold ? 'text-text-secondary opacity-80' : 'text-text-primary')
                                : (bold ? 'text-text-primary font-medium' : '')
                        )}
                    >
                        {text}
                    </span>
                ))}
            </p>
        </FadeInSection>
    );
};
