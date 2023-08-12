//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {

    constructor(string memory _Token_Name, string memory _Token_Symbol) ERC20(_Token_Name, _Token_Symbol) {
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    } 

    function burn(uint256 _amount) public {
        _burn(msg.sender, _amount);
    }
}