import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAnimationControls } from '../ui/AnimationControls';
// import { useProjectData } from '@/hooks/useProjectData'; // Removed
import { getModalVariants } from '../../animation/modalVariants';
import { ModalImage } from './ModalImage';
import { useScrollLock } from '@/hooks/useScrollLock';
import { Project } from '@/data/projects';
import { useStyles } from '../context/StylesContext';

interface ProjectModalProps {
    projectId: string;
    project: Project; // Added
    onClose: () => void;
}

export default function ProjectModal({ projectId, project, onClose }: ProjectModalProps) {
    const { styles } = useStyles();
    // const { getProjectById } = useProjectData(); // Removed
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
    useScrollLock(true);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // const project = getProjectById(projectId); // Removed

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

                className="fixed inset-0 z-[100] backdrop-blur-sm"
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
                <div
                    className="relative min-h-full w-full transition-colors duration-300 ease-out"
                    style={{ background: styles.globals?.background ?? 'var(--bg-solid)' }}
                >
                    {/* Background Overlay to match Canvas.tsx */}
                    <div className="absolute inset-0 bg-[var(--text-primary)]/5 backdrop-blur-[0.5px] pointer-events-none" />

                    <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-16">
                        {/* Back button and Chat button */}
                        <div className="flex justify-between items-center mb-16">
                            <motion.button
                                onClick={onClose}
                                className="p-2 rounded-full cursor-pointer"
                                initial={{ backgroundColor: 'transparent' }}
                                whileHover={{ scale: closeButtonScale, backgroundColor: 'var(--glass-hover)' }}
                                transition={{ duration: iconButtonDuration }}
                            >
                                <ArrowLeft className="w-6 h-6 text-text-primary" />
                            </motion.button>
                        </div>

                        {/* Project Info and Description */}
                        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start justify-center mb-32">
                            <div className="flex flex-col gap-6 w-full lg:w-45">
                                <div className="flex flex-col gap-2">
                                    <p className="text-[20px] font-medium leading-[1.3] text-text-primary">{title}</p>
                                    <p className="text-[14px] leading-[1.5] text-text-muted">{year}</p>
                                </div>

                                <div className="flex flex-col">
                                    {categories.map((category, index) => (
                                        <p key={index} className="text-[14px] leading-[1.5] text-text-muted">
                                            {category}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-8 w-full lg:max-w-[720px]">
                                {paragraphs.map((paragraph, index) => (
                                    <p key={index} className="text-[14px] leading-[1.5] text-text-primary opacity-90">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Image Grid */}
                        <div className="w-full">

                            <div className={`grid grid-cols-1 gap-8 ${!isSingleColumnProject ? 'lg:grid-cols-[3fr_2fr] [&>*:nth-child(3)]:lg:col-span-full' : ''}`}>
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

