# Founder Executive Book

## Portfolio and IP Operating Picture

**Canonical source:** `apps/platform/lib/company-inventory.ts`  
**Operating engine:** `apps/platform/lib/inventory-operations.ts`  
**Interactive surface:** `/inventory`

The company should be understood as a portfolio of products, platforms, books, reusable systems, research, operating knowledge, and accumulated intellectual property rather than as a single application. The inventory ledger is the management source of truth for that portfolio.

### What the inventory answers

For every material asset the ledger records:

- what the asset is;
- who the likely customer is;
- what expensive or persistent problem it addresses;
- the product thesis;
- current readiness;
- strategic disposition;
- source repositories;
- remaining build work;
- conservative annual revenue scenarios;
- replacement/build-value scenarios;
- risk-adjusted current-IP scenarios;
- commercial-potential scenarios;
- evidence confidence and evidence notes.

Inventory V2 adds the operating layer: priority score, operating band, cash-velocity signal, build-leverage signal, executive action, and the next external proof required. These are portfolio-management aids, not valuations or promises. Their purpose is to force attention toward evidence and revenue rather than toward whichever idea is newest.

This makes the inventory useful for build sequencing, partner conversations, capital allocation, product extraction, apprentice training assignments, launch planning, and eventual diligence.

## Valuation Doctrine

Three different concepts must never be collapsed into a single headline number.

### 1. Replacement / build value

An internal planning estimate of what it could plausibly cost to recreate the existing code, content, workflows, research, product logic, and accumulated operating knowledge to roughly its present state.

### 2. Risk-adjusted current IP value

An internal planning range that discounts the asset for readiness, market uncertainty, founder concentration, legal/IP issues, security work, product extraction work, customer validation, and execution risk.

### 3. Commercial revenue potential

A scenario range for what an asset could support after successful productization and product-market fit. This is **not enterprise value** and must not be represented as present company value.

Projected revenue, commercial potential, replacement value, and enterprise value are different concepts. None of the internal inventory ranges constitutes an appraisal, financing opinion, fairness opinion, or representation of market value.

## Operating Bands

Inventory V2 places every asset into one of five operating bands.

**SELL / PILOT NOW.** Near-market assets where the next meaningful proof should be a paying customer, paid beta, or institutional implementation. Scope expansion is subordinate to sales evidence.

**FINISH → SELL.** Assets worth funding only through the smallest remaining commercial blocker. The company should finish the shortest path to a credible offer and immediately test willingness to pay.

**INCUBATE / VALIDATE.** Option-value assets that require customer discovery, repository consolidation, clearer use cases, or stronger evidence before material additional spend.

**PUBLISHING TRACK.** Books and written IP managed through editorial, rights, production, distribution, audience, and demand proof rather than being treated as miscellaneous side projects.

**HOLD / RESOLVE BLOCKER.** Assets with explicit ownership, privacy, legal, governance, or commercialization blockers. Interest in the asset does not justify bypassing the blocker.

## Priority Score Doctrine

The priority score is a deterministic management signal combining current readiness, evidence confidence, strategic disposition, conservative revenue scenario, and commercial-potential scenario. It is intentionally bounded at 100.

A high priority score means **focus validation attention here**. It does not mean the company has proven demand, that the asset is worth the commercial-potential range, or that it should automatically receive unlimited capital.

The score should increasingly be displaced by harder evidence: customers, conversion, retention, gross margin, implementation burden, security readiness, legal ownership, product usage, support cost, and recurring revenue.

## Current Portfolio Strategy

The portfolio should not be operated by maximizing the number of active projects. The current strongest near-market family includes SousChef/HomeChef AI, LocalBrain, CampaignOS, VoteMatch, and other assets that the operating engine scores highly enough for paid proof or shortest-path commercialization work. Their purpose is to create external evidence, not merely additional features.

CanonForge, PeopleBase, Event Operations, FieldSpark, Writers Dashboard/Book Foundry, County Intelligence, Signal/News Command Center, and other incubation assets contain valuable reusable systems but still require consolidation, extraction, legal/security work, or clearer ideal-customer validation.

Constitutional Capitalism, The Mercy Protocol, Campti, Arkansas Political History, Arkansas Galaxy, Elvestribal, and later written IP should be managed as real intellectual-property assets with explicit editorial, rights, production, and distribution decisions rather than disappearing into the software backlog.

Civic University Technology and any later governed assets should remain intentionally gated whenever ownership, privacy, school-rollout, legal, or governance questions remain unresolved.

## Executive Decision Rule

The portfolio is improved when the strongest assets produce external proof while long-horizon IP is preserved, weak overlaps are consolidated, and capital follows evidence.

For each quarterly portfolio review, ask:

1. Which assets produced paid or external validation?
2. Which assets became materially more launchable?
3. Which products moved into or out of SELL / PILOT NOW?
4. Which overlapping repositories were consolidated?
5. Which legal, privacy, security, or ownership risks were retired?
6. Which assets should be accelerated, incubated, held, published, licensed, bundled, or discontinued?
7. Did any forecast become evidence-backed enough to move from estimate to grounded or verified?
8. Did we spend money on anything that did not improve external proof, reusable capability, or protected IP?

The `/inventory` surface is the operating dashboard for those decisions. Every asset now has its own `/inventory/[id]` drill-down page showing economics, evidence, source repositories, remaining build, and the next commercial proof. The Executive Book should summarize the conclusions; the ledger should retain the asset-by-asset truth.