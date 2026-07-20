import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import SubmissionCard from './SubmissionCard';
import { EXPERIENCE, PROJECTS } from '@/utils/constants';
import { experienceToSubmission } from '@/utils/submissions';

export default function Experience() {
  const reduceMotion = useReducedMotion();
  const submissions = EXPERIENCE.map((entry, idx) => experienceToSubmission(entry, idx, PROJECTS));

  const revealProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.35, ease: 'easeOut' as const },
      };

  return (
    <section id="experience" className="section-container">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've worked"
        description="Roles where the work above actually got built: real teams, real constraints, real deadlines."
      />

      <div className="flex flex-col gap-6">
        {submissions.map((submission, idx) => (
          <motion.div key={submission.id} {...revealProps} transition={{ ...revealProps.transition, delay: idx * 0.06 }}>
            <SubmissionCard submission={submission} variant="featured" showVerdict={false} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
