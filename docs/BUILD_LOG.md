# FoundryOS — Build Log

---

## Current State

| Field | Value |
|-------|-------|
| **Version** | `1.1.0-bourbon-level2` |
| **Last Pass** | PASS-042 Bourbon Level 2 — Confident Taster ✅ |
| **Current Pass** | Level 2 deploy ✅ |
| **Next Pass** | PASS-043 — Level 3 Shelf Builder depth |
| **Level 2 surface** | Tasting Lab · Comparison Grid · Mash bill flight · 10 academy lessons |
| **Live proof** | `npm run build:platform` · `npm run audit:bourbon-links` · `npm run audit:bourbon-graph` |
| **Bourbon catalog** | 32 bottles · 19 producers · 35 academy lessons · 11 campus maps · 13 detective cases |
| **Identity stack** | 040D hydrate · 040D.5 compound loop · 040C Atlas-Aware AI · 040E/F review + recommend |
| **Beta gate** | Tester cohorts wait until graph + artifacts + identity infra feel alive |

---

## PASS-041 — Bourbon Level 1 Depth + System v1.0 ✅

| Field | Value |
|-------|-------|
| **Mission** | Close honest backlog — cross-category catalog, campus, detective, X-Ray, academy |
| **Version bump** | `1.0.0-bourbon-depth` — Foundry platform semver milestone |
| **Audit** | `npm run audit:bourbon-links` · `npm run audit:bourbon-graph` · 1,157 static pages |

| Deliverable | Location |
|-------------|----------|
| Cross-category catalog | 26 bourbon + 4 rye + 2 Tennessee — `bottles.ts` + `catalog-seeds.ts` |
| Craft expansion | 6 craft bottles + 6 producers — `craft-producers.ts` |
| Tennessee producers | `tennessee-producers.ts` — Jack Daniel's, George Dickel |
| Light/dark theme | `ThemeProvider` · `ThemeToggle` · `[data-theme="light"]` tokens |
| Whiskey category map | `/bourbon/whiskey-map` · `CompareCategoriesTool` · category compare presets |
| Campus maps 11/11 | `campus-maps.ts` — BT, HH, Beam, WT, Maker's, 4R, OF, Woodford, New Riff, WT craft, Jack |
| Detective +6 | 13 cases — rye/TN, craft sourcing, NAS, NCF, secondary math |
| Bottle X-Ray overrides | `bottle-xray-overrides.ts` — per-bottle entry proof, warehouse, analyst |
| Academy L2–7 authored | `bourbon-academy-levels-2-7.ts` — 27 lessons with sections (35 total) |

**Architecture Impact**
- Reusable: `WhiskeyBottleCategory`, category compare flight, X-Ray override pattern, authored academy tier
- Benefits: Cross-category bottle flights without fake inventory; static academy pages L2–7; deployment-ready bourbon proof
- Affected launches: bourbon.foundryos.com Level 1 consumer surface

---

## PASS-042 — Bourbon Level 2 Confident Taster ✅

| Field | Value |
|-------|-------|
| **Mission** | Tasting Lab, comparison grids, full Level 2 academy + HQ |
| **Version** | `1.1.0-bourbon-level2` |

| Deliverable | Location |
|-------------|----------|
| Level 2 HQ | `/bourbon/level-2` · `Level2Hub` · 10 tools |
| Tasting Lab | `/bourbon/tasting-lab` — 8 flights, note cards, local save |
| Comparison Grid | `/bourbon/comparison-grid` — 6 presets, winner + lesson |
| Mash bill flight | `/bourbon/mashbill-flight` |
| Academy L2 | 10 lessons with tryThis · `/bourbon/academy/level-2` |
| Storage | `lib/bourbon-level-2/storage.ts` — sessions + checkpoint hint |

**Architecture Impact**
- Reusable: flight preset pattern, grid tool, level-tier hub model
- Benefits: Palate training with evidence — not templated academy stubs
- Affected launches: bourbon.foundryos.com Level 2 unlock path

---

| Field | Value |
|-------|-------|
| **Mission** | Identity-aware recommendations on graph nodes |
| **Package** | `@foundry/recommendation-engine-v2` |
| **Operator** | `/operator/recommendations` |

---

## PASS-040E — Review Engine ✅

| Field | Value |
|-------|-------|
| **Mission** | Structured reviews tied to graph + identity |
| **Package** | `@foundry/review-engine` |
| **Operator** | `/operator/reviews` |

---

---

---

---

---

## PASS-040C — Atlas-Aware AI ✅

| Field | Value |
|-------|-------|
| **Mission** | AI answers from Foundry's universe first — not generic ChatGPT |
| **Principle** | Graph + portable identity + confidence honesty |
| **Audit** | `npm run verify:040c` · `npm run audit:atlas-aware-ai` |

