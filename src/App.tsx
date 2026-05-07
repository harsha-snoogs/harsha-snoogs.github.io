import { useEffect } from 'react';
import { Navbar } from '@/components/common';
import {
  Hero,
  About,
  Skills,
  Experience,
  Projects,
  Achievements,
  Footer,
} from '@/components/sections';
import { NoiseOverlay } from '@/components/common';
import { useSmoothScroll } from '@/hooks';

function App() {
  useSmoothScroll();

  useEffect(() => {
    document.body.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-bg text-gray-100">
      <NoiseOverlay opacity={0.02} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
      </main>
      <Footer />
    </div>
  );
}

export default App;
