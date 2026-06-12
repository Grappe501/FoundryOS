# Bourbon World — Design Document

> **Status:** Design phase · not build queue  
> **Problem:** Today we have structure (7 levels, 5 missions, 50 glossary terms, immersion shells) but the **course is an outline** — academy lessons are templated, not taught.  
> **Goal:** Design a world where someone goes from *“I know nothing”* to *Bourbon Steward* with real palate skill, real vocabulary, and real proof — not a label-reading quiz.

---

## 1. What Bourbon World Is

**Not:** A video course · a bottle database · a hype feed · “smooth vs bold” takes  
**Yes:** A **craft guild** — taste, document, host, teach

North star question:

> *Can you host a blind tasting, explain why a $25 bottle beat a $80 bottle, and teach a friend to nose without saying “smooth”?*

Voice: **Passion Trinity** — role titles, ritual, proof. See `docs/VOICE_GUIDE.md`.

Loop (locked):

```txt
Mission → Build → Show → Debrief → Refine → Teach
```

---

## 2. Design Principles

| Principle | Meaning |
|-----------|---------|
| **Taste before trivia** | Every level includes a physical tasting exercise before label lore |
| **Price is a lesson** | Each level teaches *why* tiers exist — production, age, hype, allocation — not “buy this” |
| **History is context** | History explains *why Kentucky*, *why bonded*, *why NAS* — not a timeline to memorize |
| **Boundaries matter** | Bourbon is defined by law; rye, Tennessee, scotch, Irish are **cousins** — taught at Levels 2–4 |
| **Evidence over consumption** | Progress = notes, hosts, comparisons, teaching — not bottles owned |
| **No trademark cosplay** | Visual direction: amber, oak, rickhouse mood — not distillery logos as hero art |

---

## 3. Feature Inventory — What We Can Build

Mapped to Foundry engines (platform-first — same patterns work for BBQ, wine, etc.).

### A. Knowledge Layer

| Feature | Purpose | Build surface |
|---------|---------|---------------|
| **Bourbon Encyclopedia** | Deep reference: law, process, regions, eras | Entity pages + `@foundry/encyclopedia-engine` |
| **American Whiskey Map** | Interactive: bourbon vs rye vs TN vs corn vs scotch | `/bourbon/learn/whiskey-map` guide |
| **History Spine** | 8-era narrative with “taste the era” callouts | Academy + `/bourbon/learn/history` |
| **Glossary (50+ terms)** | Already strong — link terms to tastings | Existing glossary + in-lesson links |
| **Label Decoder** | TTB terms: straight, bonded, DSP, sourced | `/bourbon/experiences/label-decoder` |
| **Price Tier Explainer** | $15 / $30 / $50 / $80+ — what you pay for | Academy Level 3 + standalone guide |

### B. Academy Layer (replace templates)

| Feature | Purpose | Build surface |
|---------|---------|---------------|
| **35 real lessons** (5 per level × 7) | Actual curriculum — not “Introduction: Curious Drinker” | Replace `buildAcademyLessons()` for bourbon with hand-authored `bourbon-academy.ts` |
| **Level checkpoints** | Tasting lab + short quiz on *application*, not memorization | `/bourbon/academy/level-N/checkpoint` |
| **Video-free teaching** | Step photos, diagrams, printable tasting sheets | Markdown + structured lesson schema |
| **“Try this pour” boxes** | Specific exercise per lesson (e.g. water drop A/B) | Lesson component |

### C. Mastery / Missions (exists — deepen guides)

| Feature | Purpose | Build surface |
|---------|---------|---------------|
| **5 core missions** | Already defined in `bourbon-world.ts` | Add mission-specific tasting scripts |
| **Mission tasting scripts** | Bottle suggestions by tier, pour order, timing | `/bourbon/missions/[slug]/script` |
| **Blind night kit** | Printable score cards, bag labels, reveal sheet | Download / experience module |
| **Distillery visit prep** | Virtual tour links + observation checklist | Mission 5 enrichment |

### D. Experience Tools (immersion modules)

