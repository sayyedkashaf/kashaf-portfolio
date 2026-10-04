import React, { useState, useEffect } from 'react';
import SylvaHero from './components/SylvaHero';
import About from './components/About';
import CurrentFocus from './components/CurrentFocus';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('kashaf-theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches 
      ? 'light' 
      : 'dark';
  });

  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kashaf-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="portfolio-app">
      {/* Background ambient lighting blobs */}
      <div className="bg-ambient-blob blob-1" aria-hidden="true" />
      <div className="bg-ambient-blob blob-2" aria-hidden="true" />
      <div className="bg-ambient-blob blob-3" aria-hidden="true" />

      {/* Main Content with Sylva Living-Green 3D Hero */}
      <main>
        <SylvaHero
          variant="living-green"
          headingFont="lexend"
          bodyFont="lexend"
          headingWeight="300"
          bodyWeight="300"
          primaryColor="#ffffff"
          headingSize={61}
          bodySize={16}
          headingLetterSpacing={-0.006}
          onOpenResume={() => setResumeOpen(true)}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <About />
        <CurrentFocus />
        <Timeline />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Academic CV / Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
