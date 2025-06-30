# GitHub Setup Guide 🚀

This guide will help you push your vending machine DApp to GitHub in just a few steps!

## Prerequisites ✅

1. **GitHub Account**: Create one at [github.com](https://github.com) if you don't have one
2. **Git Installed**: Check by running `git --version` in your terminal
3. **GitHub Authentication**: Set up either:
   - Personal Access Token (recommended)
   - SSH keys
   - GitHub CLI

## Method 1: Using VS Code (Easiest) 🎯

### Step 1: Initialize Git Repository
1. Open VS Code in your project folder
2. Press `Ctrl+Shift+P` to open Command Palette
3. Type "Git: Initialize Repository" and select it
4. Choose your project folder if prompted

### Step 2: Stage and Commit Files
1. Click the **Source Control** icon in the sidebar (or press `Ctrl+Shift+G`)
2. You'll see all your files listed under "Changes"
3. Click the **+** button next to "Changes" to stage all files
4. Type a commit message like: `Initial commit: Vending Machine DApp with educational materials`
5. Click the **✓ Commit** button

### Step 3: Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click the **+** button (top right) → **New repository**
3. Repository name: `vending-machine-dapp`
4. Description: `Educational Ethereum Vending Machine DApp for students`
5. Keep it **Public** (so students can access it)
6. **DON'T** initialize with README (you already have one)
7. Click **Create repository**

### Step 4: Connect and Push
1. Copy the repository URL from GitHub (should look like: `https://github.com/yourusername/vending-machine-dapp.git`)
2. In VS Code, press `Ctrl+Shift+P`
3. Type "Git: Add Remote" and select it
4. Enter `origin` as the remote name
5. Paste your repository URL
6. Press `Ctrl+Shift+P` again
7. Type "Git: Push" and select it
8. Choose `origin` as the remote
9. Choose `main` as the branch

## Method 2: Using Terminal Commands 💻

### Step 1: Navigate to Your Project
```powershell
cd "C:\Users\User\Desktop\Blockchain_hands_on\vending-machine-dapp"
```

### Step 2: Initialize Git and Make First Commit
```powershell
git init
git add .
git commit -m "Initial commit: Vending Machine DApp with educational materials"
```

### Step 3: Create GitHub Repository
- Follow Step 3 from Method 1 above

### Step 4: Connect and Push
```powershell
# Replace 'yourusername' with your actual GitHub username
git remote add origin https://github.com/yourusername/vending-machine-dapp.git
git branch -M main
git push -u origin main
```

## Authentication Setup 🔐

### Option A: Personal Access Token (Recommended)
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Vending Machine DApp"
4. Select scopes: `repo`, `workflow`
5. Click "Generate token"
6. **SAVE THE TOKEN** - you'll use it as your password when Git asks

### Option B: GitHub CLI (Alternative)
```powershell
# Install GitHub CLI first: https://cli.github.com/
gh auth login
# Follow the prompts to authenticate
```

## Troubleshooting 🔧

### Problem: "Remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/yourusername/vending-machine-dapp.git
```

### Problem: Authentication failed
- Make sure you're using your Personal Access Token as the password
- Check your username is correct

### Problem: "Updates were rejected"
```powershell
git pull origin main --allow-unrelated-histories
git push origin main
```

## Updating Your Repository 🔄

After making changes to your code:

### VS Code Method:
1. Open Source Control panel (`Ctrl+Shift+G`)
2. Stage changed files (click **+** next to them)
3. Write commit message
4. Click **✓ Commit**
5. Click **↑** Push button

### Terminal Method:
```powershell
git add .
git commit -m "Description of your changes"
git push origin main
```

## Sharing with Students 📚

Once your repository is on GitHub:

1. **Share the Repository URL**: `https://github.com/yourusername/vending-machine-dapp`
2. **Students can clone it**:
   ```bash
   git clone https://github.com/yourusername/vending-machine-dapp.git
   cd vending-machine-dapp
   npm install
   ```
3. **Or download as ZIP**: Click the green "Code" button → "Download ZIP"

## Repository Features to Enable 🎨

### For Educational Use:
1. **Enable Issues**: Settings → Features → Issues ✓
2. **Enable Discussions**: Settings → Features → Discussions ✓
3. **Add Topics**: About section → Topics: `blockchain`, `ethereum`, `education`, `dapp`, `solidity`
4. **Create Releases**: For different versions/iterations

### Repository Description:
```
Educational Ethereum Vending Machine DApp for learning blockchain development. Complete with smart contracts, frontend, and comprehensive student guides.
```

## Next Steps 🎯

1. ✅ Push your code to GitHub
2. ✅ Share the repository URL with students
3. ✅ Enable Issues for student questions
4. ✅ Consider creating a Wiki for additional documentation
5. ✅ Tag releases for different course modules

---

**Need Help?** 
- Check the TROUBLESHOOT.md file
- Open an Issue on the repository
- Contact your instructor

Happy coding! 🚀
