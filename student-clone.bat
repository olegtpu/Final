@echo off
echo.
echo =========================================
echo   Student Setup - Vending Machine DApp
echo =========================================
echo.
echo This will download and set up the project from:
echo https://github.com/Zakwan-Khalit/vending-machine-dapp
echo.

REM Create project directory
if not exist "C:\blockchain-projects" (
    echo Creating project directory...
    mkdir "C:\blockchain-projects"
)

cd /d "C:\blockchain-projects"

echo Cloning repository...
git clone https://github.com/Zakwan-Khalit/vending-machine-dapp.git

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to clone repository!
    echo Make sure Git is installed and you have internet connection.
    pause
    exit /b 1
)

cd vending-machine-dapp

echo.
echo Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies!
    echo Make sure Node.js is installed.
    pause
    exit /b 1
)

echo.
echo =========================================
echo        Setup Complete! 🎉
echo =========================================
echo.
echo Next steps:
echo 1. Read SIMPLE_SETUP.md for detailed instructions
echo 2. Make sure your private Ethereum network is running
echo 3. Run: npm run compile
echo 4. Run: node debug-deploy.js
echo 5. Run: npm run dev
echo.
echo Project location: %CD%
echo.

pause
start .
