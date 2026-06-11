# FoundryOS — END OF PASS (run EVERY pass, no Steve approval needed)
# Usage: .\scripts\end-of-pass.ps1 -PassCode "PASS-005" -PassTitle "vertical resolution engine"
param(
    [Parameter(Mandatory = $true)]
    [string]$PassCode,
    [Parameter(Mandatory = $true)]
    [string]$PassTitle
)

$ErrorActionPreference = "Stop"
$Root = "H:\FoundryOS"
Set-Location $Root

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host " END OF PASS: $PassCode" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# 0. H: lock
& "$Root\scripts\setup-h-drive.ps1"
node "$Root\scripts\enforce-h-drive.js"

# 1. Preflight
Write-Host "`n[1/5] Preflight..." -ForegroundColor Yellow
npm run preflight
if ($LASTEXITCODE -ne 0) { throw "Preflight failed" }

# 2. Architecture compliance reminder
Write-Host "`nGate: Architecture Compliance (not human permission)" -ForegroundColor DarkCyan

# 3. Netlify sandbox
Write-Host "`n[2/6] Netlify sandbox..." -ForegroundColor Yellow
node "$Root\scripts\sandbox-netlify.js"
if ($LASTEXITCODE -ne 0) { throw "Sandbox failed — fix before deploy" }

# 4. C: cleanup (maintenance)
Write-Host "`n[3/6] C: cleanup..." -ForegroundColor Yellow
& "$Root\scripts\cleanup-c-drive-foundry.ps1"

# 5. Commit + push
Write-Host "`n[4/6] Commit + push..." -ForegroundColor Yellow
git add -A
$msg = "feat($PassCode): $PassTitle"
git commit -m $msg -m "End-of-pass: sandbox passed, Netlify-ready"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Nothing to commit or commit failed" -ForegroundColor DarkYellow
}

git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "Push failed — running recovery..." -ForegroundColor Yellow
    git gc --prune=now
    git push origin main
}

$hash = git log -1 --format="%h"
Write-Host "Pushed: $hash" -ForegroundColor Green

# 6. Netlify + verification
Write-Host "`n[5/6] Netlify deploy" -ForegroundColor Yellow
Write-Host @"

NETLIFY DEPLOY (pick one):

A) Auto-deploy (if GitHub connected to Netlify):
   - Push to main already triggered build
   - Check: https://app.netlify.com → your site → Deploys

B) Manual CLI:
   cd H:\FoundryOS
   .\scripts\setup-h-drive.ps1
   npx netlify deploy --build --prod

C) First-time setup:
   - Netlify → Add site → Import from GitHub → Grappe501/FoundryOS
   - Build command: npm ci && npm run build:platform
   - Publish: apps/platform/.next
   - Env vars: see docs/NETLIFY_ENV_CHECKLIST.md

Verify after deploy (step 6):
   - https://foundryos.com (or preview URL)
   - /api/health/db
   - /routing
   - /operations
   - PASS report with Architecture Impact in BUILD_LOG.md

"@ -ForegroundColor Cyan

Write-Host "END OF PASS COMPLETE: $PassCode ($hash)`n" -ForegroundColor Green
