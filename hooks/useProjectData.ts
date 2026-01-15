import { projects, getProjectById, Project } from '@/data/projects';

export const useProjectData = () => {
    return {
        projects,
        getProjectById
    };
};
