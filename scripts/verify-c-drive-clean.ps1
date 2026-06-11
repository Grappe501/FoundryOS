# Verify no FoundryOS project artifacts remain on C:
$UserHome = $env:USERPROFILE
$checks = @(
    @{ Path = "C:\FoundryOS"; Required = $false },
    @{ Path = "$UserHome\FoundryOS"; Required = $false },
    @{ Path = "$UserHome\Desktop\FoundryOS"; Required = $false },
    @{ Path = "$UserHome\AppData\Local\npm-cache"; Required = $false },
    @{ Path = "$UserHome\.turbo"; Required = $false },
    @{ Path = "$UserHome\AppData\Roaming\netlify"; Required = $false },
    @{ Path = "H:\FoundryOS"; Required = $true },
    @{ Path = "H:\FoundryOS\.cache\npm"; Required = $true },
    @{ Path = "H:\FoundryOS\.cursor\cursor-mirror"; Required = $true }
)

Write-Host "FoundryOS C: Drive Verification" -ForegroundColor Cyan
$issues = 0
foreach ($c in $checks) {
    $exists = Test-Path $c.Path
    if ($c.Required -and -not $exists) {
        Write-Host "  MISSING (required): $($c.Path)" -ForegroundColor Red
        $issues++
    } elseif (-not $c.Required -and $exists) {
        Write-Host "  STILL ON C: $($c.Path)" -ForegroundColor Yellow
        $issues++
    } elseif ($c.Required) {
        Write-Host "  OK: $($c.Path)" -ForegroundColor Green
    } else {
        Write-Host "  CLEAN: $($c.Path)" -ForegroundColor Green
    }
}

if ($issues -eq 0) {
    Write-Host "`nAll checks passed." -ForegroundColor Green
    exit 0
} else {
    Write-Host "`n$issues issue(s) found. Run full-c-drive-migration.ps1" -ForegroundColor Yellow
    exit 1
}
