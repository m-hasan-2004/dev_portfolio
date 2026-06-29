# Void — Developer Portfolio

A production-grade, ultra-modern developer portfolio website for **Hasan** — anonymous developer identity. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Components:** Custom shadcn/ui-style component system
- **Animations:** Framer Motion
- **State:** Zustand
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20)
- npm, yarn, or pnpm

### Setup

```bash
git clone <repo-url>
cd void-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file (optional — works without it):

```env
GITHUB_TOKEN=your_github_token_here
```

The Lab page fetches projects from the GitHub API. Without a token, the API allows **60 requests/hour**. With a Personal Access Token, you get **5,000 requests/hour**.

**How to get a GitHub token:**

1. Go to [github.com](https://github.com) → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **Generate new token**
3. Give it any name (e.g. "portfolio"), leave all scopes unchecked
4. Copy the token (starts with `ghp_...`)
5. Paste it into `.env.local`

The portfolio works without a token — it's only needed if you hit rate limits.

## Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import the repository
4. Add environment variables if needed
5. Deploy

## Project Structure

```
/src
  /app
    /lab           — GitHub projects (Lab page)
    /stack         — Technology stack visualization
    /experience    — Professional timeline
    /connect       — Social links
  /components
    /ui            — Reusable UI components (Button, Card, Badge)
    /sections      — Page sections (Navigation, Hero, Footer, etc.)
  /lib             — Utilities, store, cache, helpers
  /hooks           — Custom React hooks
  /public          — Static assets (robots.txt, sitemap.xml)
```

## Features

- Dark-first UI with neon gradient accents
- Glassmorphism cards and components
- Smooth page transitions (Framer Motion)
- Typewriter effect on hero section
- Animated skill progress bars
- Timeline with alternating layout
- Command palette (Cmd/Ctrl + K)
- Live GitHub project fetching
- Responsive design (mobile-first)
- SEO metadata + OpenGraph + sitemap
- Scroll progress indicator

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Format with Prettier
```
