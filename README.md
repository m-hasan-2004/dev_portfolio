# Void — Developer Portfolio

A production-grade, ultra-modern developer portfolio website for **Hasan** — anonymous developer identity. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/46bcb960-b33b-4012-ac51-b148f0280b01" />


## Tech Stack

- **Framework:** Next.js 14.2 (App Router)
- **Language:** TypeScript 5.5 (strict mode)
- **Styling:** Tailwind CSS 3.4
- **Components:** Custom shadcn/ui-style component system (CVA 0.7)
- **Animations:** Framer Motion 11.0
- **State:** Zustand 4.5
- **Icons:** Lucide React 0.400

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20)
- npm, yarn, or pnpm

### Setup

```bash
git clone https://github.com/m-hasan-2004/dev_portfolio
cd dev_portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file (optional — works without it):

```env
GITHUB_TOKEN=your_github_token_here
```

**GitHub Token (for Lab page):**

Without a token, the API allows **60 requests/hour**. With a Personal Access Token, you get **5,000 requests/hour**.

1. Go to [github.com](https://github.com) → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **Generate new token**
3. Give it any name (e.g. "portfolio"), leave all scopes unchecked
4. Copy the token (starts with `ghp_...`)

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
- Light/dark mode toggle
- Glassmorphism cards and components
- Smooth page transitions (Framer Motion)
- Typewriter effect on hero section
- Animated skill progress bars
- Timeline with alternating layout
- Command palette (Cmd/Ctrl + K)
- Toggleable page transition sounds (Web Audio API)
- UI interaction click sounds on theme/settings toggle
- Built with nav section with live tech stack versions
- Live GitHub project fetching with caching
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
