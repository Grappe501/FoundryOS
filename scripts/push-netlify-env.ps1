# Push Supabase + platform env vars to Netlify (foundry-os)
# Requires: netlify login (or NETLIFY_AUTH_TOKEN in environment)
# Usage: .\scripts\push-netlify-env.ps1 [-TriggerDeploy]

param(
    [switch]$TriggerDeploy,
    [string]$SiteName = "foundry-os"
)

$ErrorActionPreference = "Stop"
$Root = "H:\FoundryOS"
Set-Location $Root
. "$Root\scripts\setup-h-drive.ps1" | Out-Null

$envFile = Join-Path $Root ".env.local"
if (-not (Test-Path $envFile)) {
    Write-Error ".env.local missing — copy from .env.example and fill Supabase keys."
}

function Get-EnvValue([string]$Key) {
    $line = Get-Content $envFile | Where-Object { $_ -match "^\s*$Key=" } | Select-Object -First 1
    if (-not $line) { return $null }
    return ($line -split "=", 2)[1].Trim()
}

$required = @(
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "NEXT_PUBLIC_PLATFORM_NAME",
    "NEXT_PUBLIC_APP_URL"
)

$values = @{}
foreach ($key in $required) {
    $val = Get-EnvValue $key
    if (-not $val -or $val -match "your-") {
        Write-Error "Missing or placeholder value for $key in .env.local"
    }
    $values[$key] = $val
}

if ($values["NEXT_PUBLIC_APP_URL"] -notmatch "netlify\.app") {
    Write-Warning "NEXT_PUBLIC_APP_URL is not a Netlify URL: $($values['NEXT_PUBLIC_APP_URL'])"
}

Write-Host "Linking Netlify site: $SiteName" -ForegroundColor Cyan
npx netlify link --name $SiteName 2>&1 | Out-Host

foreach ($key in $required) {
    Write-Host "Setting $key (all contexts)..." -ForegroundColor DarkGray
    npx netlify env:set $key $values[$key] --context production,deploy-preview,branch-deploy 2>&1 | Out-Host
}

Write-Host ""
Write-Host "Netlify env vars pushed for $SiteName" -ForegroundColor Green
Write-Host "  NEXT_PUBLIC_APP_URL = $($values['NEXT_PUBLIC_APP_URL'])"

if ($TriggerDeploy) {
    Write-Host "Triggering production deploy..." -ForegroundColor Cyan
    npx netlify deploy --build --prod 2>&1 | Out-Host
} else {
    Write-Host "Redeploy: Netlify UI -> Deploys -> Trigger deploy, or re-run with -TriggerDeploy"
}
