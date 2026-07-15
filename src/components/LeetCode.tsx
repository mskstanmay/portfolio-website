import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import ErrorBoundary from './ErrorBoundary';
import { useLeetCode } from '@/hooks/useLeetCode';
import { LEETCODE_USERNAME } from '@/utils/constants';

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
    <div className="card p-6 text-center">
      <p className={`text-3xl font-extrabold ${colorClass}`}>{value}</p>
      <p className="mt-2 text-sm font-medium text-slate-400">{label}</p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="card animate-pulse p-6 text-center">
      <div className="mx-auto h-8 w-16 rounded bg-dark-600" />
      <div className="mx-auto mt-3 h-4 w-20 rounded bg-dark-600" />
    </div>
  );
}

function LeetCodeContent() {
  const { stats, loading, error } = useLeetCode();

  console.log('[LeetCode] stats received by component:', stats);

  if (error) {
    return (
      <div className="card p-6 text-center text-slate-400">
        Couldn&apos;t load LeetCode stats right now.{' '}
        <a
          href={`https://leetcode.com/${LEETCODE_USERNAME}`}
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="grid gap-4 sm:grid-cols-4"
      >
        <StatCard label="Total Solved" value={stats.totalSolved} colorClass="text-primary-400" />
        <StatCard label="Easy" value={stats.easySolved} colorClass="text-emerald-400" />
        <StatCard label="Medium" value={stats.mediumSolved} colorClass="text-amber-400" />
        <StatCard label="Hard" value={stats.hardSolved} colorClass="text-rose-400" />
      </motion.div>
      {stats.isStatic && (
        <p className="mt-4 text-center text-xs text-slate-500">Last synced manually</p>
      )}
    </div>
  );
}

export default function LeetCode() {
  return (
    <section id="leetcode" className="section-container">
      <SectionHeading
        eyebrow="Competitive Programming"
        title="LeetCode Progress"
        description={`Live stats pulled from my LeetCode profile (@${LEETCODE_USERNAME}).`}
      />
      <ErrorBoundary fallbackMessage="Couldn't load LeetCode stats right now.">
        <LeetCodeContent />
      </ErrorBoundary>
    </section>
  );
}
