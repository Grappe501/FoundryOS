# Foundry Identity System

> **Help me become the person I want to be.**

Users don't buy machinery. They buy outcomes.

MasterClass says: **Watch this.** Foundry says: **Become this.**

---

## Not Merely an Account

Every user has a **Foundry Identity** that follows them everywhere:

```txt
Steve Grappe

Roles:
Bourbon Steward · BBQ Pitmaster · Scholar · Strategist

Collections: 48
Reviews: 1,294
Paths Completed: 12
Communities Led: 4
```

---

## Package

`@foundry/ownership-graph`

```typescript
import { buildFoundryIdentity, EXAMPLE_STEVE_IDENTITY, FOUNDRY_VISION_STATEMENT } from '@foundry/ownership-graph';

const identity = buildFoundryIdentity(userId, { display_name: 'Steve Grappe', ... });
```

---

## Viral Loop

Most platforms share what people consumed.

Foundry shares **what people are becoming:**

```txt
Road to Bourbon Master — 62% Complete
Road to Civil War Historian — 41% Complete
```

Hook: **"What I'm becoming."**

---

## Database

`user_profiles` extensions:
- `mastery_titles` (JSONB)
- `paths_completed`
- `communities_led`
- `reviews_count`
- `identity_public`

---

## Cross-Device

One identity across:
- Web verticals (`bourbon.foundryos.com`, etc.)
- Single **Foundry** mobile app
- Offline sync manifests

See `docs/ROLES.md`, `docs/LEGACY_ENGINE.md`, `docs/DEVICE_STRATEGY.md`

---

## Legacy

Foundry remembers Year 1 → Year 20. Paths, projects, mentorship, communities built.

`legacy_profiles` — effort matters.
