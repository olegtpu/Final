@echo off
echo.
echo ========================================
echo    Vending Machine DApp - Git Setup
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from: https://git-scm.com/
    pause
    exit /b 1
)

echo Initializing Git repository...
git init

echo.
echo Adding all files to staging area...
git add .

echo.
echo Creating initial commit...
git commit -m "Initial commit: Vending Machine DApp with educational materials"

echo.
echo ========================================
echo Git repository initialized successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Create a new repository on GitHub.com
echo 2. Copy your repository URL
echo 3. Run these commands:
echo.
echo git remote add origin https://github.com/YOURUSERNAME/vending-machine-dapp.git
echo git branch -M main
echo git push -u origin main
echo.
echo (Replace YOURUSERNAME with your actual GitHub username)
echo.
echo For detailed instructions, see GITHUB_SETUP.md
echo.
pause
