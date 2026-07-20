import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { EDUCATION, PERSONAL_INFO } from '@/utils/constants';

export default function About() {
  const reduceMotion = useReducedMotion();

  const photoReveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.9 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, amount: 0.1 as const },
        transition: { duration: 0.35, ease: 'easeOut' as const },
      };

  const bioReveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 as const },
        transition: { duration: 0.35, ease: 'easeOut' as const },
      };

  const educationReveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 as const },
        transition: { duration: 0.35, delay: 0.08, ease: 'easeOut' as const },
      };

  // Only one EDUCATION entry remains after the content pass (pre-university
  // schooling was removed — see constants.ts), so this renders as a single
  // compact line rather than the timeline-with-connecting-dots pattern that
  // made sense for three entries but reads as a broken/pointless decoration
  // for one.
  const education = EDUCATION[0];

  return (
    <section id="about" className="section-container">
      <SectionHeading eyebrow="About Me" title="Who I am, what I build" />

      <div className="grid gap-12 md:grid-cols-[280px_1fr]">
        <motion.div
          {...photoReveal}
          className="mx-auto h-56 w-56 shrink-0 overflow-hidden rounded-2xl border border-dark-500 bg-dark-800 md:mx-0"
        >
          <img
            src={PERSONAL_INFO.profileImage}
            alt={PERSONAL_INFO.fullName}
            width={224}
            height={224}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div>
          <motion.p {...bioReveal} className="text-slate-300">
            {PERSONAL_INFO.bio}
          </motion.p>

          {education && (
            <motion.div
              {...educationReveal}
              className="mt-8 border-t border-dark-500 pt-6 text-sm"
            >
              <p className="font-semibold text-white">{education.degree}</p>
              <p className="mt-1 text-slate-400">
                {education.institution} · {education.duration}
              </p>
              {education.score && <p className="mt-1 text-slate-400">{education.score}</p>}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
