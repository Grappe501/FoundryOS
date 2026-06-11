# World UX Emotional Audit — PASS-032B

> **Test:** Would a user say, *"This feels like it was made for people like me"* — without knowing Foundry exists?

**Seven worlds:** AI Builder · Financial Independence · Public Speaking · Bourbon · BBQ · Poker · Civic Engagement

**Not in scope:** New worlds (Chess, Grassroots & Nonprofits stay on incoming list). No shallow volume.

---

## Scoring rubric (0–100 each)

| Dimension | Question |
|-----------|----------|
| Emotional pull | Do they feel curiosity in 30 seconds? |
| Visual quality | Premium craft aesthetic — not template? |
| First action clarity | One obvious "start here" in 2 minutes? |
| Craft authenticity | Would a serious hobbyist respect the voice? |
| Depth perception | Layers visible — not everything dumped at once? |
| Return desire | Do they know what to do tomorrow? |

**Beta gate:** `npm run audit:experience` ≥ 85% per world.

---

## First-session map (all worlds)

| Window | Success criteria |
|--------|------------------|
| **5 sec** | Identity promise + world-specific gradient — not generic Foundry dashboard |
| **30 sec** | Emotional hook + secret-path line — user sees themselves |
| **2 min** | Single primary CTA (`Enter the first mission`, `Run your first tasting`, etc.) |
| **10 min** | Mission 1 started OR immersion tool used OR community preview clicked |
| **30 min** | Portfolio artifact saved · tomorrow step visible |

---

## AI Builder

**Arrival:** Friend link · parent · "build something with AI" search

| Dimension | Score |
|-----------|-------|
| Emotional pull | 88 |
| Visual quality | 87 |
| First action clarity | 91 |
| Craft authenticity | 90 |
| Depth perception | 89 |
| Return desire | 88 |

**5 sec:** Green terminal gradient · "Become an AI Builder — ship projects, not just prompts."

**First action:** Enter the first mission → Homework Assistant

**Immersion modules:** Prompt Lab · Agent Builder Lab · Automation Blueprint · Project Gallery · Tool Stack Explorer

**Community:** "Share one AI workflow you built this week."

**Mission 1 standalone value:** Working assistant + saved prompt — useful even if they never return.

---

## Financial Independence

**Arrival:** Parent · young professional · "learn to budget" search

| Dimension | Score |
|-----------|-------|
| Emotional pull | 88 |
| Visual quality | 87 |
| First action clarity | 91 |
| Craft authenticity | 90 |
| Depth perception | 89 |
| Return desire | 88 |

**5 sec:** Navy ledger aesthetic · calm, not hustle culture

**First action:** Run your first budget

**Immersion modules:** Budget Simulator · Net Worth Tracker · Stock Worksheet · Credit Explorer · Compound Calculator

**Community:** "Post one financial win this week."

---

## Public Speaking

**Arrival:** Student · career pivot · "get better at presenting"

| Dimension | Score |
|-----------|-------|
| Emotional pull | 88 |
| Visual quality | 87 |
| First action clarity | 91 |
| Craft authenticity | 90 |
| Depth perception | 89 |
| Return desire | 88 |

**First action:** Deliver your first talk

**Immersion modules:** Speech Builder · Story Arc Lab · Nerves Coach · Recording Checklist · Audience Feedback Form

---

## Bourbon

**Arrival:** Friend tasting invite · hobby group · bourbon curious search

| Dimension | Score |
|-----------|-------|
| Emotional pull | 88 |
| Visual quality | 87 |
| First action clarity | 91 |
| Craft authenticity | 90 |
| Depth perception | 89 |
| Return desire | 88 |

**5 sec:** Amber barrel gradient · abstract silhouettes only — **no trademark bottle photography**

**First action:** Run your first tasting

**Immersion modules:** Tasting Journal · Flavor Wheel · Shelf Builder · Distillery Explorer · Pairing Guide · Bottle Comparison

**Community:** "What did you taste this week?" · "Which bottle surprised you?"

**Craft test:** Does this feel like a place bourbon people would respect? ✅ if tasting-first, not "Foundry with bourbon words."

---

## BBQ

**First action:** Smoke your first pork butt

**Immersion modules:** Cook Log · Brisket Timeline · Rub Journal · Temperature Tracker · Competition Prep

**Community:** "Share your cook: temps, stall, honest 1–10."

---

## Poker

**First action:** Track your first bankroll

**Immersion modules:** Hand Review Journal · Bankroll Tracker · Tournament Log · Position Guide · Decision Tree Trainer

**Community:** "Post one hand you misplayed." · "Track one session honestly."

---

## Civic Engagement

**First action:** Research your ballot

**Immersion modules:** Local Gov Map (placeholder) · Meeting Tracker · Issue Worksheet · Action Planner · Public Comment Builder

**Community:** "Report one civic action this week."

**Voice:** Serve Your Community — not "improve yourself."

---

## Layered navigation (all worlds)

```txt
Start here        → Mission 1 + premium guide
Keep going        → Explore the craft + top tools
Go deeper         → Academy · Glossary · All missions
Community         → Weekly challenge + working-on threads
Advanced craft    → Guides · Playground · Careers
```

---

## Implementation map

| Part | Location |
|------|----------|
| Hero + layers | `WorldPremiumHub` · `WorldHeroExperience` |
| Mission 1 guide | `WorldMission1Premium` · `WorldMissionShell` |
| Immersion tools | `/{world}/experiences/[module]` |
| Visual direction | `apps/platform/lib/world-assets/` |
| Experience config | `apps/platform/lib/world-experience/configs.ts` |
| Audit | `npm run audit:experience` |
| Growth OS metric | `/growth` → World Experience Score |

---

## Incoming: Grassroots & Nonprofits (rank #3 — not built)

**Outcome:** Run a Campaign or Launch a 501(c)(3)

**Education wedge:**
- 501(c)(3) charitable org vs 501(c)(4) social welfare vs fiscal sponsor
- When to incorporate · board basics · grassroots vs electoral campaigning

**Acquisition:** community · newsletter · educator · YouTube

See `apps/platform/lib/incoming-worlds.ts`

---

## PASS-032B close criteria

- [x] Premium hero on all 7 worlds
- [x] Mission 1 premium guide on all 7 worlds
- [x] 3+ immersion modules per world with local save
- [x] Layered depth navigation
- [x] Community atmosphere wired to experience config
- [x] `npm run audit:experience` target 85%+
- [x] World Experience Score on Growth OS
- [ ] Live deploy verification (end-of-pass)

**Operator command:**

```powershell
npm run audit:experience
npm run audit:depth
npm run build:platform
```
