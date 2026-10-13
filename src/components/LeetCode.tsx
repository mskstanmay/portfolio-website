import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import ErrorBoundary from './ErrorBoundary';
import { useLeetCode } from '@/hooks/useLeetCode';
import {
  LEETCODE_PEAK_CONTEST_RATING,
  LEETCODE_PROFILE_URL,
  LEETCODE_USERNAME,
} from '@/utils/constants';
import type { LeetCodeTopic } from '@/types';

function StatCard({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: number;
  colorClass: string;
}) {
  return (
    <div className="panel p-6 text-center">
      <p className={`stat-number text-3xl font-extrabold ${colorClass}`}>{value}</p>
      <p className="mt-2 text-sm font-medium text-slate-400">{label}</p>
    </div>
  );
}

interface ProficiencyTier {
  label: string;
  description: string;
  colorClass: string;
  barClass: string;
  topics: LeetCodeTopic[];
}

function buildProficiencyTiers(topics: LeetCodeTopic[]): ProficiencyTier[] {
  const sorted = [...topics].sort((a, b) => b.count - a.count);

  const proficient = sorted.filter((t) => t.count >= 30);
  const developing = sorted.filter((t) => t.count >= 10 && t.count < 30);
  const exploring = sorted.filter((t) => t.count < 10);

  return [
    {
      label: 'Proficient In',
      description: 'Topics with the most problems solved',
      colorClass: 'text-emerald-400',
      barClass: 'bg-emerald-400',
      topics: proficient,
    },
    {
      label: 'Developing',
      description: 'Solid practice, building depth',
      colorClass: 'text-amber-400',
      barClass: 'bg-amber-400',
      topics: developing,
    },
    {
      label: 'Starting Out',
      description: 'Just getting started here',
      colorClass: 'text-slate-400',
      barClass: 'bg-slate-500',
      topics: exploring,
    },
  ].filter((tier) => tier.topics.length > 0);
}

function TopicProficiency({ topics, reveal }: { topics: LeetCodeTopic[]; reveal: object }) {
  if (topics.length === 0) {
    return null;
  }

  const maxCount = Math.max(...topics.map((t) => t.count));
  const tiers = buildProficiencyTiers(topics);

  return (
    <motion.div {...reveal} className="panel mt-6 p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-200">Topic Proficiency</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div key={tier.label}>
            <p className={`text-sm font-semibold ${tier.colorClass}`}>{tier.label}</p>
            <p className="mb-3 text-xs text-slate-400">{tier.description}</p>
            <ul className="space-y-2">
              {tier.topics.slice(0, 6).map((topic) => (
                <li key={topic.topic}>
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                    <span>{topic.topic}</span>
                    <span className="stat-number">{topic.count}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-dark-600">
                    <div
                      className={`h-full rounded-full ${tier.barClass}`}
                      style={{ width: `${Math.max((topic.count / maxCount) * 100, 4)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="panel animate-pulse p-6 text-center">
      <div className="mx-auto h-8 w-16 rounded bg-dark-600" />
      <div className="mx-auto mt-3 h-4 w-20 rounded bg-dark-600" />
    </div>
  );
}

function LeetCodeContent({ reduceMotion }: { reduceMotion: boolean }) {
  const { stats, loading, error } = useLeetCode();

  const statsReveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 as const },
        transition: { duration: 0.35, ease: 'easeOut' as const },
      };
  const topicReveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 as const },
        transition: { duration: 0.35, delay: 0.08, ease: 'easeOut' as const },
      };

  if (error) {
    return (
      <div className="panel p-6 text-center text-slate-400">
        Couldn&apos;t load LeetCode stats right now.{' '}
        <a
          href={LEETCODE_PROFILE_URL}
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

  if (loading || !stats) {
    return (
      <div className="grid gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <motion.div {...statsReveal} className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Total Solved" value={stats.totalSolved} colorClass="text-primary-400" />
        <StatCard label="Easy" value={stats.easySolved} colorClass="text-emerald-400" />
        <StatCard label="Medium" value={stats.mediumSolved} colorClass="text-amber-400" />
        <StatCard label="Hard" value={stats.hardSolved} colorClass="text-rose-400" />
      </motion.div>
      {stats.isStatic && (
        <p className="mt-4 text-center text-xs text-slate-400">Last synced manually</p>
      )}
      <TopicProficiency topics={stats.topics} reveal={topicReveal} />
    </div>
  );
}

export default function LeetCode() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section id="leetcode" className="section-container">
      <SectionHeading
        eyebrow="Competitive Programming"
        title="LeetCode Progress"
        description={`Live problem-solving stats for @${LEETCODE_USERNAME}, with a peak contest rating of ${LEETCODE_PEAK_CONTEST_RATING}. A manually synced fallback is identified whenever live data is unavailable.`}
      />
      <ErrorBoundary fallbackMessage="Couldn't load LeetCode stats right now.">
        <LeetCodeContent reduceMotion={reduceMotion} />
      </ErrorBoundary>
    </section>
  );
}
