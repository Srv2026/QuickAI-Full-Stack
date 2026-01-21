@echo off
echo Starting QuickAI Full-Stack Application...
echo.

echo Starting Server...
start "QuickAI Server" cmd /k "cd server && npm run server"

timeout /t 3 /nobreak > nul

echo Starting Client...
start "QuickAI Client" cmd /k "cd client && npm run dev"

echo.
echo Servers are starting...
echo Server: http://localhost:3000
echo Client: http://localhost:5173
echo.
echo Press any key to exit this window (servers will continue running)...
pause > nul

