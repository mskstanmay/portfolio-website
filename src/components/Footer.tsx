import { PERSONAL_INFO } from '@/utils/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-600 bg-dark-900">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-400">
          &copy; {year} {PERSONAL_INFO.shortName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
