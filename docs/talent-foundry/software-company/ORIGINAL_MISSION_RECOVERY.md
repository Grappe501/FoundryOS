# Company Foundry — Original Mission Recovery

**Status:** Phase 0 audit only. No product code.  
**Audited tree:** `origin/main` @ `4ed26c0` (Talent Foundry V1.2 live).  
**Date:** 2026-09-01  
**Worktree:** `H:\FoundryOS-tf-company` · `feat/talent-foundry-company-phase-0`

This document recovers what the repository actually contains. Categories are exclusive. Do not treat inferred or proposed material as historical fact.

---

## How this audit was done

- Read current Talent Foundry V1.1 / V1.2 implementation and docs on `main`.
- Read campaign configuration, journey / visit / scenario / operator / leader engines, SAVE MY PLACE, Share QR, session architecture, Supabase resume storage, RedDirt identify/continue.
- Searched repository docs and packages for `flywheel`, `cohort`, `ownership`, `partner`, `intern`, `founder`, `talent`, `apprentice`, `builder`, `venture`, `compensation`, `payment`, `revenue`, `profit`, `equity`, `Foundry`, `Talent Foundry`.
- Searched git history (`git log --grep`, `git log -S "Talent Foundry"`). Talent Foundry first appears as Kelly campaign discovery (`a2df22c`, `b325410`) and has no earlier standalone hiring-flywheel commit.

**Finding:** there is no older standalone Talent Foundry flywheel implementation to resurrect wholesale. Useful older ideas exist as adjacent FoundryOS systems and as explicit “Beta #2” language in campaign discovery docs. Current Talent Foundry is a campaign recruiting product that learned how to make a front door work. It is not the original larger thesis.

---

## FOUND IN REPOSITORY

Facts present in code, migrations, or committed docs. Quoted as current-tree truth.

### Talent Foundry as product family (named, not built)

`docs/talent-foundry/kelly-grappe-beta/MASTER_BUILD_DISCOVERY.md` (2026-08-30):

> Build the Kelly Grappe for Secretary of State internship/volunteer recruiting experience as **Beta #1** of a reusable Foundry OS talent-discovery application. The eventual product should be configurable for **Foundry/software-company recruiting** and later for outside businesses through an **employer onboarding system**.

Emerging architecture in that same file:

- Beta #1: Kelly Grappe campaign paid-intern + volunteer pipeline.
- Beta #2: Foundry/software-company talent pipeline.
- Commercial product: configurable employer onboarding + reusable recruiting/assessment + candidate evidence workspace + talent bench/pipeline.

`docs/talent-foundry/README.md` and `MASTER_BUILD_PLAN.md` post-launch items:

- **PL-8** — Multi-tenant FoundryOS campaign registry beyond Kelly.
- **PL-11** — Generalized commercial Talent Foundry packaging.

No Company Foundry route, journey, person store, cohort engine, or command center exists on `main`.

### Current Talent Foundry (Campaign Foundry) — implemented truth

Live public route: `/talent-foundry`  
Share / QR canon: `https://foundry-os.netlify.app/talent-foundry` (`TALENT_FOUNDRY_SHARE_URL`)  
Source tag: `talent-foundry-kelly-beta`

Implemented on `main`:

| Layer | What it is |
|---|---|
| V1 / P0 | Cinematic opening, People Rule, Kelly video, HQ volunteer scenario, identity → RedDirt, pathway, Mission One, handoff |
| Layer 2 | THE SHIFT — operator mission after Key One |
| Layer 3 | THE LEADER — fictional composite people only |
| V1.1 | Visit One compressed to 4–7 minutes; intent (`volunteer` / `paid` / `both` / `exploring`); one 4-decision scenario; one optional door; terminal `visit_complete`; Layer 2/3 become later visits |
| V1.2 | SAVE MY PLACE (`talent_foundry_resumes` on FoundryOS Supabase `efinmlvlfuqaridysvem`); Key One share moment; friends start at the beginning |

Campaign architecture lock (`MASTER_BUILD_PLAN.md`):

- Public experience is an isolated consumer route in `@foundry/platform`, not a new app.
- **Talent Foundry is a campaign-configured product surface, not a lifelong world.**
- Canonical identity is **RedDirt** `User` upsert-by-email via volunteer form → `/api/forms`.
- Evidence attaches to RedDirt `Submission` / `WorkflowIntake` JSON. No FoundryOS person table for this product.
- Auth for public experience: none. QR entry, no login.
- Human decision boundary: organize evidence only. No AI hire/reject score.
- File-based volunteer store is forbidden. Browser never talks to RedDirt admin.

Campaign identity fields (implemented): first name, last name, phone, email, ZIP, start-when; RedDirt `submissionId` / `userId` / `workflowIntakeId`.

