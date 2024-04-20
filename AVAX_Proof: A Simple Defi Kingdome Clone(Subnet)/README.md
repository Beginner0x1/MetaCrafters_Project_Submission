# Project Introduction: Building a Sample DeFi Kingdom Clone on Avalanche

Welcome to the frontier of blockchain-based gaming, where we embark on an exhilarating journey to create a DeFi Kingdom clone on Avalanche. In this digital realm, players will immerse themselves in a world of collecting, building, and battling with digital assets, all while reaping rewards through engaging gameplay mechanics.

Please note that in this discussion, we will not be delving into the intricacies of how DeFi works or how to generate value for our users. While understanding these aspects is crucial, our current focus is on setting up an EVM subnet on Avalanche and deploying foundational smart contracts for building a DeFi Kingdom clone. To maintain clarity and stay on track, we'll concentrate on these fundamental tasks as we embark on our journey towards establishing a thriving DeFi empire.

Here's an overview of the steps you need to take:

**Set up your EVM subnet:** Utilize our guide and refer to the Avalanche documentation to create a custom EVM subnet on the Avalanche network.
**Define your native currency:** Establish your own native currency, serving as the in-game currency for your DeFi Kingdom clone.
**Connect to Metamask:** Seamlessly connect your EVM Subnet to Metamask by following the steps outlined in our guide.
**Deploy basic building blocks:** Utilize Solidity and Remix to deploy essential smart contracts for your game, including contracts for battling, exploring, and trading. These contracts will delineate game rules, liquidity pools, tokens, and more, laying the foundation for your DeFi gaming experience.

# Avalanche Subnet 

An Avalanche subnet is a customized, independent blockchain network within the broader Avalanche network. It operates as a distinct entity with its own set of rules, consensus mechanisms, and token economics. Subnets on Avalanche are highly flexible and scalable, allowing developers to create specialized environments tailored to specific use cases or applications.

The fastest way to install the latest Avalanche-CLI binary is by running the install script:

```curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s```

An create an Ethereum Virtual Machine (EVM) based Subnet. To do so, you use Subnet-EVM, Avalanche's Subnet fork of the EVM. It supports airdrops, custom fee tokens, configurable gas parameters, and multiple stateful precompiles. To learn more, take a look at Subnet-EVM. The goal of your first command is to create a Subnet-EVM configuration.

```
Subnet EVM
https://github.com/ava-labs/subnet-evm
```

**Create a new subnet:** Once you have the Avalanche CLI installed, you can create a new subnet by running the command avalanche subnet create mySubnet in your terminal. This will create a new subnet with the name "mySubnet" on your local machine.

Select the EVM Subnet option and configure: When creating a new subnet, you will be prompted to select a subnet type. Choose the SubnetEVM option to create an EVM Subnet on your local machine

```terminal
avalanche subnet create mySubnet
Attempted to check if a new version is available, but couldn't find the currently running version information
Make sure to follow official instructions, or automatic updates won't be available for you
✔ Subnet-EVM
creating subnet mySubnet
Enter your subnet's ChainId. It can be any positive integer.
ChainId: 12345567
Select a symbol for your subnet's native token
Token symbol: MYSUBNET
✔ Use latest version
✔ Low disk use    / Low Throughput    1.5 mil gas/s (C-Chain's setting)
✔ Airdrop 1 million tokens to the default address (do not use in production)
✔ No
```

**Deploy the subnet:** After selecting the EVM Subnet option, you can deploy the subnet by running the command avalanche subnet deploy mySubnet and selecting to deploy your subnet on your local network. This will deploy your new EVM Subnet on your local machine.

**View subnet details:** Once your EVM Subnet is deployed, the console will display all the details about the subnet you just created. You can use this information to interact with the subnet and start building your smart-contract protocol.


