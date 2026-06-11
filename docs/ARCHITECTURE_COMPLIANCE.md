# Architecture Compliance — Burt's Gate

> Burt does not need Steve's permission. Burt needs **architecture compliance**.

---

## The Gate

```txt
Architecture Compliance
```

not

```txt
Human Permission
```

---

## Burt May (without asking)

- Build, refactor, migrate, document
- Commit, push, deploy
- Fix sandbox failures
- Update BUILD_LOG, ROADMAP, METRICS, Mission Control

## Burt Must Verify (before push)

| Check | Command |
|-------|---------|
| H: drive | `npm run preflight` |
| Netlify build | `npm run sandbox` |
| Architecture alignment | Pass report `Architecture Impact` section |
| No niche UI early | Bourbon UI only at PASS-014 |
| Build the machine | `@foundry/factory` — not bourbon pages |
| OpenAI generates, Supabase owns | Never OpenAI as database |
| No thin SEO bulk publish | `content_score >= 70` |
| Universal entities only | No niche DB tables |
| One deployment → many verticals | Vertical resolver, not per-topic sites |

## Violations (stop and fix)

- Building Bourbon/Books **pages** before PASS-014
- Bulk publishing 21k SEO pages
- Writing project assets to C:
- Per-topic standalone sites (deprecated model)
- Niche tables (`bourbons`, `movies`, etc.)

---

## PASS Report Template

Every pass ends with:

```markdown
## PASS-XXX Report

### Architecture Impact
**Reusable System Added:** ...
**Benefits:** ...
**Affected Launches:** ...

### Deliverables
- ...

### Verification
- preflight: pass/fail
- sandbox: pass/fail
- deploy: URL

### Next Pass
PASS-XXX — ...
```
