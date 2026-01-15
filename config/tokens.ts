/**
 * Design Tokens
 * 
 * Centralized design system values for consistent styling across the portfolio.
 * These tokens replace magic numbers and hardcoded values throughout the codebase.
 * 
 * Note: For Tailwind classes, we use constants to maintain static class names
 * that can be detected by the JIT compiler. For dynamic values, we use inline styles.
 */

// ========== COLORS ==========

export const COLORS = {
    // Primary palette
    background: '#edefeb',      // Off-white background
    primary: '#ffffff',         // White (for dark mode adaptation)
    primaryRgba: 'rgba(255, 255, 255, 1)', // White rgba

    // Interactive states
    buttonBg: '#292524',        // stone-800: Default button background
    buttonHover: '#44403c',     // stone-700: Button hover state

    // Backdrop/overlay
    modalBackdrop: 'rgba(0, 0, 0, 0.4)',

    // Shadows (rgba components)
    shadow: 'rgba(47, 62, 70, 1)', // Base shadow color
} as const;

// ========== SHADOWS ==========

/**
 * Card shadow - applied to project cards and modal images
 * Layered shadow for depth and elevation
 */
export const SHADOWS = {
    card: 'shadow-[41px_57px_20px_0px_rgba(47,62,70,0),26px_37px_18px_0px_rgba(47,62,70,0.01),15px_21px_15px_0px_rgba(47,62,70,0.05),7px_9px_11px_0px_rgba(47,62,70,0.09),2px_2px_6px_0px_rgba(47,62,70,0.1)]',

    button: 'shadow-[0px_76px_21px_0px_rgba(47,62,70,0),0px_49px_20px_0px_rgba(47,62,70,0.02),0px_27px_16px_0px_rgba(47,62,70,0.08),0px_12px_12px_0px_rgba(47,62,70,0.13),0px_3px_7px_0px_rgba(47,62,70,0.15)]',
} as const;

// ========== SPACING ==========

export const SPACING = {
    // Container max widths
    containerMax: 1440,         // Max width for main content container
    contentMax: 1200,           // Max width for selected work section
    textMax: 424,               // Max width for text content blocks
    carouselMax: 458,           // Max width for carousel component

    // Component-specific spacing
    cardStack: {
        offset1: 48,              // First card horizontal offset
        offset2: 24,              // Second card horizontal offset
        offset3: 0,               // Third card (no offset)
        gap: 88,                  // Gap between project cards
    },

    logo: {
        width: 107,
        height: 20,
        negativeMargin: -24,      // Reduced negative margin
    },

    categoryColumn: {
        width: 144,               // Width of category text column
    },

    linkColumn: {
        width: 194,               // Width of help links column
    },

    button: {
        paddingX: 18,
        paddingY: 15,
    },

    projectLink: {
        gap: 8,
        paddingY: 2,
    },
} as const;

// ========== DIMENSIONS ==========

export const DIMENSIONS = {
    // Card image sizing
    card: {
        baseWidth: 200, // Reduced from 285
        maxHeight: 130, // Reduced from 186
    },

    // Modal image heights (responsive)
    modal: {
        small: 320,
        medium: 420,
        large: 520,
    },
} as const;

// ========== TRANSFORMS ==========

export const TRANSFORMS = {
    // Card stack rotation angles
    rotation: {
        card1: 4,                 // degrees
        card2: 2,                 // degrees
        card3: 0,                 // degrees (no rotation)
    },
} as const;

// ========== BORDERS ==========

export const BORDERS = {
    radius: {
        card: 8,                  // Border radius for cards/modals
        button: 8,                // Border radius for buttons (using Tailwind 'lg')
    },
} as const;

// ========== TAILWIND CLASSES ==========
/**
 * Pre-built Tailwind classes for common patterns.
 * Using string literals to ensure Tailwind JIT compiler can detect them.
 */
export const CLASSES = {
    // Container classes
    container: 'max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16',
    contentSection: 'max-w-[1200px] mx-auto flex flex-col items-center',
    textBlock: 'max-w-[336px]',
    carouselContainer: 'max-w-[458px]',

    // Card stack positioning
    cardRotation: [
        'rotate-[4deg]',
        'rotate-[2deg]',
        '',  // No rotation for third card
    ] as const,

    cardMargins: {
        1: 'ml-[32px] mt-2',
        2: 'ml-[16px] mt-[24px]',
        3: 'ml-0 mt-[40px]',
    } as const,

    // Border and shadow
    cardBorder: 'border border-[#323e45] border-solid rounded-[8px]',
    cardShadow: SHADOWS.card,

    // Background colors
    pageBg: 'bg-[#edefeb]',
    buttonBg: 'bg-stone-800',

    // Sizing
    categoryColumn: 'w-[120px]',
    linkColumn: 'w-[160px]',
    logoSize: 'h-[20px] w-[107px]',
    cardGap: 'gap-[40px]',
    button: 'px-[18px] py-[15px]',
    projectLink: 'gap-[8px] py-[2px]',
} as const;
