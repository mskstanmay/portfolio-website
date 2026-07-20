import { useId, useState } from 'react';
import type { Submission } from '@/types';
import VerdictBadge from './VerdictBadge';
import EvidencePanel from './EvidencePanel';
import { ChevronDownIcon, ExternalLinkIcon, GitHubIcon } from './icons';

interface SubmissionCardProps {
  submission: Submission;
  /** 'featured' renders larger with more breathing room; 'compact' is for dense secondary grids. Purely presentational — does not affect data. */
  variant?: 'featured' | 'compact';
  /**
   * A verdict badge implies a project was "submitted" for judgment — true for
   * work with a shipped/archived/wrong-answer outcome, not true for a role
   * you held. Experience sets this false rather than forcing the badge onto
   * content it doesn't fit, per the instruction not to apply the metaphor
   * for consistency's sake alone.
   */
  showVerdict?: boolean;
}

export default function SubmissionCard({ submission, variant = 'compact', showVerdict = true }: SubmissionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  const hasEvidence = Boolean(submission.postmortem || (submission.evidence && submission.evidence.length > 0));
  const isFeatured = variant === 'featured';

  return (
    <article className="panel group flex h-full flex-col overflow-hidden">
      {/* Media slot: only renders when a Submission carries a real `media`
          entry. Nothing here fabricates a placeholder image — a submission
          without media simply skips straight to the padded content below,
          which is the deliberate "graceful when absent" behavior. */}
      {submission.media && (
        <div className={`w-full overflow-hidden bg-dark-700 ${isFeatured ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
          <img
            src={submission.media.src}
            alt={submission.media.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className={`flex flex-1 flex-col ${isFeatured ? 'p-8' : 'p-6'}`}>
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h3 className={`font-bold text-white ${isFeatured ? 'text-xl' : 'text-lg'}`}>{submission.title}</h3>
            {submission.subtitle && (
              <p className="mt-1 font-mono text-xs text-slate-400">{submission.subtitle}</p>
            )}
          </div>
          {showVerdict && (
            <div className="shrink-0">
              <VerdictBadge verdict={submission.status} label={submission.verdictLabel} />
            </div>
          )}
        </div>

        {submission.summary && <p className="mt-3 text-sm text-slate-400">{submission.summary}</p>}

        {submission.bullets && submission.bullets.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {submission.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2 text-sm text-slate-400">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-600" aria-hidden="true" />
                {bullet}
              </li>
            ))}
          </ul>
        )}

        {submission.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {submission.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-5">
          {submission.links?.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-primary-400"
            >
              {link.label === 'Code' ? (
                <GitHubIcon className="h-4 w-4" />
              ) : (
                <ExternalLinkIcon className="h-4 w-4" />
              )}
              {link.label}
            </a>
          ))}

          {hasEvidence && (
            <button
              type="button"
              className="disclosure-trigger"
              aria-expanded={expanded}
              aria-controls={panelId}
              id={`${panelId}-trigger`}
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? 'Hide details' : 'Show details'}
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              />
            </button>
          )}
        </div>

        {hasEvidence && (
          <EvidencePanel
            id={panelId}
            labelledBy={`${panelId}-trigger`}
            open={expanded}
            postmortem={submission.postmortem}
            evidence={submission.evidence}
          />
        )}
      </div>
    </article>
  );
}