# ERC20 Contract Explanation 

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ERC20 {
    uint public totalSupply;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;
    string public name = "Solidity by Example";
    string public symbol = "SOLBYEX";
    uint8 public decimals = 18;

		event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    function transfer(address recipient, uint amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function mint(uint amount) external {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }

    function burn(uint amount) external {
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }
}
```


The Contract facilities a ERC20 token standard, which is a widely used standard for fungible tokens on the Ethereum blockchain. Here's a basic explanation of its main features:

**Variables:**</br>

totalSupply: This variable keeps track of the total supply of tokens.
balanceOf: A mapping that stores the balance of each address.
allowance: A mapping that records the amount of tokens approved by one address to be spent by another address.
name, symbol, decimals: These variables define the name, symbol, and decimals of the token.

**Events:**</br>

Transfer: This event is emitted whenever tokens are transferred from one address to another.
Approval: This event is emitted whenever an approval is made for one address to spend tokens on behalf of another address.

**Functions:**</br>

transfer: Transfers tokens from the caller's address to the specified recipient.
approve: Approves another address to spend tokens on behalf of the caller.
transferFrom: Transfers tokens from one address to another, but with the allowance mechanism.
mint: Creates new tokens and adds them to the caller's balance.
burn: Destroys tokens from the caller's balance.

# Vault Contract Explanation 

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

contract Vault {
    IERC20 public immutable token;

    uint public totalSupply;
    mapping(address => uint) public balanceOf;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function _mint(address _to, uint _shares) private {
        totalSupply += _shares;
        balanceOf[_to] += _shares;
    }

    function _burn(address _from, uint _shares) private {
        totalSupply -= _shares;
        balanceOf[_from] -= _shares;
    }

    function deposit(uint _amount) external {
        /*
        a = amount
        B = balance of token before deposit
        T = total supply
        s = shares to mint

        (T + s) / T = (a + B) / B 

        s = aT / B
        */
        uint shares;
        if (totalSupply == 0) {
            shares = _amount;
        } else {
            shares = (_amount * totalSupply) / token.balanceOf(address(this));
        }

        _mint(msg.sender, shares);
        token.transferFrom(msg.sender, address(this), _amount);
    }

    function withdraw(uint _shares) external {
        /*
        a = amount
        B = balance of token before withdraw
        T = total supply
        s = shares to burn

        (T - s) / T = (B - a) / B 

        a = sB / T
        */
        uint amount = (_shares * token.balanceOf(address(this))) / totalSupply;
        _burn(msg.sender, _shares);
        token.transfer(msg.sender, amount);
    }
}
```

In Vault, starting with interface named IERC20 and a contract Vault, which interacts with ERC20 tokens. 

**Interface IERC20:**
_This interface declares the standard functions required by ERC20 tokens:_

totalSupply(): Returns the total supply of the token.
balanceOf(address account): Returns the balance of the specified account.
transfer(address recipient, uint amount): Transfers tokens from the caller's address to the specified recipient.
allowance(address owner, address spender): Returns the amount of tokens approved by the owner to be spent by the spender.
approve(address spender, uint amount): Approves another address to spend tokens on behalf of the caller.
transferFrom(address sender, address recipient, uint amount): Transfers tokens from one address to another, using the allowance mechanism.
Transfer(address indexed from, address indexed to, uint value): Event emitted when tokens are transferred.
Approval(address indexed owner, address indexed spender, uint value): Event emitted when an approval is made.

**Contract Vault:**
_This contract manages deposits and withdrawals of ERC20 tokens._

It has an immutable variable token of type IERC20, representing the ERC20 token contract address.
totalSupply stores the total number of shares in the vault.
balanceOf maps addresses to their corresponding share balances in the vault.
constructor(address _token): Initializes the contract with the address of the ERC20 token.
_mint(address _to, uint _shares): Private function to mint shares and update balances.
_burn(address _from, uint _shares): Private function to burn shares and update balances.
deposit(uint _amount): Allows users to deposit ERC20 tokens into the vault in exchange for shares.
withdraw(uint _shares): Allows users to withdraw ERC20 tokens from the vault by burning shares.







