import type {
  EducationEntry,
  NavLink,
  Project,
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
  shortName: 'Tanmay',
  fullName: 'Margana Satya Krishna Sai Tanmay',
  username: 'mskstanmay',
  tagline: 'Final Year CSE Student & Software Developer',
  subTagline:
    'VIT Amaravati CSE undergrad building enterprise-grade full-stack systems, AI-powered pipelines, and cloud-native applications. Passionate about scalable architecture, intelligent automation, and research-driven engineering.',
  bio: 'VIT Amaravati CSE undergrad building enterprise-grade full-stack systems, AI-powered pipelines, and cloud-native applications. Passionate about scalable architecture, intelligent automation, and research-driven engineering.',
  location: 'Faridabad, Haryana, India',
  domain: 'mskstanmay.co.in',
  email: 'mskstanmaywork@gmail.com',
  resumeUrl: 'https://drive.google.com/uc?export=download&id=1xN5givsjg4nglxmrMUJtnYgkWyeZyQcg',
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
    url: 'https://github.com/mskstanmay',
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
    url: 'https://leetcode.com/mskstanmay',
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
    institution: 'Vellore Institute of Technology (VIT), Amaravati, AP, India',
    degree: 'B.Tech in Computer Science & Engineering',
    duration: 'September 2023 – Present',
    score: 'GPA: 8.93 / 10.0',
    description:
      'Top 20% of CSE branch. Coursework: Data Structures & Algorithms, AI, ML, Web Development, DBMS, Operating Systems, Computer Networking.',
  },
  {
    institution: 'FIITJEE Junior College, Visakhapatnam, AP, India',
    degree: 'Intermediate (PCM)',
    duration: 'June 2021 – May 2023',
    score: '85% / 100%',
    description: 'Coursework: Mathematics, Physics and Chemistry.',
  },
  {
    institution: 'Modern Delhi Public School, Greater Faridabad, Haryana, India',
    degree: 'High School',
    duration: 'June 2020 – May 2021',
    score: '92.5% / 100%',
    description: 'Coursework: Mathematics, Science and Social Studies.',
  },
];

