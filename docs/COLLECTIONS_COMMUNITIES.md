# PASS-012 — Collections + Communities

**Core rule:** Transformation accelerates in community.

## Packages

- `@foundry/collection-engine` — Personal Knowledge Assets (not lists)
- `@foundry/community-engine` — Community OS verification + demo proof

## Database

Migration `20260622000000_collections_communities_pass012.sql`:

- `personal_knowledge_assets` / `personal_knowledge_asset_items`
- `community_instances` / `community_members` / `community_project_assignments` / `community_evidence_shares`

## Verification

### `/collections`

```txt
Collection Created ✓
Entity Added ✓
Evidence Linked ✓
Identity Updated ✓
Database: persisted ✓
```

Demo: **My Speech Library** — Demo User, linked to PASS-011 evidence.

### `/community`

```txt
Community Created ✓
Member Joined ✓
Project Assigned ✓
Evidence Shared ✓
Database: persisted ✓
```

Demo: **Speaker Circle** — public speaking community aligned with PASS-010/011 demo user.

## Exit narrative

```txt
This is what I'm becoming.
This is what I've done.
This is what I've collected.
These are the people I'm growing with.
```
