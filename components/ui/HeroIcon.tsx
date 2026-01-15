import { motion, type MotionProps } from 'framer-motion';

// Simplification: Hardcoded paths for now. 
// In a full migration, we would maintain the svgLoader or a centralized path registry.
const heroIconPaths: Record<string, string> = {
    // Placeholder for the missing p11a74280 icon used as fallback
    // Using a generic geometric shape or arrow
    "p11a74280": "M10 10 H 90 V 90 H 10 Z",
};

export type HeroIconName = keyof typeof heroIconPaths;

interface HeroIconProps extends Omit<MotionProps, 'children'> {
    name: string; // Relaxed type to allow string for now
    className?: string;
    title?: string;
    width?: number;
    height?: number;
    size?: number;
    viewBox?: string;
}

export function HeroIcon({
    name,
    className = '',
    title,
    size = 32,
    width,
    height,
    viewBox = "0 0 107 20", // Defaulting to the logo viewbox seen in usage
    ...motionProps
}: HeroIconProps) {
    const path = heroIconPaths[name as HeroIconName] || heroIconPaths["p11a74280"];

    return (
        <motion.svg
            width={width || size}
            height={height || size}
            viewBox={viewBox}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden={!title}
            role={title ? 'img' : 'presentation'}
            {...motionProps}
        >
            {title && <title>{title}</title>}
            <path d={path} />
        </motion.svg>
    );
}