SAVE MY PLACE (V1.2 spec + `resume/store.ts`):

- Opaque 32-byte base64url token; SHA-256 stored; 180-day TTL; no account; possession of the URL is authorization.
- Table columns include `campaign_id` and `reddirt_submission_id`.
- Service-role only. RLS on. No public policies. Anon/authenticated revoked.
- Explicitly **not** `user_memories` / `auth.users` portable identity.
- Identity required before save (`if (!session.identity) throw`).

Share (V1.2): after Key One, “Know someone who should see this? / Bring someone with you.” Opens existing campaign QR. No referral scoring. Friends start at the beginning.

Evidence model (campaign): factual items with optional `EvidenceDimension` labels (`leadership_readiness`, `written_communication`, `delegation`, etc.). No numeric score. Staff-facing rank is a **human** field on RedDirt metadata.

AI boundary (campaign docs + Layer 2): no OpenAI evaluation, no AI ranking, no personality test. Layer 2 simulates “use AI as a tool” without calling a model.

People in Campaign Foundry (`people-memory.ts`): fictional composites (Jordan, Maya, Chris, …). Not real applicants.

### FoundryOS person / identity systems (adjacent, not Talent Foundry)

| System | What it is | Auth required |
|---|---|---|
| `auth.users` + `user_profiles` | Canonical signed-in Foundry user. `user_profiles.id` references `auth.users`. Display name, region, roles, mastery titles, mentorship counts, `trust_score` column exists on later identity passes | Yes |
| Portable Identity | `user_artifacts`, `user_memories`, `user_graph_history` — reconstruct “who they were becoming” across worlds | Yes |
| `@foundry/ownership-graph` | Relationships, `FoundryIdentity`, role catalog, legacy/mentorship, share card hook **“What I'm becoming.”** | Conceptual + profile |
| `beta_waitlist` | Product-tester waitlist with segment + invite codes (Pass 026 first-25 plan) | Waitlist / signup |

`docs/PORTABLE_IDENTITY.md`: Portable Identity is collections, graph history, artifacts, memory, unfinished threads, identity narrative, passport. Rebuild test: “Can we rebuild a human?”

`packages/ownership-graph/src/identity.ts` vision statement:

- Outcome: **Help me become the person I want to be.**
- Mission: **Foundry helps people become who they are capable of becoming.**
- Lines: every subject has a path; every path has a community; every community creates knowledge; every contribution helps someone else master the craft.
- Contrast: teaches = “Watch this.” / transforms = “Become this.”

`docs/HUMAN_OPERATING_SYSTEM.md`: Foundry is not an encyclopedia, academy, social network, or AI tool. Expert creation beats consumption. Components include Identity, Roles, Paths, Projects, Legacy.

There is **no** FoundryOS hiring-person table. Campaign Foundry docs state this explicitly (V1.2 SAVE MY PLACE spec): “There is no FoundryOS person table for this product.”

### Ownership / equity / payment (FoundryOS, not Talent Foundry)

`docs/FOUNDER_EXECUTIVE_BOOK.md` + inventory:

- Company is a portfolio of products, IP, books, and operating knowledge.
- Inventory is for build sequencing, **partner conversations**, capital allocation, **apprentice training assignments**, launch planning, diligence.
- Valuation doctrine: replacement/build value, risk-adjusted IP, commercial revenue potential — must not be collapsed.
- None of the inventory ranges is an appraisal or a representation of market value.

`@foundry/ownership-graph` “ownership” means **user–entity relationships** (owns, favorites, reviewed, ranked…) and portable mastery identity. It is **not** legal equity, cap table, or partner agreements.

`/operator/flywheel` is a **growth / marketing flywheel** (operator surface), not a talent-hiring flywheel.

Stripe / `stripe_customer_id` on `user_profiles` is product billing infrastructure, not Talent Foundry compensation.

No Talent Foundry document describes equity grants, profit share, or “complete the Foundry and earn ownership.”

### Cohorts (FoundryOS, not hiring)

Pass 026 / first-25 plan: tester cohorts (student, parent, adult learner, educator, hobbyist). `beta_waitlist` + `/operator/business` cohort tracker. Purpose: private product beta, not employment selection.

No `FOUNDry Cohort 01` hiring object exists.

### Campaign psychology that is implemented (reusable craft, campaign-specific content)

From `EXPERIENCE_SPEC.md` / `README.md` / V1.1:

Desired campaign progression: What is this? → This noticed me. → This is interesting. → This matters. → The People Rule. → I could do something. → I want to be part of this. → Then identify.

Opening constraint: do not lead with Kelly or “Apply for an internship.”

