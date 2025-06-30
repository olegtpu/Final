const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// Configuration
const PRIVATE_NETWORK_RPC = 'http://172.27.149.226:8545';
const DEPLOYER_PRIVATE_KEY = 'YOUR_PRIVATE_KEY_HERE'; // Replace with your private key
const INITIAL_TOKEN_SUPPLY = '1000000'; // 1 million tokens

// Contract compilation results (you'll need to compile with solc)
const customTokenBytecode = 'YOUR_CUSTOM_TOKEN_BYTECODE';
const vendingMachineBytecode = 'YOUR_VENDING_MACHINE_BYTECODE';

// ABIs
const customTokenABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "initialSupply", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  // ... rest of the ABI (same as in app.js)
];

const vendingMachineABI = [
  {
    "inputs": [{"internalType": "address", "name": "tokenAddress", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  // ... rest of the ABI (same as in app.js)
];

async function deploy() {
  console.log('🚀 Starting deployment to private network...');
  
  // Initialize Web3
  const web3 = new Web3(PRIVATE_NETWORK_RPC);
  
  // Add account from private key
  const account = web3.eth.accounts.privateKeyToAccount(DEPLOYER_PRIVATE_KEY);
  web3.eth.accounts.wallet.add(account);
  
  console.log(`📱 Deploying from account: ${account.address}`);
  
  try {
    // Check account balance
    const balance = await web3.eth.getBalance(account.address);
    console.log(`💰 Account balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
    
    if (web3.utils.toBN(balance).isZero()) {
      throw new Error('Account has no ETH for gas fees');
    }
    
    // Deploy CustomToken
    console.log('📝 Deploying CustomToken...');
    const tokenContract = new web3.eth.Contract(customTokenABI);
    const tokenSupplyWei = web3.utils.toWei(INITIAL_TOKEN_SUPPLY, 'ether');
    
    const tokenDeployTx = tokenContract.deploy({
      data: customTokenBytecode,
      arguments: [tokenSupplyWei]
    });
    
    const tokenGasEstimate = await tokenDeployTx.estimateGas({ from: account.address });
    console.log(`⛽ Token deployment gas estimate: ${tokenGasEstimate}`);
    
    const tokenInstance = await tokenDeployTx.send({
      from: account.address,
      gas: Math.floor(tokenGasEstimate * 1.2), // Add 20% buffer
      gasPrice: web3.utils.toWei('20', 'gwei')
    });
    
    console.log(`✅ CustomToken deployed at: ${tokenInstance.options.address}`);
    
    // Deploy VendingMachine
    console.log('📝 Deploying VendingMachine...');
    const vendingContract = new web3.eth.Contract(vendingMachineABI);
    
    const vendingDeployTx = vendingContract.deploy({
      data: vendingMachineBytecode,
      arguments: [tokenInstance.options.address]
    });
    
    const vendingGasEstimate = await vendingDeployTx.estimateGas({ from: account.address });
    console.log(`⛽ VendingMachine deployment gas estimate: ${vendingGasEstimate}`);
    
    const vendingInstance = await vendingDeployTx.send({
      from: account.address,
      gas: Math.floor(vendingGasEstimate * 1.2), // Add 20% buffer
      gasPrice: web3.utils.toWei('20', 'gwei')
    });
    
    console.log(`✅ VendingMachine deployed at: ${vendingInstance.options.address}`);
    
    // Add some initial items
    console.log('🍫 Adding initial items...');
    
    const items = [
      { name: 'Coca Cola', price: '1' },
      { name: 'Pepsi', price: '1' },
      { name: 'Water', price: '0.5' },
      { name: 'Snickers', price: '1.5' },
      { name: 'Chips', price: '2' }
    ];
    
    for (const item of items) {
      const priceWei = web3.utils.toWei(item.price, 'ether');
      const tx = await vendingInstance.methods.addItem(item.name, priceWei).send({
        from: account.address,
        gas: 200000,
        gasPrice: web3.utils.toWei('20', 'gwei')
      });
      console.log(`📦 Added ${item.name} for ${item.price} CTK - TX: ${tx.transactionHash}`);
    }
    
    // Save deployment info
    const deploymentInfo = {
      network: 'Private Ethereum Network',
      chainId: 2025,
      rpc: PRIVATE_NETWORK_RPC,
      customToken: {
        address: tokenInstance.options.address,
        name: 'CustomToken',
        symbol: 'CTK',
        initialSupply: INITIAL_TOKEN_SUPPLY
      },
      vendingMachine: {
        address: vendingInstance.options.address,
        owner: account.address
      },
      deployer: account.address,
      deployedAt: new Date().toISOString()
    };
    
    // Write deployment info to file
    fs.writeFileSync(
      path.join(__dirname, 'deployment.json'),
      JSON.stringify(deploymentInfo, null, 2)
    );
    
    console.log('\n🎉 Deployment completed successfully!');
    console.log('\n📄 Contract Addresses:');
    console.log(`   CustomToken: ${tokenInstance.options.address}`);
    console.log(`   VendingMachine: ${vendingInstance.options.address}`);
    console.log('\n📝 Next steps:');
    console.log('1. Update the contract addresses in app.js');
    console.log('2. Add the private network to MetaMask');
    console.log('3. Import your account to MetaMask');
    console.log('4. Open index.html in your browser');
    
    // Update app.js with the deployed addresses
    updateAppJs(tokenInstance.options.address, vendingInstance.options.address);
    
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

function updateAppJs(tokenAddress, contractAddress) {
  try {
    let appJsContent = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
    
    appJsContent = appJsContent.replace(
      'const contractAddress = "YOUR_VENDING_MACHINE_CONTRACT_ADDRESS";',
      `const contractAddress = "${contractAddress}";`
    );
    
    appJsContent = appJsContent.replace(
      'const tokenAddress = "YOUR_CUSTOM_TOKEN_CONTRACT_ADDRESS";',
      `const tokenAddress = "${tokenAddress}";`
    );
    
    fs.writeFileSync(path.join(__dirname, 'app.js'), appJsContent);
    console.log('✅ Updated app.js with contract addresses');
  } catch (error) {
    console.error('⚠️  Failed to update app.js:', error.message);
    console.log('Please manually update the contract addresses in app.js');
  }
}

if (require.main === module) {
  deploy().catch(console.error);
}

module.exports = { deploy };
