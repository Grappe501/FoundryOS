# FoundryOS — H: Drive Environment Setup
# Run this before any npm/node/build operations
# Usage: .\scripts\setup-h-drive.ps1

$ErrorActionPreference = "Stop"
$Root = "H:\FoundryOS"

# Verify H: drive project root exists
if (-not (Test-Path $Root)) {
    Write-Error "FoundryOS root not found at $Root"
    exit 1
}

# Create cache directories on H: only
$dirs = @(
    "$Root\.cache\npm",
    "$Root\.cache\npm-store",
    "$Root\.cache\temp",
    "$Root\.cache\build",
    "$Root\.cache\supabase"
)

foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created: $dir"
    }
}

# Redirect ALL temp to H:
$env:TMP = "$Root\.cache\temp"
$env:TEMP = "$Root\.cache\temp"
$env:TMPDIR = "$Root\.cache\temp"

# npm cache on H:
$env:npm_config_cache = "$Root\.cache\npm"

# Node options for project-local storage
$env:NODE_PATH = "$Root\node_modules"

Write-Host ""
Write-Host "FoundryOS H: Drive environment configured." -ForegroundColor Green
Write-Host "  TMP/TEMP: $env:TMP"
Write-Host "  npm cache: $env:npm_config_cache"
Write-Host "  Project:   $Root"
Write-Host ""
