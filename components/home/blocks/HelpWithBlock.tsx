'use client';

import React from 'react';
import ProjectLink from '@/components/project/ProjectLink';
import { FadeInSection } from '@/components/ui/FadeInSection';
import { CLASSES } from '@/config/tokens';

interface HelpWithBlockProps {
    heading: string;
    links: string[][];
    delay?: number;
}

export const HelpWithBlock = ({ heading, links, delay = 0 }: HelpWithBlockProps) => {
    return (
        <FadeInSection className="mt-20 flex flex-col gap-8 w-full" delay={delay}>
            <h2 className="text-xl font-medium text-text-primary">{heading}</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
                {links.map((column, idx) => (
                    <div key={idx} className={`flex flex-col ${CLASSES.linkColumn}`}>
                        {column.map((label) => <ProjectLink key={label} label={label} />)}
                    </div>
                ))}
            </div>
        </FadeInSection>
    );
};
