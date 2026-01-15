import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAnimationControls } from './AnimationControls';
import { getProjectById } from '../data/projects';
import { getModalVariants } from '../animation/modalVariants';
import { buildImgStyle } from '../lib/imageStyle';
import type { ProjectImage } from '../data/projects';

interface ProjectModalProps {
    projectId: string;
    onClose: () => void;
}

// Shared image container component to eliminate repetition
const ModalImage = ({
    image,
    projectId,
    index,
    isSingleColumn,
    layoutTransition
}: {
    image: ProjectImage;
    projectId: string;
    index: number;
    isSingleColumn: boolean;
    layoutTransition: object;
}) => (
    <motion.div
        layoutId={`${projectId}-img-${index + 1}`}
        transition={{ layout: layoutTransition }}
        className={`bg-stone-900 relative rounded-lg overflow-hidden ${isSingleColumn ? 'h-auto' : 'h-[320px] md:h-[420px] lg:h-[520px]'
            }`}
    >
        <img
            alt={image.alt}
            className={isSingleColumn ? 'w-full h-auto block' : 'h-full w-full'}
            style={buildImgStyle(image, 'contain')}
            src={image.src}
        />
        <div
            aria-hidden="true"
            className="absolute border border-white/10 inset-0 pointer-events-none rounded-lg shadow-[41px_57px_20px_0px_rgba(0,0,0,0),26px_37px_18px_0px_rgba(0,0,0,0.01)]"
        />
    </motion.div>
);

export default function ProjectModal({ projectId, onClose }: ProjectModalProps) {
    const {
        backdropFadeDuration,
        backdropOpacity,
        modalDamping,
        modalStiffness,
        modalAppearanceEffect,
        modalScaleFrom,
        modalRotateFrom,
        layoutDuration,
        layoutType,
        layoutDamping,
        layoutStiffness,
        iconButtonDuration,
        closeButtonScale
    } = useAnimationControls();

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const project = getProjectById(projectId);

    if (!project) return null;

    const { title, year, categories, longDescription, images } = project;
    const [img1, img2, img3] = images.detail;
    const isSingleColumnProject = projectId === 'brand-identities'; // Example condition for single column layout
    const layoutTransition = layoutType === 'spring'
        ? { type: 'spring', damping: layoutDamping, stiffness: layoutStiffness }
        : { duration: layoutDuration };
    const paragraphs = longDescription.split('\n\n').filter(p => p.trim().length > 0);

    return (
        <AnimatePresence>
            <motion.div
                key="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: backdropOpacity }}
                exit={{ opacity: 0 }}
                transition={{ duration: backdropFadeDuration }}
                className="fixed inset-0 bg-black z-[100] backdrop-blur-sm"
                style={{ backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})` }}
                onClick={onClose}
            />

            <motion.div
                key="modal-content"
                {...getModalVariants(modalAppearanceEffect, modalScaleFrom, modalRotateFrom)}
                transition={{ type: 'spring', damping: modalDamping, stiffness: modalStiffness }}
                className="fixed inset-0 z-[101] overflow-y-auto overscroll-contain"
                style={{ transformOrigin: 'center center', WebkitOverflowScrolling: 'touch', willChange: 'transform' }}
            >
                <div className="bg-[#0a0a0a] min-h-full w-full">
                    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-16">
                        {/* Back button and Chat button */}
                        <div className="flex justify-between items-center mb-16">
                            <motion.button
                                onClick={onClose}
                                className="p-2 rounded-full cursor-pointer"
                                initial={{ backgroundColor: 'transparent' }}
                                whileHover={{ scale: closeButtonScale, backgroundColor: '#ffffff20' }}
                                transition={{ duration: iconButtonDuration }}
                            >
                                <ArrowLeft className="w-6 h-6 text-white" />
                            </motion.button>
                        </div>

                        {/* Project Info and Description */}
                        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start justify-center mb-32">
                            <div className="flex flex-col gap-6 w-full lg:w-45">
                                <div className="flex flex-col gap-2">
                                    <p className="text-[20px] font-medium leading-[1.3] text-white">{title}</p>
                                    <p className="text-[14px] leading-[1.5] text-white/50">{year}</p>
                                </div>

                                <div className="flex flex-col">
                                    {categories.map((category, index) => (
                                        <p key={index} className="text-[14px] leading-[1.5] text-white/50">
                                            {category}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-8 w-full lg:max-w-[720px]">
                                {paragraphs.map((paragraph, index) => (
                                    <p key={index} className="text-[14px] leading-[1.5] text-white/90">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Image Grid */}
                        <div className="w-full">
                            {!isSingleColumnProject && (
                                <style>{`
                  @media (min-width: 1024px) {
                    .image-grid-modal {
                      grid-template-columns: 3fr 2fr !important;
                    }
                    .image-grid-modal > :nth-child(3) {
                      grid-column: 1 / -1;
                    }
                  }
                `}</style>
                            )}
                            <div className="image-grid-modal grid grid-cols-1 gap-8">
                                {img3 && <ModalImage image={img3} projectId={projectId} index={2} isSingleColumn={isSingleColumnProject} layoutTransition={layoutTransition} />}
                                {img2 && <ModalImage image={img2} projectId={projectId} index={1} isSingleColumn={isSingleColumnProject} layoutTransition={layoutTransition} />}
                                {img1 && <ModalImage image={img1} projectId={projectId} index={0} isSingleColumn={isSingleColumnProject} layoutTransition={layoutTransition} />}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
