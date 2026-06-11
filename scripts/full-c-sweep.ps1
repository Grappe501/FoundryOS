# FoundryOS — Full C: sweep
# 1. Mirror C: artifacts to H: (canonical mirror)
# 2. Delete C: duplicates already present on H:
# 3. Migrate then delete everything else FoundryOS-related on C:
# Usage: .\scripts\full-c-sweep.ps1
# Log:   H:\FoundryOS\.cache\temp\c-sweep-log.txt

$ErrorActionPreference = "Continue"
$Root = "H:\FoundryOS"
$UserHome = $env:USERPROFILE
$LogFile = "$Root\.cache\temp\c-sweep-log.txt"

# Lock ALL temp to H: before any work
$env:TMP = "$Root\.cache\temp"
$env:TEMP = "$Root\.cache\temp"
$env:TMPDIR = "$Root\.cache\temp"
$env:npm_config_cache = "$Root\.cache\npm"
$env:TURBO_CACHE_DIR = "$Root\.cache\turbo"
$env:NEXT_CACHE_DIR = "$Root\.cache\build\next"
$env:NETLIFY_CACHE_DIR = "$Root\.cache\netlify"

function Log([string]$Msg) {
    $line = "[$(Get-Date -Format 'HH:mm:ss')] $Msg"
    Write-Host $line
    Add-Content -Path $LogFile -Value $line -ErrorAction SilentlyContinue
}

if (-not (Test-Path $Root)) {
    Write-Error "H:\FoundryOS not found."
    exit 1
}

Set-Location $Root
New-Item -ItemType Directory -Path "$Root\.cache\temp" -Force | Out-Null
Set-Content -Path $LogFile -Value "=== FoundryOS C: Full Sweep $(Get-Date) ==="

Add-Type -AssemblyName Microsoft.VisualBasic