| Deliverable | Location |
|-------------|----------|
| `@foundry/atlas-aware-ai` | `buildAtlasContext` · `buildUserIdentityContext` · `generateMentorAnswer` |
| Operator debugger | `/operator/ai-context` |
| Consumer panel | Ask the Atlas on `/bourbon/graph/[slug]` |
| Safety | Unknown source message · forbidden invention topics |

Brief: `docs/PASS_040C_ATLAS_AWARE_AI.md`

---

## PASS-040D.5 — Identity Sync Compound Loop ✅

| Field | Value |
|-------|-------|
| **Mission** | Every saved action must change the user's world |
| **Principle** | Artifact → Collection → Identity Narrative → Memory → Welcome-back → Passport |
| **Audit** | `npm run audit:identity-sync` · `npm run verify:040d5` |

| Deliverable | Location |
|-------------|----------|
| `@foundry/identity-sync-engine` | `propagateIdentityEvent()` — 7 event types, 5 output channels |
| Client apply loop | `apps/platform/lib/identity-sync/apply.ts` |
| Collection earn rules | WT101 tasting · BiB · wheated · graph_viewed · comparisons |
| Memory compound state | `sync_threads` + `curiosity_weights` in world memory v1 |
| Narrative signals | artifact_count · recent_artifact_titles in identity-narrative-engine |
| UI refresh | ContinuityPanels + passport listen `foundry-identity-sync` |
| Hydrate path | sync_threads + curiosity persist via memory snapshot (040D write-through) |

**040D.5 Test:** create WT101 tasting artifact → collection advances → narrative shifts → welcome-back references thread → passport shows evidence. Works after cloud hydrate.

Brief: `docs/PASS_040D5_MEMORY_GRAPH_SYNC.md`

---

## PASS-040D — Personal Database Persistence ✅

| Field | Value |
|-------|-------|
| **Mission** | Portable Identity — first durable identity across devices |
| **Principle** | Persistence for everything · cloud source of truth when authed |
| **Audit** | `npm run audit:persistence` |

| Deliverable | Location |
|-------------|----------|
| Supabase tables | `user_artifacts` · `user_memories` · `user_graph_history` |
| `@foundry/personal-database` | mappers + validate |
| `@foundry/db` portable-identity | hydrate + migrate |
| API | `/api/identity/hydrate` · `/api/identity/migrate` |
| Write-through | artifacts · memory · collector · graph traversal |
| Hydrator | `PortableIdentityHydrator` in root layout |

**040D Test:** sign in on device B → welcome-back reconstructs from cloud, not localStorage alone.

Brief: `docs/PASS_040D_PERSONAL_DATABASE.md` · `docs/PORTABLE_IDENTITY.md`

---

## PASS-034P+ — World Continuity Expansion ✅

| Field | Value |
|-------|-------|
| **Mission** | Make the user feel the world was waiting — not a resume of clicks |
| **Principle** | Last time you were here… · Pick the thread back up · three memory tiers |
| **Audit** | `npm run audit:memory` |

| Deliverable | Location |
|-------------|----------|
| `@foundry/world-memory-engine` | welcome-back · unfinished threads · rabbit-hole resume · first-memory catalog |
| localStorage v1 | `foundry-world-memory-v1` in `lib/world-memory/memory-store.ts` |
| Continuity panels | `/my-journey` · `/{world}` hub · `/passport/timeline` |
| Recorders | BourbonGraphExplorer · CompareAnyTwoTool · save rabbit hole button |

**Next:** 040D Personal Database Persistence (platform — Portable Identity) · 040D.5 · 040C after sync

Brief: `docs/PASS_040D_PERSONAL_DATABASE.md` · `docs/PORTABLE_IDENTITY.md`

---

## PASS-040B3 — Graph Enrichment + Inline Atlas Links ✅

| Field | Value |
|-------|-------|
| **Mission** | 040B2 built hallways — B3 opens doors inside paragraphs |
| **Principle** | Saturated inline links · four wander footer blocks · graph-first hrefs |
| **Audit** | `npm run audit:graph-enrichment` |

| Deliverable | Location |
|-------------|----------|
| InlineAtlasLink + LinkedParagraph | `apps/platform/components/bourbon/` |
| GraphWanderFooter (4 blocks) | Continue wandering · Related rabbit holes · People also compare · What this unlocks |
| inline-links registry | `apps/platform/lib/bourbon-graph/inline-links.ts` |
| Graph + bottle + atlas integration | BourbonGraphExplorer · BourbonGraphHallway · atlas `[term]` · bottle pages |

**Next:** 034P+ World Continuity · 040C blocked until graph density proven on Bourbon

