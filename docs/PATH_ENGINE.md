# Path Engine — PASS-008

> Wikipedia gives information. Foundry creates experts.

---

## The Real Product

Not: Bourbon Encyclopedia

Yes: **Road to Bourbon Mastery** (Expert Development)

```txt
Academy + Knowledge + Collections + Reviews + Community + Projects
= Path to Expert
```

---

## Package

`@foundry/path-engine`

```typescript
import { getPath, assemblePath } from '@foundry/path-engine';

const path = getPath('road-to-bourbon-master');
const assembly = assemblePath(path!);
// assembly.components: academy, knowledge, collections, reviews, community, projects
```

---

## Bourbon Paths

- Road to Bourbon Enthusiast
- Road to Bourbon Collector
- Road to Bourbon Historian
- Road to Bourbon Steward
- Road to Bourbon Master

Also cataloged: Film Critic, Western Expert, Backyard Pitmaster, Literary Scholar.

---

## Milestone Categories

| Category | Examples |
|----------|----------|
| Learn | Academy + encyclopedia |
| Experience | Reviews, tastings |
| Collect | Shelves, collections |
| Compare | Rankings |
| Contribute | Guides |
| Mentor | Help newcomers |
| Lead | Host tastings, clubs |
| Influence | Expert rankings |

---

## North Star

**How many experts did we help create?**

Not: how much content exists.

Metrics: Active Paths, Users on Paths, Academy Graduates, Community Leaders, Expert Contributors, Club Hosts.

---

## Friend Groups (PASS-012)

Central Arkansas Bourbon Society:
- Compare collections
- Blind tastings
- Local academy paths
- Club challenges

---

## Database

- `mastery_paths`
- `user_path_progress`
- `club_path_challenges`

See `docs/EXPERT_DEVELOPMENT.md`