| Feature | Purpose | Status |
|---------|---------|--------|
| **Tasting Journal** | Nose / palate / finish / water note | Shell exists |
| **Flavor Wheel** | Build vocabulary — sweet, oak, spice, fruit, grain | Shell exists — needs wheel UI + term bank |
| **Comparison Grid** | 3–5 pour side-by-side | New module |
| **Blind Tasting Host** | Numbered pours, anonymous scores, reveal | New module |
| **Shelf Builder** | Theme + rationale + gap analysis | Shell exists |
| **Distillery Explorer** | Map + process notes | Shell exists |
| **Label Decoder** | Photo or type label fields → breakdown | New module |
| **Price/Value Calculator** | Proof, age, type → “what am I paying for?” | New module |

### E. Collection / Entity Layer

| Feature | Purpose | Build surface |
|---------|---------|---------------|
| **My Bourbon Journal** | Portfolio: tastings, shelves, trips | Exists |
| **Bottle entities** | Mash bill, proof, distillery, tier | `entities` table — seed scale |
| **Distillery entities** | Process, tours, region | Encyclopedia + map |
| **Personal rankings** | Not global hype — *your* palate | Ownership graph |
| **Tasting flights** | Saved lineups (Mission 1 presets) | Collection type |

### F. Community Layer

| Feature | Purpose | Build surface |
|---------|---------|---------------|
| **Bourbon Circle** | Monthly theme, blind nights, shelf showcase | Exists in bundle |
| **Steward mentorship** | Review first-tasting evidence | Community roles |
| **Store pick threads** | Local picks — not allocation hype | Moderated format |

### G. Identity / Progress

| Feature | Purpose |
|---------|---------|
| **7 academy levels** | Curious → Steward |
| **Mastery titles** | Bourbon Steward, Tasting Host, etc. |
| **World Experience Score** | Hero + tools + mission quality |

---

## 4. The Seven Levels — Outcomes & Content

Each level: **5 lessons** + **1 tasting lab** + **optional mission** + **evidence gate**.

---

### Level 1 — Curious Drinker

**Outcome:** You can pour a proper tasting, nose without burning, and name 5 flavor words.

**What you accomplish:**
- Know the legal definition of bourbon (51% corn, new charred oak, USA, ≤160 proof entry)
- Complete your first structured 3-pour tasting
- Tell bourbon apart from “whiskey” generically

**History thread:** *Why corn?* — frontier agriculture, Kentucky limestone water, post-Prohibition consolidation (1 paragraph + “taste why corn sweetness matters”)

**Nose / taste curriculum:**
- Glass choice (Glencairn vs rocks)
- Nose technique: open mouth, distance, don’t swirl first sniff
- Palate: small sip, chew, locate sweetness vs heat
- Finish: count seconds, note dry vs sweet
- **Forbidden word:** “smooth” — replace with specific texture words

**Price thread:** Lesson on **$20–30 shelf** — what honest bourbon costs to make; why Jim Beam, Evan Williams, Old Forester belong in Mission 1

**Not bourbon (intro):** “Whiskey is the family; bourbon is one member” — preview rye and scotch without derailing

| Lesson | Title | Core content |
|--------|-------|--------------|
| 1.1 | What bourbon actually is | Legal definition, label walkthrough, what “straight” adds |
| 1.2 | Your first nosing ritual | Technique, common mistakes, water on the side |
| 1.3 | Three pours, one method | Mission 1 prep — pick budget, mid, different mash tilt |
| 1.4 | Flavor words that mean something | Sweet / oak / spice / fruit / grain — not marketing adjectives |
| 1.5 | Level checkpoint | Guided tasting lab + submit notes to journal |

**Mission unlocked:** Host First Tasting  
**Evidence:** 3 tasting notes + lineup photo + reflection

---

### Level 2 — Confident Taster

**Outcome:** You compare two pours and explain *why* they differ using mash bill and proof.

**History thread:** *Sour mash* — why consistency mattered at scale (Beam, Dickel context)

**Nose / taste curriculum:**
- Water drop A/B — same pour, 1 drop vs 3 drops
- Proof impact — same brand different proof if available
- Wheated vs high-rye — side by side (Maker’s vs Old Forester 100)

**Price thread:** **$30–45** — small batch vs standard; what “small batch” legally doesn’t mean

**Not bourbon:**
- **Rye whiskey** (51% rye) — spice-forward cousin; Rittenhouse vs bourbon
- **Tennessee whiskey** — Lincoln County Process; why Jack isn’t bourbon

