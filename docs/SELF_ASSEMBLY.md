# Self-Assembly Engine

> How do I build a machine that builds Bourbon?

---

## Future Command

```powershell
npm run build:topic
```

Asks for a topic/entity. Produces in one pass:

```txt
Entity
Content (11 types)
Relationships
SEO
Navigation
Collection hooks
```

---

## v1 (PASS-006)

Structural assembly without requiring OpenAI:

```typescript
import { assembleEntity } from '@foundry/factory';

const result = await assembleEntity({
  topic: 'Buffalo Trace',
  slug: 'buffalo-trace',
  entity_type: 'spirit',
  vertical_domain: 'bourbon.foundryos.com',
});

// result.overall_score
// result.publish_decision → 'hold'
// result.content_pages.length → 11
```

OpenAI enrichment layers on in PASS-007 (Encyclopedia Engine).

---

## Publish Gate

- `content_score >= 70` to be eligible
- Factory default: `publish_decision: 'hold'`
- Bulk publish of 21k pages: **forbidden**

---

## Pass Roadmap

> Source of truth: Mission Control + `docs/ROADMAP.md`

| Pass | Focus |
|------|-------|
| PASS-006 | Self-Assembly Engine v1 |
| PASS-007 | Encyclopedia Engine (Knowledge Universe) |
| PASS-008 | Path Engine — Road to Expert |
| PASS-009 | Transformation System Factory |
| PASS-010 | Transformation Graph Engine |
| PASS-011 | Evidence Engine |
| PASS-012 | Collections + Clubs |
| PASS-013 | Reputation + Mastery |
| PASS-014 | Bourbon Vertical Launch (proof) |

Manufacture transformation systems before first serious public launch.
