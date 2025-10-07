# 🚀 Quick Reference Card

## 📋 Hardhat Network Details
- **Network Name**: Private Ethereum Network
- **RPC URL**: http://127.0.0.1:8545
- **Chain ID**: 31337
- **Currency**: HETH

## 🔑 Your Account
- **Address**: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- **Private Key**: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
- **HETH Balance**: 10000 HETH

## 📦 Contract Addresses
- **CustomToken (HETH)**: ``
- **VendingMachine**: ``

## 🛠 Quick Commands
```bash
# Check network status
npm run check-network

# Start the DApp
npx http-server . -p 8080 -o

# Recompile contracts
npm run compile

# Redeploy contracts
node debug-deploy.js
```

## 🦊 MetaMask Setup Checklist
- [ ] Install MetaMask extension
- [ ] Add Private Ethereum Network
- [ ] Import account with private key
- [ ] Add CTK token (address above)
- [ ] Switch to Private Ethereum Network

## 🎯 Testing Steps
1. Start the DApp server
2. Open http://localhost:8080
3. Connect MetaMask
4. Add items (as owner)
5. Buy items
6. Check purchase history

## 🆘 Emergency Commands
```bash
# If stuck, restart everything:
1. Close browser
2. Ctrl+C in terminal
3. npm run check-network
4. npx http-server . -p 8080 -o
5. Refresh MetaMask
```

## 📱 DApp URL
**Local**: http://localhost:8080

---
*Keep this card handy while learning! 📚*
