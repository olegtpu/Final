@echo off
echo.
echo 🧃 Vending Machine DApp Setup
echo ==============================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed

echo.
echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed

echo.
echo Compiling contracts...
call node compile.js

if %errorlevel% neq 0 (
    echo ❌ Failed to compile contracts
    pause
    exit /b 1
)

echo ✅ Contracts compiled

echo.
echo 🚀 Ready to deploy!
echo Please make sure your private Ethereum network is running.
echo.
call node quick-deploy.js

echo.
echo 🎉 Setup complete! Run 'npm run dev' to start the DApp
pause
