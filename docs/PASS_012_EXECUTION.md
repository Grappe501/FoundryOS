# PASS-012 Execution — Collections + Communities

> Greenlit after PASS-011 close. Not Clubs — **Communities** (clubs are one implementation).

---

## Core Rule

```txt
Transformation accelerates in community.
```

Parallel to PASS-011:

```txt
Identity requires evidence.
```

---

## Mental Model Shift

| Old framing | PASS-012 framing |
|-------------|------------------|
| Collections + Clubs | **Collections + Communities** |
| Favorites, bookmarks, lists | **Personal Knowledge Assets** |
| Club | One type of **Community** |

---

## Collections ≠ Lists

Build **Personal Knowledge Assets** — collections are part of identity.

| Domain | Collection | Not |
|--------|------------|-----|
| Bourbon | My Bourbon Collection (rankings, reviews, tasting notes, evidence, progress) | 12 bourbons saved |
| Public Speaking | My Speech Library | bookmarks |
| Gardening | My Garden Journal | favorites list |
| AI Builder | My Project Portfolio | saved items |

---

## Communities (same architecture, any domain)

| Domain | Community example |
|--------|-------------------|
| Bourbon | Central Arkansas Bourbon Society |
| Public Speaking | Speaker Circle |
| Campaign Management | Regional Organizers Network |
| AI Builders | Foundry AI Lab |
| Master Gardeners | Central Arkansas Garden Collective |

---

## Success Test — Verification Dashboards

Like PASS-010 (`/loop`) and PASS-011 (`/evidence`).

### `/collections`

```txt
Collection Created        ✓
Entity Added              ✓
Evidence Linked           ✓
Identity Updated          ✓
```

### `/community`

```txt
Community Created         ✓
Member Joined             ✓
Project Assigned          ✓
Evidence Shared           ✓
```

---

## Exit Criteria

A user should be able to say:

```txt
This is what I'm becoming.
This is what I've done.
This is what I've collected.
These are the people I'm growing with.
```

---

## Out of Scope (PASS-012)

- Bourbon vertical launch (PASS-014)
- Full reputation/mastery (PASS-013)
- Treating collections as dumb lists

---

## Architecture Impact

**Reusable System:** Personal Knowledge Assets + Community OS  
**Benefits:** Identity compounding — collection + community accelerate transformation  
**Moat layer:** Ownership graph + shared mastery + evidence in community context
