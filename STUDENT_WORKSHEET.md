# 🎓 Student Setup Worksheet

**Name**: _________________ **Date**: _________________

## 📋 Pre-Lab Checklist
Before starting, verify you have:
- [ ] MetaMask installed in your browser
- [ ] Private Ethereum network running
- [ ] VS Code open with the project folder
- [ ] All dependencies installed (`npm install`)

---

## 🏃‍♂️ Activity 1: MetaMask Setup (15 minutes)

### Step 1: Add Private Network
1. **Open MetaMask**
2. **Click network dropdown** → **"Add Network"**
3. **Fill in**:
   - Network Name: `Private Ethereum Network`
   - RPC URL: `http://172.27.149.226:8545`
   - Chain ID: `2025`
4. **Save**

**✅ Status**: ⬜ Completed

### Step 2: Import Account
1. **Click account circle** → **"Import Account"**
2. **Enter private key**: `9432a91bc810115f7f75aa9b096e12fbd1451639ec30558b0a75048fda54d8f4`
3. **Import**

**✅ Status**: ⬜ Completed
**Record your balances**:
- ETH Balance: _________________ ETH
- Address: `0xBa376Ed1e4A62a4b71340F09A855B8FFBe441474`

### Step 3: Add CTK Token
1. **Scroll down** → **"Import tokens"**
2. **Token Address**: `0x4aac4cb74301C9F3239d95D4c95FA5FcEeaff2f2`
3. **Symbol**: CTK, **Decimals**: 18
4. **Add Custom Token**

**✅ Status**: ⬜ Completed
**CTK Balance**: _________________ CTK

---

## 🛍️ Activity 2: Start the DApp (10 minutes)

### Step 1: Start Web Server
```bash
npx http-server . -p 8080 -o
```

**✅ Status**: ⬜ Server started ⬜ Browser opened

### Step 2: Connect DApp
1. **Browser should open** http://localhost:8080
2. **Connect MetaMask** when prompted
3. **Verify connection** - you should see your address and balances

**✅ Status**: ⬜ Connected successfully

---

## 🎮 Activity 3: Test the Vending Machine (20 minutes)

### Step 1: Add Items (You are the owner!)
Add these items:

| Item Name | Price (CTK) | Status |
|-----------|-------------|---------|
| Coca Cola | 1.5 | ⬜ Added |
| Water Bottle | 0.8 | ⬜ Added |
| Chocolate Bar | 2.0 | ⬜ Added |

**Instructions**:
1. Scroll to "Owner Functions"
2. Enter item name and price
3. Click "Add Item"
4. Confirm transaction in MetaMask

### Step 2: Make Purchases
Buy at least 2 items:

| Item Purchased | Price Paid | Status |
|----------------|------------|---------|
| 1. ____________ | __________ | ⬜ Bought |
| 2. ____________ | __________ | ⬜ Bought |

**Remember**: Each purchase requires 2 transactions:
1. Approve tokens
2. Complete purchase

### Step 3: Check Results
- [ ] Items appear in the "Available Items" section
- [ ] Purchase history shows your bought items
- [ ] CTK balance decreased after purchases
- [ ] Purchase history is displayed

---

## 🔧 Activity 4: Test Other Features (15 minutes)

### Create a Second Account
1. **In MetaMask**: Create new account
2. **Try to add an item** (should fail - not owner)
3. **Transfer 10 CTK** from main account to new account
4. **Buy an item** with the new account

**Results**:
- Adding item failed: ⬜ Yes ⬜ No
- Token transfer successful: ⬜ Yes ⬜ No  
- Purchase with new account: ⬜ Yes ⬜ No

---

## 🔍 Activity 5: Verify Everything Works (10 minutes)

### Run System Check
```bash
npm run troubleshoot
```

**Record results**:
- Network Status: ________________________________
- Contracts Deployed: ____________________________
- Web Server Running: ____________________________

### Final Verification
- [ ] Can add items as owner
- [ ] Can buy items with CTK
- [ ] Purchase history appears
- [ ] Multiple accounts work
- [ ] All transactions confirm in MetaMask

---

## 🎉 Completion Checklist

**Setup Complete**:
- [ ] MetaMask configured with private network
- [ ] Account imported with ETH and CTK
- [ ] DApp running and connected
- [ ] Successfully added items
- [ ] Successfully bought items
- [ ] Tested with multiple accounts

**Time to Complete**: _______ minutes

**Instructor Signature**: _________________ **Date**: _________________

---

## 📝 Notes Section
Use this space for any issues encountered or observations:

_________________________________________________
_________________________________________________
_________________________________________________
_________________________________________________
