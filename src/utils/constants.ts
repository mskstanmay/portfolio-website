import type {
  EducationEntry,
  NavLink,
  Project,
  SkillCategory,
  SocialLink,
} from '@/types';

export const GITHUB_USERNAME: string =
  import.meta.env.VITE_GITHUB_USERNAME || 'mskstanmay';

export const LEETCODE_USERNAME: string =
  import.meta.env.VITE_LEETCODE_USERNAME || 'mskstanmay';

export const EMAILJS_SERVICE_ID: string =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || '';

export const EMAILJS_TEMPLATE_ID: string =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';

export const EMAILJS_PUBLIC_KEY: string =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export const PERSONAL_INFO = {
  name: 'Tanmay',
  fullName: 'Tanmay',
  tagline: 'Final Year CSE Student & Software Developer',
  subTagline:
    'I build performant, thoughtfully designed web applications and enjoy solving hard algorithmic problems.',
  bio: "I'm a final-year Computer Science and Engineering student passionate about full-stack development, distributed systems, and competitive programming. I love turning ideas into clean, scalable software and am always looking for opportunities to learn and build things that matter.",
  location: 'India',
  email: 'deaajnifmresearchprogramme@gmail.com',
  resumeUrl: '/resume.pdf',
  profileImage: '/profile-placeholder.svg',
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'LeetCode', href: '#leetcode' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: `https://github.com/${GITHUB_USERNAME}`,
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/mskstanmay',
    icon: 'linkedin',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/mskstanmay',
    icon: 'twitter',
  },
  {
    name: 'LeetCode',
    url: `https://leetcode.com/${LEETCODE_USERNAME}`,
    icon: 'leetcode',
  },
  {
    name: 'Email',
    url: `mailto:${PERSONAL_INFO.email}`,
    icon: 'email',
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    institution: 'Your University Name',
    degree: 'B.Tech in Computer Science & Engineering',
    duration: '2022 — 2026',
    score: 'CGPA: 8.5/10',
    description:
      'Coursework: Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, System Design.',
  },
  {
    institution: 'Your Senior Secondary School',
    degree: 'Higher Secondary (PCM)',
    duration: '2020 — 2022',
    score: '92%',
  },
];

export const SKILLS: SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'C++' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'Python' },
      { name: 'Java' },
      { name: 'SQL' },
    ],
  },
  {
    category: 'Frameworks',
    skills: [
      { name: 'React' },
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'Next.js' },
      { name: 'Tailwind CSS' },
      { name: 'Django' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git' },
      { name: 'Docker' },
      { name: 'Postman' },
      { name: 'Figma' },
      { name: 'VS Code' },
      { name: 'Linux' },
    ],
  },
  {
    category: 'Cloud',
    skills: [
      { name: 'AWS' },
      { name: 'Vercel' },
      { name: 'Firebase' },
      { name: 'MongoDB Atlas' },
      { name: 'GitHub Actions' },
      { name: 'Netlify' },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'project-one',
    title: 'Project One',
    description:
      'A full-stack web application demonstrating end-to-end feature ownership — from data modeling to a polished, responsive UI.',
    techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/project-one`,
    liveUrl: 'https://project-one.example.com',
    featured: true,
  },
  {
    id: 'project-two',
    title: 'Project Two',
    description:
      'An API-driven service focused on performance and reliability, built with a clean, testable architecture.',
    techStack: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/project-two`,
    liveUrl: 'https://project-two.example.com',
    featured: true,
  },
  {
    id: 'project-three',
    title: 'Project Three',
    description:
      'A tool built to solve a real problem, with an emphasis on developer experience and clear documentation.',
    techStack: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/project-three`,
  },
  {
    id: 'project-four',
    title: 'Project Four',
    description:
      'A data-focused application that ingests, processes, and visualizes information through an intuitive dashboard.',
    techStack: ['React', 'Express', 'AWS'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/project-four`,
  },
  {
    id: 'project-five',
    title: 'Project Five',
    description:
      'A CLI or automation utility that streamlines a repetitive workflow, open-sourced for community use.',
    techStack: ['Python', 'Bash'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/project-five`,
  },
  {
    id: 'project-six',
    title: 'Project Six',
    description:
      'A mobile-first application exploring cross-platform development patterns and offline-first design.',
    techStack: ['React Native', 'Firebase'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/project-six`,
  },
];

export const LEETCODE_GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql';
export const GITHUB_API_BASE = 'https://api.github.com';
