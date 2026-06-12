# Device Strategy

Day 1 architecture supports **web or install on your phone** — one identity graph.

---

## Access Up Front (locked)

Every user chooses:

```txt
Web     — any browser, any device, foundry-os.netlify.app (and vertical domains)
Install — Add to Home Screen / PWA now · native Foundry app (App Store / Play) later
```

Consumer home and layout expose this **before** signup — not buried in settings.

Implementation:
- `public/manifest.webmanifest` — installable PWA shell
- `FoundryAccessOptions` — web + install prompt on home
- Same account, artifacts, passport sync via Supabase auth (040D+)

**Artifacts must work on both surfaces** — tasting notes on phone at the bar, workflows on desktop.

---

## Web

Vertical domains:

```txt
books.foundryos.com
bourbon.foundryos.com
movies.foundryos.com
```

Delivery mechanism for worlds — not separate products.

---

## Mobile

**One app: Foundry** (not per-vertical apps)

Roadmap:
1. **Now:** PWA install — home screen, offline-ready shell (see `docs/OFFLINE_SYNC.md`)
2. **Later:** App Store + Google Play — same codebase, worlds inside

**Do NOT build:** Bourbon App, Movie App, Book App.

### Home Screen

First screen: **What are you becoming?**

NOT Search · NOT Browse Topics · NOT Discover Content

Priority sections:
1. Active paths / artifacts
2. Current projects
3. Club activity
4. New knowledge (Atlas)
5. Recommended next step

Worlds inside one install: Bourbon · AI Builder · BBQ · Poker · …

### Why One App

- One install · one account · one notification system
- One social · reputation · collection · **artifact** graph
- One Foundry Identity

---

## Authentication (Day 1)

Supabase Auth:

```txt
Google · Apple · Email · Magic Link
```

---

## Offline Sync (Future)

Users download for offline use:

```txt
Collections · Academy · Atlas · Artifacts · Notes
```

Especially valuable for: hunting, travel, distilleries, conventions, festivals.

See `docs/OFFLINE_SYNC.md`

---

## Related

- `docs/PASS_040A_ARTIFACT_ENGINE.md`
- `docs/FOUNDRY_IDENTITY.md`
