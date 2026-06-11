# Life Journeys Registry

The registry **above** Human Outcomes. A journey is a composed transformation — multiple outcomes that together define who someone is becoming.

## Graph

```txt
Life Journey
  → Outcomes
    → Domains
      → Entities
```

## Exemplar: Become a Community Leader

Outcomes:

- Become a better speaker
- Become a better organizer
- Become a better writer
- Become a better negotiator
- Become a better mentor

Each outcome connects to domains. Domains connect to entities. The graph becomes the navigation layer.

## Catalog

`LIFE_JOURNEYS_REGISTRY` in `@foundry/outcome-engine`:

- Become a Great Parent
- Become a Successful Entrepreneur
- Become a Community Leader *(exemplar)*
- Become a Skilled Craftsman
- Become a Lifelong Learner
- Become a Public Servant
- Become a Research Scientist

## Markets

Every journey maps to a real market: education, career, hobby, community, or life. Same architecture across all.

## Database

`life_journeys` table — seeded from catalog via `npm run db:seed`.
