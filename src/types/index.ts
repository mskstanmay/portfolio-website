export interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'email' | 'leetcode';
}

export interface EducationEntry {
  institution: string;
  degree: string;
  duration: string;
  score?: string;
  description?: string;
}

export interface Skill {
  name: string;
}

// Corrected to match the categories actually used in constants.ts — the
// previous union ('Languages' | 'Frameworks' | 'Tools' | 'Cloud') didn't
// match any real data and was never applied to the SKILLS export, so the
// mismatch compiled silently. Now applied to SKILLS below.
export interface SkillCategory {
  category:
    | 'Languages'
    | 'Frontend'
    | 'Backend'
    | 'Databases'
    | 'Cloud/DevOps'
    | 'AI/ML'
    | 'Blockchain';
  skills: Skill[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  project?: string;
  bullets: string[];
}

// A verified, external supporting artifact for a claim — a commit, a
// write-up, a live URL. Backs the "evidence" half of the submission model
// (claims traceable to real work, not isolated marketing copy).
export interface Evidence {
  label: string;
  url: string;
}

export type SubmissionStatus = 'shipped' | 'in-progress' | 'archived' | 'wrong-answer';

// A real visual artifact — a screenshot, a rendered diagram, a demo capture.
// Never a stand-in/placeholder graphic: SubmissionCard is built to render
// cleanly with this field absent, specifically so no one is ever tempted to
// fill it with a fabricated image just to have "something" show. `alt` is
// required, not optional, so a media entry can never ship without real
// alt text.
export interface SubmissionMedia {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  // --- Fields below support the submission/verdict model (Milestones 3-4).
  // Optional for now so existing PROJECTS entries and Projects.tsx keep
  // compiling unchanged until that milestone rebuilds the component.
  status?: SubmissionStatus;
  /** Short, honest outcome note — e.g. "Adopted by 1,100+ users" or "Shelved after pilot feedback." */
  verdict?: string;
  /** Required when status is 'archived' or 'wrong-answer' — what didn't work and why. */
  postmortem?: string;
  evidence?: Evidence[];
  media?: SubmissionMedia;
}

// 'competitive' was a placeholder from Milestone 1, before the actual data
// had been examined closely — it lumped exam/hackathon results in with an
// ongoing skill signal (LeetCode volume) that's really a different kind of
// claim. Split to match what the entries actually are: a one-time result
// (award), a earned/issued qualification (certification), or an ongoing
// practice signal (competitive-programming) — the categories Recognition
// groups by.
export interface AchievementEntry {
  label: string;
  type: 'award' | 'certification' | 'competitive-programming';
  date?: string;
  url?: string;
}

// --- Shared display model for SubmissionCard --------------------------------
// Project and Experience are structurally different in their source data
// (a project has a tech stack and repo links; a role has a company and
// bullets) but should render through one consistent component. Submission is
// the normalized shape both get adapted into — see src/utils/submissions.ts.
// Nothing constructs or consumes this yet outside that adapter file; Projects
// and Experience keep rendering from their original types until their own
// milestones.

export interface SubmissionLink {
  label: string;
  url: string;
}

export interface Submission {
  id: string;
  title: string;
  /** Secondary line under the title — e.g. company + period for Experience. */
  subtitle?: string;
  /** Prose description. Mutually exclusive in practice with `bullets`, but both are allowed to render. */
  summary?: string;
  /** Structured detail list — used by Experience; Projects typically use `summary` instead. */
  bullets?: string[];
  tags: string[];
  status: SubmissionStatus;
  /** Overrides VerdictBadge's default label (e.g. "Adopted by 1,100+ users") without changing its color. */
  verdictLabel?: string;
  /** Required in practice once status is 'archived' or 'wrong-answer' — enforced by content review, not the type system. */
  postmortem?: string;
  evidence?: Evidence[];
  /** External actions — "Code", "Live", etc. Distinct from `evidence`, which backs a claim rather than linking out to the thing itself. */
  links?: SubmissionLink[];
  featured?: boolean;
  media?: SubmissionMedia;
}

export interface LeetCodeDifficultyStat {
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'All';
  count: number;
}

export interface LeetCodeTopic {
  topic: string;
  count: number;
}

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  ranking: number;
  acceptanceRate: number;
  isStatic: boolean;
  topics: LeetCodeTopic[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NavLink {
  label: string;
  href: string;
}
