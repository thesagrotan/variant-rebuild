'use client';

import React from 'react';
import InfiniteCarousel from '@/components/InfiniteCarousel';
import { FadeInSection } from '@/components/ui/FadeInSection';
import { CarouselIcon } from '@/data/siteContent';

interface CarouselBlockProps {
    icons: CarouselIcon[];
    delay?: number;
}

export const CarouselBlock = ({ icons, delay = 0 }: CarouselBlockProps) => {
    return (
        <FadeInSection className="mt-8 mb-8 flex justify-start w-full" delay={delay}>
            <div className="w-full max-w-[480px]">
                <InfiniteCarousel icons={icons} />
            </div>
        </FadeInSection>
    );
};
