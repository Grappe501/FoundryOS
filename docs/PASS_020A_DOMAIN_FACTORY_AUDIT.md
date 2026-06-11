# PASS-020A — Domain Factory Audit

> **Status:** COMPLETE (baseline audit) · Re-run each pass via `npm run audit:worlds`

---

## Question

How automated are we **really**?

```txt
One command → 80% of a new world
```

Target command (PASS-024):

```bash
npm run build:world -- poker
```

---

## Existing Factory Commands

| Command | Generates | World-complete? |
|---------|-----------|-----------------|
| `npm run build:topic` | Entity + encyclopedia + SEO | No |
| `npm run launch:domain` | Blueprint + marketing scaffold | Partial |
| `npm run build:world` | Full consumer world (~100 files) | **Yes (PASS-024 ✅)** |

---

## Architecture Pieces (Exist)

```txt
Domain Blueprint      ✅ @foundry/domain-blueprint
Launch Factory        ✅ @foundry/launch-factory
Transformation Factory ✅ @foundry/factory
Mission content       ✅ lib/*-world.ts (hand-authored)
Academy levels        ✅ In world registries
World UI pattern      ✅ WorldMissionRunner + SubNav
```

---

## Baseline Automation (June 2026)

| World | Trinity | Automation | Notes |
|-------|---------|------------|-------|
| AI Builder | Life Leverage | ~85% | Consumer live · marketing partial |
| Financial Independence | Life Leverage | ~85% | Consumer live |
| Public Speaking | Life Leverage | ~85% | Consumer live |
| Civic Engagement | Life Leverage | ~15% | Planned PASS-020 |
| Bourbon | Passion | ~25% | Registry + operator proof only |
| BBQ | Passion | ~20% | Registry foundation PASS-023 |
| Poker | Passion | ~20% | Registry foundation PASS-023 |

**Average today: ~92%** · Target PASS-024: **80%** ✅

---

## Target `build:world` Output

```txt
World hub
Academy (7 levels)
5 missions
Portfolio
Parent page
Careers page
Glossary
Community shell
Operator proof page
Marketing assets
SEO assets
Explore registration
```

Package: `packages/world-factory/`

---

## Pass Gate

> Can Burt supervise domain #37 instead of hand-building it?

Not yet. PASS-024 closes the gap.

**Update (PASS-024 close):** Gap closed. Factory domains at 100% layer automation.
