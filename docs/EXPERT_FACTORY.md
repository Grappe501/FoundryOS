# Expert Factory — Part of PASS-009 Transformation System Factory

**PASS-009 is not Entity Factory.** The Transformation System Factory manufactures full ecosystems. Expert outputs (care_reason, journeys, paths) are **nodes within** that ecosystem.

When `Buffalo Trace` is created, the factory automatically generates:

**PASS-009 requirement:** Every entity answers **Why should someone care?**

| Output | Status |
|--------|--------|
| Care Reason | draft |
| Encyclopedia | draft |
| Academy | draft |
| Recipes | draft |
| Comparisons | draft |
| Trivia | draft |
| Collections | draft |
| Rankings | draft |
| Beginner Path | draft |
| Expert Path | draft |
| Beginner Journey | draft |
| Expert Journey | draft |
| Community Use Cases | draft |
| Community Challenges | draft |
| Related Entities | draft |
| Search Context | draft |

All: **generated → validated → scored → stored → queued**

OpenAI generates. Supabase owns. Generated ≠ Published.

Foundry is not organizing information. **Foundry is organizing transformation.**

---

## Package

`@foundry/factory`

```typescript
import { assembleEntity, EXPERT_FACTORY_OUTPUTS } from '@foundry/factory';

const output = await assembleEntity({ topic: 'Buffalo Trace', slug: 'buffalo-trace', ... });
// output.expert.beginner_path
// output.expert.expert_path
// output.expert.academy
```

---

## CLI

```bash
npm run build:topic -- --topic "Buffalo Trace" --slug buffalo-trace --type spirit
```

---

## Vision

> Foundry helps people become experts.
>
> Every subject has a path.
>
> Every path has a community.
>
> Every community creates knowledge.
>
> Every contribution helps someone else master the craft.

The 1,961 niche apps are the delivery mechanism.

The real product: expertise, identity, collections, and communities.
