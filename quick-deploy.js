const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// Simple deployment script for your private network
async function quickDeploy() {
  console.log('🚀 Quick Deploy to Private Network');
  console.log('=====================================');
  
  // Check if compiled contracts exist
  const compiledPath = path.join(__dirname, 'compiled-contracts.json');
  if (!fs.existsSync(compiledPath)) {
    console.log('❌ No compiled contracts found. Running compilation...');
    const { compileContracts } = require('./compile');
    compileContracts();
  }
  
  const compiled = JSON.parse(fs.readFileSync(compiledPath, 'utf8'));
  
  console.log('📋 Deployment Configuration:');
  console.log('   Network: Private Ethereum Network');
  console.log('   RPC: http://172.27.149.226:8545');
  console.log('   Chain ID: 2025');
  console.log('');
  
  // Get private key from user input
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise((resolve, reject) => {
    rl.question('🔑 Enter your private key (the one with ETH): ', async (privateKey) => {
      rl.close();
      
      if (!privateKey || privateKey.length < 60) {
        console.log('❌ Invalid private key');
        reject(new Error('Invalid private key'));
        return;
      }
      
      try {
        // Ensure private key starts with 0x
        if (!privateKey.startsWith('0x')) {
          privateKey = '0x' + privateKey;
        }
        
        const web3 = new Web3('http://172.27.149.226:8545');
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        web3.eth.accounts.wallet.add(account);
        
        console.log(`📱 Deploying from: ${account.address}`);
        
        // Check balance
        const balance = await web3.eth.getBalance(account.address);
        console.log(`💰 Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
        
        if (web3.utils.toBN(balance).isZero()) {
          throw new Error('Account has no ETH for gas fees');
        }
        
        // Deploy CustomToken
        console.log('\n📝 Deploying CustomToken...');
        const tokenContract = new web3.eth.Contract(compiled.CustomToken.abi);
        const tokenSupply = web3.utils.toWei('1000000', 'ether'); // 1M tokens
        
        const tokenInstance = await tokenContract.deploy({
          data: '0x' + compiled.CustomToken.bytecode,
          arguments: [tokenSupply]
        }).send({
          from: account.address,
          gas: 2000000,
          gasPrice: web3.utils.toWei('20', 'gwei')
        });
        
        console.log(`✅ CustomToken deployed: ${tokenInstance.options.address}`);
        
        // Deploy VendingMachine
        console.log('\n📝 Deploying VendingMachine...');
        const vendingContract = new web3.eth.Contract(compiled.VendingMachine.abi);
        
        const vendingInstance = await vendingContract.deploy({
          data: '0x' + compiled.VendingMachine.bytecode,
          arguments: [tokenInstance.options.address]
        }).send({
          from: account.address,
          gas: 3000000,
          gasPrice: web3.utils.toWei('20', 'gwei')
        });
        
        console.log(`✅ VendingMachine deployed: ${vendingInstance.options.address}`);
        
        // Add sample items
        console.log('\n🍫 Adding sample items...');
        const items = [
          { name: 'Coca Cola', price: '1' },
          { name: 'Pepsi', price: '1' },
          { name: 'Water', price: '0.5' },
          { name: 'Snickers', price: '1.5' },
          { name: 'Chips', price: '2' }
        ];
        
        for (const item of items) {
          const priceWei = web3.utils.toWei(item.price, 'ether');
          await vendingInstance.methods.addItem(item.name, priceWei).send({
            from: account.address,
            gas: 200000
          });
          console.log(`   ✓ Added ${item.name} (${item.price} CTK)`);
        }
        
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
        
        // Save deployment info
        const deploymentInfo = {
          network: 'Private Ethereum Network',
          chainId: 2025,
          rpc: 'http://172.27.149.226:8545',
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
        
        console.log('\n🎉 Deployment Complete!');
        console.log('========================');
        console.log(`CustomToken: ${tokenInstance.options.address}`);
        console.log(`VendingMachine: ${vendingInstance.options.address}`);
        console.log(`Owner: ${account.address}`);
        console.log('\n📋 Next Steps:');
        console.log('1. Add private network to MetaMask (Chain ID: 2025, RPC: http://172.27.149.226:8545)');
        console.log('2. Import your account to MetaMask');
        console.log('3. Run: npm run dev');
        console.log('4. Open http://localhost:8080 in your browser');
        
        resolve();
        
      } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        reject(error);
      }
    });
  });
}

if (require.main === module) {
  quickDeploy().catch(console.error);
}

module.exports = { quickDeploy };
