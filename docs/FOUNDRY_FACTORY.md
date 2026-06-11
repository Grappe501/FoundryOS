# Foundry Factory

> The real product is not Bourbon. The real product is the machine that builds Bourbon.

---

## The Stack

```txt
Topic Registry
     ↓
Transformation System Factory   ← PASS-009
     ↓
Transformation Graph Engine     ← PASS-010
     ↓
Evidence Engine                 ← PASS-011
     ↓
Collections + Clubs             ← PASS-012
     ↓
Reputation + Mastery            ← PASS-013
     ↓
Vertical Resolver               ← PASS-005
     ↓
Deployment Engine
```

Content Factory + SEO Factory (PASS-006) support the graph — content is a byproduct.

If we get this right, Bourbon is just the first proof.

---

## Self-Assembly Engine v1 (PASS-006)

### Input

```json
{
  "topic": "Buffalo Trace",
  "slug": "buffalo-trace",
  "entity_type": "spirit",
  "vertical_domain": "bourbon.foundryos.com"
}
```

### Output (automatic)

- Overview, History, FAQ, Guides, Comparisons, Rankings, Collections
- Review framework
- Related entities + internal links
- SEO metadata + structured data
- Entity record + attributes + relationships

**Generated. Scored. Stored. Queued. Not published by default.**

---

## Pipeline (non-negotiable)

```txt
OpenAI
  ↓ Generate
  ↓ Validate
  ↓ Score
  ↓ Store        ← Supabase owns
  ↓ Publish Decision (score >= 70, manual/auto gate)
```

**Never:** User question → Ask OpenAI → Done

**Moat:** Registry + Knowledge Graph + Ownership Graph + Collections + Reputation + Community

AI accelerates construction. Supabase owns truth.

---

## Four AI Systems (roadmap)

| AI | Role | Package |
|----|------|---------|
| #1 Entity Builder | Records, attributes, aliases | `factory/ai/entity-builder` |
| #2 Content Builder | Pages, guides, FAQ | `factory/ai/content-builder` |
| #3 Relationship Builder | Graph expansion | `factory/ai/relationship-builder` |
| #4 SEO Builder | Schema, links, clusters | `factory/ai/seo-builder` |

---

## CLI

```powershell
npm run build:topic -- --topic "Buffalo Trace" --slug buffalo-trace --type spirit
```

Output: `.cache/factory/buffalo-trace.json`

---

## Strategic Focus

```txt
100,000 entities  >  1,961 topics
```

Topics create SEO. Entities create ownership. Ownership creates retention.

People collect Buffalo Trace, The Godfather, Led Zeppelin IV — not "bourbon-connoisseur."

---

## Package

`@foundry/factory` — `assembleEntity()`, `buildStorePlan()`

Now includes `@foundry/encyclopedia-engine` — 10 sections + recipes per entity.

See `docs/KNOWLEDGE_UNIVERSE.md`

Tables: `factory_runs`, `factory_queue`

See `docs/SELF_ASSEMBLY.md`
