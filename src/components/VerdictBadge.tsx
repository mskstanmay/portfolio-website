import type { SubmissionStatus } from '@/types';

// SubmissionStatus (types/index.ts) is the single source of truth for status
// vocabulary — this used to define its own parallel 'Verdict' type with
// different string values ('accepted' vs 'shipped'), which the compiler
// correctly rejected the moment a second consumer (SubmissionCard) needed
// both. Re-exported here for convenience so call sites don't need to know
// the type lives in `types`.
export type { SubmissionStatus };

const STATUS_CLASS: Record<SubmissionStatus, string> = {
  shipped: 'verdict-badge-accepted',
  'in-progress': 'verdict-badge-progress',
  archived: 'verdict-badge-archived',
  'wrong-answer': 'verdict-badge-wrong-answer',
};

const STATUS_DEFAULT_LABEL: Record<SubmissionStatus, string> = {
  shipped: 'Accepted',
  'in-progress': 'In Progress',
  archived: 'Archived',
  'wrong-answer': 'Wrong Answer',
};

interface VerdictBadgeProps {
  verdict: SubmissionStatus;
  /** Override the default label, e.g. a runtime/impact note instead of "Accepted". */
  label?: string;
}

export default function VerdictBadge({ verdict, label }: VerdictBadgeProps) {
  return (
    <span className={`verdict-badge ${STATUS_CLASS[verdict]}`}>
      {label ?? STATUS_DEFAULT_LABEL[verdict]}
    </span>
  );
}
