# Start Here for Steve

**Last updated:** PASS-033 — Age-Safe World Governance + Definitive Depth Systems

## What Foundry is

Foundry helps people **become who they are capable of becoming** — not consume more content. Worlds are lifelong identity domains with academy, missions, portfolio, and community.

## Live site

- **Production:** https://foundry-os.netlify.app/
- **Mission Control:** https://foundry-os.netlify.app/operator
- **Explore:** https://foundry-os.netlify.app/explore
- **Search:** https://foundry-os.netlify.app/search
- **Pricing:** https://foundry-os.netlify.app/pricing

## Active consumer worlds (7)

| World | URL | Audience |
|-------|-----|----------|
| AI Builder | `/ai-builder` | student_safe |
| Financial Independence | `/financial-independence` | student_safe |
| Public Speaking | `/public-speaking` | student_safe |
| Civic Engagement | `/civic-engagement` | student_safe |
| Bourbon | `/bourbon` | adult_21_plus |
| BBQ | `/bbq` | teen_safe |
| Poker | `/poker` | adult_18_plus |

## PASS-033 delivered

1. **World audience registry** — `apps/platform/lib/world-governance/world-audience.ts`
2. **Student-safe explore filter** — `/explore` checkbox hides adult worlds
3. **Audience language audit** — `npm run audit:audience`
4. **AI orchestration foundation** — `@foundry/ai-orchestration`, `/operator/ai-brain`
5. **Global search** — `@foundry/search-engine`, `/search`
6. **Recommendation engine** — `@foundry/recommendation-engine`
7. **Household pricing schema** — `user_households` migration + pricing copy
8. **Incoming worlds** — Entrepreneur, Government, Religions, Astrology, Medical Cannabis (registry only)
9. **World depth blueprints** — `docs/world-depth/*.md` (7 worlds)

## Read next

| Doc | Purpose |
|-----|---------|
| [CURRENT_BUILD_STATUS.md](docs/CURRENT_BUILD_STATUS.md) | Full system inventory |
| [WORLD_REGISTRY.md](docs/WORLD_REGISTRY.md) | All worlds + classifications |
| [PASS_HISTORY.md](docs/PASS_HISTORY.md) | Completed passes |
| [NEXT_10_PASSES.md](docs/NEXT_10_PASSES.md) | Recommended sequence |
| [DEPLOYMENT_STATUS.md](docs/DEPLOYMENT_STATUS.md) | Netlify + Supabase |

## Infrastructure

| System | Status |
|--------|--------|
| GitHub | `Grappe501/FoundryOS` |
| Netlify | Auto-deploy on `main` push |
| Supabase | Single schema — see `docs/SUPABASE_SETUP.md` |
| Stripe | Build $4 / Mastery $18 — household schema ready |
| H: drive | All project assets on `H:\FoundryOS` |

## Current blockers

- Remote Supabase migration history may need `supabase migration repair` before `db:migrate`
- Household Stripe multi-seat not wired yet (schema + copy ready)
- Medical Cannabis — registry only, no consumer routes

## Next recommended pass

**PASS-034** — Learning lane testers + wire AI copilot to live LLM with audience guards
