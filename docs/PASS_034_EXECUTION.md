# PASS-034 — Living Worlds & AI Mentor Layer

> **Not testers.** Make the seven live worlds feel like they know the user before inviting anyone who will not forgive boredom.

## North Star

```txt
"This thing knows me."
"This thing is helping me."
"This thing is alive."
```

Personalization is the next moat — not more worlds, lessons, or architecture.

## Seven Engines

| # | Engine | Package / Location | Status |
|---|--------|-------------------|--------|
| 1 | Personal Mentor AI | `@foundry/mentor-engine` → `WorldMentorPanel` on world hubs | Rule-based v1 |
| 2 | Living Journey Map | `/my-journey` → `LivingJourneyDashboard` | Client snapshot v1 |
| 3 | Cross-World Discovery | `discoverCrossWorldPaths()` | Behavioral signals |
| 4 | Legendary Collections | `LegendaryJournal` on bourbon/bbq/poker portfolios | localStorage journals |
| 5 | Encyclopedia Authority | `getEncyclopediaAuthorityLinks()` on term pages | Missions + producers + worlds |
| 6 | Adaptive Learning | `getAdaptiveRecommendations()` | Reflection/glossary gaps |
| 7 | Obsession Engine | `DailyFoundryHook` on home + journey | Daily hooks |

## Key Files

```txt
packages/mentor-engine/
  src/mentor-messages.ts      — world personas (Builder Coach, Money Coach, …)
  src/cross-world-discovery.ts
  src/adaptive-learning.ts
  src/daily-hooks.ts
  src/legendary-collections.ts

apps/platform/lib/living-worlds/
  active-worlds.ts
  client-journey.ts           — localStorage → LivingJourneySnapshot
  encyclopedia-authority.ts

apps/platform/components/living-worlds/
  LivingWorldPanels.tsx       — DailyFoundryHook, WorldMentorPanel, LivingJourneyDashboard
  LegendaryJournal.tsx
```

## UI Surfaces

| Surface | Component |
|---------|-----------|
| Home `/` | `DailyFoundryHook` |
| `/my-journey` | Full living story dashboard |
| World hubs | `WorldMentorPanel` via `WorldPremiumHub` |
| Bourbon/BBQ/Poker portfolio | `LegendaryJournal` |
| Encyclopedia term pages | Authority layer links |

## AI Orchestration Bridge

`@foundry/ai-orchestration` re-exports mentor-engine via `mentor-bridge.ts` so operator tools and future LLM wiring share one personalization API.

## Deferred — Consequence Stack (034J→034P)

| Pass | Engine | Status |
|------|--------|--------|
| 034J/N | Consequence Engine | In progress — `@foundry/consequence-engine`, `/operator/discovery` |
| 034K | Collector Engine | Planned — platform primitive |
| 034L | World Events Engine | Planned — state not content |
| 034M | Identity Progression | Planned — narrative not % |
| 034P | World Memory Engine | Planned — continuity |

See `docs/PASS_034J_CONSEQUENCE_ENGINE.md`

## Deferred (PASS-035+)

- Live OpenAI mentor responses (current layer is deterministic rules over user evidence)
- Supabase-backed journey sync (currently client localStorage)
- Entrepreneur / Government / Grassroots as live worlds (discovery links to `/explore/{slug}`)

## World Priority (Steve ranking)

**Life Leverage Trinity:** AI Builder · Financial Independence · Public Speaking  
**Expansion:** Entrepreneur · Civic · Government · Grassroots  
**Passion Trinity:** Bourbon · BBQ · Poker  
**Long-term authority:** World Religion History · Comparative Government · Astrology · Medical Cannabis Literacy

## PASS-034A — Identity, Memory & Obsession Layer

| Layer | Deliverable |
|-------|-------------|
| Ambition profile | `/my-future` — identities (not categories) |
| Dream mapping | Wants + stated goals in mentor memory |
| Mentor memory | "I remember" block on world mentors |
| Secret paths | Hidden paths discovered from behavior |
| Legendary objects | Named treasures on My Journey |
| Rabbit holes | Producer + encyclopedia term panels |
| World crossovers | AI+Bourbon, PS+Bourbon, etc. |
| Mentor challenges | Personal weekly challenges |
| Someone like me | Pattern discovery after missions |
| Why people fall in love | `WorldObsessionSection` on every world hub |

---

> Can a returning user feel Foundry remembered them — missions, reflections, journals — and named one honest next step?

If yes → ready for handpicked testers. If no → do not invite boredom.

## Architecture Impact

**Reusable System Added:** `@foundry/mentor-engine` — personalization layer every future world inherits.

**Benefits:** Cross-world expansion, adaptive nudges, obsession hooks without per-world UI forks.

**Affected Launches:** All 7 live worlds; Trinity home; encyclopedia SEO graph; beta wedge narrative.
