# Megahop Adventure

Megahop Adventure is a Vite + React project that combines two experiences in one repo:

- A vintage-styled landing page and social quest hub built in React
- A standalone browser game served from `public/megahop-adventure`

The home page acts as the portal. From there, users can enter the social quest flow, open the leaderboard, or launch the game directly.

## Current project state

This repository is not just a game and not just a landing page.

- `src/` contains the React homepage and quest submission flow
- `public/megahop-adventure/` contains the static HTML/CSS/JS game bundle
- Both experiences share the same visual direction and asset library

The previous README described an older version of the project and is no longer accurate.

## Tech stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- Motion
- Lucide React

## Requirements

Use Node.js 20 or newer.

Recommended versions:

- Node.js `20.19+`
- Node.js `22+`

## Installation

```bash
npm install
```

## Local development

Start the Vite dev server:

```bash
npm run dev
```

Default local URL:

```text
http://127.0.0.1:3000/
```

The project is configured to run on port `3000` and bind to `0.0.0.0`.

## Available scripts

- `npm run dev` starts the local development server
- `npm run build` creates a production build in `dist/`
- `npm run preview` previews the production build
- `npm run lint` runs `tsc --noEmit`
- `npm run clean` removes `dist/`

## App structure

```text
.
├── public/
│   └── megahop-adventure/
│       ├── index.html
│       ├── style.css
│       ├── game.js
│       └── assets/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── components/
│       └── VintageEffects.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Main experiences

### 1. React portal and quest hub

The React app in `src/App.tsx` is the main entrypoint of the website.

It currently includes:

- An animated landing screen with Megahop Adventure theming
- A CTA to open the standalone game at `/megahop-adventure/`
- A social quest form for whitelist/raid submissions
- A leaderboard modal and sidebar summary

### 2. Standalone game

The game lives in `public/megahop-adventure/` and is served as static files.

It includes:

- A canvas-based action platformer
- Keyboard controls and mobile touch controls
- HUD for HP, EX energy, time, parry, damage, and grade
- Local leaderboard rendering inside the game UI
- A side panel with controls and a link back to the homepage

Open it directly at:

```text
/megahop-adventure/
```

## External integrations still used by the React app

The quest flow in `src/App.tsx` still depends on two external services:

### Google Apps Script endpoint

Used for:

- Fetching leaderboard entries
- Posting quest submissions

Configured in code as:

```text
https://script.google.com/macros/s/AKfycbyl7Kii-KTiO13L4NdhbuX_AW2SS_wROpLXjeQGlD4A9YUpbIxF5f8ciNVA5UFnQBM8lA/exec
```

### Dotmega resolve API

Used to resolve `.mega` names into EVM wallet addresses before submission.

Configured in code as:

```text
https://api.dotmega.domains/resolve
```

## Environment variables

No environment variables are required for the current frontend to start locally.

There is an existing `.env.example`, but the current app does not require a Gemini API key to run.

## Key files

- `src/App.tsx`: homepage, quest flow, leaderboard fetch, and game launch CTA
- `src/index.css`: shared visual styling, custom font, and animation utilities
- `src/components/VintageEffects.tsx`: reusable decorative motion components
- `public/megahop-adventure/index.html`: standalone game shell
- `public/megahop-adventure/style.css`: game page layout and HUD styling
- `public/megahop-adventure/game.js`: game loop, controls, rendering, entities, and local leaderboard logic

## Notes

- Some dependencies in `package.json` are not part of the active frontend flow
- The repo still contains quest/raid functionality alongside the game
- If the goal is to turn this into a pure game site later, the React quest logic should be cleaned up separately instead of documenting it as if it no longer exists

## Anti-bot notes (Vercel Edge Requests)

If you see unusually high Vercel Edge Requests, one common cause is bots/crawlers repeatedly requesting many unique URLs (for example `/?ref=<random>`), which can defeat caching and burn request quotas quickly.

This project has the referral feature disabled, and it strips any `ref` query/hash from the URL on page load to avoid cache-busting URLs.

For broader traffic mitigation, use Vercel Firewall / Bot Protection / rate-limiting rules (recommended), since static frontends alone cannot reliably block automated traffic.

## Troubleshooting

If local tooling behaves strangely after switching Node versions, reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

If `npm run dev` works but the game assets do not appear, confirm you are opening the app through the Vite server and not from the filesystem directly.
