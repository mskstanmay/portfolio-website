import { PERSONAL_INFO, SOCIAL_LINKS } from '@/utils/constants';
import { GitHubIcon, LinkedInIcon, TwitterIcon, EmailIcon, LeetCodeIcon } from './icons';

const ICON_MAP = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  email: EmailIcon,
  leetcode: LeetCodeIcon,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-600 bg-dark-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">
          &copy; {year} {PERSONAL_INFO.fullName}. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((link) => {
            const Icon = ICON_MAP[link.icon];
            return (
              <a
                key={link.name}
                href={link.url}
                target={link.icon === 'email' ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={link.name}
                className="text-slate-400 transition-colors hover:text-primary-400"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