V1.1 doctrine: “Talent Foundry is not an application, a test, or homework. First: it noticed me. Then: I want to be part of this. Then: there is more if I want it.”

Layer questions actually shipped:

- Layer 1: How do you think? / Will you show up?
- Layer 2: Can you operate when everything moves at once?
- Layer 3: Can you develop and lead other people?

Human-review doctrine is repeated across discovery, README, and Layer specs: organize factual job-related evidence; humans decide; no hidden political or ideological screen; no AI preference score.

Employment-design note (discovery): distinguish enthusiasm from lawful/sustainable scheduling; do not reward unpaid off-the-clock labor as proof of commitment.

### Admin / operator architecture for Talent Foundry

Specified, campaign-scoped: RedDirt `/admin/talent-foundry` (human rank, intern decision, pathway, assignment, notes). FoundryOS has no Talent Command Center.

---

## CURRENT CANON

Decisions that remain binding unless Ernie explicitly reopens them.

### Campaign Foundry (do not disturb)

- Live route `/talent-foundry` and canonical share URL / QR stay Kelly Grappe Campaign Foundry.
- Do not alter live campaign journey, copy, Kelly video, RedDirt identify/continue, or campaign SAVE MY PLACE semantics in this program.
- Do not modify RedDirt unless a later phase has an explicit, required reason. Company Foundry must **not** write people into RedDirt.
- Fictional composites only in Layer 3. No real applicant records in the public leader mission.
- No AI ranking, hire, reject, or opaque fit score.
- Paid-intern simulation and campaign volunteer intake remain campaign-owned.

### FoundryOS identity canon (existing)

- Signed-in Foundry person = `auth.users` + `user_profiles`.
- Portable Identity tables require that signed-in user.
- RedDirt `User` is the campaign volunteer system of record, not the FoundryOS company person.
- Ownership-graph is mastery / relationship identity, not equity.

### Talent Foundry product family (named in discovery; now official)

This Phase 0 pass makes the family explicit:

1. **Campaign Foundry** — Kelly Grappe beta. Live.
2. **Company Foundry** — Foundry / software-company talent flywheel. This program.
3. **Employer Foundry** — configurable commercial product. Future only (Phase 8).

### Safety canon that Company Foundry inherits

- Observable evidence only.
- No personality diagnosis, ideology inference, protected-trait inference, hidden psychological hiring score, autonomous hire/reject, or opaque AI ranking.
- Completing the experience must never be implied to earn employment, pay, or equity.
- If real productive work benefits the company materially, compensation/legal classification is a human review flag — not disguised employment-as-assessment.

---

## INFERRED FROM EXISTING SYSTEM

Reasonable readings of what the system is optimized to do. Not committed product decisions.

1. **Current Talent Foundry is optimized to convert a curious stranger into a campaign volunteer / intern candidate in one short visit.** V1.1 compression, intent picker, early Kelly video, and “YOU SHOWED UP” close all serve that. That is a successful campaign front door, not a company flywheel.

2. **The reusable engine is real; the reusable mission is not yet implemented.** Journey types, scenario engine, operator engine, leader engine, session persistence, evidence items, SAVE MY PLACE tokens, and share QR shell can be extracted as Talent Foundry Core. Kelly copy, RedDirt writes, People Rule, KEY 01/02, and intern $20/hr are campaign implementation.

3. **Architecture lock “not a lifelong world” was a launch constraint, not the original thesis.** Discovery named Beta #2 as a software-company pipeline. The lock kept Kelly shippable. Company Foundry has to reopen that lock or it will remain a reskinned funnel.

4. **Participant → Operator → Leader is a compressed preview of Discover → Prove → Lead → Multiply.** Campaign layers are simulated and finish in hours. The company thesis wants the same evidence types across weeks and real work.

5. **Identity-before-investment is the campaign pattern; the company pattern should invert it.** Campaign identifies before Mission One and before Layers 2/3. SAVE MY PLACE requires identity. Company mystery + “YOU’VE LEFT SOMETHING BEHIND” implies more anonymous work first.

6. **`KEY 01` teaches participants to expect `KEY 02`.** V1.2 still uses Key One as the share beat. Company progression should not be enumerable if mystery is the product.

7. **FoundryOS already believes in generativity.** Vision line “every contribution helps someone else master the craft,” `people_mentored`, `communities_led`, and Layer 3 “the people are yours to develop” are the cultural ancestors of the talent flywheel — built for worlds/hobbies, not hiring.

8. **First-25 tester cohorts are a reusable *shape* (named group, segment, invite, lifecycle) and the wrong *meaning* (product testers vs. builders selected by demonstrated work).**

