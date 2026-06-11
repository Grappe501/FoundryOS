# Device Strategy

Day 1 architecture supports three surfaces — one identity graph.

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

**One app: Foundry** (not Foundry Encyclopedia, not Foundry Academy)

- App Store
- Google Play

**Do NOT build:** Bourbon App, Movie App, Book App.

### Home Screen

First screen: **What are you becoming?**

NOT Search · NOT Browse Topics · NOT Discover Content

Priority sections:
1. Active Paths
2. Current Projects
3. Club Activity
4. New Knowledge
5. Recommended Next Step

Inside Foundry, verticals appear as **worlds:**

```txt
Bourbon · Movies · Books · Music · BBQ · Genealogy
```

### Why One App

- One install
- One account
- One notification system
- One social graph
- One reputation graph
- One collection graph
- One Foundry Identity

---

## Authentication (Day 1)

Supabase Auth:

```txt
Google
Apple
Email
Magic Link
```

---

## Home Screen Psychology

People don't pin "Bourbon Encyclopedia."

They pin **Foundry** — their second brain.

---

## Offline Sync (Future)

Users download for offline use:

```txt
Collection · Academy · Encyclopedia · Notes
```

Especially valuable for: hunting, fishing, travel, genealogy, museums, conventions, festivals.

See `docs/OFFLINE_SYNC.md`
