import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/utils/constants';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,108,246,0.18),_transparent_60%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="section-container"
      >
        <motion.p variants={item} className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-400">
          Hi, I&apos;m
        </motion.p>
        <motion.h1 variants={item} className="text-4xl font-extrabold text-white sm:text-6xl">
          {PERSONAL_INFO.name}
        </motion.h1>
        <motion.h2 variants={item} className="mt-4 text-xl font-semibold text-slate-300 sm:text-2xl">
          {PERSONAL_INFO.tagline}
        </motion.h2>
        <motion.p variants={item} className="mt-6 max-w-2xl text-base text-slate-400 sm:text-lg">
          {PERSONAL_INFO.subTagline}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
          >
            View Work
          </a>
          {PERSONAL_INFO.resumeUrl && (
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Download Resume
            </a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
