# FoundryOS — H: Drive Environment Setup
# MUST run before any npm/node/build/git operations
# Usage: .\scripts\setup-h-drive.ps1

$ErrorActionPreference = "Stop"
$Root = "H:\FoundryOS"

if (-not (Test-Path $Root)) {
    Write-Error "FoundryOS root not found at $Root. Nothing runs on C:."
    exit 1
}

Set-Location $Root

# All cache directories on H: ONLY
$dirs = @(
    "$Root\.cache\npm",
    "$Root\.cache\npm-store",
    "$Root\.cache\temp",
    "$Root\.cache\build",
    "$Root\.cache\turbo",
    "$Root\.cache\supabase",
    "$Root\.cache\netlify",
    "$Root\.cache\cursor-mirror",
    "$Root\.cursor\cursor-mirror"
)

foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created: $dir"
    }
}

# ─── Redirect ALL temp to H: ───────────────────────────────
$env:TMP = "$Root\.cache\temp"
$env:TEMP = "$Root\.cache\temp"
$env:TMPDIR = "$Root\.cache\temp"

# ─── npm / node ────────────────────────────────────────────
$env:npm_config_cache = "$Root\.cache\npm"
$env:npm_config_prefix = "$Root"
$env:NODE_PATH = "$Root\node_modules"

# ─── Turbo ─────────────────────────────────────────────────
$env:TURBO_CACHE_DIR = "$Root\.cache\turbo"
$env:TURBO_TELEMETRY_DISABLED = "1"

# ─── Next.js / build tools ─────────────────────────────────
$env:NEXT_CACHE_DIR = "$Root\.cache\build\next"
$env:NETLIFY_CACHE_DIR = "$Root\.cache\netlify"
$env:XDG_CACHE_HOME = "$Root\.cache"

# ─── Supabase CLI ──────────────────────────────────────────
$env:SUPABASE_INTERNAL_STORAGE = "$Root\.cache\supabase"

# ─── Git (keep pack files in repo on H:) ───────────────────
$env:GIT_CONFIG_GLOBAL = "$Root\.cache\gitconfig"
if (-not (Test-Path $env:GIT_CONFIG_GLOBAL)) {
    git config --global core.longpaths true 2>$null
}

Write-Host ""
Write-Host "FoundryOS H: Drive environment LOCKED." -ForegroundColor Green
Write-Host "  CWD:       $(Get-Location)"
Write-Host "  TMP/TEMP:  $env:TMP"
Write-Host "  npm cache: $env:npm_config_cache"
Write-Host "  turbo:     $env:TURBO_CACHE_DIR"
Write-Host "  netlify:   $env:NETLIFY_CACHE_DIR"
Write-Host ""
Write-Host "C: drive is OFF LIMITS for this project." -ForegroundColor Yellow
Write-Host ""
Write-Host "If C: was polluted, run: .\scripts\full-c-drive-migration.ps1" -ForegroundColor DarkGray
Write-Host ""
