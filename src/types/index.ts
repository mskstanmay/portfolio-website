export interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'email' | 'leetcode';
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

export interface SkillCategory {
  category: 'Languages' | 'Frameworks' | 'Tools' | 'Cloud';
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface LeetCodeDifficultyStat {
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'All';
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
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
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
