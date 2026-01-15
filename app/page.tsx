'use client';

import { useState } from 'react';
import { Leva } from 'leva';
import { LayoutGroup, AnimatePresence } from 'framer-motion';
import { MainContent } from '@/components/home/MainContent';
import { Canvas } from '@/components/ui/Canvas';
// import { Footer } from '@/components/ui/Footer';
import { ScrollProvider } from '@/components/context/ScrollContext';
import ProjectModal from '@/components/modal/ProjectModal';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden selection:bg-[var(--text-muted)]">
      <Leva hidden collapsed />
      <LayoutGroup>
        <ScrollProvider>
          {/* Background Layer (Z-0) */}
          <Canvas />

          {/* Bottom Content Area (Manifesto + Email Input + Selected Work) */}
          <div className="max-w-[1440px] fixed bottom-0 left-0 w-full h-full z-20 flex flex-col items-start p-12 pl-40 justify-end pointer-events-none">
            {/* Chat container needs pointer-events-auto for children */}
            <div className="w-full max-w-[424px] pointer-events-auto pb-8">
              <MainContent onProjectClick={handleProjectClick} />
            </div>
          </div>
        </ScrollProvider>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              projectId={selectedProject}
              onClose={handleCloseModal}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>
      {/* <Footer /> */}
    </main>
  );
}