---

## PASS-040B2 — Bourbon Graph Expansion ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |
| **Mission** | Inventory gave us rooms — 040B2 builds the hallways |
| **Principle** | Every edge carries confidence + source; unknown beats fake |
| **Audit** | `npm run audit:graph` |

| Deliverable | Location |
|-------------|----------|
| Mechanical graph for all 20 inventory bottles | `apps/platform/lib/bourbon-graph/` |
| Universal route `/bourbon/graph/[slug]` | bottles · producers · atlas · debates · people |
| BiB weekend exemplar (15+ edges, mission) | `atlas-term-graph.ts` · `/bourbon/graph/bottled-in-bond` |
| Bottle graph panel with paragraph depth | `BourbonGraphHallway` + `edge-copy.ts` |
| Operator weak-node queue | `/operator/atlas/graph` |
| Weekly push plan (not deployed) | `docs/WEEKLY_ENGAGEMENT_PUSH.md` · `@foundry/weekly-engagement-engine` |

**Next:** PASS-040B3 inline link saturation · then 034P+ · 040C blocked until B3 proves wander density

### Why 040B3 before 040C

```txt
040B2  Read this bottle page     → hallways exist
040B3  Enter this bottle/wander  → doors inside paragraphs
040C   AI reasons over graph     → only after graph is dense enough to reason about
```

---

Primary brand color switched to **blue** (`#4A90D9` via `--foundry-primary` in `globals.css`) so deploys are obvious. Revert to bourbon gold `#C8A96E` next round.

---

## PASS-040B1 — Bourbon Intelligence Inventory ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |
| **Package** | `@foundry/artifact-engine` |
| **Principle** | Evidence of participation — Passport displays artifacts; artifacts are reality |
| **Progression** | World → Artifacts → Collections → Identity → Influence → Legacy |
| **Audit** | `npm run audit:artifacts` |

| Deliverable | Location |
|-------------|----------|
| 14 artifact types + 7 relationship types | `packages/artifact-engine/` |
| North-star KPI on universe dashboard | `/operator/universe` — User Artifacts largest metric |
| PWA / web-or-install up front | `FoundryAccessOptions` · `manifest.webmanifest` |
| Device strategy lock | `docs/DEVICE_STRATEGY.md` |

**Not in 040A:** artifact consumer routes, Supabase persistence (040D), review subtype UI (040E).

---

## PASS-034U — Universe Command Center ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |
| **Package** | `@foundry/universe-registry` |
| **Principle** | Build Foundry so Steve can see Foundry — CEO dashboard, not admin panel |
| **Live proof** | `/operator/universe` · `/operator/worlds` · `/operator/atlas` · `/operator/atlas/graph` |
| **Audit** | `npm run audit:universe` |

| Deliverable | Location |
|-------------|----------|
| Universe registry | `packages/universe-registry/` |
| Snapshot aggregator | `apps/platform/lib/universe-registry/` |
| Content integrity | `docs/CONTENT_INTEGRITY.md` — leader slots, no fabricated bios |
| Knowledge graph vision | `docs/KNOWLEDGE_GRAPH.md` |

**Also shipped (same deploy):** `@foundry/atlas-graph-engine` (040B foundation), graph panel on bottles, BiB exemplar, 034Q depth absorbed (not standalone), `npm run audit:universe`.

---

## PASS-034P — World Continuity Engine ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |
| **Package** | `@foundry/world-continuity-engine` |
| **Principle** | Make the world feel continuous — not a resume of clicks |
| **Memory tiers** | Active · Story · Anticipation |
| **Live proof** | `/my-journey` · `/{world}` return panel · `/passport/timeline` |
| **Audit** | `npm run audit:continuity` |

| Deliverable | Location |
|-------------|----------|
| Continuity engine | `packages/world-continuity-engine/` |
| Client state + signals | `apps/platform/lib/world-continuity/` |
| Journey + world panels | `ContinuityPanels.tsx` |
| Atlas Phase 2 quiet start | `bourbon-atlas/graph.ts`, `relationship-seeds.ts` |
| Ecosystem model docs | `docs/WORLD_ECOSYSTEM_MODEL.md` — five layers, artifact-first 040 |

### Architecture Impact

- **Reusable System:** World Continuity — context, intent, open threads, anticipation across all worlds
- **Benefits:** Two users see two worlds; depth compounds into identity; reactive loop closed
- **Affected Launches:** All 7 live worlds; Passport timeline preview; 040A Artifact Engine next

See `docs/PASS_034P_WORLD_CONTINUITY.md`.

---

## PASS-033 — Age-Safe Governance + Global Intelligence ✅

