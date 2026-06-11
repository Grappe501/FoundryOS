# Offline Sync

Future mobile advantage — schema ready in PASS-009 prep.

---

## Downloadable Assets

```txt
Download Collection
Download Academy
Download Encyclopedia
Download Notes
Download Path Progress
```

---

## High-Value Contexts

- Hunting / fishing (no signal in the field)
- Travel
- Genealogy research
- Museums
- Conventions
- Festivals

---

## Database

`offline_sync_manifests`:
- `user_id`
- `sync_type`: collection | academy | encyclopedia | notes | path_progress
- `resource_slug`
- `manifest` (JSONB)
- `synced_at`, `expires_at`

---

## Rules

- Offline data belongs to the user's Foundry Identity
- Sync merges back to Supabase on reconnect
- Generated content still requires publish gate
