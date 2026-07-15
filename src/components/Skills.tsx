import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { SKILLS } from '@/utils/constants';

export default function Skills() {
  return (
    <section id="skills" className="section-container">
      <SectionHeading
        eyebrow="Skills"
        title="Technologies I work with"
        description="A categorized snapshot of the languages, frameworks, tools, and cloud platforms I use regularly."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {SKILLS.map((category, idx) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="card p-6"
          >
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
