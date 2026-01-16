'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { parseBold } from '@/data/siteContent';
// import { parseBold } from '@/data/siteContent'; // Duplicate removed
// import { useSiteContent } from '@/hooks/useSiteContent'; // Removed
// import { useProjectData } from '@/hooks/useProjectData'; // Removed
import PortfolioProjectCard from '@/components/project/PortfolioProjectCard';
import ProjectLink from '@/components/project/ProjectLink';
import { useAnimationControls } from '@/components/ui/AnimationControls';
import Image from 'next/image';
import { useStyles } from '@/components/context/StylesContext';
import { CLASSES } from '@/config/tokens';
import InfiniteCarousel from '@/components/InfiniteCarousel';

interface FadeInSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    fadeOnly?: boolean;
}

const FadeInSection = ({ children, className = '', delay = 0, fadeOnly = false }: FadeInSectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const yOffset = fadeOnly ? 0 : 12;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: yOffset }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

import { Project } from '@/data/projects';
import { SiteContent } from '@/data/siteContent';

interface HomeContentProps {
    onProjectClick?: (projectId: string) => void;
    projects: Project[];
    siteContent: SiteContent;
}

export const HomeContent = ({ onProjectClick, projects, siteContent }: HomeContentProps) => {
    // const siteContent = useSiteContent(); // Removed
    // const { projects } = useProjectData(); // Removed
    const { theme } = useStyles();
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
            <FadeInSection className="mb-8" fadeOnly>
                <Image
                    src={theme === 'light' ? "/assets/logo-light.svg" : "/assets/logo.svg"}
                    alt="Logo"
                    width={64}
                    height={64}
                    className="mb-12"
                />
                <p className="text-4xl font-medium leading-[1.3] tracking-tight">
                    {parseBold(siteContent.hero.lead).map(({ text, bold, key }) => (
                        <span key={key} className={bold ? 'text-text-secondary opacity-80' : 'text-text-primary'}>
                            {text}
                        </span>
                    ))}
                </p>
            </FadeInSection>



            <FadeInSection className="flex flex-col gap-8 text-2xl text-text-muted leading-[1.5]" delay={0.1}>
                {[siteContent.hero.intro, siteContent.hero.experience].map((text, idx) => (
                    <p key={idx} className={`${idx === 1 ? 'whitespace-pre-wrap' : ''}`}>
                        {parseBold(text).map(({ text: t, bold, key }) => (
                            <span key={key} className={bold ? 'text-text-primary font-medium' : ''}>{t}</span>
                        ))}
                    </p>
                ))}
            </FadeInSection>
            <FadeInSection className="mt-8 mb-8 flex justify-start w-full" delay={0.15}>
                <div className="w-full max-w-[480px]">
                    <InfiniteCarousel />
                </div>
            </FadeInSection>
            <FadeInSection className="flex flex-col gap-8 text-2xl text-text-muted leading-[1.5]" delay={0.2}>
                <p className="">
                    {parseBold(siteContent.hero.approach).map(({ text: t, bold, key }) => (
                        <span key={key} className={bold ? 'text-text-primary font-medium' : ''}>{t}</span>
                    ))}
                </p>
            </FadeInSection>


            {/* Selected Work */}
            <FadeInSection className="flex flex-col gap-10 w-full mt-24" delay={0.2}>
                <h2 className="text-xl font-medium text-text-primary">{siteContent.selectedWork}</h2>
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
            </FadeInSection>

            {/* Here to help you with */}
            <FadeInSection className="mt-20 flex flex-col gap-8 w-full" delay={0.3}>
                <h2 className="text-xl font-medium text-text-primary">{siteContent.helpWith.heading}</h2>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                    {siteContent.helpWith.links.map((column, idx) => (
                        <div key={idx} className={`flex flex-col ${CLASSES.linkColumn}`}>
                            {column.map((label) => <ProjectLink key={label} label={label} />)}
                        </div>
                    ))}
                </div>
            </FadeInSection>
        </>
    );
};
