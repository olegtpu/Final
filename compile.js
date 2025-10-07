//

const fs = require('fs');
const path = require('path');
const solc = require('solc');

// Read contract files
function readContract(filename) {
  return fs.readFileSync(path.join(__dirname, 'contracts', filename), 'utf8');
}

// Find imports callback for OpenZeppelin
function findImports(importPath) {
  try {
    if (importPath.startsWith('@openzeppelin/')) {
      const contractPath = path.join(__dirname, 'node_modules', importPath);
      return {
        contents: fs.readFileSync(contractPath, 'utf8')
      };
    }
    return { error: 'File not found' };
  } catch (error) {
    return { error: 'File not found' };
  }
}

// Compile contracts
function compileContracts() {
  console.log('📝 Compiling contracts...');
  
  const customTokenSource = readContract('CustomToken.sol');
  const vendingMachineSource = readContract('VendingMachine.sol');
  
  const input = {
    language: 'Solidity',
    sources: {
      'CustomToken.sol': {
        content: customTokenSource
      },
      'VendingMachine.sol': {
        content: vendingMachineSource
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode']
        }
      }
    }
  };
  
  try {
    const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
    
    if (output.errors) {
      output.errors.forEach(error => {
        if (error.severity === 'error') {
          console.error('❌ Compilation error:', error.formattedMessage);
        } else {
          console.warn('⚠️  Compilation warning:', error.formattedMessage);
        }
      });
      
      if (output.errors.some(error => error.severity === 'error')) {
        throw new Error('Compilation failed with errors');
      }
    }
    
    const customToken = output.contracts['CustomToken.sol']['CustomToken'];
    const vendingMachine = output.contracts['VendingMachine.sol']['VendingMachine'];
    
    // Save compilation results
    const compilationResult = {
      CustomToken: {
        abi: customToken.abi,
        bytecode: customToken.evm.bytecode.object
      },
      VendingMachine: {
        abi: vendingMachine.abi,
        bytecode: vendingMachine.evm.bytecode.object
      }
    };
    
    fs.writeFileSync(
      path.join(__dirname, 'compiled-contracts.json'),
      JSON.stringify(compilationResult, null, 2)
    );
    
    console.log('✅ Contracts compiled successfully!');
    console.log('📄 Compilation results saved to compiled-contracts.json');
    
    return compilationResult;
    
  } catch (error) {
    console.error('❌ Compilation failed:', error);
    throw error;
  }
}

if (require.main === module) {
  compileContracts();
}

module.exports = { compileContracts };
