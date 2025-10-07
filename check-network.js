// checkNetwork.js
import pkg from 'hardhat';
const { ethers, network } = pkg;

async function checkNetwork() {
  console.log("Checking Hardhat Network Connection...");
  console.log("==========================================");

  try {
    // provider и аккаунты уже настроены Hardhat
    const provider = ethers.provider;
    const accounts = await ethers.getSigners();

    // Проверяем соединение
    const blockNumber = await provider.getBlockNumber();
    console.log("🌐 Network Status: ✅ Online");

    // Получаем информацию о сети
    const netInfo = await provider.getNetwork();
    console.log(`📊 Chain ID: ${netInfo.chainId}`);
    console.log(`📦 Latest Block: ${blockNumber}`);
    console.log(`👥 Available Accounts: ${accounts.length}`);

    if (accounts.length > 0) {
      console.log("\n💰 Account Balances:");
      for (let i = 0; i < Math.min(accounts.length, 5); i++) {
        const balance = await provider.getBalance(accounts[i].address);
        const eth = ethers.formatEther(balance);
        console.log(`   ${accounts[i].address}: ${eth} ETH`);
      }
    }

    console.log(`\n✅ Connected via Hardhat network: ${network.name}`);
    return true;

  } catch (error) {
    console.error("❌ Network check failed:", error.message);
    console.log("\n💡 Troubleshooting:");
    console.log("   1. Make sure your private network is running");
    console.log("   2. Verify your Hardhat network configuration");
    return false;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  checkNetwork();
}

export { checkNetwork };
