# Inventory V2 — Operating Portfolio System

Status: IMPLEMENTED / AWAITING RUNTIME CERTIFICATION

## Purpose
Inventory V1 established the canonical Product & IP ledger. Inventory V2 turns that ledger into a management system that answers the next question: **Where should Company Foundry put attention, build capacity, and commercialization effort now?**

## New operating engine
`apps/platform/lib/inventory-operations.ts`

Each canonical asset receives derived operating fields without duplicating the underlying inventory record:

- priority score (0–100)
- operating band
- cash velocity
- build leverage
- next commercial proof
- executive action

## Operating bands
1. SELL / PILOT NOW — next meaningful proof is payment, not additional scope.
2. FINISH → SELL — fund only the minimum remaining blocker to a credible offer.
3. INCUBATE / VALIDATE — preserve option value and require customer evidence before acceleration.
4. PUBLISHING TRACK — manage written IP through editorial/rights/distribution economics.
5. HOLD / RESOLVE BLOCKER — do not bypass ownership, legal, privacy, or governance gates.

## Priority score
Priority is a deterministic management aid combining readiness, evidence quality, strategic disposition, conservative revenue scenario, and commercial-potential scenario. It is not a valuation, appraisal, investment recommendation, or promise of demand.

The score should become less important as real commercial evidence arrives. Actual customers, conversion, retention, margins, security, legal ownership, support burden, and recurring revenue should eventually dominate portfolio decisions.

## User experience
`/inventory` now includes:

- portfolio operating-band counts
- top-five priority queue
- Sell/Pilot Now queue
- Finish → Sell queue
- portfolio-discipline warning
- valuation separation
- full-text search
- operating-band filter
- asset-type filter
- sorting by priority, readiness, revenue, or risk-adjusted IP
- priority, cash-velocity, and executive-action columns

Every asset links to `/inventory/[id]`, which provides a dedicated executive card showing customer/problem, economic scenarios, source repositories, remaining build phases, evidence notes, strategic posture, and next commercial proof.

## Governance
The canonical ledger remains `company-inventory.ts`. The operating engine derives recommendations from it rather than creating a second conflicting source of truth.

No operating score automatically authorizes spending, hiring, equity, product launch, or financial movement.

## Next evidence
Runtime certification should verify:

1. platform TypeScript check/build;
2. `/inventory` server render;
3. filter/search/sort client behavior;
4. all `/inventory/[id]` pages resolve for canonical IDs;
5. mobile/tablet usability;
6. no inventory asset disappears between canonical and operating layers.

## Next build direction
Inventory V3 should become evidence-aware rather than estimate-heavy: dated audit evidence, customer validation records, revenue/expense actuals, repository-health signals, legal/ownership status, and automatic estimate-to-grounded-to-verified promotion rules. That layer should only be built when we can connect it to real evidence sources rather than inventing confidence.