import type { GitHubRepo, Project } from '@/types';
import { PROJECTS } from '@/utils/constants';

// Repo names come back from the GitHub API as raw slugs (kebab/snake case,
// triple-hyphens from old renames, etc). This turns e.g.
// "Virtual-EEPROM---Flash-Memory-Emulation" into "Virtual EEPROM Flash
// Memory Emulation" instead of showing the slug verbatim.
const KNOWN_ACRONYMS = new Set([
  'AI', 'ML', 'API', 'SDK', 'UI', 'UX', 'CV', 'HTS', 'HCS', 'EEPROM', 'SQL', 'PDF', 'HTTP',
]);

export function humanizeRepoName(name: string): string {
  return name
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => {
      const upper = word.toUpperCase();
      if (KNOWN_ACRONYMS.has(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function slugFromUrl(url: string): string {
  return url.replace(/\/+$/, '').split('/').pop()?.toLowerCase() ?? '';
}

// The GitHub section shows the same repos already curated in Selected Work
// (src/utils/constants.ts PROJECTS), so this reuses that data as the source
// of truth instead of trusting whatever description happens to be set on
// GitHub. Matching is by repo slug so it survives PROJECTS reordering.
export function findMatchingProject(repo: GitHubRepo, projects: Project[] = PROJECTS): Project | undefined {
  const repoSlug = repo.name.toLowerCase();
  return projects.find((p) => slugFromUrl(p.githubUrl) === repoSlug);
}

// A one-line "what this demonstrates technically" note, distinct from the
// outcome-focused copy in Selected Work — this section is about engineering
// signal (what was built with), that one is about impact (what happened
// because of it). Deliberately hand-written per project rather than derived
// from techStack automatically, since a generated "Built with X, Y, Z" line
// doesn't say anything a language badge doesn't already show.
const TECHNICAL_HIGHLIGHTS: Record<string, string> = {
  'regulatory-atlas':
    'FastAPI backend architecture with PDF processing pipelines and Gemini-based document enrichment, running in production.',
  filmfolio:
    'Type-safe data layer with Prisma and PostgreSQL, plus query optimization in a full-stack Next.js app.',
  velche: 'Rule-based automation and local-first data persistence inside a Chrome extension.',
  'ai-fitness-pose-estimation':
    'Real-time computer vision with OpenCV and MediaPipe for skeletal pose tracking.',
  'hedera-messaging':
    'Distributed systems design using Hedera Consensus Service for aBFT event ordering.',
  'eeg-biomarker': 'Applied ML explainability (SHAP) on biomedical signal data.',
  'electricity-forecasting': 'Full-stack geospatial forecasting with custom GeoJSON mapping.',
  'virtual-eeprom': 'Low-level flash memory emulation and wear-leveling logic written in C/C++.',
};

export function getTechnicalHighlight(repo: GitHubRepo, project?: Project): string {
  if (project && TECHNICAL_HIGHLIGHTS[project.id]) {
    return TECHNICAL_HIGHLIGHTS[project.id];
  }
  // No curated note and no usable description — say what's true (there's a
  // language) rather than a placeholder like "No description provided."
  if (repo.language) {
    return `A ${repo.language} project. See the repository for implementation details.`;
  }
  return 'See the repository for implementation details.';
}

export function getDisplayTitle(repo: GitHubRepo, project?: Project): string {
  return project?.title ?? humanizeRepoName(repo.name);
}

// Fixed set of PROJECTS entries the GitHub section fetches and displays.
// Fetching by this explicit, curated list (rather than GitHub's live
// "pinned repos", which requires an authenticated GraphQL call) means every
// card is guaranteed to resolve to its TECHNICAL_HIGHLIGHTS entry above —
// there's no dynamic list that can drift out of sync with what's curated
// here, and no token is needed to read it.
//
// 'regulatory-atlas' and 'ai-fitness-pose-estimation' are deliberately
// excluded: verified against the account's full public repo listing,
// neither exists as a public repository under any slug (likely private —
// regulatory-atlas is an internal employer project). Fetching them always
// 404s, so they're left out here rather than shown broken; they still have
// full write-ups in Selected Work, which doesn't depend on GitHub being
// able to fetch the repo.
export const CURATED_REPO_PROJECT_IDS = [
  'filmfolio',
  'velche',
  'hedera-messaging',
  'virtual-eeprom',
];
