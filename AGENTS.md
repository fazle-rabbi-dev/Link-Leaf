# Link-Leaf

> Do not read the `.env` file. All environment variables are exported from `lib/env.ts`. Always import from there, never from `process.env` directly.

## Project Overview

Link-Leaf is a "LinkTree" web app and this project is the frontend part of the application. It follows industry-standard conventions for project structure, naming, and code style.

Link-Leaf frontend is a Next.js application that provides the user interface for a LinkTree platform. Users can create and manage their profile pages that aggregate social media links and custom links in one shareable URL — similar to Linktree.

## Tech Stack

- **Framework:** React-19 and Next.js 16 (App Router)
- **Runtime:** Node.js with TypeScript
- **Styling:** TailwindCSS & ShadCN
- **Animation:** Framer motion aka motion
- **Global State Management:** Zustand
- **HTTP Client:** Fetch API
- **Package Manager:** Bun (only)
- **Authentication:** JWT - Stored in localstorage for access-token and HttpOnly cookies for refresh token

## Core Features

- User registration and login with email & password along email verification
   - social login/signup with google & github
- JWT-based authentication with access token & refresh token rotation
- Public profile management (name, username, bio, avatar)
- Link management — two types:
   - `social[]` — predefined platforms (Instagram, GitHub, etc.)
   - `custom[]` — user-defined label + URL pairs
- Avatar upload via Multer + Cloudinary
- Profile customization with color scheme, fonts, button style, social link section positioning, seo meta tags
- Email delivery (verification, password reset, email change)
- Analytics: profile views, link clicks

> **🚨 Important Note:** I wrote the documentation for the Link-Leaf app `flow/behaviour, architectural decision etc` for myself in a way that it's easy to follow and understand in folder `/docs`. So, you will always read all files contents available in the following folder: `/docs` to understand this application `flow`.

## User Stories/Flow

1. User land on `/` (landing page)
2. User clicks `Sign in`/relevant button
3. User lands on `/auth` page
4. User enters email & password or continues with social login
5. User lands on `/dashboard/profile` page
6. User could navigates around: `/dashboard/profile`, `/dashboard/links`, `/dashboard/appearance`, `/dashboard/analytics` and `/dashboard/settings`

## Folder Structure

> **Note:** read the folder tree for all present folders & files, only when you need to know what files present inside a specific folder.

```
├── app/
│   ├── (private)/ (protected routes)
│   │
│   ├── (public)/
│   │   ├── (auth)/
│   │   │   ├── _components/auth-header.tsx
│   │   │   ├── login/page.tsx
│   │   │   └── sign-up/page.tsx
│   │   ├── (marketing)/page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx
│   ├── favicon.ico
│   └── globals.css
├── components/
│   ├── marketing/ (landing page)
│   ├── shared/ (shared component goes here)
│   ├── ui/ (reserved for shadcn)
│   └── theme-provider.tsx
├── constants/
│   └── marketing.ts
├── hooks/
│   └── use-mobile.ts
├── lib/
│   └── utils.ts
├── public/
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── components.json
├── package.json
├── bun.lock
└── .prettierrc
```

## Rules

- Utilize react-19's new features when appropriate
- Don't use memo, useMemo, useCallback, forwardRef, etc
- Follow Next.js App Router conventions
- Implement proper error handling and loading states
- Use React Server Components where possible
- Handle authentication state consistently across the app
- Keep components small and focused
- Use proper SEO practices
- When need a pkg -> first check if it's already in `package.json` and if not, install it via `bun add` but ask permission before installing any pkg
- Use react19 & nextjs best practices. e.g: `custom hooks`, `api helper` etc.
- Im a perfectionist, but now trying to become minimalist and keep things simple and want to kill perfectionism and ship faster. So, don't make me confuse when answering questions.
- Do not over-engineer stuffs, keep it simple always by focusing only what matters most, and implement stufss in easy way when possible instead of over-engineering.
- Separate pkg import and custom file import by leaving a blank line between them
- When do linting/type check than only check on the changed files
- Do not write console.log() instead use custom logger that available at `src/lib/logger.ts`
- When to many code in a file write good comment for readability; especially for the large jsx code
- Don't use em-dash when you generate text instead use plain hyphen `(-)`

## Good to know

- File uploads use multipart/form-data
- Dashboard pages can be client-side rendered
- Prioritize modular architecture

---

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Environment Variables

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
