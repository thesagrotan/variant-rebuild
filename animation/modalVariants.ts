// Extracted from ProjectModal.tsx — preserves exact semantics and return shapes.
// Data-driven variant lookup replaces switch statement for cleaner, more maintainable code.

type VariantConfig = {
    initial: Record<string, string | number>;
    animate: Record<string, string | number>;
    exit: Record<string, string | number>;
};

const VARIANT_CONFIGS: Record<string, (scaleFrom: number, rotateFrom: number) => VariantConfig> = {
    fade: () => ({
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    }),
    scale: (scaleFrom) => ({
        initial: { opacity: 0, scale: scaleFrom },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: scaleFrom }
    }),
    rotate: (scaleFrom, rotateFrom) => ({
        initial: { opacity: 0, scale: scaleFrom, rotate: rotateFrom },
        animate: { opacity: 1, scale: 1, rotate: 0 },
        exit: { opacity: 0, scale: scaleFrom, rotate: rotateFrom }
    }),
    popup: () => ({
        initial: { opacity: 0, scale: 0.5, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.5, y: 20 }
    }),
    'slide-up': () => ({
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%' }
    })
};

export function getModalVariants(effect: string, scaleFrom: number, rotateFrom: number) {
    const variantFn = VARIANT_CONFIGS[effect] || VARIANT_CONFIGS['slide-up'];
    return variantFn(scaleFrom, rotateFrom);
}

export type ModalVariants = ReturnType<typeof getModalVariants>;