| Deliverable | Location |
|-------------|----------|
| World audience registry | `apps/platform/lib/world-governance/` |
| Student-safe explore filter | `/explore` |
| Audience audit | `npm run audit:audience` |
| AI orchestration | `@foundry/ai-orchestration`, `/operator/ai-brain` |
| Global search | `@foundry/search-engine`, `/search` |
| Recommendation engine | `@foundry/recommendation-engine` |
| Encyclopedia routes | `/[world]/encyclopedia` |
| Household schema | `user_households` migration |
| Steve docs | `START_HERE_FOR_STEVE.md`, `docs/CURRENT_BUILD_STATUS.md` |
| Depth blueprints | `docs/world-depth/*.md` |

---

## PASS-034 — Living Worlds & AI Mentor Layer ✅

| Deliverable | Location |
|-------------|----------|
| Mentor engine | `@foundry/mentor-engine` |
| Living journey | `/my-journey`, `LivingJourneyDashboard` |
| Daily hooks | `DailyFoundryHook` on home |
| World mentors | `WorldMentorPanel` on `WorldPremiumHub` |
| Cross-world discovery | `discoverCrossWorldPaths()` |
| Legendary journals | `LegendaryJournal` — bourbon, bbq, poker |
| Encyclopedia authority | term pages + `encyclopedia-authority.ts` |
| AI bridge | `@foundry/ai-orchestration/mentor-bridge` |
| Execution doc | `docs/PASS_034_EXECUTION.md` |
| **034A** Identity layer | `/my-future`, secret paths, legendary objects, obsession sections |
| **034H** Lore engine | `@foundry/lore-engine` — legends, debates, universe map |
| **034I** Living media | `/[world]/today`, `/[world]/lore`, daily feed rotation |
| **034J** Bourbon intelligence | watchtower, shelf intel, rabbit hole, hunt, chains, detective→mentor |
| Bourbon Level 1 HQ | `/bourbon/level-1` — tools over lessons (~30 tool routes) |
| Beyond the Bottle | origins, pop culture, pour guide, myths, wild stories |

---

| Deliverable | Route |
|-------------|-------|
| World hub | `/ai-builder` |
| Missions (5) + interactive runner | `/ai-builder/missions/[slug]` |
| Academy (7 levels) | `/ai-builder/academy` |
| Playground (5 labs) | `/ai-builder/playground` |
| Portfolio (localStorage artifacts) | `/ai-builder/portfolio` |
| Parent view + one-liner value | `/ai-builder/parents` |
| Glossary + Careers | `/ai-builder/glossary`, `/careers` |
| Internal proof | `/verticals/ai-builder` |

**Model:** Mission → Build → Show → Reflect → Improve → Mentor

**Close gate:** Student completes Mission 1 · Parent one-sentence value · Portfolio artifact · Tomorrow hook

---

---

## PASS-021 — Consumer Experience Polish ✅

| Deliverable | Route |
|-------------|-------|
| Consumer home | `/` |
| Operator gate | `/operator/*` middleware |
| Trinity hub | `/trinity` |
| Student dashboard | `/my-journey` |
| Parent page | `/parents` |

---

## PASS-023 Foundation — Passion Trinity (registry)

| Domain | Frame | Registry |
|--------|-------|----------|
| Bourbon | Appreciate Craft | `bourbon-world.ts` |
| BBQ | Create Experiences | `bbq-world.ts` |
| Poker | Strategic Thinking | `poker-world.ts` |

Factory: `npm run build:world -- <slug>` · `npm run audit:worlds`

---

## PASS-024 — Factory Automation ✅

| Deliverable | Detail |
|-------------|--------|
| Command | `npm run build:world -- <domain>` |
| Audit | `npm run audit:worlds` — **92% avg automation** |
| Package | `packages/world-factory/` |
| Generated worlds | bourbon, bbq, poker, civic-engagement |
| Per-world output | ~100 files: routes, components, marketing, explore registry |
| Growth KPI | `/growth` — cost to launch, factory automation %, domains generated |

---

## PASS-022 — Private Beta Readiness ✅

| Deliverable | Route |
|-------------|-------|
| Beta waitlist | `/beta` |
| Sign in / create account | `/sign-in`, `/create-account` |
| Account + synced progress | `/account` |
| Pricing | `/pricing` |
| Mission sync API | `/api/progress/mission` |
| Operator beta dashboard | `/operator/beta` |

---

## PASS-026 — Invite + Tester Operations ✅

| Deliverable | Route |
|-------------|-------|
| Waitlist review + approve | `/operator/invites` |
| Assign segment + starting world | Operator UI |
| Copy invite message | Operator UI |
| Tester welcome | `/beta/welcome?code=` |
| Lifecycle tracking | invited → joined → active |
| First-25 cohort plan | 5× student, parent, adult learner, educator, hobbyist |

