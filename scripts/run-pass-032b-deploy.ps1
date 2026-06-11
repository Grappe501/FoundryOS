$ErrorActionPreference = 'Continue'
Set-Location H:\FoundryOS
.\scripts\setup-h-drive.ps1 | Out-Null
node scripts/enforce-h-drive.js | Out-Null

$log = 'H:\FoundryOS\pass-032b-deploy.log'
Remove-Item $log -ErrorAction SilentlyContinue

function Log($msg) { Add-Content $log $msg; Write-Host $msg }

Log "=== DISK ==="
Log (fsutil volume diskfree H: 2>&1 | Out-String)

foreach ($p in @('apps\platform\.next', '.cache\turbo', '.cache\build', '.cache\netlify', '.cache\temp')) {
  $full = Join-Path H:\FoundryOS $p
  if (Test-Path $full) { Remove-Item -Recurse -Force $full -ErrorAction SilentlyContinue }
}
@('.cache\turbo', '.cache\build', '.cache\temp') | ForEach-Object { New-Item -ItemType Directory -Force (Join-Path H:\FoundryOS $_) | Out-Null }

Log "=== AUDIT EXPERIENCE ==="
npm run audit:experience 2>&1 | ForEach-Object { Log $_ }
$auditExp = $LASTEXITCODE

Log "=== SANDBOX ==="
npm run sandbox 2>&1 | ForEach-Object { Log $_ }
$sandbox = $LASTEXITCODE

if ($sandbox -eq 0) {
  git add -A 2>&1 | ForEach-Object { Log $_ }
  git commit -m "feat(PASS-032B): deepen world experience and emotional UX" -m "Premium world heroes, immersion tool routes, Mission 1 guides, audit:experience, Grassroots and Nonprofits incoming world." 2>&1 | ForEach-Object { Log $_ }
  git push origin main 2>&1 | ForEach-Object { Log $_ }
  npx netlify deploy --build --prod 2>&1 | ForEach-Object { Log $_ }
}

Log "audit:experience=$auditExp sandbox=$sandbox"
