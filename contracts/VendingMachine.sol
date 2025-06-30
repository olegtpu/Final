// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface ICustomToken {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract VendingMachine {
    address public owner;
    ICustomToken public token;
    string[] public items;
    mapping(uint => uint) public itemPrices;
    mapping(address => string[]) public purchases;

    event ItemAdded(string item, uint price);
    event ItemRemoved(string item);
    event ItemPurchased(address buyer, string item, uint price);

    constructor(address tokenAddress) {
        owner = msg.sender;
        token = ICustomToken(tokenAddress);
    }

    function addItem(string memory _item, uint _price) public {
        require(msg.sender == owner, "Only owner");
        items.push(_item);
        itemPrices[items.length - 1] = _price;
        emit ItemAdded(_item, _price);
    }

    function removeItem(uint index) public {
        require(msg.sender == owner, "Only owner");
        require(index < items.length, "Invalid index");
        string memory item = items[index];
        
        // Move the last item to the removed position
        items[index] = items[items.length - 1];
        itemPrices[index] = itemPrices[items.length - 1];
        
        // Remove the last item
        items.pop();
        delete itemPrices[items.length];
        
        emit ItemRemoved(item);
    }

    function purchase(uint index) public {
        require(index < items.length, "Invalid item");
        uint price = itemPrices[index];
        require(token.transferFrom(msg.sender, address(this), price), "Transfer failed");
        purchases[msg.sender].push(items[index]);
        emit ItemPurchased(msg.sender, items[index], price);
    }

    function getItems() public view returns (string[] memory) {
        return items;
    }

    function getMyPurchases() public view returns (string[] memory) {
        return purchases[msg.sender];
    }

    function getTokenBalance(address user) public view returns (uint) {
        return token.balanceOf(user);
    }

    function getMyBalance() public view returns (uint) {
        return token.balanceOf(msg.sender);
    }
}
