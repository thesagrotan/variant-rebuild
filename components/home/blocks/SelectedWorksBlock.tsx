'use client';

import React from 'react';
import { Project } from '@/data/projects';
import PortfolioProjectCard from '@/components/project/PortfolioProjectCard';
import { FadeInSection } from '@/components/ui/FadeInSection';
import { CLASSES } from '@/config/tokens';

interface SelectedWorksBlockProps {
    title: string;
    projects: Project[];
    onProjectClick?: (projectId: string) => void;
    animation: {
        cardHoverScale: number;
        cardHoverDuration: number;
        layoutType: string;
        layoutExitDamping: number;
        layoutStiffness: number;
        layoutDuration: number;
    };
    delay?: number;
}

export const SelectedWorksBlock = ({
    title,
    projects,
    onProjectClick,
    animation,
    delay = 0
}: SelectedWorksBlockProps) => {
    return (
        <FadeInSection className="flex flex-col gap-10 w-full mt-24" delay={delay}>
            <h2 className="text-xl font-medium text-text-primary">{title}</h2>
            <div className={`flex flex-col ${CLASSES.cardGap}`}>
                {projects.map((project) => (
                    <PortfolioProjectCard
                        key={project.id}
                        project={project}
                        onClick={onProjectClick || (() => { })}
                        animation={{
                            hover: { scale: animation.cardHoverScale, duration: animation.cardHoverDuration },
                            layout: {
                                type: animation.layoutType as 'spring' | 'tween',
                                damping: animation.layoutExitDamping,
                                stiffness: animation.layoutStiffness,
                                duration: animation.layoutDuration
                            }
                        }}
                    />
                ))}
            </div>
        </FadeInSection>
    );
};
