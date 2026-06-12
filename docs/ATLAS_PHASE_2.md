# Atlas Phase 2 — Planning

> **The Atlas is the crown jewel.** Continue depth — build the graph that makes every term a weekend.

See `docs/WORLD_ECOSYSTEM_MODEL.md` · **PASS-040B** (034P.5 quiet start in repo)

## What Atlas Is Becoming

Not a glossary. Not encyclopedia 2.0.

```txt
Knowledge Graph
+ Rabbit Hole Engine
+ Context Engine
+ Continuity / Anticipation Layer
+ AI Retrieval Layer
+ World Relationship Layer
```

Long-term: **Atlas-aware everything** — hover any term, dive without leaving the page.

Example: reading about Wild Turkey 101 → hover opens definition, distillery, Jimmy Russell, related bottles, debates, collections, **people who own this**, suggested next bottle.

Bourbon proof today: 103 terms, `AtlasTerm` inline component, rabbit-hole graph.

## Full Entry Schema (target — every term)

```txt
Definition · History · Geography · Timeline
People · Organizations · Places
Debates · Mysteries · Controversies
Artifacts · Collections · Objects
Related Lessons · Related Tools · Related Producer Pages
Related Reviews · Related Community Discussions
Related Rabbit Holes · Related Worlds
```

### Example: Bottled in Bond

One term → a weekend:

```txt
Colonel E.H. Taylor · Bottled in Bond Act · Frankfort Kentucky
Heaven Hill · Old Grand-Dad Bonded · Weller Antique debate
Collector collection · Detective case · History article · Atlas cousins
```

## Phase 2 Entity Types

| Type | Purpose | Bourbon example |
|------|---------|-----------------|
| **People** | Figures in the world | Jimmy Russell, Julian Van Winkle |
| **Organizations** | Houses, regulators | Buffalo Trace, TTB, KDA |
| **Places** | Geography-linked | Kentucky, Bardstown, Frankfort |
| **Events** | Historical sequence | Prohibition, BiB Act |
| **Controversies / Debates** | Tensions | age vs NAS, allocation ethics |
| **Mysteries** | Open questions | Weller ghost, Stitzel-Weller juice |
| **Collections** | Curated storylines | Wheated Explorer, BiB collection |
| **Objects / Artifacts** | Things in the world | Barrel char, red wax seal |
| **Timelines** | Era sequences | Railroad-era warehouses → climate control |
| **Worlds** | Cross-domain links | BBQ smoke chamber ↔ rickhouse |

## Cross-World Vision

Atlas becomes **connective tissue between worlds**:

- Bourbon `rickhouse` ↔ BBQ `smoke chamber` (cousin)
- Civic `rulemaking` ↔ Government Systems (vertical link)
- Entrepreneur ↔ AI Builder · FI · Public Speaking (super-node)

Package target: `@foundry/atlas-engine` — world configs, not per-world code.

## Operator Surface (034U)

`/operator/atlas` — term counts, depth score, missing definitions, missing rabbit holes, graph edge coverage.

## Implementation Order

1. ✅ Relationship seeds (`relationship-seeds.ts`) — rickhouse, wheated, allocation, mash-bill
2. ✅ Graph builder with typed edges (`graph.ts`) — 034P.5 quiet start
3. **040B** — extend schema, seed people/orgs/timelines across bourbon atlas
4. Producer pages — documentary depth (field guide, not reference stub) — **content gap**
5. Generic `/[world]/atlas` when world factory generates atlas configs
6. Atlas-aware hover on all major pages
7. AI retrieval + continuity anticipation reads graph (035+)

## Pass Gate

> Does this term connect a user to another interesting thing they did not know they wanted?

If no — it is content. If yes — it is Atlas.
