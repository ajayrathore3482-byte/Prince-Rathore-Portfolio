import CosmicBackground from './components/common/CosmicBackground';
import Loader from './components/common/Loader';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import SectionDivider from './components/ui/SectionDivider';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#080A12] text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-[#398BFF] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      <CosmicBackground />
      <Loader />
      <Navbar />

      <main id="main-content" className="relative z-10">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
