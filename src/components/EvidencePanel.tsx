import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Evidence } from '@/types';

interface EvidencePanelProps {
  open: boolean;
  postmortem?: string;
  evidence?: Evidence[];
  /** id of the disclosure trigger button, for aria-labelledby. */
  labelledBy?: string;
  id: string;
}

export default function EvidencePanel({ open, postmortem, evidence, labelledBy, id }: EvidencePanelProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="evidence"
          id={id}
          role="region"
          aria-labelledby={labelledBy}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div className="mt-4 space-y-4 border-t border-dark-500 pt-4">
            {postmortem && <p className="text-sm text-slate-400">{postmortem}</p>}

            {evidence && evidence.length > 0 && (
              <div>
                <p className="eyebrow mb-2">Evidence</p>
                <ul className="space-y-1.5">
                  {evidence.map((item) => (
                    <li key={item.url}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-primary-400 underline decoration-primary-400/30 underline-offset-2 transition-colors hover:decoration-primary-400"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
