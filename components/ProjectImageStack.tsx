import { motion } from 'framer-motion';
import Image from 'next/image';
import { buildImgStyle } from '../lib/imageStyle';
import { DIMENSIONS, CLASSES } from '../config/tokens';
import type { ProjectImage } from '../data/projects';

interface AnimationConfig {
    hover: { scale: number; duration: number };
    layout: { type: string; damping: number; stiffness: number; duration: number };
}

interface ProjectImageStackProps {
    images: ProjectImage[];
    projectId: string;
    animation: AnimationConfig;
    className?: string;
}

export default function ProjectImageStack({
    images,
    projectId,
    animation,
    className = ''
}: ProjectImageStackProps) {
    const layoutTransition = animation.layout.type === 'spring'
        ? { type: 'spring' as const, damping: animation.layout.damping, stiffness: animation.layout.stiffness }
        : { duration: animation.layout.duration };

    // Use only valid images
    const displayImages = images.slice(0, 3);

    return (
        <div className={`grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 ${className}`}>
            {displayImages.map((image, index) => {
                // Calculate height based on aspect ratio if dimensions are available
                const aspectRatio = (image.width && image.height)
                    ? image.width / image.height
                    : DIMENSIONS.card.baseWidth / DIMENSIONS.card.maxHeight;

                const height = Math.min(DIMENSIONS.card.baseWidth / aspectRatio, DIMENSIONS.card.maxHeight);

                return (
                    <motion.div
                        key={index}
                        layoutId={`${projectId}-img-${index + 1}`}
                        className={`[grid-area:1_/_1] bg-stone-50 relative rounded-[8px] overflow-hidden will-change-transform ${CLASSES.cardRotation[index]} ${CLASSES.cardMargins[index + 1 as 1 | 2 | 3]}`}
                        whileHover={{ scale: animation.hover.scale }}
                        transition={{
                            scale: { duration: animation.hover.duration },
                            layout: layoutTransition
                        }}
                        style={{
                            width: DIMENSIONS.card.baseWidth,
                            height,
                            maxHeight: DIMENSIONS.card.maxHeight
                        }}
                    >
                        <Image
                            alt={image.alt}
                            className="h-full w-full object-cover"
                            style={buildImgStyle(image, 'contain')}
                            src={image.src}
                            width={image.width || 800} // Fallback width
                            height={image.height || 600} // Fallback height
                            placeholder="empty" // Or "blur" if we generate blurDataURL
                        />
                        <div
                            aria-hidden="true"
                            className={`absolute ${CLASSES.cardBorder} inset-0 pointer-events-none ${CLASSES.cardShadow}`}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}
