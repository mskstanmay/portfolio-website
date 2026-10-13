import { useEffect, useState } from 'react';
import axios from 'axios';
import { LEETCODE_USERNAME } from '@/utils/constants';
import type { LeetCodeStats, LeetCodeTopic } from '@/types';

const PRIMARY_API = 'https://leetcode-stats.tashif.codes';
const FALLBACK_API = 'https://alfa-leetcode-api.onrender.com';
const REQUEST_TIMEOUT_MS = 8000;

const STATIC_FALLBACK: Omit<LeetCodeStats, 'isStatic'> = {
  totalSolved: 389,
  easySolved: 151,
  mediumSolved: 194,
  hardSolved: 44,
  totalEasy: 844,
  totalMedium: 1768,
  totalHard: 740,
  ranking: 341677,
  acceptanceRate: 88.54,
  topics: [],
};

interface UseLeetCodeResult {
  stats: LeetCodeStats | null;
  loading: boolean;
  error: string | null;
}

interface PrimaryApiResponse {
  status: string;
  profile: {
    ranking: number;
  };
  submitStats: {
    acSubmissionNum: { difficulty: string; count: number; submissions: number }[];
    totalSubmissionNum: { difficulty: string; count: number; submissions: number }[];
  };
}

interface TopicsApiResponse {
  status: string;
  data: LeetCodeTopic[];
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

function findByDifficulty(
  entries: { difficulty: string; count: number; submissions: number }[],
  difficulty: string,
) {
  return entries.find((entry) => entry.difficulty === difficulty);
}

async function fetchFromPrimary(username: string): Promise<LeetCodeStats | null> {
  try {
    const response = await axios.get<PrimaryApiResponse>(`${PRIMARY_API}/${username}/profile`, {
      timeout: REQUEST_TIMEOUT_MS,
    });

    if (response.status !== 200 || response.data.status !== 'success') {
      return null;
    }

    const { acSubmissionNum, totalSubmissionNum } = response.data.submitStats;
    const all = findByDifficulty(acSubmissionNum, 'All');
    const easy = findByDifficulty(acSubmissionNum, 'Easy');
    const medium = findByDifficulty(acSubmissionNum, 'Medium');
    const hard = findByDifficulty(acSubmissionNum, 'Hard');
    const allSubmissions = findByDifficulty(totalSubmissionNum, 'All');

    if (!all || !easy || !medium || !hard || !allSubmissions) {
      return null;
    }

    const acceptanceRate =
      allSubmissions.submissions > 0
        ? (all.submissions / allSubmissions.submissions) * 100
        : 0;

    return {
      totalSolved: all.count,
      easySolved: easy.count,
      mediumSolved: medium.count,
      hardSolved: hard.count,
      totalEasy: STATIC_FALLBACK.totalEasy,
      totalMedium: STATIC_FALLBACK.totalMedium,
      totalHard: STATIC_FALLBACK.totalHard,
      ranking: response.data.profile.ranking,
      acceptanceRate,
      isStatic: false,
      topics: await fetchTopics(username),
    };
  } catch {
    return null;
  }
}

async function fetchTopics(username: string): Promise<LeetCodeTopic[]> {
  try {
    const response = await axios.get<TopicsApiResponse>(`${PRIMARY_API}/${username}/topics`, {
      timeout: REQUEST_TIMEOUT_MS,
    });

    if (response.status !== 200 || response.data.status !== 'success') {
      return [];
    }

    return response.data.data;
  } catch {
    return [];
  }
}

async function fetchFromFallback(username: string): Promise<LeetCodeStats | null> {
  try {
    const response = await axios.get<FallbackApiResponse>(`${FALLBACK_API}/${username}`, {
      timeout: REQUEST_TIMEOUT_MS,
    });

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
      topics: [],
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
      const finalResult: LeetCodeStats =
        fallbackResult ?? { ...STATIC_FALLBACK, isStatic: true };

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
