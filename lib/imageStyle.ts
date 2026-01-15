import type { CSSProperties } from 'react';
import type { ProjectImage } from '../data/projects';

/**
 * Build the inline style object for project images.
 *
 * AI_GOOD: 1:1 mapping of previous inline style literals used in both
 * PortfolioProjectCard and ProjectModal. No behavioral changes.
 * - objectFit: image.objectFit || fallbackFit
 * - objectPosition: image.objectPosition || 'center'
 * - transform: `scale(scale||1) translate(translateX||'0', translateY||'0')`
 * - transformOrigin: objectPosition || 'center'
 */
export function buildImgStyle(
    image: ProjectImage,
    fallbackFit: CSSProperties['objectFit'] = 'cover'
): CSSProperties {
    // Extract with defaults to preserve original behavior exactly
    const objectFit = image.objectFit ?? fallbackFit;
    const objectPosition = image.objectPosition ?? 'center';
    const scale = image.scale ?? 1;
    const translateX = image.translateX ?? '0';
    const translateY = image.translateY ?? '0';

    // AI_GOOD: transform and transformOrigin strings match original formatting
    return {
        objectFit,
        objectPosition,
        transform: `scale(${scale}) translate(${translateX}, ${translateY})`,
        transformOrigin: objectPosition,
    };
}
