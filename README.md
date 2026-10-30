# KernBuild

KernBuild is an Angular 20 website for a software development studio. The site includes a responsive homepage, searchable project listing, contact and feedback forms, and privacy and terms pages.

## Source layout

```text
src/app/
  core/       App-wide navbar, configuration, and API services
  pages/      Routed page compositions (home, projects, contact, legal)
  sections/   Independent homepage sections and their templates/styles
  shared/     Reusable footer, cards, and back-to-top control
  data/       Static content for services, projects, process, and tools
  models/     Shared TypeScript data contracts
  app.ts      Root layout
  app.routes.ts
```

`pages/home/home.component.html` only composes section selectors. Each homepage section lives in its own folder under `sections/`.

## Development

```bash
npm install
npm start
```

Open `http://localhost:4200/`. The Angular development server reloads when source files change.

## Build and tests

```bash
npm run build
npx ng test --watch=false --browsers=ChromeHeadless
```

## Contact email configuration

The contact form sends through EmailJS when all three settings are configured in `src/environments/environment.ts` and `environment.prod.ts`:

```ts
emailJs: {
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
  serviceId: 'YOUR_EMAILJS_SERVICE_ID',
  templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
}
```

Configure the recipient and template inside the EmailJS dashboard. The template must accept `from_name`, `reply_to`, `subject`, and `message`. Use the EmailJS allowed-origins setting for the deployed domain. The public key is intended for browser use; never put a private key or other secret in frontend environment files. The footer email link is controlled separately by `businessEmail`.

If EmailJS is not configured, the contact form can use `POST {apiBaseUrl}/contact` when a compatible API is available and `backendAvailable` is `true`. A successful API response must contain `{ "accepted": true }`; other responses are treated as failures. Feedback uses `POST {apiBaseUrl}/feedback`. Set `apiBaseUrl` and `backendAvailable` in the relevant environment file only after the backend is deployed. When no provider is available, the contact form reports that the message was not sent.

## Images and business data

Replace the configurable image paths in `src/app/core/config/site.config.ts` with the supplied hero, about, and project images. Local SVG illustrations are currently used as placeholders so missing screenshots do not produce broken images. Project URLs are intentionally omitted until verified. Statistics are marked as illustrative placeholders in the configuration and on the page; replace them with confirmed figures before making business claims.

## Interactive hero scene

The hero includes an original Three.js scene wrapped in a standalone Angular component at `src/app/shared/hero-scene/`. It uses Three.js r149 directly (not the older `@angular-three/core` renderer, whose peer requirements do not support this Angular 20 project). The renderer is lazy-loaded, pauses when the hero is offscreen or the document is hidden, respects reduced-motion preferences, and falls back to the configured hero image if WebGL initialization fails.

Privacy and terms pages are starter copy and require review against the deployed business, data handling, and applicable law before publication.