9. **Portable Identity is the long-term home for a remembered builder’s artifacts — but only after a real Foundry account exists.** Using it at the Remember Me checkpoint would force login too early and violate mystery / no-account doctrine.

10. **Inventory “apprentice training assignments” implies the company already thinks of real internal work as a teaching surface.** That is the seed of simulated → sandbox → supervised real work. It is not implemented as a talent pipeline.

11. **Campaign staff review is a thin slice of a Talent Command Center:** one campaign, one RedDirt inbox, human rank + intern decision. Company needs funnel, work, cohorts, and auditable gates the campaign dashboard never had to hold.

---

## NEW PROPOSALS

Phase 0 proposals for Ernie review. Not found in history. Not current campaign canon.

1. Treat Talent Foundry as a **core + implementations** family (Campaign / Company / future Employer), sharing engines and doctrine, never sharing journeys, share URLs, or person stores.

2. Recover the original mission as: **discover overlooked builders through demonstrated work; develop them in cohorts; learn who creates value together; feed the strongest people into the company flywheel.** Optimize for fascination with the workshop, not application completion.

3. Public company door: **`/workshop`**. Working alias: `/talent-foundry/build`. Do not reuse `/talent-foundry` or the campaign QR. `/workshop` does not leak the product name in the address bar before the first revelation.

4. Company Foundry belongs to the **FoundryOS world**. Introduce a FoundryOS `foundry_people` record (pre-auth) that can later link to `user_profiles` / `auth.users`. Do not write RedDirt. Do not create a third disconnected person universe.

5. Keep the participant anonymous through observation, judgment, and first artifact. First identity checkpoint: **YOU’VE LEFT SOMETHING BEHIND / Want us to remember it?** Résumé never at entry. Account only when the product genuinely needs one.

6. Replace enumerable keys with non-sequential discovery language (**ACCESS GRANTED**, workshop opening). Do not port KEY 01/02.

7. Formalize 14 journey stages and 8 build phases (see `EXPERIENCE_BLUEPRINT.md` and `MASTER_BUILD_PLAN.md`). Phase 1 is mysterious front door through first small challenge only.

8. Formalize flywheel, cohort, evidence ledger, and human-decision gates as operational models before any backend tables.

9. Distinguish learning / voluntary challenge / paid project / internship / employment / leadership / ownership discussion. Never blur them. Ownership remains a separate legal decision with an evidence trail — not a prize.

10. Company share copy should transmit mystery, not recruiting: **DON’T EXPLAIN IT. SEND THEM THE DOOR.** New QR. Fresh session. No referral hiring advantage.

11. Visual doctrine: the UI discloses the organization through progress (dark workshop → machinery → people → company). No values wall. No careers-page open.

12. AI may organize, summarize, compare revisions, and coach instructions. AI may not infer protected traits, ideology, personality, mental health, or produce employability scores / auto decisions.

### Phase 0.5 NEW (2026-09-02) — not found in history

These expand Phase 0. They are **not** recovered mission. They are the current proposed product.

13. Company Foundry is a **premium talent-to-ownership academy and operating environment**, not a recruiting funnel with homework. People remain potential partners throughout as **staff posture**, never as a public track or auto-banner.

14. **Do not start Phase 1 screens** until this expansion is reviewed. The door spec stays; linger is the end of visit one, not the product.

15. Curriculum is **missions**, not a course: Foundry method; Burt (Cursor) + Ernie (ChatGPT) + Oscar (later); local dev; GitHub; OpenAI API; databases; architecture; product engineering; AI discipline; production discipline; Foundry operating rhythm. See `ACADEMY_CURRICULUM.md`.

16. `/workshop` **becomes** their development environment. After they make something: “Now we're going to show you how we make things here.” Then setup, clone, branch, broken build, inspect data, then another participant. GitHub facts feed the same room. A living body of work replaces the résumé.

17. A cohort exists for the participant when they meet another **real** person. Rafi is not a cohort. Completing missions does not mint a seat.

18. Oscar is mystery and late. Not at the door. Still organize, never hire.

**Ernie accepted Phase 0.5 on 2026-09-02** (E0.5-1–7 locked). Added CANON: Capability Reveal Engine (`Need → Friction → Discovery → Tool → …`); becoming-capable standard; training repo must feel like a young product, not a tutorial. Phase 1 door cleared. PR #5 stays open.

---

## What was *not* found

- No pre-Kelly Talent Foundry app, route, or schema.
- No hiring flywheel state machine.
- No Foundry Cohort object for talent.
- No ownership-path product for employees/partners inside Talent Foundry.
- No payment / compensation engine for Foundry contributors.
- No Talent Command Center on FoundryOS.
- No company-specific scenarios, artifacts, or share URL.
