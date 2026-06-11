# Report Cursor IDE storage on C: (cannot move — IDE shell only)
$cursorRoot = "$env:USERPROFILE\.cursor"
if (-not (Test-Path $cursorRoot)) {
    Write-Host "No .cursor folder on C:"
    exit 0
}

$total = (Get-ChildItem $cursorRoot -Recurse -Force -ErrorAction SilentlyContinue |
    Measure-Object -Property Length -Sum).Sum
Write-Host "Cursor IDE on C: $([math]::Round($total / 1GB, 2)) GB total"
Write-Host "(IDE shell only - project lives on H:\FoundryOS)"
Write-Host ""

Get-ChildItem $cursorRoot -Directory -ErrorAction SilentlyContinue | ForEach-Object {
    $size = (Get-ChildItem $_.FullName -Recurse -Force -ErrorAction SilentlyContinue |
        Measure-Object -Property Length -Sum).Sum
    if ($size -gt 5MB) {
        Write-Host ("  {0}: {1} MB" -f $_.Name, [math]::Round($size / 1MB, 1))
    }
}
