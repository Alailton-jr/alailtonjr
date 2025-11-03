# Agent Prompt: Build My Personal Website (React + TypeScript)

You are an implementation agent. **Goal:** turn this repository into a polished, production‑ready personal website for **Alailton J. Alves Junior** using **React + TypeScript + Vite**. The site must be modern, clean, fast, accessible (WCAG AA), mobile‑first, with dark/light mode, and easily editable.

---

## 0) Current Context

A fresh Vite React+TS app already exists (created with `npm create vite@latest ... --template react-ts`). Use it as the base. You may add libraries as needed.

**Deploy target:** Vercel (build command `npm run build`, output `dist/`).

---

## 1) Tech Choices (use these unless you have a clearly better idea)

* **Router:** `react-router-dom`
* **Styling:** Tailwind CSS + CSS variables; optional utility components via **shadcn/ui** (Radix primitives)
* **Icons:** `lucide-react`
* **Fonts:** Google Fonts via CSS import (e.g., Inter or Plus Jakarta Sans)
* **SEO:** `react-helmet-async` (or head management via Vite + document `<head>`)
* **MDX (optional):** for long‑form content; only if simple to wire.
* **Analytics (optional toggled env):** Plausible or GA4 with an env flag.

If you pick alternatives, keep the outcome equivalent or better and document what changed.

---

## 2) Pages & Routes

Create these routes with clean, minimal design:

1. **Home** (`/`)

   * Hero: name, headline, quick links (Scholar, GitHub, LinkedIn), location.
   * CTA buttons: "View Projects", "Download CV".
   * Optional mini sections: highlights (awards/publications count).

2. **Projects** (`/projects`)

   * Responsive grid of project cards (title, short summary, tags, optional repo link). Use placeholder items for now.
   * Filter by tag (client‑side) and search input.

3. **CV** (`/cv`)

   * Structured sections for Education, Experience, Research, Skills, Awards, Publications (basic version).
   * Provide **Export as PDF** button (client print CSS + `window.print()`), with print‑optimized styles.

4. **About** (`/about`)

   * Short bio paragraph(s) and a profile image placeholder.

5. **Contact** (`/contact`)

   * Email link and simple form (name/email/message) with basic client‑side validation only; post to a placeholder handler (just `mailto:` or console for now). Include anti‑spam honeypot.

6. **404** (`*`)

   * Simple not‑found page with link back home.

> Note: The user will later add detailed project pages. For now, keep project cards simple.

---

## 3) Information Architecture & Data Model

Create a lightweight typed data layer in `src/data/` to feed the pages. **Keep content minimal** (placeholders are fine). Types in `src/types.ts`:

```ts
export type LinkItem = { label: string; href: string };
export type Project = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  repo?: string;
  link?: string;
  image?: string;
};
export type Experience = {
  org: string;
  role: string;
  period: string;
  bullets: string[];
};
export type Education = {
  school: string;
  degree: string;
  period: string;
  notes?: string;
};
export type Publication = { title: string; venue: string; year: string; link?: string };
export type Profile = {
  name: string;
  headline: string;
  location?: string;
  email?: string;
  links?: LinkItem[];
};
```

Seed minimal data in `src/data/site.ts` (based on the CV, placeholders allowed):

```ts
import { Profile, Education, Experience, Project, Publication } from "../types";

export const PROFILE: Profile = {
  name: "Alailton J. Alves Junior",
  headline: "Electrical Engineer • Power Systems • Protection • ML",
  location: "São Carlos, Brazil",
  email: "alailton.j.a.j@gmail.com",
  links: [
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=vNe3tgIAAAAJ" },
    { label: "GitHub", href: "https://github.com/Alailton-jr" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/alailton-alves-b93490190" },
  ],
};

export const EDUCATION: Education[] = [
  { school: "University of São Paulo", degree: "M.S. in Electrical Engineering", period: "Expected Jan 2026" },
  { school: "Federal University of Uberlândia", degree: "B.S. in Electrical Engineering", period: "2018–2023" },
];

export const EXPERIENCE: Experience[] = [
  {
    org: "University of São Paulo (USP – São Carlos)",
    role: "M.S. Researcher — Power System Protection",
    period: "2024–2026",
    bullets: [
      "Fault‑location in wind‑farm collector systems with IBRs.",
      "Virtual IED (87L) with EMT‑based validation.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "vied",
    title: "Virtual IED (87L) for IEC 61850",
    summary: "Open‑source vIED implementing line differential protection with SV/GOOSE, running on virtualized servers.",
    tags: ["IEC 61850", "87L", "Virtualization", "C++", "Linux RT"],
    repo: "https://github.com/yourrepo/vied",
  },
  {
    id: "omni-leads",
    title: "Omni Leads — B2B Intelligence",
    summary: "Lead‑scoring platform with geocoding, clustering, and RCA workflows.",
    tags: ["React", "FastAPI", "Postgres", "ML", "Geospatial"],
  },
];

export const PUBLICATIONS: Publication[] = [
  { title: "Challenges and recommendations for enhancing protection of onshore wind farm collector systems.", venue: "EPSR", year: "2026", link: "https://doi.org/10.1016/j.epsr.2025.112141" },
  { title: "An Improved Methodology to Locate Faults in Onshore Wind Farm Collector Systems.", venue: "Energies", year: "2025", link: "https://doi.org/10.3390/en18030693" },
];
```