| Lesson | Title | Core content |
|--------|-------|--------------|
| 2.1 | Mash bill in your mouth | Corn / rye / wheat / barley roles |
| 2.2 | Proof is not a score | ABV, heat, flavor density |
| 2.3 | Wheated vs high-rye tasting | Paired exercise |
| 2.4 | Rye and Tennessee — cousins | Comparison, not connoisseur flex |
| 2.5 | Checkpoint — comparison grid | Two pours, one variable held constant |

**Tool focus:** Flavor Wheel + Comparison Grid  
**Evidence:** Completed grid in journal

---

### Level 3 — Shelf Builder

**Outcome:** You curate 5–8 bottles around a defensible theme and explain gaps.

**History thread:** *Bottled in Bond* (1897) — consumer protection; taste a bonded pour vs non-bonded

**Nose / taste curriculum:**
- Vertical thinking — same line, different expressions (if accessible)
- “Daily drinker” vs “occasion pour” — palate fatique

**Price thread:** Full **tier map**:

| Tier | Typical range | What you pay for | What you don’t |
|------|---------------|------------------|----------------|
| Entry | $15–25 | Consistent house style, young stock | Age rarity |
| Standard | $25–40 | Blending skill, brand identity | Single barrel magic |
| Premium | $40–70 | Age, proof options, small batch | Guaranteed superiority |
| Ultra / allocated | $70+ | Scarcity, age stocks, hype | Automatic quality |

**Not bourbon:** **Corn whiskey** (80%+ corn, can be unaged) — legal line vs bourbon

| Lesson | Title | Core content |
|--------|-------|--------------|
| 3.1 | Shelf themes that teach | Daily / proof ladder / mash / region |
| 3.2 | The price ladder | Tier table above + exercise: match bottle to tier |
| 3.3 | Bonded and the law | BiB requirements + tasting |
| 3.4 | Building without hype | Allocation, MSRP, secondary market — stay grounded |
| 3.5 | Checkpoint — shelf defense | Photo + theme statement + “next bottle” rationale |

**Mission unlocked:** Build First Shelf  
**Tool focus:** Shelf Builder + Price/Value module

---

### Level 4 — Connoisseur

**Outcome:** You read a label cold — DSP, age, proof, type — and predict the glass.

**History thread:** *NAS era* — why age statements disappeared; blender tradeoffs

**Nose / taste curriculum:**
- Single barrel vs small batch blind
- Chill filtration A/B (if non-chill available)
- Cask strength — dilution to taste vs fixed proof

**Price thread:** **Store picks and single barrels** — when worth it, when lottery

**Not bourbon:**
- **Scotch** (peated vs unpeated) — why used bourbon barrels matter to scotch
- **Irish whiskey** — triple distillation contrast

| Lesson | Title | Core content |
|--------|-------|--------------|
| 4.1 | Label anatomy | DSP, proof, straight, sourced whiskey honesty |
| 4.2 | Single barrel vs small batch | Variance, blending, house style |
| 4.3 | Age, NAS, and angels | Evaporation economics |
| 4.4 | American vs world whiskey | Scotch / Irish — one tasting mindset, different rules |
| 4.5 | Checkpoint — label decoder lab | Given label photo → predict + taste verify |

**Mission unlocked:** Compare 5 Bourbons  
**Tool focus:** Label Decoder + Comparison Grid (5-wide)

---

### Level 5 — Tasting Host

**Outcome:** You run a blind tasting for 2+ people with fair protocol and a reveal moment.

**History thread:** *Blind judging culture* — wine worlds; bourbon’s hype problem

**Nose / taste curriculum:**
- Hosting ergonomics — pour size, water, palate cleansers
- Coaching beginners off “smooth” and “strong”
- Anonymous score cards

**Price thread:** **Blind price bias exercise** — hide prices until reveal; debrief

| Lesson | Title | Core content |
|--------|-------|--------------|
| 5.1 | Blind protocol | Bags, numbers, reveal sheet |
| 5.2 | Hosting the room | Pace, inclusivity, no gatekeeping |
| 5.3 | Scorecards that teach | Nose / palate / finish / value — not 100-point cosplay |
| 5.4 | When the cheap bottle wins | Case studies, humility |
| 5.5 | Checkpoint — mock blind (solo or 1 guest) | Document surprise result |

**Mission unlocked:** Blind Tasting Night  
**Tool focus:** Blind Tasting Host module

---

### Level 6 — Distillery Traveler

**Outcome:** You connect place, process, and pour — mash → ferment → distill → barrel → bottle.

**History thread:** *Rickhouse geography* — why floors matter; angel’s share in Kentucky climate

