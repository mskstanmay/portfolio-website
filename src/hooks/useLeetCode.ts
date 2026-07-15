import { useEffect, useState } from 'react';
import axios from 'axios';
import { LEETCODE_USERNAME } from '@/utils/constants';

const LEETCODE_STATS_API = 'https://leetcode-stats-api.herokuapp.com';

export interface LeetCodeStatsData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  ranking: number;
  acceptanceRate: number;
}

interface UseLeetCodeResult {
  data: LeetCodeStatsData | null;
  loading: boolean;
  error: string | null;
}

interface LeetCodeStatsApiResponse {
  status: string;
  message?: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

export function useLeetCode(username: string = LEETCODE_USERNAME): UseLeetCodeResult {
  const [data, setData] = useState<LeetCodeStatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<LeetCodeStatsApiResponse>(
          `${LEETCODE_STATS_API}/${username}`
        );

        if (response.data.status !== 'success') {
          throw new Error(response.data.message || 'Failed to fetch LeetCode statistics.');
        }

        if (!cancelled) {
          setData({
            totalSolved: response.data.totalSolved,
            easySolved: response.data.easySolved,
            mediumSolved: response.data.mediumSolved,
            hardSolved: response.data.hardSolved,
            totalEasy: response.data.totalEasy,
            totalMedium: response.data.totalMedium,
            totalHard: response.data.totalHard,
            ranking: response.data.ranking,
            acceptanceRate: response.data.acceptanceRate,
          });
        }
      } catch (err) {
        if (!cancelled) {
          if (axios.isAxiosError(err)) {
            setError(err.response?.data?.message || err.message || 'Failed to fetch LeetCode statistics.');
          } else {
            setError(err instanceof Error ? err.message : 'Failed to fetch LeetCode statistics.');
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchStats();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { data, loading, error };
}
