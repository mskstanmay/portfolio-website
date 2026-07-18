import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { EDUCATION, PERSONAL_INFO } from '@/utils/constants';

export default function About() {
  return (
    <section id="about" className="section-container">
      <SectionHeading
        eyebrow="About Me"
        title="Get to know me"
        description="A quick overview of who I am and where I've studied."
      />

      <div className="grid gap-12 md:grid-cols-[280px_1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto h-56 w-56 shrink-0 overflow-hidden rounded-2xl border border-dark-500 bg-dark-800 md:mx-0"
        >
          <img
            src={PERSONAL_INFO.profileImage}
            alt={PERSONAL_INFO.fullName}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-slate-300"
          >
            {PERSONAL_INFO.bio}
          </motion.p>

          <div className="mt-8 space-y-6 border-l border-dark-500 pl-6">
            {EDUCATION.map((entry, idx) => (
              <motion.div
                key={entry.institution}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-primary-500" />
                <p className="text-sm font-semibold text-primary-400">{entry.duration}</p>
                <h3 className="text-lg font-bold text-white">{entry.degree}</h3>
                <p className="text-sm text-slate-400">{entry.institution}</p>
                {entry.score && <p className="text-sm text-slate-500"><b>{entry.score}</b></p>}
                {entry.description && (
                  <p className="mt-1 text-sm text-slate-400">{entry.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
