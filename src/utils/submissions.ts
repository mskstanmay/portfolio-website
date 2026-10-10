import type { ExperienceEntry, Project, Submission } from '@/types';

/**
 * Adapts a Project into the shared Submission shape SubmissionCard renders.
 * Not wired into Projects.tsx yet — that swap happens when Projects.tsx
 * itself is rebuilt, so the current section keeps rendering from PROJECTS
 * directly until then.
 */
export function projectToSubmission(project: Project): Submission {
  const links: Submission['links'] = [];
  if (project.liveUrl) {
    links.push({ label: 'Live', url: project.liveUrl });
  }
  if (project.githubUrl) {
    links.push({ label: 'Code', url: project.githubUrl });
  }

  return {
    id: project.id,
    title: project.title,
    summary: project.description,
    tags: project.techStack,
    status: project.status ?? 'shipped',
    verdictLabel: project.verdict,
    postmortem: project.postmortem,
    evidence: project.evidence,
    media: project.media,
    links: links.length > 0 ? links : undefined,
    featured: project.featured,
  };
}

/**
 * Adapts an ExperienceEntry into the same Submission shape Experience.tsx
 * renders through SubmissionCard. `status` is set but SubmissionCard is
 * told not to display it (`showVerdict={false}`) — employment history
 * doesn't carry accepted/archived/wrong-answer semantics, a role either
 * happened or is ongoing. The field stays populated rather than optional
 * because Submission.status is required or a status doesn't exist, and
 * "shipped" is the least misleading value to carry, even unused.
 *
 * `projects` is an optional cross-reference: when an entry's `project`
 * field genuinely matches a real PROJECTS entry (e.g. AJNIFM's "Regulatory
 * Atlas (Live)"), that becomes a real evidence link — the actual repo the
 * bullets describe. No match, no evidence: nothing is invented to fill the
 * gap for Torque Gaming or India Space Lab, which don't have one.
 */
export function experienceToSubmission(
  entry: ExperienceEntry,
  index: number,
  projects: Project[] = []
): Submission {
  const linkedProject = entry.project
    ? projects.find((p) => entry.project!.toLowerCase().includes(p.title.toLowerCase()))
    : undefined;

  return {
    id: `experience-${index}-${entry.company}`,
    title: entry.role,
    subtitle: `${entry.company} · ${entry.period}`,
    bullets: entry.bullets,
    tags: [],
    status: 'shipped',
    evidence: linkedProject?.githubUrl
      ? [{ label: `Related project: ${linkedProject.title}`, url: linkedProject.githubUrl }]
      : undefined,
  };
}
