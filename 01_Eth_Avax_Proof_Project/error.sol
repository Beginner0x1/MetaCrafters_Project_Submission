// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ErrorHandlingExample {

    uint256 public balance = 1000;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function deposit(uint256 amount) public {

        require(amount > 0, "Amount must be greater than 0");
        balance += amount;
    }

    function withdraw(uint256 amount) public {

        require(msg.sender == owner, "Only the owner can withdraw");
        require(amount > 0, "Amount must be greater than 0");
        require(balance >= amount, "Insufficient balance");
        balance -= amount;
    }

    function assertExample(uint256 a, uint256 b) public pure returns (uint256) {
        
        assert(a >= b);
        return a - b;
    }

    function revertExample(uint256 a, uint256 b) public pure returns (uint256) {
        
        if (a >= b) {
            revert("a must be greater than or equal to b");
        }

        return a - b;
    }
}
