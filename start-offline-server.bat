@echo off
echo ====================================
echo  Sinhala SRT Generator - Offline
echo ====================================
echo.

echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)

echo Python found! Starting server...
echo.

echo Installing/updating dependencies...
pip install -r requirements.txt

echo.
echo Starting backend server...
echo.
echo ====================================
echo  Server Status:
echo  - Web Interface: Open index-offline.html in browser
echo  - Server URL: http://localhost:5000
echo  - Press Ctrl+C to stop server
echo ====================================
echo.

python backend_server.py

echo.
echo Server stopped.
pause