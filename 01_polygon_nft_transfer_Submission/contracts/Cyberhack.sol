// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";

contract Cyberhack is ERC721A {
    address public owner;

    uint256 public maxQuantity = 5;

    string baseUrl =
        "https://gateway.pinata.cloud/ipfs/QmNWaf1UoqCsDgJinH8w1Qgj8hZf51fjd3h53fT2aJLr52";

    string public prompt = "Next-Gen hacker seamlessly melds advanced artificial intelligence algorithms with unparalleled cyber expertise";

    constructor() ERC721A("Hacker", "AI") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner have power to Mint new Tokens");
        _;
    }

    function mint(uint256 quantity) external payable onlyOwner {
        require(
            totalSupply() + quantity <= maxQuantity,
            "You Don't have to much power to mint more than 5 NFTs"
        );
        _mint(msg.sender, quantity);
    }

    function getBalance(address _owner) external view returns (uint256) {
        return balanceOf(_owner);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUrl;
    }

    function promptDescription() external view returns (string memory) {
        return prompt;
    }
}

