# PASS-040B2 — Bourbon Graph Expansion

## Goal

Inventory edge → visible rabbit hole. No new bottle pages — deeper hallways on existing pages.

## Deliverables

- `apps/platform/lib/bourbon-graph/` — mechanical graph from `@foundry/bourbon-intelligence`
- `BourbonGraphHallway` — structured panel with confidence badges on every edge
- `/bourbon/graph/[slug]` — graph traversal (bottle, producer, person, term, debate)
- `/operator/atlas/graph` — weak-node queue (edges, why-care, atlas, collection, unknown confidence)
- BiB weekend exemplar — 22+ edges on `bottled-in-bond`

## Audit

`npm run audit:graph`

## Deploy

`2a8cb1f` — graph hallways + temporary blue primary theme marker.

## Next pass

**PASS-040B3** — see `docs/PASS_040B3_GRAPH_ENRICHMENT.md`

## Exit criteria

1. Every inventory bottle has 10+ graph edges
2. `/bourbon/graph/[slug]` works
3. BiB deep graph treatment
4. Operator weak-node queue
5. audit passes · build passes · deploy verified