function Send-ToRecycleBin {
    param([string]$Path)
    if (-not (Test-Path $Path)) { return $false }
    try {
        if ((Get-Item $Path -Force).PSIsContainer) {
            [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteDirectory($Path, 'OnlyErrorDialogs', 'SendToRecycleBin')
        } else {
            [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile($Path, 'OnlyErrorDialogs', 'SendToRecycleBin')
        }
        return $true
    } catch {
        Log "  LOCKED: $Path"
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

function Free-Gb([string]$Drive) {
    try { return [math]::Round((Get-PSDrive -Name $Drive).Free / 1GB, 2) } catch { return -1 }
}

function Mirror-ToH {
    param([string]$Source, [string]$Dest)
    if (-not (Test-Path $Source)) { return $false }
    if (-not (Test-Path $Dest)) { New-Item -ItemType Directory -Path $Dest -Force | Out-Null }
    Copy-Item -Path $Source -Destination $Dest -Recurse -Force -ErrorAction SilentlyContinue
    Log "  Mirrored: $Source -> $Dest"
    return $true
}

function Remove-IfMirroredOnH {
    param([string]$CPath, [string]$HMirrorPath)
    if (-not (Test-Path $CPath)) { return $false }
    if (-not (Test-Path $HMirrorPath)) {
        Mirror-ToH -Source $CPath -Dest $HMirrorPath | Out-Null
    }
    if (Test-Path $HMirrorPath) {
        $mb = Get-DirSizeMb $CPath
        if (Send-ToRecycleBin -Path $CPath) {
            Log "  Deleted C: duplicate ($mb MB): $CPath"
            return $true
        }
    }
    return $false
}

$recycled = 0
$freedMb = 0

Log ""
Log "========================================"
Log " FOUNDRYOS FULL C: SWEEP"
Log "========================================"
Log "C: before: $(Free-Gb 'C') GB free | H: before: $(Free-Gb 'H') GB free"
Log ""

# Ensure H: structure
$hDirs = @(
    "$Root\.cache\npm", "$Root\.cache\npm-store", "$Root\.cache\temp",
    "$Root\.cache\build", "$Root\.cache\build\next", "$Root\.cache\turbo",
    "$Root\.cache\supabase", "$Root\.cache\netlify", "$Root\.cache\netlify\config",
    "$Root\.cache\cursor-mirror", "$Root\.cursor\cursor-mirror"
)
foreach ($d in $hDirs) {
    if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null }
}

& "$Root\scripts\setup-h-drive.ps1" | Out-Null

# ─── PHASE 1: Mirror Cursor project metadata C: -> H: ───────
Log "[1/8] Mirror Cursor metadata..."
$cursorProject = "$UserHome\.cursor\projects\h-FoundryOS"
$mirrorRoot = "$Root\.cursor\cursor-mirror"
foreach ($name in @("mcps", "agent-transcripts", "terminals", "agent-tools")) {
    $src = Join-Path $cursorProject $name
    $dst = Join-Path $mirrorRoot $name
    if (Test-Path $src) { Mirror-ToH -Source $src -Dest $dst | Out-Null }
}

# ─── PHASE 2: Mirror Netlify CLI config C: -> H: ────────────
Log "[2/8] Mirror Netlify config..."
$netlifyRoaming = "$UserHome\AppData\Roaming\netlify"
if (Test-Path $netlifyRoaming) {
    Mirror-ToH -Source $netlifyRoaming -Dest "$Root\.cache\netlify\config-roaming" | Out-Null
}

# ─── PHASE 3: Delete duplicate repos on C: ───────────────────
Log "[3/8] Remove duplicate FoundryOS repos on C:..."
$repoDuplicates = @(
    "C:\FoundryOS", "C:\Users\User\FoundryOS",
    "$UserHome\FoundryOS", "$UserHome\projects\FoundryOS",
    "$UserHome\source\FoundryOS", "$UserHome\Documents\FoundryOS",
    "$UserHome\Desktop\FoundryOS", "$UserHome\dev\FoundryOS",
    "$UserHome\code\FoundryOS", "$UserHome\repos\FoundryOS",
    "$UserHome\workspace\FoundryOS", "$UserHome\git\FoundryOS"
)
foreach ($p in $repoDuplicates) {
    if ((Test-Path $p) -and ($p -ne $Root)) {
        $mb = Get-DirSizeMb $p
        if (Send-ToRecycleBin -Path $p) {
            $recycled++; $freedMb += $mb
            Log "  Recycled repo: $p ($mb MB)"
        }
    }
}

# ─── PHASE 4: Delete build caches on C: (H: is canonical) ───
Log "[4/8] Remove npm/turbo/next/netlify caches on C:..."
$cacheTargets = @(
    "$UserHome\AppData\Local\npm-cache",
    "$UserHome\.npm", "$UserHome\.npmrc.bak",
    "$UserHome\.turbo", "$UserHome\.cache\turbo",
    "$UserHome\AppData\Roaming\netlify",
    "$UserHome\AppData\Local\netlify",
    "$UserHome\.next", "$UserHome\AppData\Local\foundryos",
    "$UserHome\AppData\Local\FoundryOS",
    "$UserHome\AppData\Local\Temp\foundryos",
    "$UserHome\AppData\Roaming\foundryos",
    "$UserHome\AppData\Roaming\FoundryOS"
)
foreach ($p in $cacheTargets) {
    if (Test-Path $p) {
        $mb = Get-DirSizeMb $p
        if (Send-ToRecycleBin -Path $p) {
            $recycled++; $freedMb += $mb
            Log "  Recycled cache: $p ($mb MB)"
        }
    }
}

# ─── PHASE 5: Delete Cursor C: duplicates (mirrored on H:) ──
Log "[5/8] Remove mirrored Cursor artifacts on C:..."
$cursorDeleteAfterMirror = @(
    (Join-Path $cursorProject "agent-tools"),
    (Join-Path $cursorProject "terminals")
)
foreach ($p in $cursorDeleteAfterMirror) {
    if (Test-Path $p) {
        Get-ChildItem $p -Recurse -Force -ErrorAction SilentlyContinue | ForEach-Object {
            $mb = if ($_.PSIsContainer) { Get-DirSizeMb $_.FullName } else { [math]::Round($_.Length / 1MB, 2) }
            if (Send-ToRecycleBin -Path $_.FullName) {
                $recycled++; $freedMb += $mb
                Log "  Recycled cursor: $($_.FullName)"
            }
        }
    }
}

# Trim old agent transcripts on C: (keep 2 newest — full set on H: mirror)
$transcripts = Join-Path $cursorProject "agent-transcripts"
if (Test-Path $transcripts) {
    Get-ChildItem $transcripts -Recurse -Filter "*.jsonl" -ErrorAction SilentlyContinue |
        Sort-Object LastWriteTime -Descending |
        Select-Object -Skip 2 |
        ForEach-Object {
            if (Send-ToRecycleBin -Path $_.FullName) {
                $recycled++
                Log "  Recycled old transcript: $($_.FullName)"
            }
        }
}

# ─── PHASE 6: Temp sweep on C: ──────────────────────────────
Log "[6/8] Temp artifact sweep on C:..."
$tempDir = "$UserHome\AppData\Local\Temp"
if (Test-Path $tempDir) {
    $patterns = @(
        "foundry*", "Foundry*", "turbo-*", "next-*", "sandbox-*",
        "ps-script-*", "ps-state-out-*", "tsx-*", "node-*",
        "npm-*", "vite-*", "eslint-*"
    )
    foreach ($pat in $patterns) {
        Get-ChildItem $tempDir -Filter $pat -ErrorAction SilentlyContinue | ForEach-Object {
            $mb = Get-DirSizeMb $_.FullName
            if (Send-ToRecycleBin -Path $_.FullName) {
                $recycled++; $freedMb += $mb
                Log "  Recycled temp: $($_.Name) ($mb MB)"
            }
        }
    }
}

# ─── PHASE 7: Deep scan C:\Users\User for FoundryOS dirs ────
Log "[7/8] Deep scan for FoundryOS-named paths..."
$scanRoots = @(
    "$UserHome", "$UserHome\AppData\Local", "$UserHome\AppData\Roaming",
    "$UserHome\AppData\Local\Temp", "$UserHome\Downloads", "C:\Users\User"
)
$found = [System.Collections.Generic.HashSet[string]]::new()
foreach ($scanRoot in $scanRoots) {
    if (-not (Test-Path $scanRoot)) { continue }
    try {
        Get-ChildItem $scanRoot -Directory -ErrorAction SilentlyContinue |
            Where-Object {
                $_.FullName -match 'FoundryOS|foundryos|foundry-os' -and
                $_.FullName -notlike '*\.cursor\projects\h-FoundryOS*' -and
                $_.FullName -notlike 'H:\*'
            } |
            ForEach-Object { [void]$found.Add($_.FullName) }
    } catch {}
}

foreach ($p in $found) {
    $mb = Get-DirSizeMb $p
    if (Send-ToRecycleBin -Path $p) {
        $recycled++; $freedMb += $mb
        Log "  Recycled scan hit: $p ($mb MB)"
    }
}

# ─── PHASE 8: node_modules / .next on C: (not under H:) ─────
Log "[8/8] Scan for stray node_modules/.next on C: user profile..."
$heavyScan = @("$UserHome\Desktop", "$UserHome\Documents", "$UserHome\Downloads", "$UserHome\dev", "$UserHome\code")
foreach ($base in $heavyScan) {
    if (-not (Test-Path $base)) { continue }
    Get-ChildItem $base -Directory -Recurse -Depth 3 -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -in @('node_modules', '.next', '.turbo') -and $_.FullName -notlike 'H:\*' } |
        ForEach-Object {
            $parent = Split-Path $_.FullName -Parent
            if ($parent -match 'FoundryOS|foundryos|foundry-os') {
                $mb = Get-DirSizeMb $_.FullName
                if (Send-ToRecycleBin -Path $_.FullName) {
                    $recycled++; $freedMb += $mb
                    Log "  Recycled stray build: $($_.FullName) ($mb MB)"
                }
            }
        }
}

Log ""
Log "========================================"
Log " SWEEP COMPLETE"
Log "========================================"
Log "  Items recycled: $recycled"
Log "  Space freed:    ~$freedMb MB"
Log "  C: after:       $(Free-Gb 'C') GB free"
Log "  H: after:       $(Free-Gb 'H') GB free"
Log "  Canonical root: $Root"
Log "  Log file:       $LogFile"
Log ""

# Run verification
& "$Root\scripts\verify-c-drive-clean.ps1" *>> $LogFile
