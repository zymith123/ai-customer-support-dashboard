# Aria Support Frontend

Angular 18 (standalone components) dashboard, styled with Tailwind CSS and
Chart.js. Talks to the Play/Scala API described in `../docs/API_CONTRACT.md`.

## Development

```bash
npm install
npm start   # ng serve → http://localhost:4200
```
`proxy.conf.json` forwards `/api/*` to `http://localhost:9000` so the
backend (see `../backend/README.md`) needs to be running for real data;
otherwise pages render with empty states rather than crashing.

## Production build

```bash
npx ng build --configuration production --base-href /ai-customer-support-dashboard/
```
This inlines `src/environments/environment.prod.ts` in place of
`environment.ts` (see `angular.json`'s `fileReplacements`), so
`environment.prod.ts.apiBase` must point at the real deployed backend URL
before building — see the root README's Deployment section.

## Deployment (GitHub Pages)

Handled by `.github/workflows/deploy-pages.yml` on every push — no manual
build/upload needed. One-time setup: repo Settings → Pages → Build and
deployment → Source: **GitHub Actions**.

The workflow also copies `index.html` to `404.html` post-build, which is
the standard trick for SPA routing on GitHub Pages (no server-side
rewrites exist there, so a hard refresh on e.g. `/conversations` would
otherwise 404 before Angular's router gets a chance to run).
