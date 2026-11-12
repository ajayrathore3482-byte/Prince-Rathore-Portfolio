<<<<<<< HEAD
# Prince Rathore — 3D Interactive Developer Portfolio

A dark Space Universe themed developer portfolio for **Prince Rathore** (`Backend Developer | Full Stack Developer`), built with **React**, **Vite**, **Tailwind CSS**, **Three.js / React Three Fiber**, **GSAP**, and **Lucide React** according to [prd.md](./prd.md).

---

## Tech Stack

- **Frontend:** React 19, Vite 7, JavaScript (ESM), Tailwind CSS v4
- **3D Scene:** Three.js, React Three Fiber, Drei
- **Animations:** GSAP (`ScrollTrigger`) & CSS transitions with `prefers-reduced-motion` support
- **Icons:** Lucide React
- **Testing:** Vitest, React Testing Library, jsdom

---

## Getting Started

### 1. Install Dependencies

> On Windows PowerShell where `npm.ps1` execution is restricted, use `npm.cmd`.

```bash
npm.cmd install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your contact form API configuration:

```bash
cp .env.example .env
```

Available variables:

| Variable | Required | Description |
|---|---|---|
| `VITE_CONTACT_API_URL` | Optional (required for live form submission) | Endpoint URL for form submissions (e.g., Web3Forms, Formspree, or a custom PHP/PHPMailer endpoint). When unset, the form transparently reports that the service is not configured. |
| `VITE_CONTACT_ACCESS_KEY` | Optional | Public form key (only if required by your form provider). Never place private credentials in `VITE_*` variables. |

### 3. Personal & Content Configuration

All portfolio content is centralized in `src/data/`:

- `src/data/personal.js` — Public email (`contact.email`), social links (`socials.github`, `socials.linkedin`), and `resumeUrl` (set to `/resume/Prince-Rathore-Resume.pdf` after placing your PDF in `public/resume/`).
- `src/data/skills.js` — Categorized Frontend, Backend, and Tools & Technologies.
- `src/data/experience.js` — Timeline roles, configurable dates (`startDate`, `endDate`, `duration`), responsibilities, and tech stack.
- `src/data/projects.js` — Featured projects (`RealKeeper ERP & Accounting Software`, `CogentHR Recruitment Software`) and configurable `liveUrl` / `githubUrl` links.
- `src/data/education.js` — Editable academic qualifications and verified certifications.

Before deploying to a custom domain, replace `https://your-domain.com/` in:
- `index.html` (`canonical`, `og:url`, JSON-LD `url`)
- `public/robots.txt`
- `public/sitemap.xml`

---

## Scripts

```bash
npm.cmd run dev      # Start Vite development server
npm.cmd test         # Run Vitest unit & component test suite
npm.cmd run build    # Build production assets into dist/
npm.cmd run preview  # Preview the production build locally
```

---

## Project Structure

```text
Portfolio/
├── public/
│   ├── _redirects                 # SPA rewrite rule for Netlify / Cloudflare Pages
│   ├── favicon.svg
│   ├── images/
│   │   └── og-cover.png           # Open Graph & Twitter/X preview image
│   ├── models/
│   ├── resume/                    # Place Prince-Rathore-Resume.pdf here when ready
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   ├── images/
│   │   └── models/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── CosmicBackground.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Navbar.jsx
│   │   ├── sections/
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Skills.jsx
│   │   ├── three/
│   │   │   ├── Lighting.jsx
│   │   │   ├── Particles.jsx
│   │   │   ├── Planet.jsx
│   │   │   ├── Scene.jsx
│   │   │   └── WebGLFallback.jsx
│   │   └── ui/
│   │       ├── Container.jsx
│   │       ├── GlassCard.jsx
│   │       ├── PrimaryButton.jsx
│   │       ├── ProjectCard.jsx
│   │       ├── ProjectMockup.jsx
│   │       ├── ProjectModal.jsx
│   │       ├── ScrollIndicator.jsx
│   │       ├── SecondaryButton.jsx
│   │       ├── SectionDivider.jsx
│   │       ├── SectionHeading.jsx
│   │       ├── SkillCard.jsx
│   │       ├── SocialLinks.jsx
│   │       └── TimelineItem.jsx
│   ├── data/
│   │   ├── education.js
│   │   ├── experience.js
│   │   ├── personal.js
│   │   ├── projects.js
│   │   └── skills.js
│   ├── hooks/
│   │   ├── useActiveSection.js
│   │   ├── useDeviceTier.js
│   │   ├── useReducedMotion.js
│   │   └── useScrollReveal.js
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   ├── contactService.js
│   │   └── validators.js
│   ├── App.jsx
│   └── main.jsx
├── tests/
│   ├── setup.js
│   ├── AppShell.test.jsx
│   ├── DesignSystem.test.jsx
│   ├── Hero3D.test.jsx
│   ├── Phase5Sections.test.jsx
│   ├── Phase6Projects.test.jsx
│   └── Phase7Contact.test.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── prd.md
├── vercel.json                    # Vercel SPA rewrite & security headers
└── vite.config.js
```

---

## Deployment Guide

### Option A: Vercel (Recommended)
1. Push this repository to GitHub.
2. Log in to [Vercel](https://vercel.com/) and import the repository.
3. Keep the auto-detected settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add `VITE_CONTACT_API_URL` (and `VITE_CONTACT_ACCESS_KEY` if applicable) under **Project Settings → Environment Variables**.
5. Deploy. `vercel.json` automatically configures SPA routing and security headers.

### Option B: Netlify
1. Push to GitHub and create a new site in [Netlify](https://www.netlify.com/).
2. Set **Build command** to `npm run build` and **Publish directory** to `dist`.
3. Add `VITE_CONTACT_API_URL` under **Site configuration → Environment variables**.
4. `public/_redirects` handles SPA fallback routing automatically.

### Option C: Cloudflare Pages
1. Connect your GitHub repository in **Cloudflare Dashboard → Workers & Pages → Create**.
2. Set **Build command** to `npm run build` and **Build output directory** to `dist`.
3. Add `VITE_CONTACT_API_URL` under **Settings → Environment variables**.
4. `public/_redirects` configures SPA routing automatically.

### Connecting a Custom Domain & HTTPS
1. In your hosting provider's **Domains** settings, add your domain (e.g., `princerathore.dev` and `www.princerathore.dev`).
2. At your domain registrar, add the DNS records provided by the host (typically an `A` record for the apex domain and a `CNAME` record for `www`).
3. Wait for DNS propagation; Vercel, Netlify, and Cloudflare Pages automatically provision and renew **Let's Encrypt / Edge TLS certificates** and enforce **HTTPS** redirects.
4. Update `https://your-domain.com/` in `index.html`, `public/robots.txt`, and `public/sitemap.xml` to your live domain and redeploy.

=======
# Prince-Rathore-Portfolio
>>>>>>> c179f56974c475df10b281f280988ec5cbceb3d8
