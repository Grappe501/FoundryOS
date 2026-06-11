# Local Development — Vertical Domains

Test vertical resolution without production DNS.

---

## Site Engine (port 3002)

```powershell
cd H:\FoundryOS
.\scripts\setup-h-drive.ps1
npm run dev --workspace=@foundry/site-engine
```

## Localhost Hostnames

| URL | Resolves to |
|-----|-------------|
| `http://bourbon.localhost:3002` | Spirits / Bourbon |
| `http://books.localhost:3002` | Books / Literature |
| `http://movies.localhost:3002` | Movies / Cinema |
| `http://music.localhost:3002` | Music / Audio |

Modern browsers resolve `*.localhost` to `127.0.0.1` automatically.

## Test Paths

```
http://books.localhost:3002/
http://books.localhost:3002/fantasy
http://books.localhost:3002/fantasy/overview
http://bourbon.localhost:3002/rankings
http://bourbon.localhost:3002/entities/buffalo-trace
```

## Verify Resolution

```powershell
node -e "const {resolveVertical}=require('./packages/vertical-resolver/src');"
```

Or Mission Control → `/routing`

---

## Production Domains

Same resolver handles `books.foundryos.com`, `bourbon.foundryos.com`, etc.

One deployment → many verticals → one platform.