Migration: `20260627000000_pass026_tester_operations.sql`

---

## PASS-027 — Transformation Analytics & Learning Engine ✅

| Deliverable | Route |
|-------------|-------|
| Transformation funnel | `/operator/analytics` |
| World + mission analytics | Operator dashboard |
| Transformation velocity | Operator dashboard |
| Success indicators | Operator dashboard |
| Domain readiness score | `/growth` |
| Tester feedback submit | `/beta/feedback` |
| Tester feedback review | `/operator/feedback` |

Migration: `20260628000000_pass027_transformation_analytics.sql`

---

## PASS-028 — Community Activation ✅

| Deliverable | Route |
|-------------|-------|
| Community feed | `/community/[world]` |
| Weekly challenge | Submit + this-week list |
| Showcase + peer feedback | Feed + APIs |
| Mentor recognition | Helped 3 · 10 · 50 |
| Community analytics | `/operator/analytics` |

Migration: `20260629000000_pass028_community_activation.sql`

---

## PASS-028A — Community Seeding ✅

| Deliverable | Detail |
|-------------|--------|
| Seeded discussions | 25 per world (7 worlds) |
| Seeded showcases | 10 per world — real project examples |
| Weekly challenges | 12 weeks preloaded per world |
| Mentor profiles | AI Guide, Financial Coach, Speaking Coach, Bourbon Steward, Pitmaster Mentor, Poker Mentor, Civic Mentor |
| Seed runner | `npm run seed:community` · auto-seed on `/community/[world]` if empty |
| UI | Discussions tab · mentor card · 12-week challenge archive |

Migration: `20260629100000_pass028a_community_seeding.sql`

See `docs/PASS_028A_EXECUTION.md`.

---

## PASS-029 — Revenue Validation Infrastructure ✅

| Layer | Deliverable |
|-------|-------------|
| Pricing experiment | `pricing_viewed`, `pricing_clicked`, `upgrade_initiated`, `upgrade_completed` events |
| Upgrade moments | After Mission 1 / portfolio entry — contextual CTAs per world |
| Value visibility | `ValueProgress` + What comes next (premium steps visible) |
| Founder dashboard | `/operator/business` — waitlist, funnel, MRR, MAT |
| Revenue dashboard | `/operator/revenue` — world + mission conversion |
| Stripe | `POST /api/billing/checkout` · webhook · Build $4 / Mastery $18 |

Migration: `20260701000000_pass029_revenue_validation.sql`

See `docs/PASS_029_EXECUTION.md`.

---

## PASS-029A — Revenue & Analytics Verification ✅

| Deliverable | Detail |
|-------------|--------|
| Test personas | Sam, Paula, Alex, Emma, Hank (5 segments) |
| Verification | `npm run verify:revenue` · `/operator/revenue/verify` |
| Attribution fixes | World, mission, community, persona metadata |
| Dashboard consistency | Single funnel source across revenue/business/analytics |
| Stripe paths | checkout_cancelled, checkout_blocked_signin, subscription_cancelled |

Migration: `20260701100000_pass029a_revenue_verification.sql`

See `docs/PASS_029A_EXECUTION.md`.

---

## PASS-030 + PASS-031 — Parallel Lanes 🔄

### PASS-030 — Learning Lane

| Deliverable | Route / command |
|-------------|-----------------|
| Learning lane dashboard | `/operator/learning` |
| Cohort tracker (5×5) | `/operator/business` |
| Invite ops | `/operator/invites` |
| Gate | PASS-029A verified before first invite |

See `docs/PASS_030_EXECUTION.md`.

### PASS-031 — Marketing Factory

| Deliverable | Detail |
|-------------|--------|
| Package | `@foundry/marketing-factory` |
| CLI | `npm run build:marketing -- ai-builder` · `--primary` · `--all` |
| Audit | `npm run audit:marketing` |
| Output | `marketing/worlds/{slug}/` — 16 artifacts per world |
| Operator | `/operator/marketing` |
| MRR ladder | Jul 2026 $100 → Jan 2027 $10k+ |

7 worlds generated · 80% effort on ai-builder, financial-independence, public-speaking.

See `docs/PASS_031_EXECUTION.md`.

---

## PASS-032 — World Immersion Expansion 🔄

| World | Missions | Tracks |
|-------|----------|--------|
| AI Builder | 25 | 5 Life Leverage tracks |
| Financial Independence | 15 | Money · Banking · Investing · Business · Retirement |
| Public Speaking | 15 | Conversation · Storytelling · Presentations · Leadership · Performance |
| Civic Engagement | 15 | Voting · Local Gov · Advocacy · Organizing · Leadership |
| Bourbon / BBQ / Poker | 10 each | Experience-focused |

