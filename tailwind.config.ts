import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef4ff',
          100: '#dbe6fe',
          200: '#bfd3fe',
          300: '#93b5fd',
          400: '#608ffa',
          500: '#3b6cf6',
          600: '#254deb',
          700: '#1d3bd8',
          800: '#1e32af',
          900: '#1e2f8a',
          950: '#161d54',
        },
        accent: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        dark: {
          900: '#0a0e17',
          800: '#0f1420',
          700: '#141a29',
          600: '#1b2334',
          500: '#232d42',
        },
        // Semantic status colors for the submission/verdict model (The Judge).
        // Values are intentionally reused from the emerald/amber/slate/rose
        // shades already appearing ad hoc in LeetCode.tsx and GitHub.tsx, so
        // migrating those files onto these tokens later is a rename, not a
        // visual change.
        verdict: {
          accepted: '#34d399', // shipped / live work
          progress: '#fbbf24', // actively in development
          archived: '#94a3b8', // deprioritized, not a failure
          wrongAnswer: '#fb7185', // honest miss — attempted, didn't land
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Reserved for literal data: verdict labels, dates, stack tags,
        // stat values — never for prose. See src/index.css `.stat-number`.
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        // Two-value radius system: `control` for buttons/inputs/tags,
        // `panel` for cards/surfaces. Default Tailwind scale stays available
        // for anything that doesn't fit those two roles.
        control: '8px',
        panel: '14px',
      },
      boxShadow: {
        // Replaces drop-shadows (invisible on near-black backgrounds) with a
        // border + soft accent glow, used on hover/focus for interactive
        // surfaces.
        'glow-sm': '0 0 0 1px rgba(59, 108, 246, 0.4), 0 4px 16px -8px rgba(59, 108, 246, 0.5)',
        'glow-md': '0 0 0 1px rgba(59, 108, 246, 0.5), 0 8px 24px -12px rgba(59, 108, 246, 0.6)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