---

## 4) UI/UX Requirements

* **Look & feel:** modern, airy spacing, rounded corners (xl–2xl), soft shadows, subtle borders, 12/14/16/20/24 typographic scale.
* **Color system:** light/dark with CSS variables (`--bg`, `--fg`, `--muted`, `--accent`). Respect user `prefers-color-scheme` and provide a toggle stored in `localStorage`.
* **Nav:** sticky top nav with active route indication. Footer with © year.
* **Cards:** used for project items and CV entries; focus on readability.
* **Motion:** small, tasteful transitions (opacity/translate).
* **Accessibility:** semantic HTML, focus states, adequate contrast, `aria-label`s for icon-only buttons.

---

## 5) Implementation Steps

1. **Install deps**

   ```bash
   npm i react-router-dom lucide-react react-helmet-async
   npm i -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

   Configure Tailwind `content` to include `./index.html` and `./src/**/*.{ts,tsx}`.

2. **Global styles & theme**

   * Add `src/styles/theme.css` with CSS variables for light/dark.
   * Add `src/index.css` importing Tailwind base/components/utilities and `theme.css`.

3. **App shell & routing**

   * `src/App.tsx`: layout with `<Header/>`, `<Outlet/>`, `<Footer/>`.
   * `src/main.tsx`: wrap in `BrowserRouter` and `HelmetProvider`.
   * Routes: `/`, `/projects`, `/cv`, `/about`, `/contact`, `*`.

4. **Components**

   * `Header` (logo initials "AJ", nav links, theme toggle using `localStorage` key `theme`),
   * `Footer` (© year),
   * `ProjectCard` (title, summary, tags, links).

5. **Pages**

   * **Home**: hero with name, headline, buttons, quick links.
   * **Projects**: grid + tag filter + search.
   * **CV**: sections from `src/data/site.ts`; add print CSS and a visible "Print / Save PDF" button calling `window.print()`.
   * **About**: short bio + image placeholder.
   * **Contact**: email link and simple form (no backend); validate required fields.
   * **404**: friendly message.

6. **SEO**

   * Set default `<title>` and `<meta name="description">` via `<Helmet>` component.
   * Add `public/robots.txt` and a basic `public/sitemap.xml` stub.

7. **Performance**

   * Code‑split routes via `lazy()`/`Suspense`.
   * Use responsive images (placeholders ok) and `loading="lazy"`.

8. **Testing (lightweight)**

   * Add `npm run typecheck` with `tsc --noEmit`.
   * Verify lighthouse scores locally (manual step).

9. **Vercel**

   * Ensure build works (`npm run build`), output to `dist/`.
   * Document environment variables if analytics is enabled (`VITE_PLAUSIBLE_DOMAIN` or GA4 ID). Default off.

---

## 6) File/Folder Plan

```
src/
  components/
    Header.tsx
    Footer.tsx
    ThemeToggle.tsx
    ProjectCard.tsx
  pages/
    Home.tsx
    Projects.tsx
    CV.tsx
    About.tsx
    Contact.tsx
    NotFound.tsx
  data/
    site.ts
  styles/
    theme.css
  types.ts
  App.tsx
  main.tsx
index.html
public/
  robots.txt
  sitemap.xml
```

---

## 7) Copy Guidelines (initial content)

* Keep descriptions brief; the user will expand later.
* Use the CV facts above for **Education**, **Experience**, **Publications**, **Awards** (only the NASA 2024 award as a single bullet in Home or CV).
* Projects: just the two placeholders (vIED, Omni Leads).

---

## 8) Visual Design Details

* **Spacing:** section blocks use container max‑width ~1100px with side padding 16px.
* **Typography:** import Inter (400/500/600/700). Set sensible leading and letter‑spacing.
* **Buttons:** medium radius, subtle border, hover elevation.
* **Tags:** small rounded pills with border.

---

## 9) Acceptance Criteria (must pass)

* All routes render without errors; mobile and desktop layouts look clean.
* Light/dark toggle persists and respects `prefers-color-scheme`.
* Projects page supports basic tag filtering and search.
* CV page prints beautifully (no nav/controls in print, good margins, readable typography).
* No console errors, `npm run build` succeeds.
* Wave or axe shows no critical accessibility issues.

---

## 10) Nice-to-Haves (if time allows)

* Framer Motion micro‑interactions on card hover and route fade.
* MDX support for About page.
* OpenGraph/Twitter meta tags and a social preview image.

---

## 11) Commands

```bash
npm i
npm run dev
npm run build
npm run preview
```

---

## 12) Handover

* Document how to add new projects (update `src/data/site.ts`) and how to create a dedicated project page later.
* Brief README with setup, scripts, and deploy steps for Vercel.

---

## 13) To‑Do Markers for the User

* [ ] Replace placeholder emails/links.
* [ ] Add real project details and images later.
* [ ] Decide on analytics and set env var if desired.

> Implement everything above now. Keep the code small, readable, and well‑typed. Use concise, self‑documenting names and add inline comments only where clarity truly benefits.
