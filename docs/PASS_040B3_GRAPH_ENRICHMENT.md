# PASS-040B3 — Bourbon Graph Enrichment + Atlas Word-Linking

> **040B2 built the hallways. 040B3 opens the doors inside them.**

## Experience shift

```txt
NOT:  Read this bottle page.
YES:  Enter this bottle and wander.
```

That is the Foundry difference at Layer 1.

## Core goal

Every graph page, bottle page, and Atlas page should be **saturated with meaningful inline links** — not footer cards, not isolated panels. Links live **inside paragraphs** where the reader's eye already is.

## Link saturation matrix

| Source page | Inline links to |
|-------------|-----------------|
| Graph pages | Atlas terms, bottles, producers, debates, collections |
| Bottle pages | Producers, Atlas terms, comparable bottles, debates |
| Atlas entries | Bottles, producers, related Atlas terms, graph routes |
| Producer pages | Bottles, people slots, debates, places |
| Debate pages | Atlas terms, bottles, investigations, artifacts |

## Required link types

```txt
AtlasTerm links inside graph paragraphs
Bottle links inside Atlas entries
Producer links inside bottle narratives
Debate links inside producer pages
Collection links inside graph pages
```

Every inline link must:

- Resolve to a real route (`/bourbon/graph/[slug]`, `/bourbon/atlas/[term]`, `/bourbon/bottles/[slug]`, etc.)
- Carry confidence where factual (`verified`, `commonly_reported`, `editorial`, `unknown`)
- Never invent entities — link only to inventory or seeded graph nodes

## Universal graph footer blocks (all `/bourbon/graph/[slug]` routes)

Add four wandering sections on every graph page:

| Block | Purpose |
|-------|---------|
| **Continue wandering** | 1–3 suggested next hops from `suggested_next` + highest-weight edges |
| **Related rabbit holes** | Mysteries, investigations, Atlas terms not yet in main hallway |
| **People also compare** | Editorial comparison pairs from intelligence registry |
| **What this unlocks** | Artifacts, missions, collection paths, passport evidence |

Each block needs **paragraph depth** — same standard as 040B2 edge copy, not one-line teasers.

## Package / module targets

```txt
apps/platform/lib/bourbon-graph/
  inline-links.ts          ← parse + inject AtlasTerm / entity refs in prose
  enrich-narrative.ts      ← bottle + atlas narrative with embedded links
  wander-blocks.ts         ← Continue wandering · Related rabbit holes · etc.

apps/platform/components/bourbon/
  InlineAtlasLink.tsx      ← single link primitive (term, bottle, producer, debate)
  GraphWanderFooter.tsx    ← four footer blocks for graph routes
  LinkedParagraph.tsx      ← renders paragraph with inline entity links

packages/atlas-graph-engine/
  word-link registry       ← term slug → href + confidence (bourbon world)
```

## Atlas word-linking rules

1. **First mention** of a linkable Atlas term in a paragraph gets an inline link.
2. Repeat mentions in the same paragraph: plain text (no link spam).
3. Terms without graph nodes: no link — plain text only.
4. BiB, proof, mash bill, DSP, rickhouse, bottled-in-bond are priority auto-link terms.

## Operator / audit

- Extend `/operator/atlas/graph` with **link density** stats (avg inline links per page type)
- `npm run audit:graph-enrichment` (new) checks:
  - Every bottle narrative has ≥3 inline links
  - Every Atlas entry has ≥2 bottle or producer links
  - Every graph route has all four wander footer blocks
  - No broken inline hrefs for priority nodes
  - Priority pages: WT101, Buffalo Trace, Maker's Mark, bottled-in-bond

## Exit criteria ✅

1. Graph pages have inline links in center narrative
2. All graph routes have four wander footer blocks
3. Bottle pages link back into graph + Atlas via LinkedParagraph
4. BiB graph + atlas pages are rabbit-hole hubs
5. `npm run audit:graph-enrichment` passes
6. `npm run audit:graph` regression passes

## Locked sequence (after 040B3)

```txt
040B3  Graph Enrichment + Inline Atlas Links   ← NEXT
034P+  World Continuity Expansion
040C   Atlas-Aware AI
040D   Personal Database Persistence
040E   Review Engine
040F   Recommendation Engine
041W   Weekly Engagement Push                 ← after 040D persistence only
```

**Do not jump to 040C** until inline link saturation is proven on Bourbon — AI over a sparse graph is still a filing cabinet with a chat box.

## Related

- `docs/PASS_040B2_BOURBON_GRAPH_EXPANSION.md`
- `docs/PASS_040B_ATLAS_GRAPH_ENGINE.md`
- `docs/KNOWLEDGE_GRAPH.md`
- `docs/WEEKLY_ENGAGEMENT_PUSH.md`
