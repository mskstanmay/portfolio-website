import type {
  AchievementEntry,
  EducationEntry,
  ExperienceEntry,
  NavLink,
  Project,
  SkillCategory,
  SocialLink,
} from '@/types';

export const GITHUB_USERNAME: string =
  import.meta.env.VITE_GITHUB_USERNAME || 'mskstanmay';

export const LEETCODE_USERNAME: string =
  import.meta.env.VITE_LEETCODE_USERNAME || 'mskstanmay';

export const LEETCODE_PROFILE_URL = 'https://leetcode.com/u/mskstanmay/';
export const LEETCODE_PEAK_CONTEST_RATING = 1578;

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
  // Hero role line — leads with the work, states the student status plainly
  // rather than hiding or leading with it. Rewritten during the Hero/About
  // content pass; see that milestone's writeup for the reasoning.
  tagline: 'Full-stack & systems engineer, final year @ VIT-AP',
  // Hero body copy. Deliberately concrete (names the actual platform and
  // its real scale) instead of the previous version's buzzword stack
  // ("enterprise-grade", "AI-powered pipelines", "cloud-native",
  // "research-driven engineering") which described a category, not a person.
  subTagline:
    "I spend most of my time in backend and data, the parts of a product that have to keep working after the demo ends. Lately that's meant building the platform behind a live regulatory compliance tool used across six international regulators, and picking up distributed systems and applied ML along the way.",
  // About section copy — deliberately distinct from subTagline (previously
  // identical strings, flagged in the original audit as "the bio field is
  // just the tagline restated"). This one answers "how do you think," not
  // "what's your title" — grounded in specific, real projects rather than
  // adjectives.
  bio: "I like problems where the interesting part is underneath the UI, how data moves, where it breaks, what happens at the edges. Most of what I've built follows that: a compliance platform that has to process malformed PDFs without falling over, a messaging prototype built around ordered replay and checkpoints, a flash-storage emulator I wrote in a weekend because I wanted to know how wear-leveling actually works. I also compete on LeetCode and read papers when a project needs it. A stretch of EEG signal work taught me more about explainability than any course did.",
  location: 'Faridabad, Haryana, India',
  domain: 'mskstanmay.co.in',
  email: 'mskstanmaywork@gmail.com',
  resumeUrl: 'https://drive.google.com/uc?export=download&id=1MaRxfhY444s45WZraF6aGmEyAE_ivIXT',
  profileImage: '/linkedinpfp.webp',
};

// Order matches the page's actual section order (see App.tsx) so the nav
// reads as a table of contents, not an arbitrary list. "Work" replaces the
// old "Projects" label to match Submissions' own heading ("Selected work")
// — the section id stays `#projects` to avoid touching anything that
// already links to it.
export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'LeetCode', href: '#leetcode' },
  { label: 'GitHub', href: '#github' },
  { label: 'Recognition', href: '#recognition' },
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
    name: 'LeetCode',
    url: LEETCODE_PROFILE_URL,
    icon: 'leetcode',
  },
  {
    name: 'Email',
    url: `mailto:${PERSONAL_INFO.email}`,
    icon: 'email',
  },
];
// Pre-university entries (FIITJEE Intermediate, Modern Delhi Public School —
// 85% and 92.5% board-exam percentages) were removed during the Hero/About
// content pass, per explicit instruction: 10th/12th-grade marks read as
// resume-anxiety padding in a portfolio meant to be evaluated like any other
// engineer's, and neither entry carries information a recruiter or engineer
// would use. The generic coursework sentence on the remaining entry was cut
// for the same reason — "Data Structures & Algorithms, AI, ML, Web
// Development..." describes the syllabus every CS student shares, not this
// one; the Submissions and Recognition sections already demonstrate applied
// skill far more specifically than a course list could.
export const EDUCATION: EducationEntry[] = [
  {
    institution: 'Vellore Institute of Technology (VIT-AP University)',
    degree: 'B.Tech in Computer Science & Engineering',
    duration: '2023 – 2027',
    score: 'GPA 8.93 / 10.0, top 20% of CSE branch',
  },
];

