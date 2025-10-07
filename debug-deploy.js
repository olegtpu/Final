import hre from "hardhat"; // Импорт Hardhat (hre)
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url'; // Используется для получения __dirname в ESM

const PRIVATE_KEY = 'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'; 

// --- Логика для __dirname в ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ----------------------------------------

async function debugDeploy() {
  console.log('Hardhat Debug Deployment (ESM)');
  console.log('==================================');
  
  try {
   
    console.log('📡 Connecting to provider...');

    // Создание объекта Signer (Подписант) из приватного ключа
    const provider = hre.ethers.provider;
    const wallet = new hre.ethers.Wallet('0x' + PRIVATE_KEY, provider);
    const deployerAddress = await wallet.getAddress();
    
    console.log(`✅ Connected with account: ${deployerAddress}`);
    
    // Проверка баланса 
    const balance = await provider.getBalance(deployerAddress);
    console.log(`💰 Balance: ${hre.ethers.formatEther(balance)} ETH`);
    
    // Получение Contract Factories (Hardhat автоматически загружает ABI/Bytecode)
    console.log('✅ Contract factories loaded');
    // Необходимо передать Signer (wallet) для развертывания
    const TokenFactory = await hre.ethers.getContractFactory("CustomToken", wallet);
    const VendingMachineFactory = await hre.ethers.getContractFactory("VendingMachine", wallet);
    
    // Получение gas data
    const feeData = await provider.getFeeData();
    console.log(`⛽ Gas price (Max Fee per Gas): ${hre.ethers.formatUnits(feeData.maxFeePerGas, 'gwei')} gwei`);
    
    // --- Развертывание CustomToken ---
    console.log('\n📝 Deploying CustomToken...');
    
    // Подготовка аргументов (100M tokens)
    const tokenSupply = hre.ethers.parseEther('100000000');// 100M токенов 
    
    // Развертывание
    const tokenDeployTx = await TokenFactory.deploy(tokenSupply);
    
    // Ожидание завершения транзакции и получение экземпляра контракта
    await tokenDeployTx.waitForDeployment();
    const tokenAddress = tokenDeployTx.target;
    
    console.log(`✅ CustomToken deployed: ${tokenAddress}`);
    
    // --- Развертывание VendingMachine ---
    console.log('\n📝 Deploying VendingMachine...');
    
    // Развертывание VendingMachine (передаем адрес токена)
    const vendingDeployTx = await VendingMachineFactory.deploy(tokenAddress);
    
    await vendingDeployTx.waitForDeployment();
    const vendingAddress = vendingDeployTx.target;
    
    console.log(`✅ VendingMachine deployed: ${vendingAddress}`);
    
    // Сохранение информации о развертывании
    const deploymentInfo = {
      network: 'Hardhat Localhost',
      chainId: (await provider.getNetwork()).chainId.toString(),
      rpc: 'http://127.0.0.1:8545',
      customToken: {
        address: tokenAddress,
        symbol: 'HETH',
        decimals: 18,
        totalSupply: '100000000'
      },
      vendingMachine: {
        address: vendingAddress,
        owner: deployerAddress
      },
      deployer: deployerAddress,
      deployedAt: new Date().toISOString()
    };
    
    // Используем __dirname, полученный в ESM-совместимом стиле
    fs.writeFileSync(
      path.join(__dirname, 'deployment.json'),
      JSON.stringify(deploymentInfo, null, 2)
    );
    
    // Обновление app.js
    console.log('\n📝 Updating app.js...');
    const appJsPath = path.join(__dirname, 'app.js'); 
    let appJs = fs.readFileSync(appJsPath, 'utf8');
    
    appJs = appJs.replace(
      /const contractAddress = ".*?";/,
      `const contractAddress = "${vendingAddress}";`
    );
    
    appJs = appJs.replace(
      /const tokenAddress = ".*?";/,
      `const tokenAddress = "${tokenAddress}";`
    );
    
    fs.writeFileSync(appJsPath, appJs);
    
    console.log('\n🎉 Deployment Complete!');
    console.log('========================');
    console.log(`CustomToken: ${tokenAddress}`);
    console.log(`VendingMachine: ${vendingAddress}`);
    console.log(`Owner: ${deployerAddress}`);
    
    console.log('\n📋 Next Steps:');
    console.log('1. Run your Hardhat DApp frontend.');
    console.log('2. Ensure MetaMask is connected to Localhost (Chain ID 31337).');
    
  } catch (error) {
    console.error('\n❌ Deployment failed:', error);
    process.exitCode = 1; 
  }
}

// 💡 ESM Execution: Для запуска через 'npx hardhat run' мы просто вызываем функцию 
// и обрабатываем ошибки, не используя require.main === module.
debugDeploy()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

// Экспорт функции 
export { debugDeploy };