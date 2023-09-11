## Degen-Token-ERC-20-Contract

The "DegenGaming" smart contract represents a robust and versatile Ethereum-based solution designed for gaming purposes within the Avalanche Fuji Test Network. 
This contract serves as a foundational building block for creating immersive gaming experiences, enabling game developers to manage in-game assets, tokens, and transactions seamlessly. 
Made for Eth + Avax Intermediate Module 4 Project on the Metacrafters learning platform.

Let's delve into the salient features of this contract:

**Key Features:**

**Token Minting (Mint Function):**

One of the central features of the contract is the ability to mint tokens, which can be achieved using the mint function.
Minting tokens increases the overall token supply and allocates the newly minted tokens to a specific user's address.
This functionality is instrumental for game developers as it allows them to generate in-game currency or rewards and distribute them to players as needed.

**Token Burning (Burn Function):**

Users are empowered to burn (permanently remove from circulation) their own tokens through the burn function.
The process of token burning reduces the total token supply, providing flexibility for implementing various mechanisms within the game. For example, it can be used to simulate the removal of currency from circulation or introduce deflationary dynamics.
**In-Game Item Store (GameStore Function):**

The contract features an in-game item store that can be managed by the contract owner.
The owner can use the GameStore function to add items to the store, each with a unique identifier, a name, and a price.
This functionality lays the groundwork for the creation of a virtual marketplace within the game, allowing players to purchase items using tokens.

**Token Transfers (Transfer Function):**

Users can transfer tokens to other players using the transfer function.
This peer-to-peer token transfer mechanism enables in-game transactions, facilitating the exchange of currency or items among players.

**Item Redemption (Itemredeem Function):**

A notable feature is the ability for users to redeem in-game items from the store in exchange for tokens.
The Itemredeem function facilitates this process, deducting the required token amount from the user's balance and marking the item as redeemed.
This enhances the interactive gaming experience, allowing players to acquire virtual assets within the game.

**Balances and Redemption Tracking:**

The contract maintains a balance of tokens for each user through the balance mapping, ensuring transparency regarding token holdings.
Additionally, it tracks the items that each user has redeemed and their respective counts using redeemedItems and redeemedItemCount mappings.

The "DegenGaming" smart contract demonstrates a comprehensive set of functionalities, making it a valuable tool for game developers looking to implement blockchain-based gaming features, manage in-game economies, 
and provide players with engaging gaming experiences on the Avalanche Fuji Test Network.

## Getting Started With Remix

```
To execute this program and interact with the "DegenGaming" smart contract on the Avalanche Fuji Testnet, follow these steps:

Ensure Connection to Avalanche Fuji Testnet:

Make sure your metamask are connected to the Avalanche Fuji Testnet using your MetaMask wallet, and you have some test AVAX (Avalanche's native cryptocurrency) in your wallet to use for transactions.

Use Remix Solidity IDE:

To run the program, you can use Remix, an online Solidity Integrated Development Environment (IDE). Access Remix by visiting the Remix website at https://remix.ethereum.org/.

Create a New Solidity File:

Once you are on the Remix website, create a new Solidity file by clicking on the "+" icon located in the left-hand sidebar.
Save the newly created file with a .sol extension, for example, "DegenGaming.sol."

Copy and Paste the Contract Code:

Copy the code from the "DegenGaming.sol" file (or "token.sol" file) that you want to execute.
Paste the copied code into your newly created "DegenGaming.sol" file in Remix.

Compile the Contract:

Click on the "Solidity Compiler" tab located in the left-hand sidebar.
Ensure that the "Compiler" option is set to the latest Solidity version (or another compatible version).
Click the "Compile" button to compile the contract code.

Deploy the Contract:

After successful compilation, Before deploying a smart contract, You have to connect remix with your wallet, then navigate to the "Deploy & Run Transactions" tab in the left-hand sidebar.
Select your contract from the dropdown menu, which should be named "DegenGaming" or similar.
Click the "Deploy" button to initiate the contract deployment process.

Enter the Contract Address:

Once the contract is deployed, you will receive a contract address. In the "At Address" input field, enter the contract address.

Interact with the Contract:

With the contract address entered, you can now interact with the deployed "DegenGaming" smart contract.

You can call various functions of the contract, such as minting tokens, burning tokens, transferring tokens, and more, directly within Remix without needing to specify the contract address since it has already been set.
By following these steps, you can execute and interact with the "DegenGaming" smart contract on the Avalanche Fuji Testnet using the Remix Solidity IDE.
```


