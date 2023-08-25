## Project Description

Welcome to our project that combines the power of Ethereum smart contracts and React to create a decentralized ATM (DApp). In this project, I'll guide you through the process of developing a user-friendly interface that interacts with a smart contract deployed on the Ethereum hardhat blockchain. This DApp will allow users to perform actions like depositing and withdrawing funds, checking ownership, and accessing real-time data such as their account balance and the current timestamp.

## Key Features:

    MetaMask Integration: We'll integrate MetaMask, a popular Ethereum wallet browser extension, to enable secure and seamless connections to the Ethereum network.

    Smart Contract Interaction: Through the Ethereum smart contract, we'll facilitate secure and transparent financial operations. Users will be able to deposit and withdraw funds seamlessly.

    Real-time Data Updates: The DApp will display real-time data, including the user's account balance and the current timestamp from the Ethereum blockchain.

    Ownership Verification: Our DApp will have the functionality to check ownership of the smart contract. Users will be able to verify if they are the rightful owner.

    User-Friendly Interface: The user interface will be built using React, ensuring a modern and intuitive experience for users interacting with the decentralized ATM.

## How It Works:

    Connecting to Ethereum Wallet: Users will connect their Ethereum wallet (like MetaMask) to the DApp. This will enable them to interact with the smart contract using their Ethereum account.

    Viewing Account Balance: Users can view their account balance in the DApp interface. The balance is fetched from the smart contract, providing real-time information.

    Depositing and Withdrawing Funds: Users will be able to deposit and withdraw funds securely through the smart contract. Each action will trigger a transaction on the Ethereum blockchain.

    Ownership Verification: The DApp will allow users to check if they are the owner of the smart contract, providing transparency and control over contract ownership.

    Current Timestamp Display: The DApp will display the current timestamp fetched from the Ethereum blockchain, giving users access to accurate timing information.

    Ownership Transfer: Users with ownership can transfer it to another Ethereum address, ensuring flexibility in managing the smart contract

## Smart Contract Explanation

This smart contract is meticulously designed to bring the functionality of an ATM to the Ethereum blockchain, enabling users to engage in financial transactions securely and transparently.

The contract is structured with key state variables that dictate its behavior and interactions. The owner variable is a crucial element, storing the Ethereum address of the contract's owner. This address holds special privileges within the contract, including the ability to transfer ownership and perform certain authorized actions. Alongside this, the balance variable serves as a repository for the total funds available within the contract, forming the basis for all deposit and withdrawal operations.

To enhance the transparency of the contract's operations, events are emitted at significant moments. The Deposit event is triggered whenever a user deposits funds into the contract, including the specific amount deposited as a parameter. Similarly, the Withdraw event is emitted when a user initiates a withdrawal, carrying information about the withdrawn amount. For any change in ownership, the OwnershipTransferred event is used, indicating both the previous and new owner's Ethereum addresses.

The contract's functions define its core functionalities and user interactions. Upon deployment, the constructor initializes the contract, setting the initial balance and designating the deploying address as the owner. Users can query the current balance of the contract using the getBalance() function, providing a transparent overview of the available funds.

Depositing funds is made possible through the deposit() function, which increases the contract's balance based on the amount deposited. To ensure the integrity of the contract's balance, the withdraw() function allows users to initiate withdrawals, taking into account the requested withdrawal amount and the contract's available balance. Importantly, it prevents users from withdrawing more than the available balance, thus maintaining the contract's financial stability.

The contract also offers utility functions, such as getCurrentTimestamp() which provides the current timestamp from the Ethereum blockchain, and getGasPrice() which returns the gas price for the ongoing transaction. Additionally, the isOwner() function allows verification of whether a given address matches the contract's owner.

For transferring ownership, the transferOwnership() function grants the current owner the authority to transfer ownership to another Ethereum address. The function validates the new owner's address to ensure its legitimacy before initiating the transfer. Notably, the event OwnershipTransferred is emitted to record this change, enhancing transparency.

The contract is fortified with a custom error mechanism. The InsufficientBalance error is triggered if a user attempts to withdraw an amount exceeding the available balance, ensuring the contract's robustness and error handling capabilities.

## After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/
