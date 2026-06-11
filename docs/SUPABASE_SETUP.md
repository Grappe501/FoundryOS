# Supabase Setup — PASS-004

> Steve provisions the project. Burt provides migrations, seed, and diagnostics.

---

## 1. Create Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. New project → name: `foundryos` (or your choice)
3. Region: closest to primary users
4. Save database password securely

---

## 2. Configure Environment

```powershell
cd H:\FoundryOS
Copy-Item .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Optional — auto-create admin on seed
FOUNDRY_ADMIN_EMAIL=steve@yourdomain.com
FOUNDRY_ADMIN_PASSWORD=your-secure-password
```

**Never commit `.env.local`.** Service role key is server-only.

---

## 3. Run Migrations

Link CLI (one time):

```powershell
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
```

Apply migrations:

```powershell
npm run db:migrate
```

Or paste each file from `supabase/migrations/` into Supabase SQL Editor in order.

---

## 4. Seed Platform Data

```powershell
npm run db:seed
```

Seeds:

- 26 verticals
- 1,961 topics (draft — not published)
- Vertical domain registry
- 3 bourbon sample entities (Buffalo Trace, Maker's Mark, distillery)
- Admin user (if `FOUNDRY_ADMIN_EMAIL` set)

---

## 5. Verify

```powershell
npm run db:diagnose
```

Expected after seed:

| Table | Count |
|-------|-------|
| verticals | 26 |
| topics | 1,961 |
| entities | 3 |
| vertical_sites | ~10 |

---

## 6. Storage Buckets

Migration `20260610500000` creates:

- `entity-images` — public read, auth upload
- `avatars` — user folder per `auth.uid()`

Verify in Supabase Dashboard → Storage.

---

## 7. RLS Verification

Diagnostics checks anon key cannot read `user_entity_relationships` without auth.

Ownership graph rows require authenticated user.

Content pages publish only when `content_score >= minimum_publish_score`.

---

## 8. Auth URLs (before private beta invites)

Dashboard → **Authentication** → **URL Configuration**

| Setting | Production value |
|---------|------------------|
| Site URL | `https://foundry-os.netlify.app` |
| Redirect URLs | `https://foundry-os.netlify.app/auth/callback` |

Keep `http://localhost:3000` and `http://localhost:3000/auth/callback` for local dev.

Without these, magic links and OAuth redirects fail on Netlify.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Connection refused | Check URL and keys in `.env.local` |
| Migration fails | Run migrations in timestamp order |
| Seed partial | Re-run `npm run db:seed` (upserts are idempotent) |
| Disk space on push | `git gc --prune=now`, clear `.turbo`, `node_modules` |
