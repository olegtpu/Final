# 🚀 Quick Reference Card

## 📋 Your Network Details
- **Network Name**: Private Ethereum Network
- **RPC URL**: http://172.26.232.28:8545
- **Chain ID**: 2025
- **Currency**: ETH

## 🔑 Your Account
- **Address**: `0xBa376Ed1e4A62a4b71340F09A855B8FFBe441474`
- **Private Key**: `9432a91bc810115f7f75aa9b096e12fbd1451639ec30558b0a75048fda54d8f4`
- **ETH Balance**: ~99.99 ETH
- **CTK Balance**: 1,000,000 CTK

## 📦 Contract Addresses
- **CustomToken (CTK)**: `0x4aac4cb74301C9F3239d95D4c95FA5FcEeaff2f2`
- **VendingMachine**: `0xea213740a24c44D83907D3D7E4E67eA492f1E981`

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
