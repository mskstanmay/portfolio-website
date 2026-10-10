import { useEffect, useState } from 'react';
import axios from 'axios';
import { GITHUB_API_BASE, GITHUB_USERNAME, PROJECTS } from '@/utils/constants';
import { CURATED_REPO_PROJECT_IDS } from '@/utils/github';
import type { GitHubRepo } from '@/types';

interface UseGitHubResult {
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

interface RestRepoResponse {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
}

function slugFromUrl(url: string): string {
  return url.replace(/\/+$/, '').split('/').pop() ?? '';
}

// Unauthenticated GitHub REST calls against a fixed, curated set of repos —
// no token, no client-side secret. GitHub's public rate limit for
// unauthenticated requests (60/hr per IP) is per visitor here, since each
// request comes straight from the visitor's own browser.
export function useGitHub(username: string = GITHUB_USERNAME): UseGitHubResult {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchCuratedRepos() {
      setLoading(true);
      setError(null);
      try {
        const slugs = PROJECTS.filter(
          (p): p is typeof p & { githubUrl: string } =>
            CURATED_REPO_PROJECT_IDS.includes(p.id) && Boolean(p.githubUrl)
        ).map((p) => slugFromUrl(p.githubUrl));

        const results = await Promise.all(
          slugs.map((slug) =>
            axios
              .get<RestRepoResponse>(`${GITHUB_API_BASE}/repos/${username}/${slug}`)
              .then((res) => res.data)
              .catch(() => null)
          )
        );

        const fetched = results.filter((repo): repo is RestRepoResponse => repo !== null);

        if (fetched.length === 0) {
          throw new Error('No repositories found');
        }

        const mapped: GitHubRepo[] = fetched.map((repo) => ({
          id: repo.id,
          name: repo.name,
          html_url: repo.html_url,
          description: repo.description,
          language: repo.language,
        }));

        if (!cancelled) {
          setRepos(mapped);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch GitHub repositories.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchCuratedRepos();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { repos, loading, error };
}
