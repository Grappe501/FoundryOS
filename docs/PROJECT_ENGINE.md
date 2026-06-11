# Project Engine — Architecturally Complete

Built alongside PASS-008/009. Projects are **nodes in the Transformation Graph** — not a separate pass.

Experts don't just learn. **Experts build things.**

Projects transform knowledge into action.

---

## Package

`@foundry/project-engine`

```typescript
import { getProject, assembleProject, LIFE_GRAPHS } from '@foundry/project-engine';

const project = getProject('blind-tasting-night');
const assembly = assembleProject(project!);
```

---

## Bourbon Projects

- Blind Tasting Night
- Build a Bourbon Shelf
- Visit 10 Distilleries
- Host a Bourbon Club

Also cataloged: BBQ, Books, Genealogy, Politics.

---

## Categories

| Category | Examples |
|----------|----------|
| experience | Smoke first brisket, blind tasting |
| build | Bourbon shelf, family tree, home library |
| explore | Visit distilleries, ancestral sites |
| host | Bourbon club, book club, town hall |
| compete | Enter cookoff, judge competition |
| organize | Register voters, precinct team |
| document | Grandparents memoir, tasting notes |

---

## Connects To

- **Paths** — projects advance mastery paths
- **Identity** — completed projects visible on Foundry Identity
- **Community** — host/organize projects create clubs
- **Journey memory** — `journey_events` table

---

## Database

- `foundry_projects`
- `user_project_progress`
- `journey_events`

See `docs/LIFE_GRAPH.md`
