# 🧃 Vending Machine DApp

A decentralized vending machine built on Ethereum using custom ERC20 tokens (CTK). Perfect for learning blockchain development!

> **📥 Getting Started**: Clone this repository and follow the setup instructions below. All commands are tested and ready to run!

## 📋 Repository Contents

- `contracts/` - Smart contracts (VendingMachine.sol, CustomToken.sol)
- `app.js` - Frontend JavaScript with Web3 integration
- `index.html` - User interface
- `styles.css` - Modern, responsive styling
- `SIMPLE_SETUP.md` - **START HERE** - Complete step-by-step setup guide
- `STUDENT_WORKSHEET.md` - Hands-on activities with checklists
- `QUICK_REFERENCE.md` - Quick reference for addresses and commands
- Essential scripts: `compile.js`, `debug-deploy.js`, `troubleshoot.js`, `check-network.js`
- Student setup scripts: `student-setup.ps1`, `student-clone.bat`

## ✨ Features

- **Custom ERC20 Token (CTK)** for purchases
- **Owner-only item management** (add/remove items)
- **Purchase history** stored on blockchain
- **Multi-user support** via MetaMask
- **Beautiful, responsive UI**
- **Private network compatible**

## 🎯 Learning Objectives

Students will learn:
- How to interact with smart contracts
- ERC20 token usage and approval flow
- MetaMask wallet integration
- DApp development basics
- Blockchain transaction concepts

## 🚀 Quick Start

### Prerequisites
- Node.js installed
- MetaMask browser extension
- Private Ethereum network running

### Setup
```bash
# Clone the repository
git clone https://github.com/Zakwan-Khalit/vending-machine-dapp.git
cd vending-machine-dapp

# Install dependencies
npm install

# Check network connection
npm run check-network

# Compile and deploy contracts
npm run compile
node debug-deploy.js

# Start the DApp
npm run dev
```

### MetaMask Configuration
```
Network Name: Private Ethereum Network
RPC URL: http://172.27.149.226:8545
Chain ID: 2025
Currency Symbol: ETH
```

## 📚 Documentation

- **[Complete Setup Guide](SIMPLE_SETUP.md)** - Step-by-step instructions
- **[Student Worksheet](STUDENT_WORKSHEET.md)** - Structured learning activities
- **[Quick Reference](QUICK_REFERENCE.md)** - All addresses and commands

## 🎓 For Educators

This project includes:
- Comprehensive student guides
- Structured worksheets with checkboxes
- Automated troubleshooting tools
- Assessment rubrics
- 70+ minutes of hands-on activities

## 🔧 Commands

```bash
npm run check-network    # Check if private network is running
npm run compile          # Compile Solidity contracts
npm run troubleshoot     # Run diagnostic tool
npm run dev             # Start development server
node debug-deploy.js    # Deploy contracts
```

## 📦 Project Structure

```
vending-machine-dapp/
├── contracts/          # Solidity smart contracts
├── app.js             # Frontend JavaScript
├── index.html         # Main HTML page
├── styles.css         # Responsive CSS
├── compile.js         # Contract compilation
├── debug-deploy.js    # Deployment script
├── troubleshoot.js    # Diagnostic tool
└── docs/              # Student guides
```

## 🔐 Security Notes

- This is for educational use on private networks only
- Private keys are provided for learning purposes
- Never use these keys on mainnet or with real funds
- Always use test networks for development

## 🛠 Smart Contracts

### CustomToken.sol
- ERC20 compliant token (CTK)
- Initial supply: 1,000,000 CTK
- Used for vending machine purchases

### VendingMachine.sol
- Owner-controlled item management
- Token-based purchasing system
- Purchase history tracking
- Access control for administrative functions

## 🎮 Usage

### For Owners:
1. Add items with prices in CTK
2. Remove items by index
3. Monitor purchases

### For Users:
1. Connect MetaMask wallet
2. Ensure CTK token balance
3. Purchase items (requires token approval)
4. View purchase history

## 🆘 Troubleshooting

Common issues and solutions:

**"Invalid opcode: PUSH0"** - Solidity version compatibility issue
**"Transfer failed"** - Insufficient CTK balance or approval needed
**"Network connection error"** - Private network not running

Run `npm run troubleshoot` for automated diagnosis.

## 🤝 Contributing

This is an educational project. Feel free to:
- Report bugs
- Suggest improvements
- Add new features
- Improve documentation

## 📄 License

MIT License - see LICENSE file for details.

## 🎉 Acknowledgments

Built for blockchain education and hands-on learning. Perfect for:
- Computer Science courses
- Blockchain workshops
- Web3 development training
- Smart contract education

---

**Happy Learning! 🚀**
