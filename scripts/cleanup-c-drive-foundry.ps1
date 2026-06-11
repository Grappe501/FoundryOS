# FoundryOS — Remove project artifacts from C: drive (sends to Recycle Bin)
# Delegates to full-c-drive-migration.ps1 for comprehensive cleanup
# Usage: .\scripts\cleanup-c-drive-foundry.ps1

$Root = "H:\FoundryOS"
& "$Root\scripts\full-c-drive-migration.ps1"