Package: `apps/platform/lib/immersion/` · `WorldMissionTracks` · `WorldExperiencesHub`

See `docs/PASS_032_EXECUTION.md`.

---

## PASS-033 — Growth Flywheel Engine ✅

See `docs/PASS_033_EXECUTION.md` — `/operator/flywheel`, `/operator/opportunities`

---

## PASS-025 — World Depth Expansion ✅

| Deliverable | Detail |
|-------------|--------|
| Worlds deepened | 7 (AI Builder, FI, PS, Bourbon, BBQ, Poker, Civic) |
| Academy | 35 lessons per world (245 total) |
| Glossary | 50 terms per world (350 total) |
| Guides | 7 SEO starters per world at `/{slug}/learn` |
| Portfolio | Enhanced with missions, reflections, next action |
| Audit | `npm run audit:depth` — 100% avg depth score |
| Growth OS | World depth KPIs on `/growth` |

---

## PASS-019 — Public Speaking World ✅

| Deliverable | Route |
|-------------|-------|
| World hub | `/public-speaking` |
| Mission 1 | `/public-speaking/missions/first-talk` |
| My Speaking Portfolio | `/public-speaking/portfolio` |
| Parent one-liner | `/public-speaking/parents` |

**Close gate met:** Mission 1 · Parent one-liner · Portfolio · Tomorrow hook · Routes live

**Completes Trinity:** Create · Keep · Communicate

---

## PASS-018 — Financial Independence World ✅

| Deliverable | Route |
|-------------|-------|
| World hub | `/financial-independence` |
| Mission 1 | `/financial-independence/missions/first-budget` |
| My Wealth Portfolio | `/financial-independence/portfolio` |

**Close gate met:** Mission 1 · Parent one-liner · Portfolio · Tomorrow hook · Routes live

---

## PASS-016D — Stranger Conversion Cleanup ✅

| Deliverable | Detail |
|-------------|--------|
| Consumer nav | `Future-Proof · Explore Paths · AI Builder` on `/future-proof`, `/explore`, `/ai-builder`, `/explore/[slug]` |
| Start here CTA | Hero + footer on `/explore` → `/future-proof` |
| Choose this path | `/ai-builder` → `/future-proof?choose=ai-builder` (restores saved result) |
| Interest capture | Segment + optional email + desired path on planned pages |
| Validation events | `explore_viewed`, `path_clicked`, `interest_submitted` |
| Migration | `20260625100000_validation_pass016d_events.sql` |

**Gate (revised):** Private build until 3–5 verticals complete. See `docs/VERTICAL_DEPTH_MODE.md`.

---

## Strategy Pivot — Vertical Depth Mode (2026-06-11) · Major Milestone

| Change | Detail |
|--------|--------|
| Paused | 10-stranger public beta (PASS-016A infrastructure kept) |
| New gate | Private build until Trinity + 2 more verticals feel complete |
| Risk shift | Not architecture — **"not enough here yet"** on consumer pages |
| Jan 2027 | **5 exceptional domains** (not 20 active) |
| Next passes | PASS-017 AI Builder **experience** → 018 FI → 019 Speaking → 020 Civic → 021 polish → 022 beta |
| Beta wedge | AI Builder + Financial Independence + Public Speaking |

---

## PASS-016A — Market Validation (paused)

| Deliverable | Status |
|-------------|--------|
| Validation dashboard | `/validation` — internal operator use |
| Event API | `POST /api/validation/event` |
| Funnel tracking | Wired — observe during private build |
| Stranger beta | **Paused** — do not recruit strangers yet |

**Was:** 10 strangers before PASS-017. **Now:** depth first, beta at PASS-022.

| Deliverable | URL |
|-------------|-----|
| Consumer catalog | `/explore` |
| Operator alias | `/course-catalog` |
| Planned path template | `/explore/[slug]` |
| Registry | `apps/platform/lib/explore-catalog.ts` |
| Growth metric | `public_catalog_paths` |

---

## PASS-016C — Public Explore Catalog ✅

| Deliverable | Status |
|-------------|--------|
| Future-Proof landing + Starter Assessment | `/future-proof` |
| AI Builder stranger entry + HPI proof | `/ai-builder` |
| Foundry Trinity docs | `docs/FOUNDRY_TRINITY.md` |
| Life Leverage blueprint + orchestrator | `ensureAiBuilderDomainProof()` |
| Jan 2027 targets revised | 25k users · 2.5k paid · $10k–25k MRR |

**Pass gate:** Can a stranger discover, start a transformation, and return tomorrow?

---

