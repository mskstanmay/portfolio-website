import { useEffect, useState } from 'react';
import axios from 'axios';
import { LEETCODE_USERNAME } from '@/utils/constants';
import type { LeetCodeStats } from '@/types';

const PRIMARY_API = 'https://leetcode-stats-api.herokuapp.com';
const FALLBACK_API = 'https://alfa-leetcode-api.onrender.com';
const REQUEST_TIMEOUT_MS = 8000;

const STATIC_FALLBACK: Omit<LeetCodeStats, 'isStatic'> = {
  totalSolved: 375,
  easySolved: 180,
  mediumSolved: 160,
  hardSolved: 35,
  totalEasy: 844,
  totalMedium: 1768,
  totalHard: 740,
  ranking: 238492,
  acceptanceRate: 54.2,
};

interface UseLeetCodeResult {
  stats: LeetCodeStats | null;
  loading: boolean;
  error: string | null;
}

interface PrimaryApiResponse {
  status: string;
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

interface FallbackApiResponse {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: number;
}

async function fetchFromPrimary(username: string): Promise<LeetCodeStats | null> {
  try {
    const response = await axios.get<PrimaryApiResponse>(`${PRIMARY_API}/${username}`, {
      timeout: REQUEST_TIMEOUT_MS,
    });

    console.log('[LeetCode] primary response:', response.data);

    if (response.status !== 200 || response.data.status !== 'success') {
      return null;
    }

    return {
      totalSolved: response.data.totalSolved,
      easySolved: response.data.easySolved,
      mediumSolved: response.data.mediumSolved,
      hardSolved: response.data.hardSolved,
      totalEasy: response.data.totalEasy,
      totalMedium: response.data.totalMedium,
      totalHard: response.data.totalHard,
      ranking: response.data.ranking,
      acceptanceRate: response.data.acceptanceRate,
      isStatic: false,
    };
  } catch {
    return null;
  }
}

async function fetchFromFallback(username: string): Promise<LeetCodeStats | null> {
  try {
    const response = await axios.get<FallbackApiResponse>(`${FALLBACK_API}/${username}`, {
      timeout: REQUEST_TIMEOUT_MS,
    });

    console.log('[LeetCode] fallback response:', response.data);

    if (response.status !== 200) {
      return null;
    }

    return {
      totalSolved: response.data.totalSolved,
      easySolved: response.data.easySolved,
      mediumSolved: response.data.mediumSolved,
      hardSolved: response.data.hardSolved,
      totalEasy: STATIC_FALLBACK.totalEasy,
      totalMedium: STATIC_FALLBACK.totalMedium,
      totalHard: STATIC_FALLBACK.totalHard,
      ranking: response.data.ranking,
      acceptanceRate: response.data.acceptanceRate,
      isStatic: false,
    };
  } catch {
    return null;
  }
}

export function useLeetCode(username: string = LEETCODE_USERNAME): UseLeetCodeResult {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      setLoading(true);

      const primaryResult = await fetchFromPrimary(username);
      const fallbackResult = primaryResult ?? (await fetchFromFallback(username));
      if (!primaryResult && !fallbackResult) {
        console.log('[LeetCode] falling back to static');
      }
      const finalResult: LeetCodeStats =
        fallbackResult ?? { ...STATIC_FALLBACK, isStatic: true };

      console.log('[LeetCode] final stats object:', finalResult);

      if (!cancelled) {
        setStats(finalResult);
        setLoading(false);
      }
    }

    fetchStats();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { stats, loading, error };
}
