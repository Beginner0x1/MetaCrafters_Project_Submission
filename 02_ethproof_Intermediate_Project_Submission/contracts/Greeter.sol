//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;
    uint256 public balance;

    constructor(string memory _greeting, uint initBalance) {

        console.log("Deploying a Greeter with greeting:", _greeting);
        console.log("Deploying a balance");
        balance = initBalance;
        greeting = _greeting;
    }


    function getbalance() public view returns(uint256){
        return balance;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}
