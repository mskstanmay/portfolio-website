import SectionHeading from './SectionHeading';
import { ACHIEVEMENTS } from '@/utils/constants';
import type { AchievementEntry } from '@/types';
import { ExternalLinkIcon } from './icons';

const GROUP_ORDER: AchievementEntry['type'][] = ['award', 'certification', 'competitive-programming'];

const GROUP_HEADING: Record<AchievementEntry['type'], string> = {
  award: 'Awards & Results',
  certification: 'Certifications',
  'competitive-programming': 'Competitive Programming',
};

export default function Recognition() {
  const groups = GROUP_ORDER.map((type) => ({
    type,
    heading: GROUP_HEADING[type],
    items: ACHIEVEMENTS.filter((a) => a.type === type),
  })).filter((group) => group.items.length > 0);

  return (
    <section id="recognition" className="section-container">
      <SectionHeading
        eyebrow="Recognition"
        title="Results, certifications, and standing"
        description="A quick reference, not a story: competition results, issued certifications, and ongoing practice signals."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {groups.map((group) => (
          <div key={group.type} className="panel p-6">
            <p className="eyebrow mb-4">{group.heading}</p>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item.label} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-start gap-1.5 transition-colors hover:text-primary-400"
                    >
                      <span>{item.label}</span>
                      <ExternalLinkIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    </a>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
