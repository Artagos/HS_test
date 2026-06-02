# Harbour.Space Clone — 60-Minute Build Plan

> Generated before execution. Updated in real-time as phases complete.

## 1. Strategic Priorities
Per the challenge instructions, **quality > quantity**. We are building a cohesive **vertical slice** that tells a complete user story in a demo:

> **Anonymous Visitor → Discovers Programs → Applies → Admin Reviews in CRM → Student Logs In & Sees Dashboard**

This is more impressive than fragmented, half-finished pages.

## 2. Phase Breakdown

### Phase 1: Scaffold & Foundation (~8 min)
**Goal:** Working Next.js app with DB, auth, and design system ready.

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1.1 | Initialize Next.js 14+ (App Router, TypeScript, Tailwind) | Agent | `completed` |
| 1.2 | Add shadcn/ui (Button, Card, Dialog, Input, Badge, Tabs) | Agent | `completed` |
| 1.3 | Add Prisma + SQLite schema (`User`, `Program`, `Application`, `Lead`) | Agent | `completed` |
| 1.4 | Add Zustand global auth state | Agent | `completed` |
| 1.5 | Add simple JWT cookie auth (role-based: `STUDENT`, `ADMIN`) | Agent | `completed` |
| 1.6 | Global layout: Navbar with auth state, dark/light theme shell | Agent | `completed` |

### Phase 2: Marketing Homepage (~15 min)
**Goal:** Stunning first impression matching Harbour.Space's premium aesthetic.

| # | Task | Owner | Status |
|---|------|-------|--------|
| 2.1 | Hero Section — "Tech, Entrepreneurship, and Design" | Agent | `pending` |
| 2.2 | Stats Bar (ICPC Gold, 95% Employability, 50+ Nationalities) | Agent | `pending` |
| 2.3 | Campus Indicators (Barcelona & Bangkok cards) | Agent | `pending` |
| 2.4 | Programs Grid (5 tracks from PRD) | Agent | `pending` |
| 2.5 | CTAs: "Apply Now" & "Download Brochure" modals | Agent | `pending` |
| 2.6 | **Backend:** Programs API + Seed | Agent | `completed` |

### Phase 3: Program Pages + Lead Capture (~10 min)
**Goal:** Dynamic routes and working application funnel.

| # | Task | Owner | Status |
|---|------|-------|--------|
| 3.1 | Dynamic program pages `/programs/[slug]` | Agent | `pending` |
| 3.2 | 14-module timeline visual on program detail | Agent | `pending` |
| 3.3 | Apply Modal (Name, Email, Interest, Campus) → DB | Agent | `pending` |
| 3.4 | Brochure download mock + email capture | Agent | `pending` |
| 3.5 | **Backend:** Applications & Leads API | Agent | `completed` |

### Phase 4: Student Dashboard (~12 min)
**Goal:** Authenticated experience proving dual logged-in/logged-out flow.

| # | Task | Owner | Status |
|---|------|-------|--------|
| 4.1 | Current Module View (active 3-week block, remaining days, mentor) | Agent | `pending` |
| 4.2 | Academic Timeline (14 modules: Completed / Active / Upcoming) | Agent | `pending` |
| 4.3 | Profile/Documents checklist (English cert, Transcripts, Visa) | Agent | `pending` |
| 4.4 | Daily Schedule mock (3-hour interactive session block) | Agent | `pending` |
| 4.5 | **Backend:** Student dashboard data API | Agent | `completed` |

### Phase 5: Mock CRM Admin (~10 min)
**Goal:** Admin interface showing operational value.

| # | Task | Owner | Status |
|---|------|-------|--------|
| 5.1 | Admin route guard (`ADMIN` role protection) | Agent | `completed` |
| 5.2 | Leads table (homepage CTA captures) | Agent | `pending` |
| 5.3 | Application Pipeline (Kanban: Submitted → Interview → Accepted → Enrolled) | Agent | `pending` |
| 5.4 | Status advancement actions | Agent | `completed` |
| 5.5 | **Backend:** Admin CRM API | Agent | `completed` |

### Phase 6: Mock Email Service (~5 min)
**Goal:** Demonstrate automated workflow awareness.

| # | Task | Owner | Status |
|---|------|-------|--------|
| 6.1 | `/api/mock-email` internal route/logger | Agent | `completed` |
| 6.2 | Trigger A: "Application Received" on apply | Agent | `completed` |
| 6.3 | Trigger B: "Interview Invitation" on admin status change | Agent | `completed` |
| 6.4 | Simple viewer page `/admin/emails` | Agent | `pending` |
| 6.5 | **Backend:** Mock Email API | Agent | `completed` |

## 3. Intentionally Skipped (Scope Control)
To stay within 60 minutes and maintain polish:
- **Analytics Dashboard** — Low visual impact for demo time
- **Real email provider integration** — Mock logger is sufficient
- **PostgreSQL** — SQLite is faster for this scope
- **Image assets** — Unsplash URLs or colored placeholders
- **Complex animations** — CSS transitions only, no framer-motion unless time permits

## 4. Decision Log
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Database | SQLite | Fastest local setup, zero Docker config overhead |
| Auth | Custom JWT cookie | Faster to scaffold than NextAuth; sufficient for demo |
| Images | Unsplash source URLs | No asset management overhead |
| Programs | 5 tracks from PRD | Complete brand representation without bloat |

## 5. Execution Notes
- Update `docs/progress.log` at the end of every generation cycle per `AGENTS.md`.
- Use feature-folder grouping inside `app/` directory.
- Strict TypeScript — no `any`.
- All mock services (CRM, Email) must be fully autonomous (no external APIs required).

