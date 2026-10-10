import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();

  const revealProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 as const },
        transition: { duration: 0.35, ease: 'easeOut' as const },
      };

  return (
    <motion.div {...revealProps} className={`mb-12 ${className ?? 'max-w-2xl'}`}>
      {/* `.eyebrow` (mono, uppercase, tracked) — the same label treatment
          Submissions' "More submissions" and Recognition's category headings
          use, unified here during the site-wide integration pass so every
          section's eyebrow now reads identically instead of two competing
          styles (text-sm sans vs text-xs mono) coexisting on the same page. */}
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-slate-400">{description}</p>}
    </motion.div>
  );
}
