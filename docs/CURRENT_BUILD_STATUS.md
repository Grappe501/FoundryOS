# Current Build Status (PASS-033)

**Date:** June 2026  
**Live URL:** https://foundry-os.netlify.app/

## Platform snapshot

| Metric | Value |
|--------|-------|
| Active consumer worlds | 7 |
| Incoming worlds ranked | 16 |
| Academy depth audit | 7/7 READY (PASS-032B) |
| Experience audit | 7/7 READY |
| Current pass | PASS-033 |

## Engines & packages built

| Package | Purpose |
|---------|---------|
| `@foundry/factory` | Entity / transformation assembly |
| `@foundry/path-engine` | Road to mastery paths |
| `@foundry/encyclopedia-engine` | Knowledge universe |
| `@foundry/transformation-graph-engine` | Transformation graph |
| `@foundry/evidence-engine` | Identity evidence |
| `@foundry/marketing-factory` | Marketing flywheel |
| `@foundry/world-factory` | World manufacturing |
| `@foundry/ai-orchestration` | **PASS-033** World copilots |
| `@foundry/search-engine` | **PASS-033** Unified search |
| `@foundry/recommendation-engine` | **PASS-033** Cross-world recs |

## Routes (verify after deploy)

| Route | Status |
|-------|--------|
| `/` | Live |
| `/explore` | Live + student-safe filter |
| `/search` | **PASS-033** |
| `/pricing` | Live + household copy |
| `/operator` | Mission Control |
| `/operator/business` | Business dashboard |
| `/operator/ai-brain` | **PASS-033** |
| `/ai-builder` | Live |
| `/financial-independence` | Live |
| `/public-speaking` | Live |
| `/civic-engagement` | Live |
| `/bourbon` | Live (Level 1 academy authored) |
| `/bbq` | Live |
| `/poker` | Live |
| `/[world]/encyclopedia` | **PASS-033** |

## Revenue

| Tier | Price | Stripe |
|------|-------|--------|
| Explore | Free | — |
| Build | $4/mo | Configured when keys present |
| Mastery | $18/mo | Configured when keys present |
| Mastery Household | $18 + $5/member | Schema ready, billing deferred |

## Beta status

Learning lane deferred to PASS-034. Beta gate at `/beta`.

## Supabase

Project migrations through `20260702100000_pass033_governance_households.sql`.

## Factories

World Factory · Marketing Factory · Launch Factory · Domain Blueprint — operational for operator dashboards.
