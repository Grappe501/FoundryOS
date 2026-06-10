# FoundryOS — Full App Catalog (1,961 Apps)

> **Expanded beyond 1,000** — machine-readable registry at `data/catalog/`  
> Regenerate: `node scripts/build-catalog.js`

---

## Summary

| Metric | Value |
|--------|-------|
| **Total Apps** | 1,961 |
| **Verticals** | 26 |
| **Mega Verticals** | Books, Music, Film, TV |
| **Public Sites** | Vertical domains (`books.foundryos.com`) — topics are paths |
| **Admin** | `admin.foundryos.com` manages all |
| **Mission Control** | `foundryos.com` — living HQ, not a brochure |

> **Course correction (PASS-001):** 1,961 topics ≠ 1,961 websites. See [COURSE_CORRECTION.md](./COURSE_CORRECTION.md)

---

## Steve's Question: Books, Music, Movies?

**Pass 0 had them scattered** (20 music apps, 1 book-collecting, 2 film apps).

**Pass 1 fixes this** — dedicated mega-verticals:

| Mega Vertical | Apps | Examples |
|---------------|------|----------|
| **📚 Books & Literature** | 126 | `fiction-fantasy`, `author-shakespeare`, `book-clubs`, `rare-books` |
| **🎵 Music & Audio** | 134 | `jazz-masters`, `vinyl-records`, `hip-hop-culture`, `film-scores` |
| **🎬 Film & Cinema** | 116 | `film-noir`, `director-kubrick`, `criterion-collection`, `horror-franchises` |
| **📺 TV & Streaming** | 121 | `tv-drama`, `streaming-netflix`, `prestige-tv`, `k-drama` |

---

## All Verticals

| Vertical | Apps | Mega? |
|----------|------|-------|
| Spirits & Beverages | 49 | |
| Wine & Beer | 163 | |
| Food & Culinary | 202 | |
| Sports | 115 | |
| Collectibles | 72 | |
| **Books & Literature** | **126** | ✅ |
| **Music & Audio** | **134** | ✅ |
| **Film & Cinema** | **116** | ✅ |
| **TV & Streaming** | **121** | ✅ |
| Outdoors & Nature | 80 | |
| Fitness & Wellness | 52 | |
| Travel & Geography | 80 | |
| Automotive | 45 | |
| Technology | 54 | |
| Finance & Education | 65 | |
| Home & Garden | 52 | |
| Fashion & Style | 45 | |
| Gaming | 55 | |
| Pets & Animals | 57 | |
| Arts & Crafts | 38 | |
| Professional | 44 | |
| History & Culture | 39 | |
| Science & Nature | 31 | |
| Photography & Media | 27 | |
| Spirituality | 22 | |
| Lifestyle & Community | 53 | |

---

## Data Files

```
data/catalog/
├── index.json              # Vertical summary + counts
├── all-apps.json           # Flat array of all 1,961 apps
├── books-literature.json   # Per-vertical detail
├── music-audio.json
├── film-cinema.json
├── tv-streaming.json
└── ... (26 vertical files)
```

Each app entry includes:
- `slug`, `displayName`, `vertical_id`
- `site_url` — standalone website URL
- `standalone: true`, `admin_managed: true`
- `crossRefs`, `priority` (P0–P3)

---

## Build Priority

| Priority | Apps |
|----------|------|
| **P0** | `bourbon-connoisseur` |
| **P1** | Spirits cluster, wine/beer, meals, fiction-fantasy, jazz-masters, film-cinema |
| **P2** | College baseball, book-clubs, music-collector-clubs, film-clubs, tv-clubs |
| **P3** | Remaining 1,900+ (self-build generated) |

---

## Original 250

The first 250 apps from Pass 0 are **included** in this catalog (with expanded neighbors in same verticals). See `docs/APP_CATALOG_250.md` for the original Phase 1 subset reference.

---

## Adding Apps

1. Edit vertical file in `scripts/catalog-verticals/`
2. Run `node scripts/build-catalog.js`
3. Admin → provision new `app_sites` row
4. Self-build can ingest from manifest
