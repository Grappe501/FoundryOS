# FoundryOS — Emergency C: cleanup when disk is full
# MUST run from H:\FoundryOS. Redirects temp to H: before touching anything.
# Usage: .\scripts\emergency-c-cleanup.ps1

$ErrorActionPreference = "Continue"
$Root = "H:\FoundryOS"
$UserHome = $env:USERPROFILE

if (-not (Test-Path $Root)) {
    Write-Error "H:\FoundryOS not found."
    exit 1
}

Set-Location $Root

# Lock temp to H: FIRST — never write to C: during this script
$env:TMP = "$Root\.cache\temp"
$env:TEMP = "$Root\.cache\temp"
$env:TMPDIR = "$Root\.cache\temp"
$env:npm_config_cache = "$Root\.cache\npm"
$env:TURBO_CACHE_DIR = "$Root\.cache\turbo"

foreach ($d in @("$Root\.cache\temp", "$Root\.cache\npm", "$Root\.cache\turbo", "$Root\.cache\build")) {
    if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null }
}

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
        Write-Host "  LOCKED: $Path" -ForegroundColor DarkGray
        return $false
    }
}

function Free-Gb([string]$Drive) {
    try {
        $free = (Get-PSDrive -Name $Drive -ErrorAction Stop).Free
        return [math]::Round($free / 1GB, 2)
    } catch { return -1 }
}

Write-Host ""
Write-Host "EMERGENCY C: CLEANUP — FoundryOS" -ForegroundColor Red
Write-Host "C: before: $(Free-Gb 'C') GB free"
Write-Host "H: before: $(Free-Gb 'H') GB free"
Write-Host ""

$recycled = 0

# 1. Full migration (repos, npm cache, turbo, netlify on C:)
& "$Root\scripts\full-c-drive-migration.ps1"

# 2. Cursor agent-tools logs (large typecheck dumps land here)
$agentTools = "$UserHome\.cursor\projects\h-FoundryOS\agent-tools"
if (Test-Path $agentTools) {
    Get-ChildItem $agentTools -File -ErrorAction SilentlyContinue | ForEach-Object {
        if (Send-ToRecycleBin -Path $_.FullName) {
            $recycled++
            Write-Host "  Recycled agent log: $($_.Name)" -ForegroundColor Yellow
        }
    }
}

# 3. Cursor ps-script temp files from this project
$tempDir = "$UserHome\AppData\Local\Temp"
if (Test-Path $tempDir) {
    foreach ($pat in @("ps-script-*", "ps-state-out-*", "turbo-*", "next-*", "foundry*", "tsx-*", "node-*")) {
        Get-ChildItem $tempDir -Filter $pat -ErrorAction SilentlyContinue | ForEach-Object {
            if (Send-ToRecycleBin -Path $_.FullName) {
                $recycled++
                Write-Host "  Recycled temp: $($_.Name)" -ForegroundColor DarkYellow
            }
        }
    }
}

# 4. Old terminal logs on C: (mirror path exists on H:)
$terminals = "$UserHome\.cursor\projects\h-FoundryOS\terminals"
if (Test-Path $terminals) {
    Get-ChildItem $terminals -Filter "*.txt" -ErrorAction SilentlyContinue |
        Sort-Object LastWriteTime -Descending |
        Select-Object -Skip 5 |
        ForEach-Object {
            if (Send-ToRecycleBin -Path $_.FullName) {
                $recycled++
                Write-Host "  Recycled old terminal: $($_.Name)" -ForegroundColor DarkYellow
            }
        }
}

Write-Host ""
Write-Host "Extra items recycled: $recycled"
Write-Host "C: after:  $(Free-Gb 'C') GB free"
Write-Host "H: after:  $(Free-Gb 'H') GB free"
Write-Host ""
Write-Host "Next: .\scripts\setup-h-drive.ps1  then  npm run verify:c-clean"
Write-Host ""
