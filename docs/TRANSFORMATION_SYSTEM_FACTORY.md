# PASS-009 — Transformation System Factory

**Not Entity Factory.** An entity is just a node. The factory manufactures entire transformation ecosystems.

## Mission

> Manufacture transformation systems, not content systems.

## Object Hierarchy (locked)

```txt
Life Journey → Outcome → Domain → Role → Path → Project → Entity → Knowledge → Community → Mentorship → Legacy
```

## Exemplar Graph

```txt
Life Journey: Become a Community Leader
Outcome:      Become a Better Speaker
Domain:       Public Speaking
Role:         Community Speaker
Path:         Road to Confident Speaker
Project:      Deliver First Public Speech
Entity:       Speech Structure
Knowledge:    Opening Hooks
Community:    Speaker Circle
Mentorship:   Coach New Speaker
Legacy:       Helped 50 People Complete Path
```

## Transformation Templates

Domains assemble from templates — not invented structure every time.

| Template | Layers |
|----------|--------|
| **Hobby** | Knowledge, Path, Projects, Community, Mentorship, Legacy |
| **Academic** | Definitions, Concepts, Execution, Projects, Research, Mentorship |
| **Career** | Skills, Projects, Experience, Leadership, Mentorship |
| **Leadership** | Communication, Influence, Projects, Community, Teaching |

## Foundry DNA Record

Every domain gets a machine-readable blueprint:

```json
{
  "domain": "public-speaking",
  "outcomes": ["become-better-speaker", "become-better-leader"],
  "roles": ["speaker", "trainer", "mentor"],
  "paths": ["road-to-confident-speaker", "road-to-keynote-speaker"],
  "projects": ["deliver-first-speech", "community-presentation"],
  "communities": ["speaker-circle"]
}
```

## Code

- `@foundry/outcome-engine` — hierarchy, templates, DNA registry
- `@foundry/factory` — `manufactureTransformationSystem()`, `validateTransformationEcosystem()`
- Tables: `transformation_templates`, `domain_dna_records`

## Pass Gate

Does this strengthen the full graph — or add content without transformation?

## North Star

**How many transformations are in progress?**

Not users. Not pages. Not entities.
