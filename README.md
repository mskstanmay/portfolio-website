# Tanmay — Portfolio Website

A personal portfolio built with Vite, React 18, TypeScript, Tailwind CSS, Framer Motion, and React Router. Showcases projects, skills, live LeetCode stats, and top GitHub repositories.

## Tech Stack

- Vite + React 18 + TypeScript
- Tailwind CSS v3 (dark mode by default)
- Framer Motion for animations
- React Router v6
- Axios for API requests
- EmailJS for the contact form (no backend required)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env` with your own values:

```
VITE_GITHUB_USERNAME=your-github-username
VITE_LEETCODE_USERNAME=your-leetcode-username
VITE_EMAILJS_SERVICE_ID=your-emailjs-service-id
VITE_EMAILJS_TEMPLATE_ID=your-emailjs-template-id
VITE_EMAILJS_PUBLIC_KEY=your-emailjs-public-key
```

EmailJS credentials come from your [EmailJS dashboard](https://www.emailjs.com/) — create a service and an email template with `from_name`, `from_email`, and `message` variables.

### Run locally

```bash
npm run dev
```

Visit `http://localhost:5173`.

### Build

```bash
npm run build
npm run preview
```

## Editing content

All copy — name, bio, education, skills, projects, and social links — lives in [src/utils/constants.ts](src/utils/constants.ts). Update it there; no need to touch component code.

Replace `public/resume.pdf` and `public/profile-placeholder.svg` with your own resume and photo.

## Known caveat: LeetCode API from the browser

The LeetCode stats section calls `https://leetcode.com/graphql` directly from the browser. LeetCode does not send permissive CORS headers, so this call can fail in some deployment environments (it generally works from `localhost` during development but may be blocked once deployed). If you see the LeetCode section falling back to its error state in production, route the request through a small serverless proxy (e.g., an AWS Lambda or Vercel/Netlify function) that fetches the GraphQL response server-side and forwards it to the client.

## Deploying to AWS

### Option A — S3 + CloudFront (static hosting)

1. Build the site: `npm run build` (outputs to `dist/`).
2. Create an S3 bucket configured for static website hosting, or a private bucket fronted by CloudFront (recommended).
3. Upload the contents of `dist/` to the bucket:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```
4. Create a CloudFront distribution pointing at the bucket (use an Origin Access Control for a private bucket).
5. Set the CloudFront default root object to `index.html`.
6. Add a custom error response mapping 403/404 → `/index.html` with HTTP 200, so React Router's client-side routes resolve correctly on refresh.
7. Set the environment variables at **build time** (CI/CD step, e.g. GitHub Actions) since Vite inlines `VITE_*` variables during `npm run build` — they are not read at runtime.
8. Invalidate the CloudFront cache after each deploy:
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

### Option B — AWS Amplify Hosting

1. Connect your Git repository in the Amplify console.
2. Build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
3. Add the `VITE_*` variables under Amplify's Environment variables settings.
4. Add a rewrite rule for SPA routing: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>` → `/index.html` (200).

## Project Structure

```
src/
  components/   # UI sections (Navbar, Hero, About, Skills, Projects, LeetCode, GitHub, Contact, Footer, ...)
  hooks/        # useGitHub, useLeetCode — data-fetching hooks
  types/        # shared TypeScript interfaces
  utils/        # constants.ts — all editable content and config
  App.tsx
  main.tsx
```
