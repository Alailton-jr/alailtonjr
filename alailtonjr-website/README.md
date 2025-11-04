# Alailton J. Alves Junior - Personal Website# React + TypeScript + Vite



A modern, responsive personal website built with React, TypeScript, Vite, and Tailwind CSS.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



## 🚀 Tech StackCurrently, two official plugins are available:



- **React 19** - UI library- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- **TypeScript** - Type safety- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- **Vite** - Build tool and dev server

- **Tailwind CSS v4** - Styling## React Compiler

- **React Router v7** - Routing

- **Lucide React** - IconsThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).



## 📁 Project Structure## Expanding the ESLint configuration



```If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

src/

├── components/          # Reusable UI components```js

│   ├── Header.tsx      # Navigation header with theme toggleexport default defineConfig([

│   ├── Footer.tsx      # Site footer  globalIgnores(['dist']),

│   ├── ThemeToggle.tsx # Dark/light mode toggle  {

│   └── ProjectCard.tsx # Project display card    files: ['**/*.{ts,tsx}'],

├── pages/              # Route pages    extends: [

│   ├── Home.tsx        # Landing page      // Other configs...

│   ├── Projects.tsx    # Projects showcase

│   ├── CV.tsx          # Curriculum Vitae      // Remove tseslint.configs.recommended and replace with this

│   ├── About.tsx       # About me      tseslint.configs.recommendedTypeChecked,

│   ├── Contact.tsx     # Contact form      // Alternatively, use this for stricter rules

│   └── NotFound.tsx    # 404 page      tseslint.configs.strictTypeChecked,

├── data/               # Static data      // Optionally, add this for stylistic rules

│   └── site.ts         # Site content (profile, projects, etc.)      tseslint.configs.stylisticTypeChecked,

├── styles/             # Global styles

│   └── theme.css       # CSS variables for theming      // Other configs...

├── types.ts            # TypeScript type definitions    ],

├── App.tsx             # App layout wrapper    languageOptions: {

└── main.tsx            # App entry point with routing      parserOptions: {

```        project: ['./tsconfig.node.json', './tsconfig.app.json'],

        tsconfigRootDir: import.meta.dirname,

## 🎨 Features      },

      // other options...

- ✅ **Dark/Light Mode** - Respects system preference with manual toggle    },

- ✅ **Responsive Design** - Mobile-first approach  },

- ✅ **SEO Optimized** - Meta tags, sitemap, robots.txt])

- ✅ **Print-Friendly CV** - Optimized for PDF export```

- ✅ **Code Splitting** - Lazy-loaded routes for better performance

- ✅ **Accessible** - Semantic HTML and ARIA labelsYou can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

- ✅ **Project Filtering** - Search and tag-based filtering

```js

## 🛠️ Development// eslint.config.js

import reactX from 'eslint-plugin-react-x'

### Prerequisitesimport reactDom from 'eslint-plugin-react-dom'



- Node.js 18+ and npmexport default defineConfig([

  globalIgnores(['dist']),

### Installation  {

    files: ['**/*.{ts,tsx}'],

```bash    extends: [

npm install      // Other configs...

```      // Enable lint rules for React

      reactX.configs['recommended-typescript'],

### Development Server      // Enable lint rules for React DOM

      reactDom.configs.recommended,

```bash    ],

npm run dev    languageOptions: {

```      parserOptions: {

        project: ['./tsconfig.node.json', './tsconfig.app.json'],

Visit [http://localhost:5173](http://localhost:5173)        tsconfigRootDir: import.meta.dirname,

      },

### Build for Production      // other options...

    },

```bash  },

npm run build])

``````


Output: `dist/` directory

### Preview Production Build

```bash
npm run preview
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

## 📝 Content Management

### Adding/Editing Projects

Edit `src/data/site.ts` and add to the `PROJECTS` array:

```typescript
{
  id: "unique-id",
  title: "Project Name",
  summary: "Brief description",
  tags: ["Tag1", "Tag2"],
  repo: "https://github.com/...",  // optional
  link: "https://demo.com",        // optional
  image: "/path/to/image.jpg"      // optional
}
```

### Updating Personal Info

Edit the `PROFILE`, `EDUCATION`, `EXPERIENCE`, `PUBLICATIONS`, and `AWARDS` constants in `src/data/site.ts`.

### Creating Dedicated Project Pages

Future enhancement. For now, all projects are displayed as cards on `/projects`.

## 🚢 Deployment (Vercel)

### Quick Deploy

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel will auto-detect Vite and configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Environment Variables (Optional)

If adding analytics:
- `VITE_PLAUSIBLE_DOMAIN` - for Plausible Analytics
- `VITE_GA4_ID` - for Google Analytics 4

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

Personal project - All rights reserved.

## ✅ To-Do

- [ ] Replace placeholder email/links with real ones (already done in data/site.ts)
- [ ] Add real project images
- [ ] Consider adding analytics (optional)
- [ ] Create dedicated project detail pages (future enhancement)
- [ ] Add OpenGraph image for social sharing

---

**Built with ❤️ by Alailton J. Alves Junior**
