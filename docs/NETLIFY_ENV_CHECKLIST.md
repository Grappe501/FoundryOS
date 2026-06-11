# Netlify Environment Checklist — PASS-004

> Required before deploying Mission Control (`foundryos.com`) to production.

---

## Site Contexts

| Context | App | Base |
|---------|-----|------|
| Production (default) | Mission Control | `apps/platform` |
| `admin` | Admin control plane | `apps/admin` |
| `site-engine` | Vertical routing | `apps/site-engine` |

See `netlify.toml`.

---

## Required Variables (Mission Control)

Set in Netlify → Site settings → Environment variables:

| Variable | Scope | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | All | Public — safe in client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | All | Public — RLS protects data |
| `SUPABASE_SERVICE_ROLE_KEY` | Build + Functions only | **Never** expose to client |
| `NEXT_PUBLIC_PLATFORM_NAME` | All | `FoundryOS` |
| `NEXT_PUBLIC_APP_URL` | Production | `https://foundryos.com` |

---

## Optional (Later Passes)

| Variable | When |
|----------|------|
| `OPENAI_API_KEY` | PASS-006+ content generation |
| `NETLIFY_SITE_ID` | Admin deploy automation |
| `NETLIFY_AUTH_TOKEN` | Admin deploy automation |

---

## Pre-Deploy Checklist

- [ ] Supabase project live and migrations applied
- [ ] `npm run db:diagnose` passes locally with production keys
- [ ] `npm run db:seed` completed (topics + sample entities)
- [ ] Storage buckets `entity-images`, `avatars` exist
- [ ] Service role key set as **scoped** (not in client bundle)
- [ ] `NEXT_PUBLIC_APP_URL` matches production domain
- [ ] Mission Control shows **Database: Connected** on home page
- [ ] No Bourbon/Books UI deployed (PASS-004 scope)

---

## Build Settings

```
Base directory: (repo root)
Build command: npm ci && npm run build:platform
Publish directory: apps/platform/.next
Node version: 20
```

NPM cache: `H:/FoundryOS/.cache/npm` (per `netlify.toml`)

---

## Deploy Verification

After deploy:

1. Visit `https://foundryos.com` — Mission Control loads
2. Check DB status panel — Connected, latency shown
3. Platform assets show live counts from Supabase
4. `/api/health/db` returns JSON health report

---

## Security Notes

- Anon key + RLS is the production security model
- Service role used only in server-side API routes and CI seed scripts
- Do not set `SUPABASE_SERVICE_ROLE_KEY` with `NEXT_PUBLIC_` prefix
