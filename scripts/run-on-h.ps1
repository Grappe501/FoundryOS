# Run any command with H: drive env enforced
# Usage: .\scripts\run-on-h.ps1 npm run build

param(
    [Parameter(Mandatory = $true, ValueFromRemainingArguments = $true)]
    [string[]]$Command
)

$ErrorActionPreference = "Stop"
& "$PSScriptRoot\setup-h-drive.ps1"
node "$PSScriptRoot\enforce-h-drive.js"
& @Command
