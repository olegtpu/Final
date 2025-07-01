const Web3 = require('web3');
const fs = require('fs');

async function troubleshoot() {
  console.log('🔧 DApp Troubleshooting Tool');
  console.log('============================');
  console.log('');

  const issues = [];
  const solutions = [];

  try {
    // Check 1: Network connectivity
    console.log('🌐 Checking network connectivity...');
    const web3 = new Web3('http://172.26.232.28:8545');
    const isListening = await web3.eth.net.isListening();
    
    if (isListening) {
      console.log('   ✅ Network is online');
    } else {
      console.log('   ❌ Cannot connect to network');
      issues.push('Network offline');
      solutions.push('1. Check if your private Ethereum network is running');
      solutions.push('2. Verify WSL is running: wsl --list --running');
      solutions.push('3. Check RPC URL: http://172.26.232.28:8545');
    }

    // Check 2: Chain ID
    if (isListening) {
      const chainId = await web3.eth.getChainId();
      if (chainId === 2025) {
        console.log('   ✅ Chain ID is correct (2025)');
      } else {
        console.log(`   ❌ Wrong Chain ID: ${chainId}, expected: 2025`);
        issues.push('Wrong Chain ID');
        solutions.push('4. Make sure MetaMask is connected to "Private Ethereum Network"');
      }
    }

    // Check 3: Account balance
    if (isListening) {
      const targetAccount = '0xec6f0983be51b84a512765c547b26af7b79a4ab7';
      const balance = await web3.eth.getBalance(targetAccount);
      const ethBalance = parseFloat(web3.utils.fromWei(balance, 'ether'));
      
      if (ethBalance > 50) {
        console.log(`   ✅ Account has sufficient ETH: ${ethBalance.toFixed(4)} ETH`);
      } else {
        console.log(`   ❌ Low ETH balance: ${ethBalance.toFixed(4)} ETH`);
        issues.push('Low ETH balance');
        solutions.push('5. Make sure you imported the correct account');
        solutions.push('6. Check if you\'re using the right private key');
      }
    }

    // Check 4: Deployed contracts
    console.log('\n📦 Checking deployed contracts...');
    const deploymentFile = './deployment.json';
    
    if (fs.existsSync(deploymentFile)) {
      const deployment = JSON.parse(fs.readFileSync(deploymentFile, 'utf8'));
      console.log('   ✅ Deployment file found');
      console.log(`   📄 CustomToken: ${deployment.customToken.address}`);
      console.log(`   📄 VendingMachine: ${deployment.vendingMachine.address}`);

      // Check if contracts are actually deployed
      if (isListening) {
        const tokenCode = await web3.eth.getCode(deployment.customToken.address);
        const vendingCode = await web3.eth.getCode(deployment.vendingMachine.address);
        
        if (tokenCode !== '0x') {
          console.log('   ✅ CustomToken contract is deployed');
        } else {
          console.log('   ❌ CustomToken contract not found');
          issues.push('CustomToken not deployed');
          solutions.push('7. Run: node debug-deploy.js');
        }
        
        if (vendingCode !== '0x') {
          console.log('   ✅ VendingMachine contract is deployed');
        } else {
          console.log('   ❌ VendingMachine contract not found');
          issues.push('VendingMachine not deployed');
          solutions.push('8. Run: node debug-deploy.js');
        }
      }
    } else {
      console.log('   ❌ No deployment file found');
      issues.push('Contracts not deployed');
      solutions.push('9. Run: node debug-deploy.js');
    }

    // Check 5: App.js configuration
    console.log('\n📝 Checking app.js configuration...');
    const appJs = fs.readFileSync('./app.js', 'utf8');
    
    if (appJs.includes('YOUR_VENDING_MACHINE_CONTRACT_ADDRESS')) {
      console.log('   ❌ app.js not updated with contract addresses');
      issues.push('App.js not configured');
      solutions.push('10. Contracts need to be deployed to update app.js');
    } else {
      console.log('   ✅ app.js has contract addresses');
    }

    // Check 6: HTTP server
    console.log('\n🌍 Checking web server...');
    const http = require('http');
    
    const checkServer = new Promise((resolve) => {
      const req = http.request('http://localhost:8080', (res) => {
        resolve(true);
      });
      req.on('error', () => resolve(false));
      req.setTimeout(1000, () => resolve(false));
      req.end();
    });
    
    const serverRunning = await checkServer;
    if (serverRunning) {
      console.log('   ✅ HTTP server is running on port 8080');
    } else {
      console.log('   ❌ HTTP server is not running');
      issues.push('Web server offline');
      solutions.push('11. Run: npx http-server . -p 8080 -o');
    }

    // Summary
    console.log('\n📊 DIAGNOSIS SUMMARY');
    console.log('==================');
    
    if (issues.length === 0) {
      console.log('🎉 Everything looks good!');
      console.log('');
      console.log('✨ Your DApp should be working perfectly!');
      console.log('📱 Open: http://localhost:8080');
      console.log('🦊 Make sure MetaMask is connected to "Private Ethereum Network"');
    } else {
      console.log(`❌ Found ${issues.length} issue(s):`);
      issues.forEach((issue, i) => console.log(`   ${i + 1}. ${issue}`));
      
      console.log('\n🔧 SOLUTIONS:');
      solutions.forEach(solution => console.log(`   ${solution}`));
    }

    console.log('\n📚 Need more help?');
    console.log('   - Read: STUDENT_GUIDE.md');
    console.log('   - Check: QUICK_REFERENCE.md');
    console.log('   - Test: npm run check-network');

  } catch (error) {
    console.error('\n❌ Troubleshooting failed:', error.message);
    console.log('\n🆘 Emergency Steps:');
    console.log('   1. Make sure your private network is running');
    console.log('   2. Run: npm install');
    console.log('   3. Run: npm run compile');
    console.log('   4. Run: node debug-deploy.js');
    console.log('   5. Run: npx http-server . -p 8080 -o');
  }
}

if (require.main === module) {
  troubleshoot();
}

module.exports = { troubleshoot };
