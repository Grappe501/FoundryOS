# PASS-040C — Atlas-Aware AI Layer

> **Not generic AI. Foundry AI — reasoning over your universe, not the internet.**

Depends on: **040B Atlas Graph Engine** + **040D Portable Identity** + **040D.5 compound sync**

**Status:** ✅ deployed (PASS-040C)  
**Depends on:** 040B + 040D + 040D.5 ✅

See `docs/KNOWLEDGE_GRAPH.md` · `docs/PORTABLE_IDENTITY.md`

---

## The Moat

User asks:

> Why is Wild Turkey 101 so respected?

**Wrong:** OpenAI general knowledge search.

**Right:** Traverse Foundry graph:

```txt
Wild Turkey 101
  → Jimmy Russell (person)
  → Value Collection (collection)
  → Rival Debate (debate)
  → Atlas Entries (rickhouse, mash bill, barrel proof)
  → Community Reviews (040E)
  → Related Bottles (BT, Knob Creek, OF 1920)
```

Answer grounded in **Foundry universe** — citations link to graph nodes.

---

## Retrieval Stack

| Layer | Source |
|-------|--------|
| Entity graph | `@foundry/atlas-graph-engine` |
| Node content | Encyclopedia seeds, 034Q depth overlays |
| User context | **Portable Identity** — artifacts, collections, memory, graph history, curiosity profile (040D + 040D.5) |
| Social proof | Reviews (040E), recommendations (040F) |
| Continuity | World memory — cloud-hydrated after 040D.5 |

---

## Behaviors (one question → many paths)

- **Read** — summarize node with `why_should_i_care` first
- **Investigate** — follow `enabled_by` / `emerged_in_era` edges
- **Compare** — pull rival nodes from graph
- **Explore** — suggest rabbit-hole walk (3–5 hops)
- **Collect** — tie to user's shelf / collection intent
- **Influence** — draft recommendation from graph evidence

---

## Pass Gate

> Does the AI cite Foundry nodes — or does it sound like Wikipedia?

If citations resolve to `/bourbon/...` graph entities — pass. If generic — not ready.

---

## Sequence

```txt
034U  Universe Command Center
040A  Artifact Engine
040B  Atlas Graph Engine
040C  Atlas-Aware AI Layer    ← THIS PASS
040D  Personal Database Engine
040E  Review Engine
040F  Recommendation Engine
```

---

## Related

- `docs/PASS_040B_ATLAS_GRAPH_ENGINE.md`
- `docs/KNOWLEDGE_GRAPH.md`
- `packages/atlas-graph-engine/`