| Change | Detail |
|--------|--------|
| New tier | **Life Leverage Domains** above Hobbies/Skills/Communities |
| Launch reorder | Financial Independence → #3 (after Bourbon, AI Builder) |
| Velocity target | **20 Active Domains** by Jan 2027 (double launch velocity) |
| Foundry Student | Grades 6–12 channel for life leverage outcomes |
| Pass sequence | PASS-016 AI Builder · PASS-017 Finance · PASS-018 Speaking · PASS-019 Civic |

Docs: `docs/LIFE_LEVERAGE_DOMAINS.md` · `docs/FOUNDRY_FINANCE.md` · `docs/FOUNDRY_STUDENT.md`

---

## PASS-008 — Path Engine (Road to Expert) ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |

### Architecture Impact

**Reusable System Added:** Path Engine — Expert Development

**Benefits:** Transform beginners into recognized experts. Paths assemble academy + knowledge + collections + community. North star: experts created.

**Affected Launches:** All verticals — Road to Bourbon Master, Film Critic, Pitmaster, Literary Scholar.

### Delivered

- `@foundry/path-engine` — 5 Bourbon paths + movies/BBQ/books catalog
- Milestones: learn, experience, collect, compare, contribute, mentor, lead, influence
- `mastery_paths`, `user_path_progress`, `club_path_challenges` schema
- Mission Control north star metrics + `/paths`
- `docs/PATH_ENGINE.md`, `docs/EXPERT_DEVELOPMENT.md`

**No Bourbon UI until PASS-014.**

---

## PASS-007 — Foundry Encyclopedia Engine ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |

### Architecture Impact

**Reusable System Added:** Foundry Knowledge Universe (`@foundry/encyclopedia-engine`)

**Benefits:** 10 encyclopedia sections per entity. Academy, recipes, knowledge profiles, semantic search reserved. Turns 100k entities into living knowledge nodes.

**Affected Launches:** All verticals — encyclopedia depth is the retention moat.

### Delivered

- 10 sections: definition, history, culture, geography, trivia, related, misconceptions, beginner, expert, sources
- Academy curricula (Bourbon 7 levels) — `vertical.foundryos.com/academy`
- Recipe engine (cocktails, lists, reading paths — unified schema)
- `user_knowledge_profiles`, semantic search + club intelligence types
- Factory integration: `build:topic` includes encyclopedia + recipes
- Mission Control `/knowledge`
- `docs/KNOWLEDGE_UNIVERSE.md`

**No Bourbon UI.**

---

## PASS-006 — Self-Assembly Engine v1 ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |

### Architecture Impact

**Reusable System Added:** Foundry Factory (`@foundry/factory`)

**Benefits:** One command manufactures entity + 11 content pages + relationships + SEO. All verticals.

**Affected Launches:** Every vertical — Bourbon is proof, not product.

### Delivered

- `@foundry/factory` — 4 AI systems (entity, content, relationship, SEO builders)
- Pipeline: Generate → Validate → Score → Store Plan → Publish Decision (HOLD)
- `npm run build:topic` — Buffalo Trace in one pass
- `factory_runs`, `factory_queue` tables
- Mission Control `/factory`
- `docs/FOUNDRY_FACTORY.md`, `docs/SELF_ASSEMBLY.md`

### Strategic Rule

OpenAI generates. Supabase owns. Generated ≠ Published.

**No Bourbon UI.**

---

## PASS-005 — Vertical Resolution Engine ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |

### Architecture Impact

**Reusable System Added:** Vertical Resolution Engine (`resolveVertical`)

**Benefits:** One deployment → all verticals. Hostname + path routing without per-niche code.

**Affected Launches:** Books, Movies, Music, Bourbon, BBQ, College Baseball

### Delivered

- `resolveVertical(hostname)` — Vertical + Theme (bourbon→Spirits/Bourbon, books→Books/Literature)
- Registry: `vertical_configs`, `vertical_domains`, `vertical_launch_status` (DB + `data/vertical-registry.json`)
- `*.localhost` local dev (books.localhost, bourbon.localhost)
- Mission Control `/routing` — configured verticals, resolved domains, routing health, launch status
- `npm run preflight`, `npm run sandbox`, architecture compliance gate
- `docs/ARCHITECTURE_COMPLIANCE.md`, `docs/LOCAL_DEV.md`

### Verification

- preflight: H: + env checks
- sandbox: Netlify monorepo build
- routing: `/routing` shows launch status table

**Hard rule:** No Bourbon UI, no Books UI, no content population.

---

## PASS-004 — Supabase Live & Deployment Readiness ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |

**Delivered:**

