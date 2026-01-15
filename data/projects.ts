// Import project data from JSON
import projectsData from './projects.json';

export type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

export interface ProjectImageSettings {
    objectFit?: ObjectFit;
    objectPosition?: string;
    scale?: number;
    translateX?: string;
    translateY?: string;
}

// Default image settings - applied when not explicitly specified
const DEFAULT_IMAGE_SETTINGS: Required<ProjectImageSettings> = {
    objectFit: 'cover',
    objectPosition: 'center',
    scale: 1,
    translateX: '0',
    translateY: '0',
};

export interface ProjectImage extends ProjectImageSettings {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

export interface Project {
    id: string;
    title: string;
    year?: string;
    categories: string[];
    shortDescription?: string;
    longDescription: string;
    logo?: string; // Brand/logo asset for cards
    logoText?: string; // Alternative text logo
    images: {
        card: [ProjectImage, ProjectImage, ProjectImage];
        detail: [ProjectImage, ProjectImage, ProjectImage];
    };
}

// Transform image with context (card/detail), applying defaults for omitted settings
const transformImg = (img: any, ctx: 'card' | 'detail'): ProjectImage => ({
    src: img.src,
    alt: img.alt,
    width: img.width,
    height: img.height,
    ...DEFAULT_IMAGE_SETTINGS,
    ...img[ctx],
});

// Transform JSON data to typed projects
export const projects: Project[] = projectsData.projects.map((project: any) => ({
    ...project,
    images: {
        // Fill with empty/placeholder if not enough images, or just map existing
        // For now we assume the JSON structure matches what we expect or we handle empty arrays gracefully in UI
        card: (project.images?.map((img: any) => transformImg(img, 'card')) || []) as [ProjectImage, ProjectImage, ProjectImage],
        detail: (project.images?.map((img: any) => transformImg(img, 'detail')) || []) as [ProjectImage, ProjectImage, ProjectImage],
    },
}));

// Helper function to get project by ID
export function getProjectById(id: string): Project | undefined {
    return projects.find(project => project.id === id);
}
