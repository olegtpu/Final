# Vending Machine DApp - Git Setup Script
# This script initializes a Git repository and prepares for GitHub upload

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Vending Machine DApp - Git Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✓ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Initializing Git repository..." -ForegroundColor Yellow
git init

Write-Host ""
Write-Host "Adding all files to staging area..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Vending Machine DApp with educational materials"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Git repository initialized successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Create a new repository on GitHub.com" -ForegroundColor White
Write-Host "2. Copy your repository URL" -ForegroundColor White
Write-Host "3. Run these commands:" -ForegroundColor White
Write-Host ""
Write-Host "git remote add origin https://github.com/YOURUSERNAME/vending-machine-dapp.git" -ForegroundColor Magenta
Write-Host "git branch -M main" -ForegroundColor Magenta
Write-Host "git push -u origin main" -ForegroundColor Magenta
Write-Host ""
Write-Host "(Replace YOURUSERNAME with your actual GitHub username)" -ForegroundColor Yellow
Write-Host ""
Write-Host "For detailed instructions, see GITHUB_SETUP.md" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to continue"
