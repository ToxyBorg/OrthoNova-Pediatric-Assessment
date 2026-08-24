# OrthoNova

OrthoNova is a bilingual French/Arabic pediatric speech and language screening workspace for orthophonistes.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/orthonova/src/data/assessment-content.ts` — structured 17-item assessment definition
- `artifacts/orthonova/src/lib/scoring.ts` — deterministic VP/RAN/PA scoring and threshold interpretation
- `artifacts/orthonova/src/lib/i18n.tsx` — French/Arabic language state and RTL document direction
- `artifacts/orthonova/src/pages/assessment.tsx` — clinician-controlled guided session and local progress state
- `artifacts/api-server/src/routes/orthonova.ts` — typed patient and assessment API routes
- `lib/db/src/schema/orthonova.ts` — PostgreSQL/Drizzle persistence model
- `lib/api-spec/openapi.yaml` — API contract source of truth

## Architecture decisions

- The assessment definition is data-driven so future age groups and languages can be added without duplicating the runner.
- The final score follows the specification exactly: VP + (RAN / 1.8) + (PA / 5), with raw and normalized values kept distinct.
- Arabic switches document direction to RTL while keeping the assessment’s visual stimuli intuitive.
- Demo fallbacks keep the guided prototype navigable when persistence is unavailable; API contracts and Drizzle tables are ready for a database-backed implementation.

## Product

The prototype provides a clinician dashboard, demo patient Lina Benali, patient management, assessment history, a 17-item guided assessment with two break points, automatic scoring, observations/notes, bilingual French/Arabic UI, RTL support, autosave feedback, and a professional results/report view.

## User preferences

No additional user preferences recorded.

## Gotchas

- Run API code generation after changing `lib/api-spec/openapi.yaml`.
- Item 12 and item 14 word sets were not included in the provided specification; their source-defined content remains explicitly configurable rather than being silently invented.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
