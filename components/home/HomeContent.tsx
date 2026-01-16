'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Project } from '@/data/projects';
import { SiteContent, parseBold } from '@/data/siteContent';
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
            <div className="fixed top-[16vh] left-[8vw] z-50 pointer-events-none">
                <FadeInSection fadeOnly>
                    <Image
                        src={theme === 'light' ? "/assets/logo-light.svg" : "/assets/logo.svg"}
                        alt="Logo"
                        width={64}
                        height={64}
                        className="pointer-events-auto"
                    />
                </FadeInSection>
            </div>
            <div className="h-32" />

            {siteContent.map((block, index) => {
                const delay = 0.1 + index * 0.05;

                switch (block.type) {
                    case 'richText':
                        return (
                            <FadeInSection
                                key={index}
                                className={cn(
                                    "flex flex-col gap-8 leading-[1.5]",
                                    block.style === 'lead'
                                        ? "text-4xl font-medium tracking-tight mb-8"
                                        : "text-2xl text-text-muted mt-8"
                                )}
                                delay={delay}
                                fadeOnly={block.style === 'lead'}
                            >
                                <p className={block.style === 'lead' ? "leading-[1.3]" : "whitespace-pre-wrap"}>
                                    {parseBold(block.content).map(({ text, bold, key }) => (
                                        <span
                                            key={key}
                                            className={cn(
                                                block.style === 'lead'
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

                    case 'carousel':
                        return (
                            <FadeInSection key={index} className="mt-8 mb-8 flex justify-start w-full" delay={delay}>
                                <div className="w-full max-w-[480px]">
                                    <InfiniteCarousel icons={block.icons} />
                                </div>
                            </FadeInSection>
                        );

                    case 'selectedWorks':
                        return (
                            <FadeInSection key={index} className="flex flex-col gap-10 w-full mt-24" delay={delay}>
                                <h2 className="text-xl font-medium text-text-primary">{block.title}</h2>
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
                        );

                    case 'helpWith':
                        return (
                            <FadeInSection key={index} className="mt-20 flex flex-col gap-8 w-full" delay={delay}>
                                <h2 className="text-xl font-medium text-text-primary">{block.heading}</h2>
                                <div className="flex flex-wrap gap-x-8 gap-y-4">
                                    {block.links.map((column, idx) => (
                                        <div key={idx} className={`flex flex-col ${CLASSES.linkColumn}`}>
                                            {column.map((label) => <ProjectLink key={label} label={label} />)}
                                        </div>
                                    ))}
                                </div>
                            </FadeInSection>
                        );

                    default:
                        return null;
                }
            })}
        </>
    );
};
