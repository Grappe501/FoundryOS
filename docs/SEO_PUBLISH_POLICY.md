# FoundryOS — SEO Publish Policy

> Ernie directive: Build the factory. Do not publish empty pages.

---

## The Risk

1,961 topics × 11 content types = ~21,571 potential pages.

Publishing all immediately = **thin content** + **crawl budget disaster**.

Google hates empty programmatic pages.

---

## Policy

### Build the engine ✅

Content factory generates page specs in `draft` status.

### Do NOT auto-publish ❌

Pages go live **only when**:

```txt
content_score >= minimum_publish_score (default: 70)
```

Enforced in:
- `content_pages` RLS policy
- `packages/content-engine` → `canPublishContent()`
- `platform_config.seo_publish_threshold`

---

## Content Sources (Reserved)

Every content page has a `content_source`:

| Source | Example |
|--------|---------|
| `generated` | AI-generated overview |
| `community` | Community reviews aggregate |
| `editorial` | Expert guide |
| `verified` | Distillery-official facts |

Example entity page structure:

```txt
Buffalo Trace
├── Generated Overview
├── Community Reviews
├── Editorial Guide
└── Verified Distillery Facts
```

Not fully built yet — schema reserved PASS-003.

---

## Content Score Factors (PASS-005 implementation)

- Word count minimum
- Entity data completeness
- User engagement (reviews, collections)
- Editorial review flag
- Verified source present

---

## Sitemap Strategy

- Sitemaps generated per vertical
- Only `published` + score-qualified pages included
- Staged rollout: flagship topics first, not bulk dump
