import { useEffect, useState } from 'react';
import axios from 'axios';
import { GITHUB_USERNAME } from '@/utils/constants';
import type { GitHubRepo } from '@/types';

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

// Not declared in ImportMetaEnv to avoid touching vite-env.d.ts per task scope.
const GITHUB_TOKEN: string = (import.meta.env as Record<string, string | undefined>)
  .VITE_GITHUB_TOKEN ?? '';

interface UseGitHubResult {
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

const PINNED_REPOS_QUERY = `
  query pinnedRepos($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

interface GraphQLError {
  message: string;
}

interface PinnedRepoNode {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string } | null;
}

interface PinnedReposResponse {
  data?: {
    user: {
      pinnedItems: {
        nodes: PinnedRepoNode[];
      };
    } | null;
  };
  errors?: GraphQLError[];
}

export function useGitHub(username: string = GITHUB_USERNAME): UseGitHubResult {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPinnedRepos() {
      setLoading(true);
      setError(null);
      try {
        const { data: responseData } = await axios.post<PinnedReposResponse>(
          GITHUB_GRAPHQL_ENDPOINT,
          {
            query: PINNED_REPOS_QUERY,
            variables: { username },
          },
          {
            headers: {
              Authorization: `bearer ${GITHUB_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (responseData.errors && responseData.errors.length > 0) {
          throw new Error(responseData.errors.map((e) => e.message).join(', '));
        }

        const nodes = responseData.data?.user?.pinnedItems.nodes ?? [];

        if (nodes.length === 0) {
          throw new Error('No pinned repositories found');
        }

        const pinnedRepos: GitHubRepo[] = nodes.map((node, index) => ({
          id: index,
          name: node.name,
          description: node.description,
          html_url: node.url,
          stargazers_count: node.stargazerCount,
          forks_count: node.forkCount,
          language: node.primaryLanguage?.name ?? null,
        }));

        if (!cancelled) {
          setRepos(pinnedRepos);
        }
      } catch (err) {
        if (!cancelled) {
          if (axios.isAxiosError(err)) {
            setError(err.message || 'Failed to fetch GitHub repositories.');
          } else {
            setError(
              err instanceof Error ? err.message : 'Failed to fetch GitHub repositories.'
            );
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchPinnedRepos();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { repos, loading, error };
}
