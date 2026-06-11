# Netlify Deploy — Every Pass

> Burt runs this automatically at end of every pass. Steve does not approve commits.

---

## Burt's End-of-Pass Command

```powershell
cd H:\FoundryOS
.\scripts\end-of-pass.ps1 -PassCode "PASS-005" -PassTitle "vertical resolution engine"
```

Or step by step:

```powershell
npm run preflight
npm run sandbox          # Netlify build simulation
git add -A && git commit -m "feat(PASS-XXX): title" && git push origin main
```

---

## What Sandbox Checks

1. Running from `H:\FoundryOS`
2. `netlify.toml` uses root monorepo build
3. `apps/platform/next.config.ts` transpiles workspace packages
4. `npm run typecheck` passes
5. `npm run build:platform` passes (same as Netlify)
6. `apps/platform/.next` exists
7. `.env.local` not staged

**Fix all failures before push.**

---

## Netlify Site Settings

| Setting | Value |
|---------|-------|
| Base directory | *(repo root — leave empty or `.`)* |
| Build command | `npm ci && npm run build:platform` |
| Publish directory | `apps/platform/.next` |
| Node version | 20 |

Env vars: `docs/NETLIFY_ENV_CHECKLIST.md`

---

## Deploy Methods

### A — GitHub auto-deploy (recommended)

1. Connect `Grappe501/FoundryOS` to Netlify
2. Production branch: `main`
3. Every `git push origin main` triggers deploy

### B — CLI manual

```powershell
cd H:\FoundryOS
.\scripts\setup-h-drive.ps1
npx netlify login
npx netlify link
npx netlify deploy --build --prod
```

### C — Deploy preview (PR)

Netlify creates preview URLs for pull requests automatically.

---

## Post-Deploy Verify

- [ ] `https://foundryos.com` loads Mission Control
- [ ] `/operations` shows metrics
- [ ] `/api/health/db` returns JSON (503 OK if Supabase not configured)
- [ ] No build errors in Netlify deploy log

---

## Common Blockers (Burt fixes in sandbox)

| Error | Fix |
|-------|-----|
| Module not found `@foundry/*` | `next.config.ts` transpilePackages |
| Build runs from wrong directory | `netlify.toml` command from root |
| Missing edge function | Remove `[[edge_functions]]` until implemented |
| Workspace deps missing | `npm ci` from root, not `apps/platform` alone |
