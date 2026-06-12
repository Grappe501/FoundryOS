# World Registry (PASS-040B2)

Layer 1 depth for **bourbon** is graph-driven — see `/bourbon/graph/[slug]` and `/operator/atlas/graph`.

Audience classifications from `apps/platform/lib/world-governance/world-audience.ts`.

## Active live worlds

| Slug | Name | Classification | Student assign? |
|------|------|----------------|-----------------|
| ai-builder | AI Builder | student_safe | yes |
| financial-independence | Financial Independence | student_safe | yes |
| public-speaking | Public Speaking | student_safe | yes |
| civic-engagement | Civic Engagement | student_safe | yes |
| bourbon | Bourbon | adult_21_plus | **no** |
| bbq | BBQ | teen_safe | no |
| poker | Poker | adult_18_plus | **no** |

## Incoming worlds (ranked)

See `apps/platform/lib/incoming-worlds.ts` and [INCOMING_WORLDS.md](INCOMING_WORLDS.md).

| Rank | Slug | Tier | Classification |
|------|------|------|----------------|
| 1 | entrepreneur | Life Leverage | student_safe |
| 2 | career-change | Life Leverage | student_safe |
| 3 | master-gardener | Skills Guild | student_safe |
| 4 | grassroots-nonprofit | Civic | student_safe |
| 5 | government-systems | Civic | student_safe |
| 6 | world-religion-history | Academic | student_safe |
| 12 | chess | Skills Guild | student_safe |
| 13 | astrology | Passion | teen_safe |
| 14 | medical-cannabis-literacy | Academic | medical_only — **never minors** |

## Restricted / adult worlds

- **adult_21_plus:** bourbon, cigars
- **adult_18_plus:** poker
- **medical_only:** medical-cannabis-literacy (registry only — no consumer routes)
- **teen_safe:** bbq, astrology

## Student-safe worlds

AI Builder · Financial Independence · Public Speaking · Civic Engagement · Entrepreneur · Government Systems · World Religion History · Chess · Future-Proof trinity paths

## Governance files

- `apps/platform/lib/world-governance/world-audience.ts`
- `apps/platform/lib/world-governance/access.ts`
- `docs/AUDIENCE_LANGUAGE_AUDIT.md`
