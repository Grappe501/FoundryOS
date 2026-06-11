# PASS-017 — AI Builder World (Experience Pass)

> **Status:** IN PROGRESS · First **consumer value** pass · Build a **world**, not a course

---

## Core Insight

Most education products:

```txt
Lesson → Quiz → Lesson → Quiz
```

Foundry's advantage:

```txt
Mission → Build → Show → Reflect → Improve → Mentor
```

**Not a course. A world.**

---

## Pass Gate

| Audience | They should think |
|----------|-------------------|
| 14-year-old | *I can actually build something.* |
| Parent | *This is teaching real future-proof skills.* |
| Neither | *This is another online course.* |

### Exit criteria (official close gate)

| Check | Criterion |
|-------|-----------|
| **Student** | Can start and complete Mission 1 |
| **Parent** | Can explain in one sentence what value their child receives |
| **Portfolio** | Contains a completed mission artifact |
| **Return hook** | Student knows exactly what to do tomorrow |

Also: student can spend 60 minutes inside and ship a real project — not "academy exists."

If PASS-017 accomplishes that, Foundry stops looking like a platform prototype and starts looking like a product.

---

## Deliverables

### 1. AI Builder Academy — 7 levels, unlock projects

| Level | Title |
|-------|-------|
| 1 | AI Explorer |
| 2 | AI User |
| 3 | AI Creator |
| 4 | AI Builder |
| 5 | AI Architect |
| 6 | AI Entrepreneur |
| 7 | AI Mentor |

### 2. AI Builder Missions (not courses)

| # | Mission |
|---|---------|
| 1 | Build an AI Homework Assistant |
| 2 | Build a Research Agent |
| 3 | Build a Business Assistant |
| 4 | Build a Website with AI |
| 5 | Build a Personal AI Team |

Each mission produces evidence.

### 3. AI Builder Portfolio — `My AI Portfolio`

Projects built · Evidence earned · Reflections written · Skills demonstrated → employable proof.

### 4. AI Builder Playground

Prompt Lab · Automation Lab · Agent Lab · Workflow Lab · Business Lab

### 5. Parent View — `/ai-builder/parents`

Why AI matters · Jobs being created · Skills employers want · What child is building · How progress is measured

### 6. Career Connections — `/ai-builder/careers`

Every major page answers: *What careers use this?*

### 7. Future-Proof Connection

Every page answers: *How does this help me become future-proof?*

---

## Consumer Routes

| Route | Purpose |
|-------|---------|
| `/ai-builder` | World hub |
| `/ai-builder/missions` | Mission list |
| `/ai-builder/missions/[slug]` | Mission runner (6-step loop) |
| `/ai-builder/academy` | 7 levels |
| `/ai-builder/playground` | 5 labs |
| `/ai-builder/portfolio` | My AI Portfolio |
| `/ai-builder/parents` | Parent view |
| `/ai-builder/glossary` | Terms |
| `/ai-builder/careers` | Career connections |
| `/verticals/ai-builder` | Internal proof only |

---

## Implementation

| Asset | Location |
|-------|----------|
| World registry | `apps/platform/lib/ai-builder-world.ts` |
| Mission runner | `apps/platform/components/ai-builder/MissionRunner.tsx` |
| Portfolio | `apps/platform/components/ai-builder/PortfolioView.tsx` |
| Sub-nav | `apps/platform/components/ai-builder/AiBuilderSubNav.tsx` |

---

## Anti-Patterns

- Do NOT structure as lesson → quiz
- Do NOT show PASS / OPERATIONAL / HPI on consumer routes
- Do NOT run public stranger beta during this pass
- Do NOT start Financial Independence until 60-min + project gate clears

---

## What Follows

```txt
PASS-018  Financial Independence  = Keep value   (pairs with Create value)
PASS-019  Public Speaking           = Communicate value
```

Trinity: **Create · Keep · Communicate** — compelling for students, parents, career changers.

---

## Architecture Impact (report at pass close)

```txt
Reusable System Added: AI Builder World pattern (missions + portfolio + playground)
Benefits: Template for PASS-018–020 vertical worlds
Affected Launches: Future-Proof Trinity beta wedge
```
