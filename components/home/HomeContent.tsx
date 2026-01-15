'use client';

import React from 'react';
import { parseBold } from '@/data/siteContent';
import { useSiteContent } from '@/hooks/useSiteContent';
import { useProjectData } from '@/hooks/useProjectData';
import PortfolioProjectCard from '@/components/project/PortfolioProjectCard';
import ProjectLink from '@/components/project/ProjectLink';
import { useAnimationControls } from '@/components/ui/AnimationControls';
import { CLASSES } from '@/config/tokens';

interface HomeContentProps {
    onProjectClick?: (projectId: string) => void;
}

export const HomeContent = ({ onProjectClick }: HomeContentProps) => {
    const siteContent = useSiteContent();
    const { projects } = useProjectData();
    const {
        cardHoverScale,
        cardHoverDuration,
        layoutType,
        layoutStiffness,
        layoutExitDamping,
        layoutDuration
    } = useAnimationControls();

    return (
        <>
            <p className="text-xl font-medium leading-[1.3] tracking-tight">
                From brief to MVP
            </p>
            <div className="flex flex-col gap-8 text-sm text-white/50 leading-[1.5] max-w-[340px]">
                {[siteContent.hero.intro, siteContent.hero.experience].map((text, idx) => (
                    <p key={idx} className={`${idx === 1 ? 'whitespace-pre-wrap' : ''}`}>
                        {parseBold(text).map(({ text: t, bold, key }) => (
                            <span key={key} className={bold ? 'text-white font-medium' : ''}>{t}</span>
                        ))}
                    </p>
                ))}
            </div>

            {/* Selected Work */}
            <div className="flex flex-col gap-10 w-full mt-24">
                <h2 className="text-xl font-medium text-white">{siteContent.selectedWork}</h2>
                <div className={`flex flex-col ${CLASSES.cardGap}`}>
                    {projects.map((project) => (
                        <PortfolioProjectCard
                            key={project.id}
                            project={project}
                            onClick={onProjectClick || (() => { })}
                            animation={{
                                hover: { scale: cardHoverScale, duration: cardHoverDuration },
                                layout: { type: layoutType, damping: layoutExitDamping, stiffness: layoutStiffness, duration: layoutDuration }
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Here to help you with */}
            <div className={`mt-20 flex flex-col gap-8 w-full`}>
                <h2 className="text-xl font-medium text-white">{siteContent.helpWith.heading}</h2>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                    {siteContent.helpWith.links.map((column, idx) => (
                        <div key={idx} className={`flex flex-col ${CLASSES.linkColumn}`}>
                            {column.map((label) => <ProjectLink key={label} label={label} />)}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
