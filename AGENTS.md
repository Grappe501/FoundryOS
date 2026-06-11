# FoundryOS — Agent Instructions

This file provides context for AI agents (Burt/Cursor) working on FoundryOS.

## Hard Constraints

1. **H: drive only** — ZERO writes to C: drive. Run `setup-h-drive.ps1` + `enforce-h-drive.js` before every command. See `.cursor/rules/h-drive-only.mdc`
2. **Platform-first** — Build for 1000 apps, not one app
3. **Self-build ready** — Every pattern must be replicable by `packages/self-build`
4. **Document every pass** — Update `docs/BASELINE.md` pass log

## Team

- **Steve** — Founder, vision, investor relations
- **Ernie** — Pilot (ChatGPT), strategy, build assignments
- **Burt** — Builder (Cursor AI), code and infrastructure

## Architecture

- Monorepo: Turborepo with `apps/` and `packages/`
- Database: Single Supabase schema, `categories` table branches apps
- Tiers: Free (catalog) → $4/mo (ownership) → $18/mo (social + AI)
- Styling: Clean, elegant, high-tech. No kitsch.

## Key Docs

- `docs/MASTER_BUILD_PLAN.md` — Phase roadmap
- `docs/APP_CATALOG_250.md` — 250 app targets
- `docs/PROTOCOLS.md` — Git, naming, env conventions
- `docs/ARCHITECTURE.md` — System design

## Before EVERY Command

```powershell
cd H:\FoundryOS
.\scripts\setup-h-drive.ps1
node scripts/enforce-h-drive.js
```

## After Every Pass (automatic — no Steve approval)

```txt
Build → sandbox → fix → commit → push → Netlify deploy → verify → report
```

```powershell
npm run preflight
npm run db:migrate
npm run build:platform
git add -A && git commit && git push origin main
# verify production routes — pass closes only when live
```

Or: `.\scripts\end-of-pass.ps1 -PassCode "PASS-XXX" -PassTitle "title"`

**Never ask for commit/push/deploy permission at end of pass.**

See `.cursor/rules/end-of-pass-deploy.mdc` and `docs/NETLIFY_DEPLOY.md`
