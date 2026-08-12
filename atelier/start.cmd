@echo off
title Verrant Interior Studio - Atelier
cd /d "%~dp0"

echo ========================================================
echo   Starting Verrant Interior Studio (Atelier)
echo ========================================================
echo.

if not exist node_modules (
    echo [!] node_modules not found. Installing dependencies...
    call npm install
)

echo [*] Launching browser at http://localhost:3000 ...
start http://localhost:3000

echo [*] Starting Next.js development server...
echo.
call npm run dev

pause
