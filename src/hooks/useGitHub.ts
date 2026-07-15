import { useEffect, useState } from 'react';
import axios from 'axios';
import { GITHUB_API_BASE, GITHUB_USERNAME } from '@/utils/constants';
import type { GitHubRepo } from '@/types';

interface UseGitHubResult {
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

export function useGitHub(username: string = GITHUB_USERNAME): UseGitHubResult {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRepos() {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get<GitHubRepo[]>(
          `${GITHUB_API_BASE}/users/${username}/repos`,
          { params: { per_page: 100, sort: 'updated' } }
        );

        const topRepos = [...data]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);

        if (!cancelled) {
          setRepos(topRepos);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to fetch GitHub repositories.'
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchRepos();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { repos, loading, error };
}
