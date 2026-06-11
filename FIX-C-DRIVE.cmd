@echo off
title FoundryOS — Full C: Drive Sweep
H:
cd /d H:\FoundryOS
set TMP=H:\FoundryOS\.cache\temp
set TEMP=H:\FoundryOS\.cache\temp
set TURBO_CACHE_DIR=H:\FoundryOS\.cache\turbo
set npm_config_cache=H:\FoundryOS\.cache\npm
set NEXT_CACHE_DIR=H:\FoundryOS\.cache\build\next
echo.
echo ========================================
echo  FOUNDRYOS FULL C: SWEEP
echo  Mirror to H: -^> delete duplicates on C:
echo  Log: H:\FoundryOS\.cache\temp\c-sweep-log.txt
echo ========================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\full-c-sweep.ps1"
echo.
echo Open log: H:\FoundryOS\.cache\temp\c-sweep-log.txt
echo.
pause
