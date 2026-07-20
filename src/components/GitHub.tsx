import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import ErrorBoundary from './ErrorBoundary';
import { useGitHub } from '@/hooks/useGitHub';
import { GITHUB_USERNAME } from '@/utils/constants';
import { findMatchingProject, getDisplayTitle, getTechnicalHighlight } from '@/utils/github';
import { GitHubIcon } from './icons';

function RepoSkeleton() {
  return (
    <div className="panel animate-pulse p-6">
      <div className="h-5 w-2/3 rounded bg-dark-600" />
      <div className="mt-3 h-4 w-full rounded bg-dark-600" />
      <div className="mt-2 h-4 w-4/5 rounded bg-dark-600" />
      <div className="mt-4 h-4 w-1/3 rounded bg-dark-600" />
    </div>
  );
}

function GitHubContent({ reduceMotion }: { reduceMotion: boolean }) {
  const { repos, loading, error } = useGitHub();

  if (error) {
    return (
      <div className="panel p-6 text-center text-slate-400">
        Couldn&apos;t load GitHub repositories right now.{' '}
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="text-primary-400 hover:underline"
        >
          View profile directly
        </a>
        .
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <RepoSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo, idx) => {
        const project = findMatchingProject(repo);
        return (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.1 as const },
                  transition: { duration: 0.35, delay: (idx % 3) * 0.06, ease: 'easeOut' as const },
                })}
            className="panel flex flex-col p-6 transition-transform hover:-translate-y-1"
          >
            <h3 className="flex items-center gap-2 text-base font-bold text-white">
              <GitHubIcon className="h-4 w-4 text-slate-400" />
              {getDisplayTitle(repo, project)}
            </h3>
            <p className="mt-2 flex-1 text-sm text-slate-400">
              {getTechnicalHighlight(repo, project)}
            </p>
            {repo.language && (
              <div className="mt-4 flex items-center gap-2">
                <span className="tag">{repo.language}</span>
              </div>
            )}
          </motion.a>
        );
      })}
    </div>
  );
}

export default function GitHub() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section id="github" className="section-container">
      <SectionHeading
        eyebrow="Open Source"
        title="Featured Repositories"
        description={`What each of these repos on my GitHub (@${GITHUB_USERNAME}) actually demonstrates, beyond the raw code.`}
      />
      <ErrorBoundary fallbackMessage="Couldn't load GitHub repositories right now.">
        <GitHubContent reduceMotion={reduceMotion} />
      </ErrorBoundary>
    </section>
  );
}
