import { Chat } from '@/components/ui/Chat';
import { Canvas } from '@/components/ui/Canvas';
import { Footer } from '@/components/ui/Footer';
import { ScrollProvider } from '@/components/ScrollContext';
export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden text-white selection:bg-white/20">
      <ScrollProvider>
        {/* Background Layer (Z-0) */}
        <Canvas />

        {/* Bottom Content Area (Manifesto + Email Input) */}
        <div className="fixed bottom-8 left-6 z-20 flex flex-col gap-8 max-w-[400px]">
          <Chat />
        </div>
      </ScrollProvider>
      <Footer />
    </main>
  );
}
