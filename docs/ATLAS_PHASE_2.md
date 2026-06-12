# Atlas Phase 2 — Planning

> **During PASS-034M/P.** Build narrative + memory first; expand Atlas structure in parallel planning.

## What Atlas Is Becoming

Not a glossary. Not encyclopedia 2.0.

```txt
Knowledge Graph
+ Rabbit Hole Engine
+ Context Engine
+ AI Retrieval Layer
+ World Relationship Layer
```

Long-term: **Atlas-aware everything** — hover any term, dive without leaving the page.

Example: reading about Wild Turkey 101 → hover opens definition, distillery, Jimmy Russell, related bottles, debates, collections, **people who own this**, suggested next bottle.

Bourbon proof today: 103 terms, `AtlasTerm` inline component, rabbit-hole graph.

## Full Entry Schema (target)

Every Atlas entry eventually includes:

```txt
Definition · Story · History · Geography · Timeline
Related People · Related Places · Related Objects
Related Debates · Related Events · Related Collections
Related Artifacts · Related Worlds
```

## Phase 2 Entity Types

| Type | Purpose | Bourbon example |
|------|---------|-----------------|
| **Relationships** | Typed edges between terms | mash-bill → corn, rye, wheat |
| **Cousins** | Cross-domain parallels | wheated bourbon ↔ wheated beer |
| **Geography** | Place-linked terms | Kentucky, Bardstown, Bourbon County |
| **Timelines** | Historical sequence | Prohibition → medicinal permits → modern boom |
| **People** | Figures in the world | Jimmy Russell, Julian Van Winkle |
| **Organizations** | Houses, regulators, groups | Buffalo Trace, TTB, KDA |
| **Debates** | No-right-answer tensions | age vs NAS, allocation ethics |
| **Mysteries** | Open questions | Weller ghost, Stitzel-Weller juice |

## Cross-World Vision

Atlas becomes **connective tissue between worlds**:

- Bourbon `rickhouse` ↔ BBQ `smoke chamber` (cousin)
- Civic `rulemaking` ↔ Government Systems (vertical link)
- AI Builder `token` ↔ Financial Independence `unit economics` (concept bridge)

Package target (future): `@foundry/atlas-engine` — world configs, not per-world code.

## Operator Surface (034U)

`/operator/atlas` — term counts, depth score, missing definitions, missing rabbit holes, per-world and total.

## Implementation Order (post-034P)

1. Extend `AtlasEntry` schema with relationship types
2. Bourbon Phase 2 seed pass (people, orgs, timelines)
3. Generic `/[world]/atlas` when world factory generates atlas configs
4. Atlas-aware hover on all major pages (not just Bourbon)
5. AI retrieval layer reads Atlas graph for mentor + memory (035+)

## Pass Gate

> Does this term connect a user to another interesting thing they did not know they wanted?

If no — it is content. If yes — it is Atlas.
