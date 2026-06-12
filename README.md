# FoundryOS

**Human Potential Infrastructure — Vertical Worlds + Transformation Graph**

> Help people become who they are capable of becoming.

[![GitHub](https://img.shields.io/badge/GitHub-Grappe501%2FFoundryOS-blue)](https://github.com/Grappe501/FoundryOS)  
**Live:** https://foundry-os.netlify.app/

**Steve:** start with [START_HERE_FOR_STEVE.md](START_HERE_FOR_STEVE.md)

---

## Vision

- **1,000 niche specialty apps** on a unified platform
- **AI self-build module** that generates new apps autonomously
- **1 million users** by end of 2026
- **$4 free → $18 premium** subscription model

## Team

| Role | Who |
|------|-----|
| Founder | Steve |
| Pilot (Strategy) | Ernie (ChatGPT) |
| Builder (Code) | Burt (Cursor AI) |

## Quick Start

```powershell
# 1. Enforce H: drive (REQUIRED)
.\scripts\setup-h-drive.ps1

# 2. Install dependencies
npm install

# 3. Configure environment
copy .env.example .env.local
# Fill in Supabase + OpenAI keys

# 4. Start development
npm run dev
```

## Hard Rule

**NOTHING writes to C: drive.** All files, caches, temp, and node_modules live on `H:\FoundryOS`.

```powershell
cd H:\FoundryOS
.\scripts\setup-h-drive.ps1
.\scripts\cleanup-c-drive-foundry.ps1   # removes C: leaks
.\scripts\run-on-h.ps1 npm run build    # all commands via H:
```

## Documentation

| Doc | Description |
|-----|-------------|
| [START_HERE_FOR_STEVE.md](START_HERE_FOR_STEVE.md) | **Steve's entry point** |
| [CURRENT_BUILD_STATUS.md](docs/CURRENT_BUILD_STATUS.md) | What exists now (PASS-033) |
| [WORLD_REGISTRY.md](docs/WORLD_REGISTRY.md) | Worlds + audience classifications |
| [BASELINE.md](docs/BASELINE.md) | Project baseline and pass log |
| [MASTER_BUILD_PLAN.md](docs/MASTER_BUILD_PLAN.md) | How we build 1000 apps |
| [APP_CATALOG_250.md](docs/APP_CATALOG_250.md) | First 250 app targets |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture |
| [PROTOCOLS.md](docs/PROTOCOLS.md) | Git, branches, naming |
| [INVESTOR_PITCH.md](docs/INVESTOR_PITCH.md) | Angel investor positioning |

## Structure

```
FoundryOS/
├── apps/           # Deployable applications
├── packages/       # Shared platform code
│   ├── core/       # Platform kernel
│   ├── ui/         # Design system
│   └── self-build/ # AI app generator
├── supabase/       # Database migrations
├── docs/           # All documentation
└── scripts/        # H: drive setup
```

## License

Proprietary — All rights reserved.
