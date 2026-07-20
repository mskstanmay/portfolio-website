import { Route, Routes } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Submissions from '@/components/Submissions';
import Experience from '@/components/Experience';
import About from '@/components/About';
import Skills from '@/components/Skills';
import LeetCode from '@/components/LeetCode';
import GitHub from '@/components/GitHub';
import Recognition from '@/components/Recognition';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Final information architecture (see the integration-milestone writeup for
// the reasoning): proof of work leads, because that's what a reader decides
// on first; About follows once that credibility is established, not before
// it. Skills / LeetCode / GitHub / Recognition form a deliberate
// quick-reference cluster — dense, scannable, non-narrative sections grouped
// together right before Contact, rather than interleaved with the narrative
// sections above them.
function HomePage() {
  return (
    <>
      <Hero />
      <Submissions />
      <Experience />
      <About />
      <Skills />
      <LeetCode />
      <GitHub />
      <Recognition />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
