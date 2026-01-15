import { motion } from 'framer-motion';
import Image from 'next/image';
import { buildImgStyle } from '@/lib/imageStyle';
import type { ProjectImage } from '@/data/projects';

interface ModalImageProps {
    image: ProjectImage;
    projectId: string;
    index: number;
    isSingleColumn: boolean;
    layoutTransition: object;
}

export const ModalImage = ({
    image,
    projectId,
    index,
    isSingleColumn,
    layoutTransition
}: ModalImageProps) => {
    // Shared styles from buildImgStyle
    const imgStyle = buildImgStyle(image, 'contain');

    // For single column, we render a responsive image using intrinsic dimensions
    // For grid view, we use 'fill' to cover the fixed-height container
    const isGrid = !isSingleColumn;

    return (
        <motion.div
            layoutId={`${projectId}-img-${index + 1}`}
            transition={{ layout: layoutTransition }}
            className={`bg-stone-900 relative rounded-lg overflow-hidden will-change-transform ${isSingleColumn ? 'h-auto' : 'h-[320px] md:h-[420px] lg:h-[520px]'
                }`}
        >
            {isGrid ? (
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                    style={imgStyle}
                />
            ) : (
                <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width || 1920}
                    height={image.height || 1080}
                    style={{
                        ...imgStyle,
                        width: '100%',
                        height: 'auto',
                    }}
                />
            )}
            <div
                aria-hidden="true"
                className="absolute border border-white/10 inset-0 pointer-events-none rounded-lg shadow-[41px_57px_20px_0px_rgba(0,0,0,0),26px_37px_18px_0px_rgba(0,0,0,0.01)]"
            />
        </motion.div>
    );
};
