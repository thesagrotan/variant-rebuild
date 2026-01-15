import { useControls, folder } from 'leva';

type ControlConfig = Record<string, any>;

export const CONTROL_SCHEMA: Array<{ name: string; controls: ControlConfig }> = [
    {
        name: 'Carousel', controls: {
            carouselEnabled: { value: true, label: 'Enable' },
            carouselDuration: { value: 80, min: 5, max: 60, step: 1, label: 'Duration (s)' },
        }
    },
    {
        name: 'Card Hover', controls: {
            cardHoverScale: { value: 1.05, min: 1.0, max: 1.3, step: 0.01, label: 'Scale' },
            cardHoverDuration: { value: 0.3, min: 0.1, max: 1.0, step: 0.05, label: 'Duration (s)' },
        }
    },
    {
        name: 'Modal Backdrop', controls: {
            backdropFadeDuration: { value: 0.2, min: 0.1, max: 1.0, step: 0.05, label: 'Fade Duration (s)' },
            backdropOpacity: { value: 0.4, min: 0.2, max: 0.8, step: 0.05, label: 'Opacity' },
        }
    },
    {
        name: 'Modal Slide', controls: {
            modalDamping: { value: 30, min: 10, max: 50, step: 1, label: 'Spring Damping' },
            modalStiffness: { value: 300, min: 100, max: 500, step: 10, label: 'Spring Stiffness' },
        }
    },
    {
        name: 'Modal Appearance Effect', controls: {
            modalAppearanceEffect: { value: 'fade', options: ['slide-up', 'fade', 'scale', 'rotate', 'popup'], label: 'Effect Type' },
            modalScaleFrom: { value: 0.9, min: 0.5, max: 1.0, step: 0.05, label: 'Scale Start' },
            modalRotateFrom: { value: -5, min: -45, max: 45, step: 1, label: 'Rotate Start (deg)' },
        }
    },
    {
        name: 'Layout Transition', controls: {
            layoutDuration: { value: 0.5, min: 0.3, max: 1.5, step: 0.05, label: 'Duration (s)' },
            layoutType: { value: 'spring', options: ['spring', 'tween'], label: 'Type' },
            layoutDamping: { value: 30, min: 10, max: 40, step: 1, label: 'Spring Damping (Open)' },
            layoutStiffness: { value: 250, min: 100, max: 400, step: 10, label: 'Spring Stiffness' },
            layoutExitDamping: { value: 25, min: 5, max: 40, step: 1, label: 'Spring Damping (Close)' },
        }
    },
    {
        name: 'Button Hover', controls: {
            buttonHoverDuration: { value: 0.15, min: 0.1, max: 0.5, step: 0.05, label: 'Duration (s)' },
            buttonHoverScale: { value: 1.02, min: 1.0, max: 1.1, step: 0.01, label: 'Scale' },
        }
    },
    {
        name: 'Icon Buttons', controls: {
            iconButtonDuration: { value: 0.15, min: 0.1, max: 0.5, step: 0.05, label: 'Duration (s)' },
            closeButtonScale: { value: 1.1, min: 1.0, max: 1.2, step: 0.05, label: 'Close Scale' },
        }
    },
    {
        name: 'Modal Images', controls: {
            imageScale: { value: 1.0, min: 0.5, max: 3.0, step: 0.05, label: 'Scale' },
            imagePositionX: { value: 50, min: 0, max: 100, step: 1, label: 'Position X (%)' },
            imagePositionY: { value: 50, min: 0, max: 100, step: 1, label: 'Position Y (%)' },
        }
    },
];

export function useAnimationControls() {
    const schema = CONTROL_SCHEMA.reduce((acc, group) => {
        acc[group.name] = folder(group.controls);
        return acc;
    }, {} as Record<string, any>);

    return useControls('Animation Controls', schema);
}
