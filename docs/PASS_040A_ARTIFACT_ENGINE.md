# PASS-040A — Artifact Engine

> **Passport is a view. Artifacts are reality.**

See `docs/FOUNDRY_ARTIFACT_MODEL.md` · `docs/DEVICE_STRATEGY.md`

## The Shift

Stop thinking:

```txt
User completed lesson
```

Start thinking:

```txt
User created artifact
```

An artifact is **evidence of participation** — not a file, row, or content type alone.

---

## Passport vs Artifacts

| Without artifacts | With artifacts |
|-------------------|----------------|
| Passport = empty profile | Passport = history of a life |

---

## Progression Model

```txt
World → Creates Artifacts
Artifacts → Create Collections
Collections → Create Identity
Identity → Creates Influence
Influence → Creates Legacy
```

---

## One Artifact, Seven Meanings

Example: **WT101 Review** is simultaneously:

```txt
Review · Artifact · Collection item · Identity signal
Recommendation source · Reputation source · Atlas connection
```

---

## Atlas After 040A

Before: WT101 connects to Jimmy Russell, Kentucky, 101 proof.

After: WT101 also knows:

```txt
500 people reviewed it · 150 hosted tastings · 75 compared to Buffalo Trace
40 recommended to beginners · 20 trail trips
```

Atlas becomes **Knowledge + Experience** — much harder to replicate.

---

## Primitive (build this — not artifact pages first)

### Types (`@foundry/artifact-engine`)

```txt
Review · Note · Recommendation · Visit · Event · Speech · Project
Recipe · Prompt · Workflow · Research · Comparison · Journal · Collection Entry
```

### Relationships

```txt
Created By · References · Inspired By · Part Of
Recommended By · Hosted At · Connected To
```

### Metadata

```txt
World · Date · People · Places · Topics · Entities
Collections · Privacy · Evidence
```

### API (v1 in repo)

```txt
createArtifact()
listArtifacts()
linkArtifactToGraphNode()
getArtifactEngineStats()
validateArtifactEngine()
```

Storage v2: `user_entity_relationships` + payload — **040D Personal Database**.

---

## What Unlocks After 040A

| Pass | Role |
|------|------|
| 040B Atlas Graph | Connect to artifacts |
| 040C AI | Reason over artifacts |
| 040D Personal DB | Persist artifacts |
| 040E Reviews | Artifact subtype |
| 040F Recommendations | Artifact subtype |
| 040G Passport | **Displays** artifacts |
| Legacy | Archives artifacts |

---

## 034U North Star KPI

**User Artifacts** — largest number on `/operator/universe`.

```txt
Atlas Terms: 15,000  ·  Lessons: 8,000  ·  Worlds: 2,000   ← content
User Artifacts: 4,300,000                              ← ecosystem alive
```

Strongest signal: **How many unique artifacts are being created?**

---

## Device Strategy

Artifacts must work **web and phone** — install option up front on home (`FoundryAccessOptions` + PWA manifest).

---

## Pass Gate

> Can a user leave evidence that connects to the graph?

---

## Audit

```powershell
npm run audit:artifacts
```

Package: `packages/artifact-engine/`