export const SKILLS = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python' },
      { name: 'Java' },
      { name: 'C' },
      { name: 'C++' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'SQL' },
      { name: 'MATLAB' },
      { name: 'Bash' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React' },
      { name: 'Next.js (App Router)' },
      { name: 'Vite' },
      { name: 'Tailwind CSS' },
      { name: 'Framer Motion' },
      { name: 'HTML5' },
      { name: 'CSS3' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'FastAPI' },
      { name: 'REST APIs' },
      { name: 'JWT' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'SQLite' },
      { name: 'Firebase' },
      { name: 'Prisma ORM' },
    ],
  },
  {
    category: 'Cloud/DevOps',
    skills: [
      { name: 'AWS S3' },
      { name: 'AWS IAM' },
      { name: 'CloudFront' },
      { name: 'GCP' },
      { name: 'Docker' },
      { name: 'GitHub Actions' },
      { name: 'Git' },
      { name: 'Linux' },
      { name: 'Apache' },
    ],
  },
  {
    category: 'AI/ML',
    skills: [
      { name: 'OpenCV' },
      { name: 'MediaPipe' },
      { name: 'Scikit-learn' },
      { name: 'SHAP' },
      { name: 'NLP' },
      { name: 'Generative AI' },
      { name: 'LLMs' },
      { name: 'Computer Vision' },
    ],
  },
  {
    category: 'Blockchain',
    skills: [
      { name: 'Hedera Hashgraph' },
      { name: 'HTS' },
      { name: 'HCS' },
      { name: 'Smart Contracts' },
    ],
  },
];

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  project?: string;
  bullets: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: 'Software Development Intern',
    company: 'AJNIFM (Ministry of Finance)',
    period: 'May 2026 – June 2026',
    project: 'Regulatory Atlas (Live)',
    bullets: [
      'Engineered React frontend and FastAPI backend for enterprise regulatory platform scaling to 1,100+ active users, 30,000+ assets, and 600+ daily visitors',
      'Architected optimized PDF processing workflows for documents exceeding 80MB via FastAPI caching and shared connection pooling, drastically reducing server overhead',
      'Built automated Python pipelines managing 1,050+ database entries with AI-assisted intelligence for efficient data retrieval',
      'Implemented two-stage Gemini enrichment layer with strict response_schema conformance; automated full cycle via GitHub Actions cron deployed on Apache',
    ],
  },
  {
    role: 'Technical Contributor / Game Developer Intern',
    company: 'Torque Gaming',
    period: 'August 2025 – December 2025',
    bullets: [
      'Spearheaded development of gameplay mechanics and interactive systems, driving 30% increase in player engagement',
      'Optimized asset pipelines and game logic to resolve runtime performance bottlenecks',
      'Collaborated within cross-functional Agile teams to accelerate feature delivery',
    ],
  },
  {
    role: 'Summer Intern',
    company: 'India Space Lab',
    period: '2025',
    bullets: [
      'Completed technical training in CubeSat systems, GIS, remote sensing, drone technology and aerospace applications',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'regulatory-atlas',
    title: 'Regulatory Atlas',
    description:
      'Enterprise regulatory intelligence platform serving 1,100+ users and 30,000+ assets across six international regulators (SEC, ESMA, MAS, ASIC, SFC, FSC). Built React frontend, FastAPI backend with optimized PDF processing, and AI-assisted document intelligence pipelines via Gemini API.',
    techStack: ['React', 'FastAPI', 'Python', 'Gemini API', 'GitHub Actions', 'Apache'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/regulatory-atlas`,
    liveUrl: '',
    featured: true,
  },
  {
    id: 'filmfolio',
    title: 'FilmFolio – Full Stack Networking Platform',
    description:
      'Full-stack networking platform for 50+ users with type-safe PostgreSQL data layer via Prisma ORM. Reduced backend latency by 200ms through strategic query optimization; cut manual content sharing 40% via secure Firebase media hosting.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Firebase'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/filmfolio`,
    liveUrl: '',
    featured: true,
  },
  {
    id: 'velche',
    title: 'Velche – Productivity Chrome Extension',
    description:
      'Rule-based text classification and automation engine that sorts Gmail inboxes using configurable rules and local data persistence, saving users 20–30 minutes daily.',
    techStack: ['React', 'TypeScript', 'Chrome APIs'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/velche`,
    liveUrl: '',
    featured: true,
  },
  {
    id: 'ai-fitness-pose-estimation',
    title: 'AI Fitness Pose Estimation',
    description:
      'Real-time computer vision tool analyzing skeletal spatial coordinates and joint angles from live video feeds via OpenCV and MediaPipe, providing automated corrective feedback and reducing posture-related errors by 35% in testing.',
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'Scikit-learn'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/ai-fitness-pose-estimation`,
    liveUrl: '',
    featured: true,
  },
  {
    id: 'hedera-messaging',
    title: 'Hedera Decentralized Messaging',
    description:
      'Enterprise publish-subscribe messaging platform using Hedera Consensus Service (HCS) with aBFT consensus for fair event ordering. Local node environments provisioned and tested via Docker for concurrent data stream validation.',
    techStack: ['Hedera Hashgraph', 'Node.js', 'Docker', 'HCS'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/hedera-messaging`,
    liveUrl: '',
    featured: true,
  },
  {
    id: 'eeg-biomarker',
    title: 'Explainable EEG Biomarker Framework',
    description:
      'Research project applying ML and SHAP explainability to postictal EEG analysis for seizure recovery assessment and recurrence prediction, producing clinically interpretable decision-support outputs.',
    techStack: ['Python', 'Scikit-learn', 'SHAP', 'Signal Processing'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/eeg-biomarker`,
    liveUrl: '',
    featured: false,
  },
  {
    id: 'electricity-forecasting',
    title: 'City Electricity Demand Forecasting',
    description:
      "AI-driven web application with scenario-builder dashboard to trace and forecast city-wide power resources, integrating ML models with custom GeoJSON mapping Delhi's administrative boundaries.",
    techStack: ['Python', 'React', 'Node.js', 'MongoDB', 'GeoJSON'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/electricity-forecasting`,
    liveUrl: '',
    featured: false,
  },
  {
    id: 'virtual-eeprom',
    title: 'Virtual EEPROM – Flash Memory Emulation',
    description:
      'Emulation layer for Virtual EEPROM using Flash Memory built during a 48-hour hardware hackathon, managing non-volatile storage translation layers and optimizing memory write-cycles in C/C++.',
    techStack: ['C', 'C++'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/Virtual-EEPROM---Flash-Memory-Emulation`,
    liveUrl: '',
    featured: false,
  },
];

export const ACHIEVEMENTS: string[] = [
  'LeetCode: 375+ problems solved — Peak Contest Rating 1,578 (Top 27.31%)',
  'GATE: Qualified in pre-final year — AIR ~19,000',
  'Smart India Hackathon (SIH) — Top 10 Team',
  'D3 Hackathon (IEEE VIT-AP) — 2nd Place',
  'AWS Academy Graduate — Cloud Foundations & Cloud Architecting',
  'Google Cloud Skill Badges — Advanced Cloud & Generative AI',
  'Bloomberg Market Concepts (BMC)',
  'Hedera Developer Certification (DLT Mastery)',
  'MathWorks MATLAB Onramp',
];

export const LEETCODE_GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql';
export const GITHUB_API_BASE = 'https://api.github.com';
