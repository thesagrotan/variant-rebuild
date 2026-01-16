import { motion } from 'framer-motion';
import { useAnimationControls } from './ui/AnimationControls';
import Image from 'next/image';
import { CarouselIcon as ICarouselIcon } from '@/data/siteContent';

/**
 * CarouselIcon Component
 * Renders an icon from Payload Media
 */
interface CarouselIconProps {
  icon: ICarouselIcon;
}

function CarouselIcon({ icon }: CarouselIconProps) {
  return (
    <div className="box-border relative rounded-[7px] shrink-0 size-[48px] flex items-center justify-center p-2">
      <div aria-hidden="true" className="absolute border border-border-subtle border-solid inset-0 pointer-events-none rounded-[7px]" />
      <div className="w-full h-full flex items-center justify-center relative">
        <Image
          src={icon.url}
          alt={icon.alt}
          fill
          className="object-contain p-2"
        />
      </div>
    </div>
  );
}

/**
 * IconsRow Component
 * Renders the provided icons in a row
 */
function IconsRow({ icons }: { icons: ICarouselIcon[] }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center shrink-0">
      {icons.map((icon, idx) => (
        <CarouselIcon key={`${icon.url}-${idx}`} icon={icon} />
      ))}
    </div>
  );
}

interface InfiniteCarouselProps {
  icons: ICarouselIcon[];
}

export default function InfiniteCarousel({ icons }: InfiniteCarouselProps) {
  const { carouselEnabled, carouselDuration } = useAnimationControls();

  if (!icons || icons.length === 0) {
    return null;
  }

  // Each icon is 48px + 8px gap = 56px
  // Calculate row width dynamically based on number of icons
  const rowWidth = icons.length * 56; // 48px icon + 8px gap

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
        <IconsRow icons={icons} />
        <IconsRow icons={icons} />
        <IconsRow icons={icons} />
      </motion.div>

      {/* Gradient overlays */}
      <div
        className="absolute bottom-0 left-0 top-0 w-[160px] pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, var(--bg-solid), transparent)' }}
      />
      <div
        className="absolute bottom-0 right-0 top-0 w-[160px] pointer-events-none z-10"
        style={{ background: 'linear-gradient(to left, var(--bg-solid), transparent)' }}
      />
    </div>
  );
}
