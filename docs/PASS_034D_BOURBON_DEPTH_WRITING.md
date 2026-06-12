# PASS-034D — Bourbon Depth Writing Pass

> **Stop adding surfaces. Deepen existing ones.**

## Core rule

```txt
Every Bourbon page must be worth reading even if the user clicks nothing.
```

## Writing standard

| Element | Minimum |
|---------|---------|
| Opening narrative | ≥150 words |
| Supporting sections | ≥100 words each (why it matters, misunderstanding, example, how to use, what next) |
| Tool cards | Hook + paragraph (≥40 words) + practical reason |
| Every page | Rabbit-hole links |

## Architecture

```txt
apps/platform/lib/bourbon-level-1/deep-copy/
  pages-core.ts      — major route narratives
  pages-tools.ts     — investigate/collect/wild routes
  tool-depth.ts      — Level 1 hub card copy
  index.ts

apps/platform/components/bourbon/
  BourbonDeepPageShell.tsx   — narrative wrapper
  BourbonDeepToolCard.tsx    — rich tool cards
  BourbonWorldDepthIntro.tsx — /bourbon home intro

scripts/audit-copy-depth.ts  — npm run audit:copy-depth
```

## Audit

```powershell
npm run audit:copy-depth
```

Flags: thin sections, one-liner cards, missing narrative, unwired pages.

## Exit criteria

- Bourbon feels authoritative, narrative, worth reading
- No major page feels like placeholder
- Copy-depth audit passes
- build:platform passes
- Deploy verified

## Beta gate

Depth writing (034D) runs parallel to consequence stack (034J→P). Neither replaces the other.
