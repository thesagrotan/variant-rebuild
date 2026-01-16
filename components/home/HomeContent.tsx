'use client';

import React from 'react';
import { Project } from '@/data/projects';
import { SiteContent } from '@/data/siteContent';
import { useAnimationControls } from '@/components/ui/AnimationControls';
import Image from 'next/image';
import { useStyles } from '@/components/context/StylesContext';
import { FadeInSection } from '@/components/ui/FadeInSection';

// Block Components
import { RichTextBlock } from './blocks/RichTextBlock';
import { CarouselBlock } from './blocks/CarouselBlock';
import { SelectedWorksBlock } from './blocks/SelectedWorksBlock';
import { HelpWithBlock } from './blocks/HelpWithBlock';

interface HomeContentProps {
    onProjectClick?: (projectId: string) => void;
    projects: Project[];
    siteContent: SiteContent;
}

export const HomeContent = ({ onProjectClick, projects, siteContent }: HomeContentProps) => {
    const { theme } = useStyles();
    const animation = useAnimationControls();

    return (
        <>
            {/* Logo Section */}
            <div className="fixed top-[11vh] left-[8vw] z-50 pointer-events-none">
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

            {/* Dynamic Content Blocks */}
            {siteContent.map((block, index) => {
                const delay = 0.1 + index * 0.05;
                const key = `${block.type}-${index}`;

                switch (block.type) {
                    case 'richText':
                        return (
                            <RichTextBlock
                                key={key}
                                content={block.content}
                                style={block.style}
                                delay={delay}
                            />
                        );

                    case 'carousel':
                        return (
                            <CarouselBlock
                                key={key}
                                icons={block.icons}
                                delay={delay}
                            />
                        );

                    case 'selectedWorks':
                        return (
                            <SelectedWorksBlock
                                key={key}
                                title={block.title}
                                projects={projects}
                                onProjectClick={onProjectClick}
                                animation={{
                                    cardHoverScale: animation.cardHoverScale,
                                    cardHoverDuration: animation.cardHoverDuration,
                                    layoutType: animation.layoutType,
                                    layoutExitDamping: animation.layoutExitDamping,
                                    layoutStiffness: animation.layoutStiffness,
                                    layoutDuration: animation.layoutDuration,
                                }}
                                delay={delay}
                            />
                        );

                    case 'helpWith':
                        return (
                            <HelpWithBlock
                                key={key}
                                heading={block.heading}
                                links={block.links}
                                delay={delay}
                            />
                        );

                    default:
                        return null;
                }
            })}
        </>
    );
};

