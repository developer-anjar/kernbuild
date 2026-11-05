# KernBuild website

KernBuild is a digital solutions and software development studio transforming ideas into impactful digital products. We specialize in full-stack development, web applications, UI/UX design, AI integration, and custom business solutions. We combine creativity, technology, and innovation to help businesses grow.

This static React 19 and Vite website is built with TypeScript. Page content, projects, statistics, and testimonials are bundled with the frontend; there is no custom backend or database connection.

## Local development

```bash
npm install
npm run dev
```

Vite prints the local URL after startup.

## Forms

Contact and feedback submissions use EmailJS directly from the browser, each with its own template. Copy `.env.example` to `.env.local` and set `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_CONTACT_TEMPLATE_ID`, `VITE_EMAILJS_FEEDBACK_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` to enable submissions. These are client-side EmailJS settings, not backend secrets. Do not put private keys or service-role credentials in Vite environment variables. Quote requests are currently unavailable.

Without those settings, forms show an error instead of reporting a false success. EmailJS must have a template configured to accept the parameters sent by `src/react/services/emailService.ts`.

## Production

```bash
npm run build
npm run preview
```

The static production site is written to `dist/`. `vercel.json` provides a single-page-app rewrite so direct navigation to React routes works on Vercel. Other static hosts should be configured to serve `index.html` for client-side routes.

## Content and routes

- `src/react/data/` contains the bundled site content.
- `src/react/pages/` and `src/react/routes/AppRoutes.tsx` define the pages and routes.
- `public/` contains static images and icons.
- Privacy and terms pages are starter copy; review them for the deployed business and applicable requirements before publication.
