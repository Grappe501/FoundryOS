# Catalog App Template

Replicable template for Tier 1/2/3 specialty catalog apps.

## Generated Structure

```
apps/{slug}/
├── app/
│   ├── page.tsx              # Tier 1 catalog home
│   ├── layout.tsx            # App shell with theme
│   ├── catalog/
│   │   ├── page.tsx          # Browse catalog
│   │   └── [id]/page.tsx     # Item detail
│   ├── collection/
│   │   └── page.tsx          # Tier 2 personal collection
│   └── clubs/
│       └── page.tsx          # Tier 3 social clubs
├── config/
│   └── manifest.json         # App manifest (from self-build)
└── package.json
```

## Required Platform Hooks

- `@foundry/core/category` — load category config
- `@foundry/core/catalog` — Tier 1 data
- `@foundry/core/ownership` — Tier 2 collections
- `@foundry/core/tiers` — feature gating
- `@foundry/ui` — design system components

## Self-Build Usage

```bash
npm run generate:app -- --manifest packages/self-build/manifests/bourbon-connoisseur.json
```
