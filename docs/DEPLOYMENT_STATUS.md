# Deployment Status

**Production URL:** https://foundry-os.netlify.app/  
**Deploy trigger:** Push to `origin/main` (GitHub → Netlify)

## PASS-033 verification checklist

- [ ] `/` loads
- [ ] `/explore` — student-safe toggle works
- [ ] `/search` — global search
- [ ] `/pricing` — household tier copy
- [ ] `/operator` — Mission Control
- [ ] `/operator/business`
- [ ] `/operator/ai-brain`
- [ ] `/ai-builder`, `/financial-independence`, `/public-speaking`
- [ ] `/bourbon`, `/bbq`, `/poker`, `/civic-engagement`

## Build commands

```powershell
cd H:\FoundryOS
.\scripts\setup-h-drive.ps1
node scripts/enforce-h-drive.js
npm run sandbox
```

## Supabase

- Migrations: `supabase/migrations/`
- Latest: `20260702100000_pass033_governance_households.sql`
- If `db:migrate` fails: run `supabase migration repair` per CLI hint

## Netlify CLI

Local CLI may require login — GitHub push auto-deploys.

See [NETLIFY_DEPLOY.md](NETLIFY_DEPLOY.md)
