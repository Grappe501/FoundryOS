# Weekly Engagement Push

**Pass target:** PASS-041W (after PWA push permissions + 040D identity persistence)

Foundry draws users back **once per week** with a personalized message — not a generic newsletter blast.

---

## Product intent

```txt
Help me become the person I want to be.
```

Weekly push is a **draw-in**, not a content dump:

- One rabbit hole (graph node, Atlas term, mission)
- One clear action (open hallway, log artifact, start collection path)
- **Random day and time each week** so habit fatigue does not set in

---

## Schedule model

Package: `@foundry/weekly-engagement-engine`

```typescript
computeWeeklyPushSchedule(userId, timezone, referenceDate)
```

- **Deterministic per user + ISO week** — same slot all week, new slot next week
- **Day:** pseudo-random 0–6 (Sun–Sat) from `hash(userId:weekKey)`
- **Time:** 8:00–19:45 local, 15-minute buckets
- **Timezone:** user preference from profile (040D)

This prevents predictable "Tuesday 9am" fatigue while staying reproducible for QA.

---

## Message generation (041W)

Factory reads:

1. Active world + paths (`user_entity_relationships`)
2. Weak graph nodes user has not visited (040B2 operator queue inverted per user)
3. Recent artifacts — nudge continuation vs new doorway
4. Atlas weekend exemplars (BiB, high-rye ladder, etc.)

Output: `WeeklyPushPayload` with `title`, `body`, `deep_link`, `kind`.

---

## Delivery surfaces

| Surface | When |
|---------|------|
| PWA Web Push | Now — `manifest.webmanifest` + service worker |
| Native Foundry app | App Store / Play — same payload schema |
| Email fallback | Opt-in only if push denied |

One notification system per `docs/DEVICE_STRATEGY.md`.

---

## Database (planned)

Table: `weekly_push_deliveries`

- `user_id`, `week_key`, `scheduled_at`, `delivered_at`, `opened_at`
- `payload_json`, `channel`, `graph_slug`

Supabase Edge Function cron: hourly sweep → users whose local window matches now.

---

## Build order

```txt
040B2  Graph hallways (message targets exist)
040D   User persistence + timezone
040E/F Review + recommend (richer message context)
041W   Weekly engagement engine + push cron
```

---

## Audit

```powershell
npm run audit:weekly-engagement
```

Validates schedule variance week-to-week and message factory shape.

---

## Related

- `docs/DEVICE_STRATEGY.md`
- `docs/PASS_040B_ATLAS_GRAPH_ENGINE.md`
- `packages/weekly-engagement-engine/`
