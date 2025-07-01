const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

async function debugDeploy() {
  console.log('🔍 Debug Deployment');
  console.log('==================');
  
  // Your private key (without 0x prefix)
  const privateKey = 'd03a1ba0ae0d859288ffa9b94861e28b6dfb576e30af1584dbaf11d28b9ea217';
  
  try {
    console.log('📡 Connecting to network...');
    const web3 = new Web3('http://172.26.232.28:8545');
    
    // Add account from private key
    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
    web3.eth.accounts.wallet.add(account);
    
    console.log(`✅ Connected with account: ${account.address}`);
    
    // Check balance
    const balance = await web3.eth.getBalance(account.address);
    console.log(`💰 Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
    
    // Load compiled contracts
    const compiled = JSON.parse(fs.readFileSync(path.join(__dirname, 'compiled-contracts.json'), 'utf8'));
    console.log('✅ Compiled contracts loaded');
    
    // Get gas price
    const gasPrice = await web3.eth.getGasPrice();
    console.log(`⛽ Gas price: ${web3.utils.fromWei(gasPrice, 'gwei')} gwei`);
    
    console.log('\n📝 Deploying CustomToken...');
    
    // Deploy CustomToken
    const tokenContract = new web3.eth.Contract(compiled.CustomToken.abi);
    const tokenSupply = web3.utils.toWei('1000000', 'ether'); // 1M tokens
    
    const tokenDeployTx = tokenContract.deploy({
      data: '0x' + compiled.CustomToken.bytecode,
      arguments: [tokenSupply]
    });
    
    // Estimate gas for token deployment
    const tokenGasEstimate = await tokenDeployTx.estimateGas({ from: account.address });
    console.log(`⛽ Token gas estimate: ${tokenGasEstimate}`);
    
    const tokenInstance = await tokenDeployTx.send({
      from: account.address,
      gas: Math.floor(tokenGasEstimate * 1.2),
      gasPrice: gasPrice
    });
    
    console.log(`✅ CustomToken deployed: ${tokenInstance.options.address}`);
    
    console.log('\n📝 Deploying VendingMachine...');
    
    // Deploy VendingMachine
    const vendingContract = new web3.eth.Contract(compiled.VendingMachine.abi);
    
    const vendingDeployTx = vendingContract.deploy({
      data: '0x' + compiled.VendingMachine.bytecode,
      arguments: [tokenInstance.options.address]
    });
    
    const vendingGasEstimate = await vendingDeployTx.estimateGas({ from: account.address });
    console.log(`⛽ VendingMachine gas estimate: ${vendingGasEstimate}`);
    
    const vendingInstance = await vendingDeployTx.send({
      from: account.address,
      gas: Math.floor(vendingGasEstimate * 1.2),
      gasPrice: gasPrice
    });
    
    console.log(`✅ VendingMachine deployed: ${vendingInstance.options.address}`);
    
    // Save deployment info
    const deploymentInfo = {
      network: 'Private Ethereum Network',
      chainId: 2025,
      rpc: 'http://172.26.232.28:8545',
      customToken: {
        address: tokenInstance.options.address,
        symbol: 'CTK',
        decimals: 18,
        totalSupply: '1000000'
      },
      vendingMachine: {
        address: vendingInstance.options.address,
        owner: account.address
      },
      deployer: account.address,
      deployedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(__dirname, 'deployment.json'),
      JSON.stringify(deploymentInfo, null, 2)
    );
    
    // Update app.js
    console.log('\n📝 Updating app.js...');
    let appJs = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
    
    appJs = appJs.replace(
      /const contractAddress = ".*?";/,
      `const contractAddress = "${vendingInstance.options.address}";`
    );
    
    appJs = appJs.replace(
      /const tokenAddress = ".*?";/,
      `const tokenAddress = "${tokenInstance.options.address}";`
    );
    
    fs.writeFileSync(path.join(__dirname, 'app.js'), appJs);
    
    console.log('\n🎉 Deployment Complete!');
    console.log('========================');
    console.log(`CustomToken: ${tokenInstance.options.address}`);
    console.log(`VendingMachine: ${vendingInstance.options.address}`);
    console.log(`Owner: ${account.address}`);
    
    console.log('\n📋 Next Steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Open http://localhost:8080');
    console.log('3. Add private network to MetaMask (Chain ID: 2025)');
    console.log('4. Import your account to MetaMask');
    
  } catch (error) {
    console.error('\n❌ Deployment failed:', error);
    
    // More detailed error info
    if (error.receipt) {
      console.log('Receipt:', error.receipt);
    }
    if (error.reason) {
      console.log('Reason:', error.reason);
    }
    if (error.data) {
      console.log('Data:', error.data);
    }
  }
}

if (require.main === module) {
  debugDeploy().catch(console.error);
}

module.exports = { debugDeploy };
