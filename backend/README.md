# Aria Support Backend

Play Framework (Scala 2.13, Play 3.0.5) REST API backed by PostgreSQL via
Anorm. Serves the JSON data described in `../docs/API_CONTRACT.md` for the
Aria Support dashboard.

## Stack

- Play 3.0.5 / Scala 2.13.15
- Anorm 2.7.0 for raw parameterized SQL (no Slick, no ORM)
- PostgreSQL 16 (local install, not Docker)
- Play Evolutions for schema + seed data (`conf/evolutions/default/1.sql`)
- Play's CORS filter, allowing `http://localhost:4200` (GET, OPTIONS)

## Prerequisites

- Java 21
- sbt (this container has it at `/opt/sbt-install/sbt/bin/sbt`; add that dir
  to `PATH` or invoke the full path)
- PostgreSQL 16 installed locally

## 1. Start PostgreSQL and create the database

```bash
service postgresql start

su postgres -c "psql -c \"CREATE USER aria WITH PASSWORD 'aria' SUPERUSER;\""
su postgres -c "createdb -O aria aria_support"
```

(Skip the `CREATE USER`/`createdb` steps if they already exist — they are
idempotent to re-run once conditionally, e.g. wrap in a `psql -tc` existence
check.)

Connection details (see `conf/application.conf`):

- URL: `jdbc:postgresql://localhost:5432/aria_support`
- User: `aria`
- Password: `aria`

## 2. Run the app

```bash
export PATH="/opt/sbt-install/sbt/bin:$PATH"
cd backend
sbt run
```

Play listens on `http://localhost:9000`. On first request, Play Evolutions
automatically applies `conf/evolutions/default/1.sql`, which creates all
tables and inserts the seed data (`play.evolutions.autoApply = true` in
`application.conf`, so no manual confirmation step is needed in dev).

To apply evolutions ahead of time (optional), just hit any endpoint once,
e.g. `curl http://localhost:9000/api/kpis`.

## 3. Verify

```bash
curl http://localhost:9000/api/kpis
curl http://localhost:9000/api/conversations/c-1042
curl -i -H "Origin: http://localhost:4200" http://localhost:9000/api/kpis
```

The last command should show `Access-Control-Allow-Origin: http://localhost:4200`
in the response headers.

## Endpoints

All endpoints are `GET /api/...` and return JSON exactly matching
`../docs/API_CONTRACT.md`:

- `/api/kpis`
- `/api/volume-trend`
- `/api/resolution-split`
- `/api/csat-trend`
- `/api/ticket-categories`
- `/api/response-time-distribution`
- `/api/channel-mix`
- `/api/agents`
- `/api/conversations`
- `/api/conversations/:id` (404 with `{"error":"not_found"}` for unknown ids)
- `/api/automation-rules`

## Project layout

- `app/models/Models.scala` — case classes + `Writes[T]` for every JSON shape
- `app/repositories/Repositories.scala` — Anorm `RowParser`s + parameterized
  SQL queries via `play.api.db.Database`
- `app/controllers/Controllers.scala` — one controller per resource
- `conf/routes` — route table
- `conf/evolutions/default/1.sql` — schema DDL + seed data (Up/Down)
- `conf/application.conf` — datasource, evolutions, CORS config

## Resetting the database

If evolutions ever get into an inconsistent state (e.g. a manual edit to
`1.sql` after it partially applied), reset with:

```bash
su postgres -c "psql -d aria_support -c 'DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO aria; GRANT ALL ON SCHEMA public TO public;'"
```

then restart `sbt run` so evolutions re-apply from scratch.
