# FoundryOS — Architecture Course Correction

> **Ernie → Burt directive** — Before PASS-002  
> **Date:** June 10, 2026  
> **Authority:** Steve approved

---

## The Shift

### Stop Thinking "Apps"

```txt
FoundryOS
├── Verticals        → Public domain (books.foundryos.com)
├── Categories       → Grouping within vertical
├── Topics           → 1,961 registry entries (pages, not sites)
├── Collections      → User-owned data (Tier 2)
├── Users
└── AI Experts       → Persona + prompt packs per vertical/topic
```

**1,961 topics ≠ 1,961 websites.**

---

## Public Sites (Vertical Domains)

| Domain | Contains |
|--------|----------|
| `books.foundryos.com` | Fantasy, Sci-Fi, Mystery, Authors, Book Clubs, Reading Challenges… |
| `movies.foundryos.com` | Noir, Horror, Directors, Franchises, Festivals… |
| `music.foundryos.com` | Jazz, Vinyl, Hip-Hop, Production, Festivals… |
| `bourbon.foundryos.com` | Distilleries, Expressions, Tasting, Clubs… |
| `bbq.foundryos.com` | Regions, Techniques, Joints, Competitions… |
| `collegebaseball.foundryos.com` | Teams, Recruiting, Stats, Fan clubs… |

Topics = URL paths beneath vertical domain:

```txt
books.foundryos.com/fantasy
books.foundryos.com/science-fiction
bourbon.foundryos.com/distilleries/buffalo-trace
```

**NOT:**

```txt
fiction-fantasy.foundryos.com   ❌ SEO dilution
author-shakespeare.foundryos.com ❌ operational chaos
```

---

## Five Systems Before Any Niche Launch

| # | System | Package / App |
|---|--------|---------------|
| 1 | SEO Engine | `packages/seo-engine` |
| 2 | Knowledge Graph Engine | `packages/knowledge-graph` |
| 3 | Topic Registry Engine | `packages/topic-registry` |
| 4 | Mission Control Website | `apps/platform` (foundryos.com) |
| 5 | Pass Tracking System | `docs/BUILD_LOG.md` + public `/passes` |

---

## SEO First-Class

Every topic page auto-generates:

- Structured data (Organization, Review, Product, Collection, Article, FAQ, Event, Person, List)
- Internal links via Knowledge Graph
- Programmatic paths: `/collections`, `/rankings`, `/reviews`, `/best-of`, `/beginners-guides`, `/comparisons`, `/history`

---

## foundryos.com = Mission Control

Not a brochure. Living headquarters showing:

- Apps Live, Topics Cataloged, Collections, Reviews, Users, Clubs, AI Experts
- Investor section: Vision, Roadmap, Milestones, Architecture
- Build Journal: PASS-000, PASS-001, PASS-002…

---

## Admin Additions

| Dashboard | Shows |
|-----------|-------|
| Knowledge Graph | Entities, Relationships, Collections, Growth |
| SEO | Indexed pages, Generated pages, Internal links, Topic authority |
| AI Brain | Expert personas, Prompt packs, Usage, Cost |
| Self-Build | Registry size, Topics ready/published/pending |

---

## Deprecated Model

| Old | New |
|-----|-----|
| `app_sites` per topic | `vertical_sites` per public domain |
| `{slug}.foundryos.app` | `{vertical}.foundryos.com/{topic}` |
| 1,961 Netlify sites | ~20–40 vertical domains + wildcard paths |
| `categories` = app | `topics` registry; `verticals` = public site |

Migration path: `supabase/migrations/20260610200000_vertical_topics_kg.sql`
