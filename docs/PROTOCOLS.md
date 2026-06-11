# FoundryOS — Protocols

## H: Drive Enforcement

**Rule:** ZERO writes to C: drive. Non-negotiable.

```powershell
cd H:\FoundryOS
.\scripts\setup-h-drive.ps1          # lock env to H:
node scripts/enforce-h-drive.js      # abort if not on H:\FoundryOS
.\scripts\cleanup-c-drive-foundry.ps1  # remove C: leaks, mirror to H:
```

| Variable | Value |
|----------|-------|
| `TMP` / `TEMP` | `H:\FoundryOS\.cache\temp` |
| `npm_config_cache` | `H:\FoundryOS\.cache\npm` |
| `TURBO_CACHE_DIR` | `H:\FoundryOS\.cache\turbo` |
| `NETLIFY_CACHE_DIR` | `H:\FoundryOS\.cache\netlify` |
| `SUPABASE_INTERNAL_STORAGE` | `H:\FoundryOS\.cache\supabase` |
| Project root | `H:\FoundryOS` |

`npm run build` and `npm run dev` auto-run enforcement via `prebuild`/`predev` hooks.

If C: gets polluted: `npm run cleanup:c`

---

## Git Branch Strategy

```
main                    ← Production releases
├── develop             ← Integration branch
│   ├── feature/*       ← Platform features
│   ├── app/{slug}      ← Per-app development
│   ├── fix/*           ← Bug fixes
│   └── release/*       ← Release candidates
└── hotfix/*            ← Emergency production fixes
```

### Branch Naming

| Pattern | Example | Use |
|---------|---------|-----|
| `feature/{name}` | `feature/self-build-module` | Platform capability |
| `app/{slug}` | `app/bourbon-connoisseur` | Individual app |
| `fix/{name}` | `fix/auth-redirect` | Bug fix |
| `release/v{major}.{minor}` | `release/v0.1.0` | Release prep |
| `hotfix/{name}` | `hotfix/tier3-rls` | Production emergency |

### Commit Messages (Conventional Commits)

```
type(scope): description

Types: feat, fix, docs, chore, refactor, test, ci, build
Scope: core, ui, self-build, app/{slug}, supabase, docs
```

Examples:
```
feat(core): add category registry with slug validation
feat(app/bourbon): scaffold tier 1 catalog views
docs: add pass 1 to baseline log
chore: configure netlify edge functions
```

---

## Naming Conventions

### Apps

| Item | Convention | Example |
|------|------------|---------|
| Slug | `kebab-case` | `bourbon-connoisseur` |
| Display name | Title Case | `Bourbon Connoisseur` |
| Package | `@foundry/app-{slug}` | `@foundry/app-bourbon-connoisseur` |
| URL | `/{slug}` or subdomain | `bourbon.foundryos.app` |

### Code

| Item | Convention | Example |
|------|------------|---------|
| React components | PascalCase | `CatalogGrid.tsx` |
| Hooks | camelCase, `use` prefix | `useCategory.ts` |
| DB tables | snake_case | `user_collections` |
| DB columns | snake_case | `category_id` |
| Env vars | `SCREAMING_SNAKE` | `OPENAI_API_KEY` |
| API routes | kebab-case | `/api/catalog/search` |

### Packages (Monorepo)

```
@foundry/core        — Platform kernel
@foundry/ui          — Design system
@foundry/self-build  — AI self-build module
@foundry/config      — Shared configs
@foundry/app-{slug}  — Individual apps
```

---

## Environment Files

```
.env.example     ← Template (committed) — all keys, no values
.env.local       ← Local secrets (gitignored)
.env.production  ← Netlify production (never committed)
```

### Required Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_PLATFORM_NAME=FoundryOS
```

---

## GitHub Workflow

### Every Pass

1. Work on appropriate branch (`develop` or `feature/*`)
2. Commit with conventional message
3. Push to `origin`
4. Update `docs/BASELINE.md` pass log
5. Ernie reviews; Steve approves merges to `main`

### Pull Request Template

```markdown
## Summary
- [What changed]

## Pass Reference
- Pass [N] per Ernie assignment

## Test Plan
- [ ] H: drive verified
- [ ] Local dev runs
- [ ] Docs updated
```

---

## PASS Precheck

Run before every pass:

```powershell
npm run preflight
```

Verifies: H:\\FoundryOS location, H: disk space, `.env.local`, git state, Supabase connectivity, Netlify env vars.

---

## End-of-Pass Protocol (Burt)

Steve relays between Ernie and Burt. **Burt does not ask Steve for commit/push/deploy permission.**

At the end of every completed pass:

1. **Verify** — `npm run typecheck`, `npm run build`, pass-specific checks (`db:diagnose` when Supabase configured)
2. **Commit + push** — `git add -A`, conventional commit, `git push origin main`
3. **Deploy** — `npx netlify deploy --build --prod` (or GitHub auto-deploy via `netlify.toml`)
4. **Report** — commit hash, deploy URL, DB status, next pass

See `.cursor/rules/end-of-pass-deploy.mdc`

---

## Netlify Deployment

- **Production:** `main` branch → `foundryos.com` (Mission Control)
- **Preview:** All PRs get preview deploys
- **Env:** Managed in Netlify dashboard, mirrored in `.env.example`
- **Edge:** Priority for Tier 1 catalog pages (speed)

---

## Database Protocol

- **Single Supabase project** until scale demands split
- All apps share schema; `categories` table branches data
- RLS on every table
- Migrations via `supabase/migrations/`
- Never direct SQL in production without migration file

---

## Self-Build Protocol

Every new pattern Burt implements must:

1. Be documented in `packages/self-build/templates/`
2. Include a `manifest.json` describing replicable structure
3. Be testable by the self-build module independently
4. Follow the topic-swap model (config, not code forks)
