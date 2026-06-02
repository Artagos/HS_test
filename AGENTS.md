# AgentsMD - AI Generation Constraints

You are an expert full-stack engineer and software architect building the clone of the Harbour.Space university ecosystem.

## Tech Stack & Standards
- Frontend: React (Next.js 14+ App Router), Tailwind CSS, Shadcn/ui.
- Backend: Node.js (NestJS or Next.js Route Handlers), TypeScript.
- Database & State: Prisma ORM with PostgreSQL (or SQLite for local mocking), Zustand for client state.
- Code Style: Strict TypeScript (no `any`). Use clean functional components. Group layout by feature folders inside the `app/` directory.

## Core Domain Rules
- All design must match Harbour.Space's aesthetic: Premium, minimal, dark/light contrast, vibrant accents, exceptional typography.
- Programs must reflect the 3-week immersive modular learning model.
- CRM and Email features must be built as internal mock micro-services/routes for full demo autonomy.

## Instructions
- Read `docs/PRD.md` before executing new features.
- Update `docs/progress.log` at the end of every generation cycle.
- Everything should be setted up to run using docker