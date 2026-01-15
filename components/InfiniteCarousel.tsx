import { motion } from 'motion/react';
import { carouselIconSvgs, getAvailableIcons } from '../lib/svgLoader';
import { useAnimationControls } from './AnimationControls';

/**
 * CarouselIcon Component
 * Renders an icon from the carousel folder dynamically as a complete SVG
 */
interface CarouselIconProps {
  name: string;
}

function CarouselIcon({ name }: CarouselIconProps) {
  const svgContent = carouselIconSvgs[name];
  
  if (!svgContent) {
    return null;
  }

  return (
    <div className="bg-[#edefeb] box-border relative rounded-[7px] shrink-0 size-[48px] flex items-center justify-center p-2">
      <div aria-hidden="true" className="absolute border border-[#323e45] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <div 
        className="w-full h-full flex items-center justify-center [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:w-auto [&>svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
}

/**
 * IconsRow Component
 * Renders all available carousel icons in a row
 */
function IconsRow() {
  // Get all available carousel icon names (excluding shared icons if needed)
  const iconNames = getAvailableIcons('carousel').filter((name: string) => 
    // Exclude shared utility icons from display
    !name.includes('rounded-rect') && 
    !name.includes('vercel-') &&
    !name.includes('ruby-part') &&
    !name.includes('photoshop-')
  );

  return (
    <div className="content-stretch flex gap-[8px] items-center shrink-0">
      {iconNames.map((iconName: string) => (
        <CarouselIcon key={iconName} name={iconName} />
      ))}
    </div>
  );
}

export default function InfiniteCarousel() {
  const { carouselEnabled, carouselDuration } = useAnimationControls();
  
  // Each icon is 48px + 8px gap = 56px
  // Calculate row width dynamically based on number of icons
  const iconNames = getAvailableIcons('carousel').filter((name: string) => 
    !name.includes('rounded-rect') && 
    !name.includes('vercel-') &&
    !name.includes('ruby-part') &&
    !name.includes('photoshop-')
  );
  const rowWidth = iconNames.length * 56; // 48px icon + 8px gap
  
  return (
    <div className="relative h-[48px] overflow-hidden max-w-[480px] w-full">
      <motion.div
        className="flex gap-[8px] absolute"
        animate={carouselEnabled ? {
          x: [0, -rowWidth],
        } : {
          x: 0,
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: carouselDuration,
            ease: "linear",
          },
        }}
      >
        <IconsRow />
        <IconsRow />
        <IconsRow />
      </motion.div>
      
      {/* Gradient overlays */}
      <div className="absolute bottom-0 left-0 top-0 w-[160px] bg-gradient-to-r from-[#edefeb] to-[rgba(237,239,235,0)] pointer-events-none z-10" />
      <div className="absolute bottom-0 right-0 top-0 w-[160px] bg-gradient-to-l from-[#edefeb] to-[rgba(237,239,235,0)] pointer-events-none z-10" />
    </div>
  );
}
