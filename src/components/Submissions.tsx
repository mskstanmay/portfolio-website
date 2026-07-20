import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import SubmissionCard from './SubmissionCard';
import { PROJECTS } from '@/utils/constants';
import { projectToSubmission } from '@/utils/submissions';

export default function Submissions() {
  const reduceMotion = useReducedMotion();
  const submissions = PROJECTS.map(projectToSubmission);
  const featured = submissions.filter((s) => s.featured);
  const other = submissions.filter((s) => !s.featured);

  // Low viewport threshold + `once: true` so cards resolve almost
  // immediately on scroll rather than waiting for a large portion of the
  // card to cross into view — content should never look "missing" to a
  // fast scroller or a non-scrolling consumer (see Agentic Browsing note in
  // the original audit). Reduced-motion users skip the transform entirely.
  const revealProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.35, ease: 'easeOut' as const },
      };

  return (
    <section id="projects" className="section-container">
      <SectionHeading
        eyebrow="Submissions"
        title="Selected work"
        description="Projects I've shipped, with honest outcomes attached, not just polished descriptions of what they do."
      />

      <div className="grid items-start gap-6 lg:grid-cols-2">
        {featured.map((submission, idx) => {
          // When the featured count is odd, the last card would otherwise
          // sit alone in a half-empty row. Rather than leaving that gap or
          // arbitrarily promoting one project to a "hero" position (a
          // judgment call that isn't mine to make — see Milestone 3 notes),
          // the last card simply spans both columns so the row reads as
          // intentional either way.
          const isTrailingOdd = featured.length % 2 === 1 && idx === featured.length - 1;
          return (
            <motion.div
              key={submission.id}
              className={isTrailingOdd ? 'lg:col-span-2' : ''}
              {...revealProps}
              transition={{ ...revealProps.transition, delay: (idx % 2) * 0.06 }}
            >
              <SubmissionCard submission={submission} variant="featured" />
            </motion.div>
          );
        })}
      </div>

      {other.length > 0 && (
        <div className="mt-14">
          <p className="eyebrow mb-6">More submissions</p>
          <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {other.map((submission, idx) => (
              <motion.div key={submission.id} {...revealProps} transition={{ ...revealProps.transition, delay: (idx % 3) * 0.06 }}>
                <SubmissionCard submission={submission} variant="compact" />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
