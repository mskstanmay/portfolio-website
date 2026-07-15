import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import ErrorBoundary from './ErrorBoundary';
import { useGitHub } from '@/hooks/useGitHub';
import { GITHUB_USERNAME } from '@/utils/constants';
import { StarIcon, ForkIcon, GitHubIcon } from './icons';

function RepoSkeleton() {
  return (
    <div className="card animate-pulse p-6">
      <div className="h-5 w-2/3 rounded bg-dark-600" />
      <div className="mt-3 h-4 w-full rounded bg-dark-600" />
      <div className="mt-2 h-4 w-4/5 rounded bg-dark-600" />
      <div className="mt-4 h-4 w-1/3 rounded bg-dark-600" />
    </div>
  );
}

function GitHubContent() {
  const { repos, loading, error } = useGitHub();

  if (error) {
    return (
      <div className="card p-6 text-center text-slate-400">
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
        {Array.from({ length: 6 }).map((_, i) => (
          <RepoSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo, idx) => (
        <motion.a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
          className="card flex flex-col p-6 transition-transform hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-base font-bold text-white">
            <GitHubIcon className="h-4 w-4 text-slate-400" />
            {repo.name}
          </h3>
          <p className="mt-2 flex-1 text-sm text-slate-400">
            {repo.description || 'No description provided.'}
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
            {repo.language && <span className="badge">{repo.language}</span>}
            <span className="inline-flex items-center gap-1">
              <StarIcon className="h-4 w-4" />
              {repo.stargazers_count}
            </span>
            <span className="inline-flex items-center gap-1">
              <ForkIcon className="h-4 w-4" />
              {repo.forks_count}
            </span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

export default function GitHub() {
  return (
    <section id="github" className="section-container">
      <SectionHeading
        eyebrow="Open Source"
        title="Top GitHub Repositories"
        description={`Top 6 repositories by stars from my GitHub (@${GITHUB_USERNAME}).`}
      />
      <ErrorBoundary fallbackMessage="Couldn't load GitHub repositories right now.">
        <GitHubContent />
      </ErrorBoundary>

      <div className="card mt-8 flex flex-col items-center justify-center gap-2 p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-400">
          Contribution Graph
        </p>
        <img
          src={`https://ghchart.rshah.org/3b6cf6/${GITHUB_USERNAME}`}
          alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
          className="mt-2 w-full max-w-3xl"
          loading="lazy"
        />
      </div>
    </section>
  );
}
