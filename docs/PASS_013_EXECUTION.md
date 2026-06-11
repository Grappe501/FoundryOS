# PASS-013 Execution — Reputation + Mastery

> Greenlit after PASS-012 close. **Not points. Not gamification.**

---

## Core Rules

```txt
Reputation is earned trust.
Mastery is demonstrated capability.
```

---

## Chain (locked — do not break)

```txt
Evidence Engine  →  Reputation  →  Mastery  →  Identity  →  Community
     (PASS-011)      (PASS-013)    (PASS-013)   (PASS-003+)  (PASS-012)
```

- **Evidence** feeds **Reputation** — verified submissions, trust weight, tiers
- **Reputation** feeds **Mastery** — titles earned from demonstrated capability, not activity
- **Mastery** feeds **Identity** — Foundry Identity reflects what you can demonstrate
- **Identity** feeds **Community** — communities recognize and accelerate real experts

---

## Do Not Build

- Points, streaks, leaderboards for engagement
- Badges for logging in or browsing
- Gamified "levels" disconnected from evidence

---

## Do Build

- Trust scores derived from evidence + community validation
- Mastery titles tied to paths, projects, and verified evidence
- Expertise profiles visible for attribution (Tier 1 reads Tier 3 experts)
- `/reputation` or equivalent proof dashboard (pattern: `/loop`, `/evidence`, `/collections`)

---

## Prerequisites (complete)

- PASS-010 Transformation Loop ✅
- PASS-011 Evidence Engine ✅
- PASS-012 Collections + Communities ✅

---

## Out of Scope

- Bourbon vertical UI (PASS-014)
- Bulk reputation without evidence linkage

---

See `docs/REPUTATION_SYSTEM.md`, `docs/EXPERT_DEVELOPMENT.md`
