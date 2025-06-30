# 🧃 Student's Guide to Vending Machine DApp

## 📚 What You'll Learn
- How to connect MetaMask to a private blockchain
- How to interact with smart contracts
- How to use custom ERC20 tokens
- How to build and deploy a decentralized application (DApp)

---

## 🎯 Learning Objectives
By the end of this guide, you will:
1. ✅ Understand how DApps work
2. ✅ Set up MetaMask for a private network
3. ✅ Use custom tokens (CTK) to buy items
4. ✅ Interact with smart contracts through a web interface

---

## 📖 Background Knowledge

### What is a DApp?
A **Decentralized Application (DApp)** is like a regular app, but instead of storing data on a company's server, it stores data on a blockchain. This makes it:
- **Transparent**: Everyone can see the code
- **Unstoppable**: No single company can shut it down
- **Trustless**: You don't need to trust a company

### What is our Vending Machine DApp?
Our vending machine is a smart contract that:
- Stores items and their prices
- Uses custom tokens (CTK) instead of real money
- Keeps track of who bought what
- Only allows the owner to add/remove items

---

## 🔧 Prerequisites

Before starting, make sure you have:
- ✅ **Chrome or Firefox browser** (for MetaMask)
- ✅ **MetaMask extension** installed
- ✅ **Your private Ethereum network** running
- ✅ **Private keys** from your network setup

---

## 🚀 Step-by-Step Setup Guide

### Step 1: Install MetaMask (if not done)

