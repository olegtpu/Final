# 🚀 Complete Setup Guide - Vending Machine DApp

## 📋 What You Need
- Chrome or Firefox browser
- Node.js installed
- VS Code (optional but recommended)
- Internet connection

---

## Step 1: Download and Setup Project

### Option A: Download from GitHub (if available)
```bash
git clone [YOUR_REPOSITORY_URL]
cd vending-machine-dapp
```

### Option B: Create Project from Scratch
1. **Create project folder**:
   ```bash
   mkdir vending-machine-dapp
   cd vending-machine-dapp
   ```

2. **Download all project files** (provided by instructor)

3. **Install dependencies**:
   ```bash
   npm install
   ```

---

## Step 2: Install MetaMask
1. Go to [metamask.io](https://metamask.io)
2. Click "Download" and add to your browser
3. Create a new wallet (save your seed phrase safely!)
4. Complete the setup

---

## Step 3: Setup Your Private Network

### Check if your network is running:
```bash
npm run check-network
```

**Expected output**:
```
🌐 Network Status: ✅ Online
📊 Chain ID: 2025
👥 Available Accounts: 1
💰 Account Balances:
   0xBa376Ed1e4A62a4b71340F09A855B8FFBe441474: 99.999 ETH
```

If network is offline, ask your instructor to start the private Ethereum network.

---

## Step 4: Compile and Deploy Contracts

**Run the setup command**:
```bash
npm run compile
```

**Then deploy contracts**:
```bash
node debug-deploy.js
```

**Your private key when prompted**: `9432a91bc810115f7f75aa9b096e12fbd1451639ec30558b0a75048fda54d8f4`

**Expected output**:
```
✅ CustomToken deployed: 0x4aac4cb74301C9F3239d95D4c95FA5FcEeaff2f2
✅ VendingMachine deployed: 0xea213740a24c44D83907D3D7E4E67eA492f1E981
```

---

## Step 5: Add Your Private Network to MetaMask

1. **Open MetaMask**
2. **Click the network dropdown** (top center)
3. **Click "Add Network"**
4. **Fill in exactly**:
   ```
   Network Name: Private Ethereum Network
   New RPC URL: http://172.27.149.226:8545
   Chain ID: 2025
   Currency Symbol: ETH
   Block Explorer URL: (leave empty)
   ```
5. **Click "Save"**

---

## Step 6: Import Your Account

1. **Click the account circle** (top right)
2. **Select "Import Account"**
3. **Choose "Private Key"**
4. **Enter**: `9432a91bc810115f7f75aa9b096e12fbd1451639ec30558b0a75048fda54d8f4`
5. **Click "Import"**

You should now see:
- Address: `0xBa376Ed1e4A62a4b71340F09A855B8FFBe441474`
- Balance: ~99.99 ETH

---

## Step 7: Add CTK Token

1. **In MetaMask, scroll down**
2. **Click "Import tokens"**
3. **Enter Token Address**: `0x4aac4cb74301C9F3239d95D4c95FA5FcEeaff2f2`
4. **Token Symbol**: CTK
5. **Token Decimals**: 18
6. **Click "Add Custom Token"**

You should now see 1,000,000 CTK tokens.

---

## Step 8: Start the DApp

1. **Open terminal in your project folder**
2. **Start the server**:
   ```bash
   npx http-server . -p 8080 -o
   ```
3. **Your browser should open**: http://localhost:8080

**Alternative command**:
```bash
npm run dev
```

---

## Step 9: Connect to the DApp

1. **The DApp should detect MetaMask automatically**
2. **Click "Connect" if prompted**
3. **Make sure you're on "Private Ethereum Network"**
4. **You should see your address and balances**

---

## Step 10: Test the Vending Machine

### Add Items (You are the owner):
1. **Scroll to "Owner Functions"**
2. **Add an item**:
   - Item name: `Coca Cola`
   - Price: `1`
   - Click "Add Item"
3. **Confirm the transaction in MetaMask**

### Buy Items:
1. **You should see the item appear**
2. **Click "Buy" button**
3. **Approve tokens** (first transaction)
4. **Confirm purchase** (second transaction)
5. **Check your purchase history**

---

## 🔧 Important Code References

### Your Network Details:
```
Network Name: Private Ethereum Network
RPC URL: http://172.27.149.226:8545
Chain ID: 2025
```

### Your Account Details:
```
Address: 0xBa376Ed1e4A62a4b71340F09A855B8FFBe441474
Private Key: 9432a91bc810115f7f75aa9b096e12fbd1451639ec30558b0a75048fda54d8f4
```

### Contract Addresses (after deployment):
```
CustomToken (CTK): 0x4aac4cb74301C9F3239d95D4c95FA5FcEeaff2f2
VendingMachine: 0xea213740a24c44D83907D3D7E4E67eA492f1E981
```

### Useful Commands:
```bash
# Check if network is running
npm run check-network

# Troubleshoot any issues
npm run troubleshoot

# Restart the web server
npx http-server . -p 8080 -o

# Recompile contracts (if needed)
npm run compile

# Redeploy contracts (if needed)
node debug-deploy.js
```

---

## 🆘 Troubleshooting

### If deployment fails:
```bash
# Check network connection
npm run check-network

# Try troubleshoot tool
npm run troubleshoot

# Redeploy manually
node debug-deploy.js
```

### If DApp won't connect:
1. **Check MetaMask network** - should be "Private Ethereum Network"
2. **Refresh browser page**
3. **Restart web server**:
   ```bash
   # Press Ctrl+C to stop server, then:
   npx http-server . -p 8080 -o
   ```

### If transactions fail:
- **Check you have ETH** for gas fees
- **Check you have CTK tokens** for purchases
- **Make sure you're on the right network**
- **Try refreshing MetaMask**

### Common error fixes:
```bash
# If "command not found" errors:
npm install

# If "port already in use":
npx http-server . -p 8081 -o

# If contracts not found:
node debug-deploy.js
```

---

## 📱 Project File Structure

Your project should have these files:
```
vending-machine-dapp/
├── contracts/
│   ├── CustomToken.sol
│   └── VendingMachine.sol
├── app.js
├── index.html
├── styles.css
├── package.json
├── compile.js
├── debug-deploy.js
├── check-network.js
├── troubleshoot.js
└── deployment.json (created after deployment)
```

---

## ✅ Success Checklist

**Setup Complete**:
- [ ] Project files downloaded/created
- [ ] Dependencies installed (`npm install`)
- [ ] Network is running (`npm run check-network`)
- [ ] Contracts compiled and deployed
- [ ] MetaMask installed and configured
- [ ] Private network added (Chain ID: 2025)
- [ ] Account imported with ~99.99 ETH
- [ ] CTK token added (1,000,000 CTK)
- [ ] DApp running on http://localhost:8080
- [ ] Connected to DApp successfully
- [ ] Added at least one item
- [ ] Bought at least one item
- [ ] Saw purchase in history

---

## 🎉 You're Done!

Your vending machine DApp is now working! You can:
- Add items as the owner
- Buy items with CTK tokens  
- View your purchase history
- All data is stored on the blockchain

### Next Experiments:
1. **Create a second MetaMask account**
2. **Transfer CTK tokens between accounts**
3. **Test buying items from different accounts**
4. **Try removing items (owner only)**
5. **Check transaction history in MetaMask**

---

## 📞 Need Help?

**Run the diagnostic tool**:
```bash
npm run troubleshoot
```

**Ask your instructor if you see:**
- Network connection errors
- Contract deployment failures
- MetaMask connection issues
- Transaction errors