**Nose / taste curriculum:**
- New make vs aged — if ever available on tour
- Barrel char levels — what char #3 means in the glass
- Entry proof — flavor extraction tradeoff

**Price thread:** **Distillery-only bottles** — tour economics, not automatic quality

| Lesson | Title | Core content |
|--------|-------|--------------|
| 6.1 | The production line | Mash, ferment, distillation cuts |
| 6.2 | Barrel and rickhouse | Oak, char, climate, time |
| 6.3 | Bottling and proofing | Chill filter, batch, single barrel pick |
| 6.4 | Virtual or in-person tour prep | Checklist, questions to ask |
| 6.5 | Checkpoint — process note | One observation that changed your tasting |

**Mission unlocked:** Visit First Distillery  
**Tool focus:** Distillery Explorer

---

### Level 7 — Bourbon Steward

**Outcome:** You teach a newcomer through their first tasting and earn steward recognition.

**History thread:** *Stewardship* — passing craft, not hoarding bottles

**Nose / taste curriculum:**
- Teaching the nose — demo + common failure modes
- Building someone’s flavor wheel from zero

**Price thread:** **Gift guide by learner** — one bottle under $30 with sentence of why

| Lesson | Title | Core content |
|--------|-------|--------------|
| 7.1 | Teaching without gatekeeping | Tone, questions, encouragement |
| 7.2 | First-tasting script for guests | 30-minute hosted version of Mission 1 |
| 7.3 | Monthly themes for a circle | High rye month, bonded month, etc. |
| 7.4 | Evidence review — what good notes look like | Mentor rubric |
| 7.5 | Steward capstone | Host + teach + debrief written |

**Community role unlocked:** Bourbon Steward (mentorship)  
**Evidence:** Hosted tasting + mentee notes + your debrief

---

## 5. History Spine — Eight Eras (cross-level)

Thread through lessons — not one boring unit:

| Era | Hook | Taste tie-in |
|-----|------|--------------|
| Pre-Prohibition | Farm distilleries, quality diversity | Corn-forward heritage styles |
| Prohibition | Medicinal whiskey, industry collapse | Why bonded law followed |
| Post-WWII | Consolidation, national brands | House styles born |
| 1964 Congressional declaration | “America’s native spirit” | Legal pride vs marketing |
| 1980s–90s slump | Vodka era | Survival brands |
| Craft revival 2000s | Small distilleries return | Flavor experimentation |
| Bourbon boom 2010s+ | Allocation, hype, NAS | Price tier lesson anchor |
| Today | Global demand, used barrels for scotch | World whiskey context |

---

## 6. Nose & Taste — Progressive Skill Tree

```txt
Level 1: Nose → Palate → Finish (one pour)
Level 2: Compare two pours (one variable)
Level 3: Theme tasting (flight design)
Level 4: Label prediction → verify in glass
Level 5: Blind protocol (remove bias)
Level 6: Process-linked tasting (char, proof, entry)
Level 7: Teach the skill tree to someone else
```

**Flavor vocabulary bank** (Flavor Wheel terms — minimum 40):

- Sweet: caramel, honey, vanilla, brown sugar, maple, toffee
- Oak: cedar, sawdust, toasted nut, coconut (barrel toast)
- Spice: cinnamon, pepper, rye spice, clove, nutmeg
- Fruit: cherry, apple, orange peel, dried apricot, banana (ferment)
- Grain: corn bread, wheat bread, malt, cereal
- Other: leather, tobacco, mint, chocolate, coffee, smoke (rare in bourbon)

---

## 7. Price & Value — Teaching Framework

**Lesson we owe users:** Price ≠ quality. Price = age stock + proof + scarcity + marketing + taxes.

**Exercises:**
1. **Blind rank 3 pours** — reveal prices last
2. **Match bottle to tier** — photo quiz
3. **“Best under $30”** — personal pick with 3-sentence defense (portfolio)
4. **Allocation literacy** — MSRP vs secondary; why Foundry doesn’t hype hunts

**Suggested Mission 1 bottles (tiered, swappable):**

| Slot | Role | Example tier |
|------|------|--------------|
| A | Entry daily | $18–22 |
| B | Different mash | $25–35 wheated OR high-rye |
| C | Step up | $35–45 small batch or BiB |

---

## 8. Not Bourbon — American & World Whiskey Module