- `@foundry/db` — Supabase client, health checks, live metrics
- `npm run db:diagnose` — connectivity, table counts, RLS checks
- `npm run db:seed` — verticals, 1,961 topics, vertical_sites, bourbon sample entities
- Storage buckets: `entity-images`, `avatars`
- `docs/SUPABASE_SETUP.md`, `docs/NETLIFY_ENV_CHECKLIST.md`
- Mission Control DB status panel + `/api/health/db`

**Steve actions to go live:**

1. Add Supabase keys to `.env.local`
2. `npm run db:migrate`
3. `npm run db:seed`
4. `npm run db:diagnose`

**Hard rule:** No Bourbon UI, no Books UI, no content generation.

---

## PASS-003 — Identity & Ownership Layer ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |

**Delivered:**

- `user_entity_relationships` — owns, favorites, reviewed, ranked, wants, watched, read, listened, visited, experienced
- `entity_metrics` — denormalized leaderboard data
- `packages/ownership-graph` — `buildUserIdentitySnapshot()`
- Content sources reserved: generated, community, editorial, verified
- SEO publish policy: `content_score >= 70` to go live
- `docs/OWNERSHIP_GRAPH.md`, `docs/SEO_PUBLISH_POLICY.md`
- Mission Control platform asset metrics

**Success criteria (schema ready):**

- Who is Steve? → profiles
- What does Steve own? → `owns`
- What does Steve love? → `favorites`
- What has Steve reviewed? → `reviewed`
- Collections built? → `collections`
- Expertise earned? → `user_expertise`

---

---

## PASS-013 — Reputation + Mastery ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-11 |
| **Commit** | `adb1f51` |
| **Core rules** | Reputation is earned trust · Mastery is demonstrated capability |
| **Packages** | `@foundry/reputation-engine`, `@foundry/mastery-engine` |
| **Migration** | `20260623000000_reputation_mastery_pass013.sql` |
| **Live proof** | `/reputation` OPERATIONAL · `/mastery` OPERATIONAL · persisted ✓ |

### Chain verified (production)

```txt
Evidence → Reputation → Mastery → Identity → Community
```

Demo User: **Trusted Speaker Candidate** · **Road to Confident Speaker — Milestone 1 Complete** · Speaker Circle recognition.

### Milestone

**First point where Human Potential Infrastructure exists** — not just vision.

---

## PASS-014 — Domain Proof ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-11 |
| **Deliverable** | Domain Blueprint — bourbon first instance, not special case |
| **Packages** | `@foundry/domain-blueprint`, `@foundry/db` → `ensureBourbonDomainProof()` |
| **Migration** | `20260624000000_domain_proof_pass014.sql` |
| **Live proof** | `/bourbon` OPERATIONAL · `/verticals/bourbon` · persisted ✓ |

### Architecture Impact

- **Reusable System:** Domain Blueprint layer — manufacture domains from template
- **Benefits:** Bourbon proves HPI; Poker, BBQ, Physics reuse same blueprint
- **Next:** Domain Factory (Platform lane) + Growth OS (Growth lane) in parallel

See `docs/PASS_014_EXECUTION.md`.

---

## PASS-015A — CLOSED (in commit)

Traffic Opportunity Registry + Growth Factory funnel + Active Domains metric.

---

## PASS-015 — Growth OS (in progress)

**Parallel lanes:** Platform (Domain Factory) + Growth (Opportunity Engine)

See `docs/PASS_015A_EXECUTION.md`, `docs/GROWTH_OS.md`.

---

## PASS-014 — Domain Proof (archive note)

**Was in progress — now closed.** See section above.

---

## PASS-012 — Collections + Communities ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-11 |
| **Commit** | `3b531a5` |
| **Core rule** | Transformation accelerates in community |
| **Packages** | `@foundry/collection-engine`, `@foundry/community-engine` (extended) |
| **Migration** | `20260622000000_collections_communities_pass012.sql` |
| **Live proof** | `/collections` OPERATIONAL · `/community` OPERATIONAL · Database persisted ✓ |

### Exit criteria (verified on Netlify)

**Collections:** Collection Created ✓ · Entity Added ✓ · Evidence Linked ✓ · Identity Updated ✓

**Community:** Community Created ✓ · Member Joined ✓ · Project Assigned ✓ · Evidence Shared ✓

### Architecture Impact

- **Reusable System:** Personal Knowledge Assets + Community OS persistence layer
- **Benefits:** Identity compounding — what I collect + who I grow with
- **Moat layer:** Ownership graph + shared mastery + evidence in community context

---

## Prior Passes

- **PASS-000** Foundation
- **PASS-001** Registry + Course Correction
- **PASS-002** Core Data Architecture

---

## Planned

- **PASS-013** Reputation + Mastery — earned trust, not gamification (see `docs/PASS_013_EXECUTION.md`)
- **PASS-014** Bourbon Vertical Launch (proof)
