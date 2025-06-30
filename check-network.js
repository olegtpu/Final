const Web3 = require('web3');

async function checkNetwork() {
  console.log('🔍 Checking Private Network Connection...');
  console.log('=========================================');
  
  try {
    const web3 = new Web3('http://172.27.149.226:8545');
    
    // Check if network is reachable
    const isListening = await web3.eth.net.isListening();
    console.log(`🌐 Network Status: ${isListening ? '✅ Online' : '❌ Offline'}`);
    
    if (!isListening) {
      console.log('❌ Cannot connect to private network');
      console.log('💡 Make sure your private Ethereum network is running');
      return false;
    }
    
    // Get network info
    const chainId = await web3.eth.getChainId();
    const blockNumber = await web3.eth.getBlockNumber();
    const accounts = await web3.eth.getAccounts();
    
    console.log(`📊 Chain ID: ${chainId}`);
    console.log(`📦 Latest Block: ${blockNumber}`);
    console.log(`👥 Available Accounts: ${accounts.length}`);
    
    if (accounts.length > 0) {
      console.log('\n💰 Account Balances:');
      for (let i = 0; i < Math.min(accounts.length, 5); i++) {
        const balance = await web3.eth.getBalance(accounts[i]);
        const ethBalance = web3.utils.fromWei(balance, 'ether');
        console.log(`   ${accounts[i]}: ${ethBalance} ETH`);
      }
    }
    
    console.log('\n✅ Network is ready for deployment!');
    return true;
    
  } catch (error) {
    console.error('❌ Network check failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Make sure your private network is running');
    console.log('   2. Check if the RPC URL is correct: http://172.27.149.226:8545');
    console.log('   3. Verify WSL is running and accessible');
    return false;
  }
}

if (require.main === module) {
  checkNetwork();
}

module.exports = { checkNetwork };
