# Incoming Worlds — Ranked Acquisition Pipeline

> **Not a build queue.** Depth on live worlds comes first. New paths enter here with rank, acquisition avenues, and voice frame before engineering.

## Source of truth

`apps/platform/lib/incoming-worlds.ts`

## How to add a world

1. Add entry with `rank`, `frame`, `outcome`, `acquisition_avenues`, and `note`
2. Re-rank if needed — chess is **#8**, not top priority
3. Mirror baseline in `packages/db/src/growth-flywheel.ts` `EXPANSION_CANDIDATES` if flywheel scoring applies
4. Add explore catalog entry when status moves to `queued` or `in_build`
5. Apply `docs/VOICE_GUIDE.md` before writing consumer copy

## Operator view

[/operator/opportunities](/operator/opportunities) — ranked table + flywheel scores

## Acquisition avenues

| Avenue | Typical use |
|--------|-------------|
| seo | Programmatic entry, long-tail craft queries |
| parent | Life Leverage, student pathways |
| youtube | Demos, mission walkthroughs |
| school | Academic domains, chess, CS |
| club | Chess, soccer, gardening chapters |
| tournament | Chess, poker, BBQ comp |
| community | Book clubs, civic, homesteading |
| newsletter | Career change, FI |
| educator | CS, physics, civic |

## Related

- `docs/VOICE_GUIDE.md`
- `docs/EXPLORE_CATALOG.md` (if exists)
- PASS-033 Growth Flywheel
