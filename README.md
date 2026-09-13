# Aria Support — AI Customer Support Dashboard

A full-stack dashboard for an AI-assisted customer support product: live
KPIs, conversation volume and channel mix, an inbox with AI-drafted replies
and confidence scoring, AI/human agent performance, automation rules, and
account settings — in light and dark mode.

## Stack

| Layer    | Tech |
|----------|------|
| Frontend | Angular 18 (standalone components), Tailwind CSS, Chart.js |
| Backend  | Play Framework (Scala 2.13) + Anorm |
| Database | PostgreSQL |

The two halves communicate over a plain REST/JSON API — see
[`docs/API_CONTRACT.md`](docs/API_CONTRACT.md) for every endpoint and its
exact response shape.

## Running locally

**Backend** (needs PostgreSQL running locally):
```bash
sudo -u postgres psql -c "CREATE USER aria WITH PASSWORD 'aria' SUPERUSER;"
sudo -u postgres createdb -O aria aria_support
cd backend && sbt run   # → http://localhost:9000, schema + seed data auto-applied
```

**Frontend**:
```bash
cd frontend && npm install && npm start   # → http://localhost:4200
```
The dev server proxies `/api/*` to `localhost:9000` (see
`frontend/proxy.conf.json`), so no CORS config is needed locally.

## Deployment

This repo deploys as two independent free-tier services — see each
component's README for details:

- **Frontend → GitHub Pages**, via [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).
  Fully automatic on every push once Pages is enabled once for the repo
  (Settings → Pages → Build and deployment → Source: **GitHub Actions**).
- **Backend → Render**, via the one-click blueprint at
  [`backend/render.yaml`](backend/render.yaml) (provisions the API and its
  Postgres database together). See [`backend/README.md`](backend/README.md)
  for the exact steps.

After the backend is deployed, point the frontend at it by setting `apiBase`
in `frontend/src/environments/environment.prod.ts` to the Render service URL
and pushing — the Pages workflow redeploys automatically.

## Project layout

```
frontend/   Angular app
backend/    Play Scala API
docs/       API contract shared by both
```