export const SKILLS: SkillCategory[] = [
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
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'FastAPI' },
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

/*
 * MANUAL CONTENT REVIEW (not rendered): verify before treating these figures
 * as independently confirmed.
 * - Regulatory Atlas: 1,100+ users, 30,000+ assets, 600+ daily visitors,
 *   1,050+ database entries, six regulators, and documents over 80MB.
 * - FilmFolio: 50+ users, 200ms latency reduction, and 40% less manual sharing.
 * - Velche: 20–30 minutes saved daily.
 * - AI Fitness Pose Estimation: 35% fewer posture errors in testing.
 * - Torque Gaming: 30% engagement increase (in EXPERIENCE above).
 * - Education: top 20% of CSE branch; Recognition: GATE AIR ~19,000.
 */
export const PROJECTS: Project[] = [
  {
    id: 'regulatory-atlas',
    title: 'Regulatory Atlas',
    description:
      'Enterprise regulatory intelligence platform serving 1,100+ users and 30,000+ assets across six international regulators (SEC, ESMA, MAS, ASIC, SFC, FSC). Built React frontend, FastAPI backend with optimized PDF processing, and AI-assisted document intelligence pipelines via Gemini API.',
    techStack: ['React', 'FastAPI', 'Python', 'Gemini API', 'GitHub Actions', 'Apache'],
    liveUrl: 'https://nifmfinmin.org/regulatory-updates/',
    featured: true,
    status: 'shipped',
    verdict: 'Live',
  },
  {
    id: 'spotify-migration',
    title: 'Spotify Liked Songs → YouTube Music Liked Songs',
    description:
      'Migration app using OAuth and track matching to move liked songs from Spotify to YouTube Music, with background worker processing, retries, and resumable operations.',
    techStack: ['React', 'Fastify', 'PostgreSQL', 'Prisma', 'OAuth'],
    githubUrl: 'https://github.com/mskstanmay/Spotify-Liked-to-Youtube-Music-Liked',
    liveUrl: 'https://spotify-liked-to-youtube-music-liked.onrender.com/',
    featured: true,
    status: 'shipped',
    verdict: 'Live',
  },
  {
    id: 'filmfolio',
    title: 'FilmFolio – Full Stack Networking Platform',
    description:
      'Full-stack networking platform for 50+ users with type-safe PostgreSQL data layer via Prisma ORM. Reduced backend latency by 200ms through strategic query optimization; cut manual content sharing 40% via secure Firebase media hosting.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM'],
    githubUrl: 'https://github.com/mskstanmay/FilmFolio',
    featured: true,
    status: 'in-progress',
  },
  {
    id: 'velche',
    title: 'Velche – Productivity Chrome Extension',
    description:
      'Rule-based text classification and automation engine that sorts Gmail inboxes using configurable rules and local data persistence, saving users 20–30 minutes daily.',
    techStack: ['React', 'TypeScript', 'Chrome APIs'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/velche-extension`,
    featured: false,
    status: 'shipped',
    verdict: 'Project',
  },
  {
    id: 'ai-fitness-pose-estimation',
    title: 'AI Fitness Pose Estimation',
    description:
      'Real-time computer vision tool analyzing skeletal spatial coordinates and joint angles from live video feeds via OpenCV and MediaPipe, providing automated corrective feedback and reducing posture-related errors by 35% in testing.',
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'Scikit-learn'],
    featured: false,
    status: 'shipped',
    verdict: 'Prototype',
  },
  {
    id: 'hedera-messaging',
    title: 'HCS Mesh – Distributed Messaging Architecture',
    description:
      'Distributed messaging architecture with a TypeScript, Node.js, and Fastify service, a PostgreSQL-backed mock provider, ordered replay, checkpoints, SSE, worker processing, and observability dashboards. Real Hedera network integration remains future work.',
    techStack: ['TypeScript', 'Node.js', 'Fastify', 'PostgreSQL', 'SSE'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/Distributed-Messaging---Consensus-Architecture`,
    featured: true,
    status: 'in-progress',
    verdict: 'Prototype',
  },
  {
    id: 'twinfire',
    title: 'AI-Powered Real-Time Digital Twin Framework for Fire Spread Prediction and Victim Risk Assessment Using Autonomous Drone Swarms',
    description:
      'Simulation-backed prototype combining a Python grid-based fire and smoke simulation, virtual UAVs, FastAPI telemetry and fusion, and a React dashboard. It does not yet include trained AI inference, physical drone integration, or real-world deployment.',
    techStack: ['Python', 'FastAPI', 'React', 'Simulation'],
    featured: true,
    status: 'in-progress',
    verdict: 'Prototype',
  },
  {
    id: 'eeg-biomarker',
    title: 'Explainable EEG Biomarker Framework',
    description:
      'Research project applying ML and SHAP explainability to postictal EEG analysis for seizure recovery assessment and recurrence prediction, producing clinically interpretable decision-support outputs.',
    techStack: ['Python', 'Scikit-learn', 'SHAP', 'Signal Processing'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/eeg-biomarker`,
    featured: false,
    status: 'shipped',
    verdict: 'Research',
  },
  {
    id: 'electricity-forecasting',
    title: 'City Electricity Demand Forecasting',
    description:
      "AI-driven web application with scenario-builder dashboard to trace and forecast city-wide power resources, integrating ML models with custom GeoJSON mapping Delhi's administrative boundaries.",
    techStack: ['Python', 'React', 'Node.js', 'MongoDB', 'GeoJSON'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/electricity-forecasting`,
    featured: false,
    status: 'shipped',
    verdict: 'Project',
  },
  {
    id: 'virtual-eeprom',
    title: 'Virtual EEPROM – Flash Memory Emulation',
    description:
      'Emulation layer for Virtual EEPROM using Flash Memory built during a 48-hour hardware hackathon, managing non-volatile storage translation layers and optimizing memory write-cycles in C/C++.',
    techStack: ['C', 'C++'],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/Virtual-EEPROM---Flash-Memory-Emulation`,
    featured: false,
    status: 'shipped',
    verdict: 'Prototype',
  },
];

// Grouped by what each entry actually is, not by a generic binary split —
// see the AchievementEntry type comment. Same facts as before; only the
// classification changed. Rendered by Recognition (Milestone 6).
//
// The static LeetCode summary entry that used to live here was removed during
// the site-wide integration pass: the LeetCode section a few scrolls down
// pulls the figure live and breaks it down further. Keeping a hand-written
// snapshot alongside live data caused them to disagree, so the live section
// is now the single source for that
// signal instead of Recognition duplicating it. `competitive-programming`
// stays in the AchievementEntry type for a future entry that isn't already
// covered live elsewhere (e.g. a contest placement).
export const ACHIEVEMENTS: AchievementEntry[] = [
  { label: 'GATE: Qualified in pre-final year, AIR ~19,000', type: 'award' },
  { label: 'Smart India Hackathon (SIH), Top 10 Team', type: 'award' },
  { label: 'D3 Hackathon (IEEE VIT-AP), State-Level First Place', type: 'award' },
  { label: 'AWS Academy Graduate: Cloud Foundations & Cloud Architecting', type: 'certification' },
  { label: 'Google Cloud Skill Badges: Advanced Cloud & Generative AI', type: 'certification' },
  { label: 'Bloomberg Market Concepts (BMC)', type: 'certification' },
  { label: 'Hedera Developer Certification (DLT Mastery)', type: 'certification' },
  { label: 'MathWorks MATLAB Onramp', type: 'certification' },
];

export const LEETCODE_GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql';
export const GITHUB_API_BASE = 'https://api.github.com';
