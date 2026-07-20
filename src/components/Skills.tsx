import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { SKILLS } from '@/utils/constants';

export default function Skills() {
  const reduceMotion = useReducedMotion();

  const cardReveal = (idx: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.1 as const },
          transition: { duration: 0.35, delay: idx * 0.06, ease: 'easeOut' as const },
        };

  return (
    <section id="skills" className="section-container">
      <SectionHeading
        eyebrow="Skills"
        title="Technologies I work with"
        description="A categorized snapshot of the languages, frameworks, tools, and cloud platforms I use regularly."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {SKILLS.map((category, idx) => (
          <motion.div key={category.category} {...cardReveal(idx)} className="panel p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-400">
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span key={skill.name} className="badge">
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
