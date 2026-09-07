<div align="center">
  <img width="70" src="./public/android-chrome-512x512.png" alt="Link-Leaf - Logo" />
  <h1>Link-Leaf</h1>
  <p>
    A modern, <b>open-soure</b>, feature rich, and highly customizable Linktree web app.
  </p>
</div>

## 🔭 Overview

**Link-Leaf** is a web app that lets users create a personalized profile page to aggregate all their important links - social media, portfolios, blogs, and more - into a single shareable URL. Think of it as your digital identity hub.

Users can sign up, customize their profile with themes and colors, add social and custom links, and share their unique Link-Leaf URL with the world. The app also provides basic analytics to track profile views and link clicks.

## 📅 Timeline

- May 2026 - Sept 2026

## Live Demo 🎉

- 🌐 Explore the live version of **Link-Leaf** here:
   - https://link-leaf.vercel.app
- ⚙️ Explore the backend code here: https://github.com/fazle-rabbi-dev/link-leaf-backend
- 🚚 The backend is hosted on Vercel: https://api-dot-link-leaf.vercel.app

---

## 🎯 Why I Built This

- To experience building a production-grade full-stack app with real-world **features** like authentication, user management, links management, file uploads, analytics, and dynamic SEO, best practices, and more.

## Key Features

- 🔐 **Secure Authentication** - Email/password login with social login (Google & GitHub)
- 🔄 **JWT Token Rotation** - Access token + HttpOnly refresh token for secure sessions
- 🔑 **Password Reset** - Reset password via email link
- 🔒 **Change Password** - Update password from dashboard settings
- ✉️ **Email Verification** - Verify email address on signup
- 👤 **Profile Management** - Name, username, bio, and avatar upload via Cloudinary
- 🔗 **Link Management** - Predefined social links (Instagram, GitHub, etc.) + custom links
- 🎨 **Profile Customization** - Color schemes, fonts, button styles, and layout options
- 📊 **Analytics** - Track profile views and link clicks
- 🌙 **Dark & Light Mode** - Eye comfort with theme switching
- 📱 **Fully Responsive** - Looks great on all devices
- 📧 **Email Delivery** - Verification, password reset, and email change notifications
- 🔍 **Dynamic SEO** - OpenGraph images and metadata for each profile
- 🛡️ **Account Recovery** - Revert unauthorized email changes via a `special email link` within 7 days

## 📸 Screenshots

<div align="center">
<img width="48%" src="/public/screenshots/landing.png" />
<img width="48%" src="/public/screenshots/dashboard.png" />
<img width="48%" src="/public/screenshots/profile.png" />
<img width="48%" src="/public/screenshots/appearance.png" />
</div>

## 🛠️ Tech Stack

- **Framework:** React 19 & Next.js 16 (App Router)
- **Runtime:** Node.js with TypeScript
- **Styling:** TailwindCSS & shadcn/ui
- **Animation:** Framer Motion
- **State Management:** Zustand
- **Package Manager:** Bun
- **Authentication:** JWT (access token + refresh token rotation)
- **File Upload:** Multer + Cloudinary

## 🏗️ Project Structure

```txt
src
├── app
│   ├── (private)            # Protected dashboard routes
│   │   └── dashboard
│   │       ├── analytics
│   │       ├── appearance
│   │       ├── links
│   │       ├── profile
│   │       └── settings
│   ├── (public)             # Public routes
│   │   ├── (auth)           # Login & Sign up
│   │   ├── (marketing)      # Landing page
│   │   └── [username]       # Public profile pages
│   ├── layout.tsx
│   ├── globals.css
│   └── manifest.json
├── components
│   ├── marketing/           # Landing page components
│   ├── shared/              # Shared across routes
│   ├── ui/                  # shadcn UI components
│   └── theme-provider.tsx
├── constants
│   └── marketing.ts
├── hooks
│   └── use-mobile.ts
├── lib
│   ├── api/                 # API client utilities
│   ├── env.ts               # Environment variables
│   └── utils.ts             # Utility functions
└── public
```

## ⚙️ Scripts

```bash
bun run dev        # Start development server
bun run build      # Build for production
bun run start      # Start production server
bun run lint       # Run ESLint
bun run typecheck  # Run TypeScript type checking
bun run format     # Format code with Prettier
```

## 🧭 Local setup guide

Follow the steps below to set up Link-Leaf locally.

### 1️⃣ Clone & Install

```bash
git clone https://github.com/fazle-rabbi-dev/link-leaf.git
cd link-leaf
bun install
```

### 2️⃣ Set Up Environment Variables

- Copy the sample environment file:
   ```bash
   cp .env.example .env.local
   ```
- Fill in your credentials:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### 3️⃣ Run the App

```bash
bun run dev
```

> ✅ Setup Complete!
> **Great job 👏**

Link-Leaf is now running at `http://localhost:3000`.

---

g

## 🤝 Contribution

Contributions are welcome and appreciated!
If you have ideas to improve this project, feel free to get involved.

### How You Can Contribute

- 🐞 Report bugs or unexpected behavior
- 💡 Suggest new features or improvements
- 🛠️ Submit pull requests for fixes or enhancements

### Contribution Workflow

1. Fork the repository
2. Create a new branch (`feature/your-feature-name`)
3. Make your changes and commit with clear messages
4. Push to your fork
5. Open a pull request with a brief explanation

Please make sure your code follows the existing style and conventions.

---

> Even small contributions matter. If this project helped you, consider giving it a ⭐️

> [!Tip]
> ⏳Refer to [canvas.md](./_canvas.md) for the pending tasks/features.
