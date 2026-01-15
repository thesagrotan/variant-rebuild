
export interface FrameConfig {
    id: string;
    tag: string;
    initialX: { relX: number; relY: number; w: number; h: number };
    width: number;
    height: number;
    rotation: number;
    component: 'VariantLogo' | 'ProductivityApp' | 'RamsClock' | 'RadarChart' | 'PoeticWeather' | 'MediaPlayer' | 'PredictionMarket' | 'NavBar' | 'StoriesWidget' | 'ScribblePad' | 'VariantManifesto';
}

export const FRAMES: FrameConfig[] = [
    {
        id: 'variant-logo',
        tag: 'variant-logo',
        initialX: { relX: -7, relY: 13, w: 254, h: 278 },
        width: 254,
        height: 278,
        rotation: -3,
        component: 'VariantLogo'
    },
    {
        id: 'productivity-app',
        tag: 'productivity app',
        initialX: { relX: -544, relY: -35, w: 189, h: 352 },
        width: 189,
        height: 352,
        rotation: 6,
        component: 'ProductivityApp'
    },
    {
        id: 'rams-clock',
        tag: 'rams clock',
        initialX: { relX: -379, relY: -158, w: 156, h: 179 },
        width: 156,
        height: 179,
        rotation: 4,
        component: 'RamsClock'
    },
    {
        id: 'radar-chart',
        tag: 'radar chart',
        initialX: { relX: -430, relY: -14, w: 191, h: 272 },
        width: 191,
        height: 272,
        rotation: -2,
        component: 'RadarChart'
    },
    {
        id: 'poetic-weather',
        tag: 'poetic weather',
        initialX: { relX: -202, relY: -53, w: 219, h: 279 },
        width: 219,
        height: 279,
        rotation: -7,
        component: 'PoeticWeather'
    },
    {
        id: 'media-player',
        tag: 'media player',
        initialX: { relX: -249, relY: 77, w: 264, h: 188 },
        width: 264,
        height: 188,
        rotation: 9,
        component: 'MediaPlayer'
    },
    {
        id: 'prediction-market',
        tag: 'prediction market',
        initialX: { relX: 194, relY: 10, w: 228, h: 437 },
        width: 228,
        height: 437,
        rotation: 4,
        component: 'PredictionMarket'
    },
    {
        id: 'nav-bar',
        tag: 'nav bar',
        initialX: { relX: 405, relY: -114, w: 264, h: 96 },
        width: 264,
        height: 96,
        rotation: -6,
        component: 'NavBar'
    },
    {
        id: 'stories-widget',
        tag: 'stories widget',
        initialX: { relX: 342, relY: 64, w: 205, h: 268 },
        width: 205,
        height: 268,
        rotation: -4,
        component: 'StoriesWidget'
    },
    {
        id: 'scribble-pad',
        tag: 'scribble pad',
        initialX: { relX: 542, relY: -107, w: 243, h: 285 },
        width: 243,
        height: 285,
        rotation: -5,
        component: 'ScribblePad'
    },
    {
        id: 'variant-manifesto',
        tag: 'variant manifesto',
        initialX: { relX: 497, relY: 110, w: 221, h: 282 },
        width: 221,
        height: 282,
        rotation: -15,
        component: 'VariantManifesto'
    }
];
