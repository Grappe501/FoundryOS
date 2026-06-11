# FoundryOS — Full C: Drive Migration & Cleanup
# 1. Mirror anything useful from C: to H:
# 2. Send redundant C: artifacts to Recycle Bin
# 3. Never leave duplicate project copies on C:
# Usage: .\scripts\full-c-drive-migration.ps1

$ErrorActionPreference = "Continue"
$Root = "H:\FoundryOS"
$UserHome = $env:USERPROFILE

Add-Type -AssemblyName Microsoft.VisualBasic

function Send-ToRecycleBin {
    param([string]$Path)
    if (-not (Test-Path $Path)) { return $false }
    try {
        if ((Get-Item $Path -Force).PSIsContainer) {
            [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteDirectory(
                $Path,
                'OnlyErrorDialogs',
                'SendToRecycleBin'
            )
        } else {
            [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile(
                $Path,
                'OnlyErrorDialogs',
                'SendToRecycleBin'
            )
        }
        return $true
    } catch {
        Write-Host "  LOCKED (skip): $Path" -ForegroundColor DarkGray
        return $false
    }
}

function Get-DirSizeMb {
    param([string]$Path)
    if (-not (Test-Path $Path)) { return 0 }
    $bytes = (Get-ChildItem $Path -Recurse -Force -ErrorAction SilentlyContinue |
        Measure-Object -Property Length -Sum -ErrorAction SilentlyContinue).Sum
    if (-not $bytes) { return 0 }
    return [math]::Round($bytes / 1MB, 1)
}

function Mirror-IfNewer {
    param([string]$Source, [string]$Dest)
    if (-not (Test-Path $Source)) { return }
    if (-not (Test-Path $Dest)) {
        New-Item -ItemType Directory -Path $Dest -Force | Out-Null
    }
    Copy-Item -Path $Source -Destination $Dest -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "  Mirrored: $Source -> $Dest" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " FOUNDRYOS FULL C: DRIVE MIGRATION" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Project root (canonical): $Root"
Write-Host ""

if (-not (Test-Path $Root)) {
    Write-Error "H:\FoundryOS not found. Aborting."
    exit 1
}

Set-Location $Root
& "$Root\scripts\setup-h-drive.ps1"

$recycled = 0
$freedMb = 0

# ─── 1. Ensure H: cache structure ─────────────────────────
$hDirs = @(
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
foreach ($d in $hDirs) {
    if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null }
}

# ─── 2. Mirror Cursor project metadata C: -> H: ───────────
Write-Host "[1/5] Mirroring Cursor metadata to H:..." -ForegroundColor Yellow
$cursorProject = "$UserHome\.cursor\projects\h-FoundryOS"
$mirrorRoot = "$Root\.cursor\cursor-mirror"
if (Test-Path $cursorProject) {
    foreach ($name in @("mcps", "agent-transcripts", "terminals")) {
        $src = Join-Path $cursorProject $name
        $dst = Join-Path $mirrorRoot $name
        Mirror-IfNewer -Source $src -Dest $dst
    }
}

# ─── 3. Remove duplicate FoundryOS repos on C: ────────────
Write-Host "[2/5] Removing duplicate FoundryOS repos on C:..." -ForegroundColor Yellow
$repoDuplicates = @(
    "C:\FoundryOS",
    "C:\Users\User\FoundryOS",
    "$UserHome\FoundryOS",
    "$UserHome\projects\FoundryOS",
    "$UserHome\source\FoundryOS",
    "$UserHome\Documents\FoundryOS",
    "$UserHome\Desktop\FoundryOS",
    "$UserHome\dev\FoundryOS",
    "$UserHome\code\FoundryOS"
)
foreach ($p in $repoDuplicates) {
    if ((Test-Path $p) -and ($p -ne $Root)) {
        $mb = Get-DirSizeMb $p
        if (Send-ToRecycleBin -Path $p) {
            $recycled++
            $freedMb += $mb
            Write-Host "  Recycled repo duplicate: $p ($mb MB)" -ForegroundColor Yellow
        }
    }
}

# ─── 4. Clear npm/turbo/build caches on C: ────────────────
Write-Host "[3/5] Clearing build caches on C:..." -ForegroundColor Yellow
$cacheTargets = @(
    "$UserHome\AppData\Local\npm-cache",
    "$UserHome\.npm",
    "$UserHome\.turbo",
    "$UserHome\.cache\turbo",
    "$UserHome\AppData\Roaming\netlify",
    "$UserHome\AppData\Local\netlify",
    "$UserHome\.next",
    "$UserHome\AppData\Local\foundryos",
    "$UserHome\AppData\Local\FoundryOS"
)
foreach ($p in $cacheTargets) {
    if (Test-Path $p) {
        $mb = Get-DirSizeMb $p
        if (Send-ToRecycleBin -Path $p) {
            $recycled++
            $freedMb += $mb
            Write-Host "  Recycled cache: $p ($mb MB)" -ForegroundColor Yellow
        }
    }
}

# ─── 5. Clear temp foundry/turbo/next artifacts on C: ─────
Write-Host "[4/5] Clearing temp artifacts on C:..." -ForegroundColor Yellow
$tempDir = "$UserHome\AppData\Local\Temp"
if (Test-Path $tempDir) {
    $patterns = @("foundry*", "turbo-*", "next-*", "sandbox-*", "ps-script-*", "tsx-*", "node-*")
    foreach ($pat in $patterns) {
        Get-ChildItem $tempDir -Filter $pat -ErrorAction SilentlyContinue | ForEach-Object {
            $mb = Get-DirSizeMb $_.FullName
            if (Send-ToRecycleBin -Path $_.FullName) {
                $recycled++
                $freedMb += $mb
                Write-Host "  Recycled temp: $($_.FullName) ($mb MB)" -ForegroundColor DarkYellow
            }
        }
    }
}

# Trim old agent transcripts on C: (keep 3 newest — mirror on H:)
$transcripts = Join-Path $cursorProject "agent-transcripts"
if (Test-Path $transcripts) {
    Get-ChildItem $transcripts -Filter "*.jsonl" -ErrorAction SilentlyContinue |
        Sort-Object LastWriteTime -Descending |
        Select-Object -Skip 3 |
        ForEach-Object {
            if (Send-ToRecycleBin -Path $_.FullName) {
                $recycled++
                Write-Host "  Recycled old transcript: $($_.Name)" -ForegroundColor DarkYellow
            }
        }
}

# ─── 6. Scan for any other FoundryOS-named paths on C: ────
Write-Host "[5/5] Scanning C: for remaining FoundryOS artifacts..." -ForegroundColor Yellow
$scanRoots = @(
    "$UserHome",
    "$UserHome\AppData\Local",
    "$UserHome\AppData\Roaming",
    "C:\Users\User"
)
$found = @()
foreach ($scanRoot in $scanRoots) {
    if (-not (Test-Path $scanRoot)) { continue }
    try {
        Get-ChildItem $scanRoot -Directory -ErrorAction SilentlyContinue |
            Where-Object { $_.Name -match 'FoundryOS|foundryos|foundry-os' -and $_.FullName -notlike '*\.cursor\projects\h-FoundryOS*' } |
            ForEach-Object { $found += $_.FullName }
    } catch {}
}

foreach ($p in ($found | Select-Object -Unique)) {
    if ($p -eq $Root) { continue }
    if ($p -like "H:\*") { continue }
    $mb = Get-DirSizeMb $p
    if (Send-ToRecycleBin -Path $p) {
        $recycled++
        $freedMb += $mb
        Write-Host "  Recycled scan hit: $p ($mb MB)" -ForegroundColor Yellow
    }
}

# ─── Summary ───────────────────────────────────────────────
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " MIGRATION COMPLETE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Items recycled: $recycled"
Write-Host "  Space freed:    ~$freedMb MB"
Write-Host "  Canonical root: $Root"
Write-Host ""
Write-Host "C: drive is OFF LIMITS for FoundryOS project work." -ForegroundColor Yellow
Write-Host "Always run: .\scripts\setup-h-drive.ps1 before any command." -ForegroundColor Yellow
Write-Host ""
