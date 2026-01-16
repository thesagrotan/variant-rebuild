'use client';

import { useState } from 'react';
import { Leva } from 'leva';
import { LayoutGroup, AnimatePresence } from 'framer-motion';
import { MainContent } from '@/components/home/MainContent';
import { Canvas } from '@/components/ui/Canvas';
// import { Footer } from '@/components/ui/Footer';
import { ScrollProvider } from '@/components/context/ScrollContext';
import ProjectModal from '@/components/modal/ProjectModal';
import { Project } from '@/data/projects';
import { FrameConfig } from '@/lib/frames';
import { SiteContent } from '@/data/siteContent';

interface ClientHomeProps {
    projects: Project[];
    frames: FrameConfig[];
    siteContent: SiteContent;
}

export default function ClientHome({ projects, frames, siteContent }: ClientHomeProps) {
    const [selectedProject, setSelectedProject] = useState<string | null>(null);

    const handleProjectClick = (projectId: string) => {
        setSelectedProject(projectId);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    // Find the full project object
    const selectedProjectData = selectedProject
        ? projects.find(p => p.id === selectedProject)
        : null;

    return (
        <main className="relative h-screen w-screen overflow-hidden selection:bg-[var(--text-muted)]">
            <Leva hidden collapsed />
            <LayoutGroup>
                <ScrollProvider>
                    {/* Background Layer (Z-0) */}
                    <Canvas frames={frames} />

                    {/* Bottom Content Area (Manifesto + Email Input + Selected Work) */}
                    <div className="max-w-[1440px] fixed bottom-0 left-0 w-full h-full z-20 flex flex-col items-start p-[12vh] pl-[16vw] justify-end pointer-events-none">
                        {/* Chat container needs pointer-events-auto for children */}
                        <div className="w-full max-w-[424px] pointer-events-auto">
                            <MainContent
                                onProjectClick={handleProjectClick}
                                projects={projects}
                                siteContent={siteContent}
                            />
                        </div>
                    </div>
                </ScrollProvider>

                <AnimatePresence>
                    {selectedProject && selectedProjectData && (
                        <ProjectModal
                            projectId={selectedProject} // Keep for now or remove if modal updated
                            project={selectedProjectData} // Pass the data directly
                            onClose={handleCloseModal}
                        />
                    )}
                </AnimatePresence>
            </LayoutGroup>
            {/* <Footer /> */}
        </main>
    );
}
