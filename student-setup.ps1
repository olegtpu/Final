# Student Project Setup Script
# Run this script to quickly set up the Vending Machine DApp

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$false)]
    [string]$ProjectPath = "C:\blockchain-projects"
)

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  Vending Machine DApp - Student Setup" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Create project directory if it doesn't exist
if (!(Test-Path $ProjectPath)) {
    Write-Host "Creating project directory: $ProjectPath" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $ProjectPath -Force | Out-Null
}

Set-Location $ProjectPath

# Clone the repository
$repoUrl = "https://github.com/$GitHubUsername/vending-machine-dapp.git"
Write-Host "Cloning repository from: $repoUrl" -ForegroundColor Yellow

try {
    git clone $repoUrl
    Set-Location "vending-machine-dapp"
} catch {
    Write-Host "✗ Error cloning repository. Please check:" -ForegroundColor Red
    Write-Host "  - GitHub username is correct" -ForegroundColor Red
    Write-Host "  - Repository exists and is public" -ForegroundColor Red
    Write-Host "  - Git is installed" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Repository cloned successfully!" -ForegroundColor Green

# Install dependencies
Write-Host ""
Write-Host "Installing Node.js dependencies..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "✓ Dependencies installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "✗ Error installing dependencies. Make sure Node.js is installed." -ForegroundColor Red
    exit 1
}

# Check if private network is running
Write-Host ""
Write-Host "Checking network connection..." -ForegroundColor Yellow
npm run check-network

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "         Setup Complete! 🎉" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Read SIMPLE_SETUP.md for detailed instructions" -ForegroundColor White
Write-Host "2. Start your private Ethereum network" -ForegroundColor White
Write-Host "3. Run: npm run compile" -ForegroundColor Magenta
Write-Host "4. Run: node debug-deploy.js" -ForegroundColor Magenta
Write-Host "5. Run: npm run dev" -ForegroundColor Magenta
Write-Host ""
Write-Host "Project location: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

Read-Host "Press Enter to open the project folder"
Invoke-Item .
