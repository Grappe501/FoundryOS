# Foundry Knowledge Universe

> The actual moat — not the app, not the AI, not even the graph alone.

---

## The Shift

Most sites answer:

```txt
What is Buffalo Trace?
```

Foundry answers:

```txt
What is it? How was it made? Why does it matter?
Who influenced it? Who competes with it?
What pairs with it? How is it viewed in Kentucky vs Japan?
What do collectors think? What should I try next?
What do my friends think?
```

---

## Layers

| Layer | Package | Status |
|-------|---------|--------|
| Encyclopedia (10 sections/entity) | `@foundry/encyclopedia-engine` | PASS-007 |
| Academy (`/academy` per vertical) | encyclopedia-engine/academy | Schema + curricula |
| Recipe Engine (unified) | encyclopedia-engine/recipes | Schema + generator |
| Knowledge Profiles | user_knowledge_profiles | Schema reserved |
| Semantic Search | encyclopedia-engine/search | Types reserved |
| Friend Group Intelligence | encyclopedia-engine/community | Types reserved |

---

## Encyclopedia Sections (every entity)

1. Definition
2. History
3. Cultural Significance
4. Geographic Significance
5. Trivia
6. Related Concepts (KG-driven)
7. Common Misconceptions
8. Beginner Explanation
9. Expert Explanation
10. Sources

---

## Academy

Same engine, every vertical:

```txt
bourbon.foundryos.com/academy
books.foundryos.com/academy
movies.foundryos.com/academy
```

Bourbon Academy: 7 levels (what is bourbon → master class).

---

## Strategic Prize

```txt
100,000 entities → 100,000 living knowledge nodes
```

Topics create SEO. **Entities create ownership.** Ownership creates retention.

---

## Factory Integration

`npm run build:topic` now produces:

- Entity + content pages
- **10 encyclopedia sections**
- Recipes (when applicable)
- Relationships + SEO

Generated → scored → stored. Supabase owns.

See `docs/ENCYCLOPEDIA_ENGINE.md`
