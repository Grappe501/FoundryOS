# PASS-031 — Marketing Factory

> **Parallel with PASS-030** · Manufacture distribution like PASS-024 manufactures worlds.

## Purpose

```txt
Create a machine that manufactures marketing assets for every future domain.
```

Not: create marketing assets manually.

## CLI

```powershell
npm run build:marketing -- ai-builder
npm run build:marketing -- financial-independence
npm run build:marketing -- --primary    # AI Builder, FI, Public Speaking
npm run build:marketing -- --all        # All 7 worlds
npm run audit:marketing
```

## Output per world (`marketing/worlds/{slug}/`)

| Artifact | Description |
|----------|-------------|
| seo-top-100.md | Top 100 SEO targets |
| youtube-topics.md | Top 50 YouTube topics |
| tiktok-topics.md | Top 50 TikTok ideas |
| lead-magnets.md | Top 25 lead magnets |
| email-sequence.md | Nurture sequence |
| parent-messaging.md | Parent copy |
| educator-messaging.md | Educator copy |
| social-calendar.md | 90-day social calendar |
| partnership-targets.md | Partnership targets |
| growth-plan.json | Effort allocation + CTAs |
| manifest.json | Factory manifest |

## Folder scaffold

```txt
marketing/
  channels/     seo, youtube, tiktok, facebook, homeschool, parents, educators
  worlds/       per-domain packs (primary output)
  lead-magnets/
  email-sequences/
  launch-calendars/
  affiliates/
  partnerships/
  influencers/
  milestones/   revenue-milestones.json
```

## Priority allocation

**80% effort:** ai-builder, financial-independence, public-speaking (Life Leverage — parents, students, career changers buy outcomes)

**Retention/expansion:** bourbon, bbq, poker (Passion Trinity)

## MRR milestones (track revenue, not vanity users)

| Period | Target |
|--------|--------|
| Jul 2026 | $0 → $100 MRR |
| Aug 2026 | $100 → $500 |
| Sep 2026 | $500 → $1,500 |
| Oct 2026 | $1,500 → $5,000 |
| Jan 2027 | $10,000+ MRR |

See `marketing/milestones/revenue-milestones.json` and `apps/platform/lib/growth-os.ts`.

## Package

`@foundry/marketing-factory` — mirrors `@foundry/world-factory` pattern.

## Operator route

`/operator/marketing` — pack status, CLI reference, MRR ladder.

## Architecture impact

**Reusable system:** Marketing Factory — `manufactureMarketingPack()`, blueprints for all consumer worlds, channel scaffold, revenue milestones.

**Benefits:** One person + automation can operate distribution at team scale. Every new domain gets SEO, social, email, and partnership targets in one command.

**Affected launches:** AI Builder, Financial Independence, Public Speaking (primary); all 7 worlds supported.
