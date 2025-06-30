const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function setupProject() {
  console.log('🚀 Setting up Vending Machine DApp');
  console.log('==================================');
  
  try {
    // Step 1: Install dependencies
    console.log('\n📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');
    
    // Step 2: Check if OpenZeppelin is installed
    const ozPath = path.join(__dirname, 'node_modules', '@openzeppelin', 'contracts');
    if (!fs.existsSync(ozPath)) {
      console.log('\n📦 Installing OpenZeppelin contracts...');
      execSync('npm install @openzeppelin/contracts@^4.9.0', { stdio: 'inherit' });
      console.log('✅ OpenZeppelin contracts installed');
    }
    
    // Step 3: Compile contracts
    console.log('\n📝 Compiling contracts...');
    const { compileContracts } = require('./compile');
    await compileContracts();
    
    console.log('\n🎉 Setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Run: npm run quick-deploy');
    console.log('2. Enter your private key when prompted');
    console.log('3. Run: npm run dev');
    console.log('4. Open http://localhost:8080');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  setupProject();
}

module.exports = { setupProject };
