import { ethers, BrowserProvider, Contract } from 'ethers';

let contract; // ethers.Contract (VendingMachine)
let tokenContract; // ethers.Contract (CustomToken)
let user; // ethers.Signer (аккаунт пользователя)
let provider; // ethers.BrowserProvider

// КОНФИГУРАЦИЯ ДЛЯ ЛОКАЛЬНОГО HARDHAT NODE (СТАНДАРТ)
const NETWORK_CONFIG = {
  // Chain ID Hardhat Node по умолчанию
  chainId: 31337, 
  chainName: "Hardhat Localhost",
  // Стандартный адрес Hardhat Node
  rpcUrls: ["http://127.0.0.1:8545"], 
  nativeCurrency: {
    name: "HETH",
    symbol: "HETH",
    decimals: 18
  }
};

// Contract addresses - update these after deployment
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Contract ABIs
const vendingMachineABI = [
  {
    "inputs": [{"internalType": "address", "name": "tokenAddress", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": false, "internalType": "string", "name": "item", "type": "string"},
      {"indexed": false, "internalType": "uint256", "name": "price", "type": "uint256"}
    ],
    "name": "ItemAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": false, "internalType": "address", "name": "buyer", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "item", "type": "string"},
      {"indexed": false, "internalType": "uint256", "name": "price", "type": "uint256"}
    ],
    "name": "ItemPurchased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "string", "name": "item", "type": "string"}],
    "name": "ItemRemoved",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_item", "type": "string"},
      {"internalType": "uint256", "name": "_price", "type": "uint256"}
    ],
    "name": "addItem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getItems",
    "outputs": [{"internalType": "string[]", "name": "", "type": "string[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyBalance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyPurchases",
    "outputs": [{"internalType": "string[]", "name": "", "type": "string[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getTokenBalance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "itemPrices",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "items",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "index", "type": "uint256"}],
    "name": "purchase",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "", "type": "address"},
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "name": "purchases",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "index", "type": "uint256"}],
    "name": "removeItem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token",
    "outputs": [{"internalType": "contract ICustomToken", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
];

const customTokenABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "initialSupply", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "owner", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "spender", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "to", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "spender", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "from", "type": "address"},
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "transferFrom",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

window.addEventListener("load", async () => {
  if (window.ethereum) {
    try {
      // Инициализация провайдера Ethers.js для MetaMask
      provider = new BrowserProvider(window.ethereum);

      // Получение Signer (MetaMask предложит выбрать аккаунт)
      user = await provider.getSigner();
      const userAddress = await user.getAddress();
      
      // Проверка и переключение сети
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== NETWORK_CONFIG.chainId) {
        // Запрос переключения на Hardhat Localhost (31337)
        await switchToPrivateNetwork(); 
        
        // Переинициализация после переключения сети
        provider = new BrowserProvider(window.ethereum);
        user = await provider.getSigner();
      }

      // Инициализация контрактов (подключаем Signer для отправки транзакций)
      if (contractAddress) {
        // Контракт на торговом автомате
        contract = new Contract(contractAddress, vendingMachineABI, user);
      }
      if (tokenAddress) {
        // Контракт токена
        tokenContract = new Contract(tokenAddress, customTokenABI, user);
      }
      
      updateUI(userAddress);
      loadItems();
      loadHistory(userAddress);
      loadBalance(userAddress);
      
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      alert("Error connecting to wallet: " + (error.message || error.code));
    }
  } else {
    alert("Please install MetaMask to use this DApp!");
  }
});

async function switchToPrivateNetwork() {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x' + NETWORK_CONFIG.chainId.toString(16) }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [NETWORK_CONFIG],
        });
      } catch (addError) {
        console.error("Error adding network:", addError);
        throw addError;
      }
    } else {
      throw switchError;
    }
  }
}

function updateUI() {
  const userElement = document.getElementById("user-address");
  if (userElement) {
    userElement.textContent = `Connected: ${user}`;
  }
}

async function loadItems() {
  if (!contract) {
    document.getElementById("items").innerHTML = "<h2>Items</h2><p>Please deploy contracts first</p>";
    return;
  }
  
  try {
    const items = await contract.methods.getItems().call();
    const container = document.getElementById("items");
    container.innerHTML = "<h2>Available Items</h2>";
    
    if (items.length === 0) {
      container.innerHTML += "<p>No items available. Add some items if you're the owner!</p>";
      return;
    }
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const price = await contract.methods.itemPrices(i).call();
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";
      itemDiv.innerHTML = `
        <h3>${item}</h3>
        <p>Price: ${web3.utils.fromWei(price, 'ether')} CTK</p>
        <button onclick="purchaseItem(${i})">Buy</button>
      `;
      container.appendChild(itemDiv);
    }
  } catch (error) {
    console.error("Error loading items:", error);
    document.getElementById("items").innerHTML = "<h2>Items</h2><p>Error loading items</p>";
  }
}