1. Go to [metamask.io](https://metamask.io)
2. Click "Download" and add to your browser
3. Create a new wallet (save your seed phrase safely!)
4. Complete the setup

### Step 2: Add Your Private Network

**Why?** MetaMask connects to Ethereum mainnet by default. We need to tell it about our private network.

1. **Open MetaMask**
2. **Click the network dropdown** (top center - probably says "Ethereum Mainnet")
3. **Click "Add Network"**
4. **Fill in these details EXACTLY**:
   ```
   Network Name: Private Ethereum Network
   New RPC URL: http://172.27.149.226:8545
   Chain ID: 2025
   Currency Symbol: ETH
   Block Explorer URL: (leave empty)
   ```
5. **Click "Save"**

**What just happened?** You told MetaMask how to connect to your private blockchain instead of the public Ethereum network.

### Step 3: Import Your Account

**Why?** Your private network has pre-funded accounts. We need to import one to use for transactions.

1. **Click the account circle** (top right)
2. **Select "Import Account"**
3. **Choose "Private Key"**
4. **Enter this private key**: `9432a91bc810115f7f75aa9b096e12fbd1451639ec30558b0a75048fda54d8f4`
5. **Click "Import"**

**What just happened?** You imported the account that owns the smart contracts and has all the CTK tokens.

### Step 4: Add CTK Token

**Why?** CTK is our custom token. MetaMask doesn't know about it by default.

1. **In MetaMask, scroll down**
2. **Click "Import tokens"**
3. **Enter Token Contract Address**: `0x4aac4cb74301C9F3239d95D4c95FA5FcEeaff2f2`
4. **Token Symbol**: CTK
5. **Token Decimals**: 18
6. **Click "Add Custom Token"**

**What just happened?** You told MetaMask to track your CTK token balance.

### Step 5: Start the DApp

1. **Open VS Code terminal** in your project folder
2. **Run**: `npx http-server . -p 8080 -o`
3. **Your browser should open**: http://localhost:8080

---

## 🎮 How to Use the DApp

### For Regular Users:

#### 1. Connect Your Wallet
- When you open the DApp, it should automatically detect MetaMask
- Click "Connect" if prompted
- Make sure you're on "Private Ethereum Network"

#### 2. Check Your Balance
- You should see your ETH balance (~99.99 ETH)
- You should see your CTK balance (1,000,000 CTK)

#### 3. Buy Items
- Browse available items (if any)
- Click "Buy" on an item you want
- MetaMask will ask you to approve the transaction
- **Two transactions will happen**:
  1. **Approve**: Allow the vending machine to spend your CTK
  2. **Purchase**: Actually buy the item

#### 4. View Your Purchases
- Your purchase history appears at the bottom
- This data is stored on the blockchain forever!

### For Owners (You are the owner!):

#### 1. Add Items
- Use the "Owner Functions" section
- Enter an item name (e.g., "Coca Cola")
- Enter a price in CTK (e.g., "1")
- Click "Add Item"

#### 2. Remove Items
- Enter the index number of the item (starts from 0)
- Click "Remove Item"

---

## 🔬 Understanding What Happens Behind the Scenes

### When You Buy an Item:

1. **Your browser** calls the smart contract
2. **MetaMask** signs the transaction with your private key
3. **Your private network** processes the transaction
4. **The smart contract**:
   - Checks if you have enough CTK tokens
   - Transfers CTK from you to the vending machine
   - Records your purchase
   - Updates your purchase history

### When You Add an Item (Owner Only):

1. **The smart contract** checks if you're the owner
2. **If yes**: Adds the item to the list with the price
3. **If no**: Rejects the transaction

---

## 🧪 Experiments to Try

### Experiment 1: Buy Multiple Items
1. Add 3 different items with different prices
2. Buy each item once
3. Check your purchase history
4. Notice how your CTK balance decreases

### Experiment 2: Create Another Account
1. In MetaMask, create a new account
2. Try to add an item (it should fail - you're not the owner!)
3. Transfer some CTK from your main account to this new account
4. Try to buy an item with the new account

### Experiment 3: Check the Blockchain
1. After making purchases, check your transaction history in MetaMask
2. Notice how each transaction has a hash (unique ID)
3. Your private network is mining blocks with your transactions!

---

## 🤔 Common Issues and Solutions

### "Transaction Failed"
**Possible causes:**
- Not enough CTK tokens
- Not enough ETH for gas fees
- Wrong network selected
- Contract not deployed

**Solutions:**
1. Check your CTK balance
2. Make sure you're on "Private Ethereum Network"
3. Refresh the page and try again

### "Cannot Connect to Network"
**Solutions:**
1. Make sure your private network is running
2. Check the RPC URL: `http://172.27.149.226:8545`
3. Try refreshing MetaMask

### "Insufficient Funds"
**Solutions:**
1. Make sure you imported the correct account
2. Check if you have CTK tokens added to MetaMask
3. Verify you're on the right network

---

## 📝 Learning Questions

Test your understanding:

1. **What happens if you try to buy an item without enough CTK?**
2. **Why do we need to approve tokens before purchasing?**
3. **What's the difference between ETH and CTK in our DApp?**
4. **How does the smart contract know you're the owner?**
5. **Where is your purchase history stored?**

### Answers:
1. The transaction will fail - smart contracts enforce rules automatically
2. It's a security feature - you explicitly allow the contract to spend your tokens
3. ETH pays for gas fees, CTK is used to buy items from the vending machine
4. The contract stores the deployer's address as the owner
5. On the blockchain - it's permanent and transparent!

---

## 🎯 Next Steps

Want to learn more? Try these challenges:

### Beginner Challenges:
- [ ] Add 5 different items with various prices
- [ ] Create a new MetaMask account and transfer CTK to it
- [ ] Buy items from both accounts

### Intermediate Challenges:
- [ ] Modify the contract to add categories to items
- [ ] Add a feature to set discounts
- [ ] Create a refund mechanism

### Advanced Challenges:
- [ ] Deploy to a testnet (like Goerli)
- [ ] Add an admin panel for better management
- [ ] Integrate with a real payment system

---

## 📚 Additional Resources

- [Ethereum Basics](https://ethereum.org/en/learn/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [MetaMask User Guide](https://metamask.io/faqs/)
- [Web3.js Documentation](https://web3js.readthedocs.io/)

---

## 🏆 Congratulations!

You've successfully:
- ✅ Set up a private blockchain connection
- ✅ Deployed and interacted with smart contracts
- ✅ Used custom ERC20 tokens
- ✅ Built a functional DApp

You're now ready to explore the exciting world of blockchain development! 🚀

---

*Happy coding! 🎉*