Taught across Levels 2–4 (not a detour — defines bourbon by contrast):

| Type | Legal / process | When to taste | Lesson |
|------|-----------------|---------------|--------|
| Rye whiskey | ≥51% rye | Level 2 | Spice comparison |
| Tennessee whiskey | Charcoal mellowing | Level 2 | Jack vs bourbon |
| Corn whiskey | ≥80% corn | Level 3 | Label literacy |
| Wheat whiskey | ≥51% wheat | Level 4 optional | Soft profile |
| Scotch | Scotland, often ex-bourbon barrels | Level 4 | Used barrel economy |
| Irish | Triple distillation common | Level 4 | Light vs bourbon weight |
| Canadian | Blending tradition | Glossary only | Awareness |

---

## 9. Content Architecture — How It Fits Together

```txt
World Hub (/bourbon)
├── Start Here → Mission 1 (first tasting)
├── Academy (/bourbon/academy)
│   └── Level 1–7 × 5 real lessons + checkpoint
├── Learn (/bourbon/learn)
│   ├── History spine
│   ├── Whiskey map (bourbon vs cousins)
│   └── Price tiers guide
├── Experiences (/bourbon/experiences)
│   ├── Tasting Journal
│   ├── Flavor Wheel
│   ├── Comparison Grid
│   ├── Blind Host Kit
│   ├── Shelf Builder
│   ├── Label Decoder
│   └── Distillery Explorer
├── Missions (/bourbon/missions) — 5 proof projects
├── Glossary (/bourbon/glossary) — 50+ linked terms
├── Portfolio (/bourbon/portfolio) — evidence
└── Community (/community/bourbon) — Bourbon Circle
```

**Replace:** `buildAcademyLessons()` for bourbon → **`bourbon-academy-curriculum.ts`** with 35 authored lessons matching tables above.

**Keep:** Glossary (expand cross-links), missions (add scripts), community roles.

---

## 10. Success Metrics — How We Know Design Worked

| Metric | Target |
|--------|--------|
| Mission 1 completion | User submits 3 structured notes |
| Level 1 checkpoint | Uses ≥5 flavor wheel terms correctly |
| Blind mission surprise | ≥30% rank cheap bottle above expensive |
| Steward path | 1 mentored first-tasting |
| Experience audit | Stay ≥85% with *real* lesson depth |

---

## 11. Build Phases (when we resume building)

| Phase | Deliverable | Depends on |
|-------|-------------|------------|
| **B0 — Design** | This doc + lesson outlines 1.1–1.5 written in full | Now |
| **B1 — Level 1 content** | 5 lessons + tasting lab + Mission 1 script | B0 |
| **B2 — Tools** | Comparison Grid, Flavor Wheel UI, Label Decoder | B1 |
| **B3 — Levels 2–3** | Mash bill, price tier, shelf mission enrichment | B1 |
| **B4 — Levels 4–5** | Label literacy, blind host kit | B3 |
| **B5 — Levels 6–7** | Distillery + steward capstone | B4 |
| **B6 — Entities** | Distillery + bottle seed at scale | Encyclopedia factory |

---

## 12. Open Questions for Steve / Ernie

1. **Bottle recommendations:** Generic tiers only, or named “example bottles” (no affiliate)?
2. **Virtual distillery:** YouTube tour links OK as Mission 5 substitute?
3. **Age gate:** Any UI copy for 21+ (jurisdiction)?
4. **Entity scale:** How many distilleries/bottles in v1 — 50, 500, 5000?
5. **Chess model:** Bourbon stays Passion Trinity — no separate “course” track?

---

## Appendix: What Exists Today vs Gap

| Asset | Today | Gap |
|-------|-------|-----|
| 7 academy levels | Titles + taglines | **35 real lessons** |
| 50 glossary terms | Rich content | Link to lessons/tastings |
| 5 missions | Good structure | **Tasting scripts + bottle tiers** |
| 4 experience modules | Form shells | **Wheel, grid, blind kit, label decoder** |
| History | Encyclopedia stub | **8-era spine with taste ties** |
| Price education | Mentioned in missions | **Dedicated tier framework** |
| Not-bourbon | Glossary mentions | **Level 2–4 comparison lessons** |

---

*Level 1 built in `bourbon-academy-level-1.ts` — routes at `/bourbon/academy/[slug]`.*

*Next step when approved: write Level 2 lessons in full (same pattern).*