async function purchaseItem(index) {
  if (!contract || !tokenContract) {
    alert("Contracts not initialized");
    return;
  }
  
  try {
    const price = await contract.methods.itemPrices(index).call();
    const balance = await tokenContract.methods.balanceOf(user).call();
    
    if (web3.utils.toBN(balance).lt(web3.utils.toBN(price))) {
      alert("Insufficient token balance!");
      return;
    }
    
    // First approve the vending machine to spend tokens
    const approveTx = await tokenContract.methods.approve(contractAddress, price).send({
      from: user,
      gas: 210000
    });
    console.log("Approve transaction:", approveTx.transactionHash);
    
    // Then purchase the item
    const purchaseTx = await contract.methods.purchase(index).send({
      from: user,
      gas: 210000
    });
    
    alert(`Purchase successful! Transaction: ${purchaseTx.transactionHash}`);
    loadHistory();
    loadBalance();
  } catch (error) {
    console.error("Purchase error:", error);
    alert("Purchase failed: " + error.message);
  }
}

async function loadHistory() {
  if (!contract) {
    document.getElementById("history").innerHTML = "<h2>Purchase History</h2><p>Contracts not initialized</p>";
    return;
  }
  
  try {
    const purchases = await contract.methods.getMyPurchases().call({ from: user });
    const container = document.getElementById("history");
    container.innerHTML = "<h2>My Purchase History</h2>";
    
    if (purchases.length === 0) {
      container.innerHTML += "<p>No purchases yet</p>";
    } else {
      const list = document.createElement("ul");
      purchases.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        list.appendChild(listItem);
      });
      container.appendChild(list);
    }
  } catch (error) {
    console.error("Error loading history:", error);
    document.getElementById("history").innerHTML = "<h2>Purchase History</h2><p>Error loading history</p>";
  }
}

async function loadBalance() {
  if (!tokenContract) {
    const balanceElement = document.getElementById("balance");
    if (balanceElement) {
      balanceElement.textContent = "Balance: Contracts not initialized";
    }
    return;
  }
  
  try {
    const balance = await tokenContract.methods.balanceOf(user).call();
    const balanceElement = document.getElementById("balance");
    if (balanceElement) {
      balanceElement.textContent = `Token Balance: ${web3.utils.fromWei(balance, 'ether')} CTK`;
    }
  } catch (error) {
    console.error("Error loading balance:", error);
    const balanceElement = document.getElementById("balance");
    if (balanceElement) {
      balanceElement.textContent = "Balance: Error loading";
    }
  }
}

// Owner functions
async function addItem() {
  if (!contract) {
    alert("Contract not initialized");
    return;
  }
  
  const itemName = document.getElementById("item-name").value;
  const itemPrice = document.getElementById("item-price").value;
  
  if (!itemName || !itemPrice) {
    alert("Please enter both item name and price");
    return;
  }
  
  try {
    const priceInWei = web3.utils.toWei(itemPrice, 'ether');
    const tx = await contract.methods.addItem(itemName, priceInWei).send({
      from: user,
      gas: 210000
    });
    
    alert(`Товар добавлен! Transaction: ${tx.transactionHash}`);
    document.getElementById("item-name").value = "";
    document.getElementById("item-price").value = "";
    loadItems();
  } catch (error) {
    console.error("Ошибка в добавлении товара:", error);
    alert("Не могу добавить товар: " + error.message);
  }
}

async function removeItem() {
  if (!contract) {
    alert("Contract not initialized");
    return;
  }
  
  const itemIndex = document.getElementById("remove-index").value;
  
  if (itemIndex === "") {
    alert("Please enter item index");
    return;
  }
  
  try {
    const tx = await contract.methods.removeItem(parseInt(itemIndex)).send({
      from: user,
      gas: 210000
    });
    
    alert(`Товар удален! Transaction: ${tx.transactionHash}`);
    document.getElementById("remove-index").value = "";
    loadItems();
  } catch (error) {
    console.error("Ошибка удаления товара:", error);
    alert("Failed to remove item: " + error.message);
  }
}
