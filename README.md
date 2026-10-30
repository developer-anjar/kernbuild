# KernBuild

KernBuild is a React 19 website built with Vite and TypeScript for a software development studio. It includes a responsive homepage, searchable project listing, contact and feedback forms, privacy and terms pages, scroll and route animations, and a lazy-loaded Three.js hero visual.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173/`). `npm start` is also available as an alias.

## Production

```bash
npm run build
npm run preview
```

The production files are written to `dist/`.

## Project structure

- `src/main.tsx` boots React and React Router.
- `src/react/App.tsx` composes the persistent site shell.
- `src/react/routes/AppRoutes.tsx` defines application routes and page titles.
- `src/react/pages/` contains the home, projects, contact, feedback, and legal pages.
- `src/react/components/` contains navigation, forms, cards, motion utilities, and scene components.
- `src/react/data/`, `src/react/types/`, and `src/react/config/` hold display data, TypeScript contracts, and configurable site/API settings.
- `src/react/services/` contains contact and feedback submission logic.
- `src/react/hooks/` contains scroll and motion hooks.
- `src/react/styles/` contains global, responsive, motion, and component SCSS.
- `public/` contains static images and icons.

`BackgroundScene` is the persistent visual layer behind every route. It retains the fixed parallax image and mounts `HeroScene`, the lazy-loaded Three.js r149 renderer; the canvas is pointer-transparent so navigation and page controls remain interactive. This is an original KernBuild scene, not the ThreeUI Temple Night source.

## Contact and feedback configuration

Edit `src/react/config/environment.ts` to configure the backend base URL, backend availability, EmailJS public configuration, business email, and social links. Do not put private credentials in client-side configuration.

The contact form can send using EmailJS when its public key, service ID, and template ID are configured, or use `POST {apiBaseUrl}/contact` when a compatible backend is enabled. Feedback uses `POST {apiBaseUrl}/feedback`. If neither submission route is configured or a request fails, the interface reports that the message was not sent.

Image paths and site content are configured in `src/react/config/site.ts` and `src/react/data/`. The project and statistics data should be verified before publishing business claims; placeholder statistics are explicitly marked.

Privacy and terms pages are starter copy and should be reviewed against the deployed business, data handling, and applicable law before publication.
