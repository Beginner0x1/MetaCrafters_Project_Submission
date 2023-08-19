# Decetralized Application - "Hipo Hipo World"

## Project Description

The Ethereum App is a React application that demonstrates how to connect and interact with the Ethereum blockchain using the MetaMask wallet extension. Through a user-friendly interface, the app allows users to fetch and set greeting messages on the Ethereum blockchain while also displaying their account balance in Ether.

## Detailed Explanations

At the beginning of the code, you'll notice import statements. These are like doors that open to various tools and functionalities. React helps build the app's user interface, ethers facilitates communication with the Ethereum blockchain, and the Greeter JSON artifact provides a bridge to our smart contract's functions.

Moving on, we define the greeterAddress variable. This is crucial because it holds the Ethereum address of our smart contract. Think of it as a map directing the app to where the contract exists on the blockchain. Then, we use React's useState hook to initialize several state variables. These variables serve as storage for different types of data, including Ethereum wallet connections, user accounts, input messages, current greetings, connectivity status, and account balances.

As we delve into the useEffect section, we find a pivotal part of the app's lifecycle. Inside it, an asynchronous function named init() takes the stage. Its primary job is to check if MetaMask, a browser extension, is available. If it is, a provider is created using ethers.providers.Web3Provider, forging a link to the Ethereum network. Utilizing provider.listAccounts(), we gather a list of connected accounts. When an account is found, the provider is stored, the first account is noted, and the connection status is marked as true. Importantly, the fetchBalance function is summoned to retrieve and showcase the account's balance.

Now, let's uncover the workings of the fetchBalance function. This function is key to the app's interaction with Ethereum. It fetches the account's balance. It employs provider.getBalance(account) to acquire the balance in Wei, Ethereum's smallest unit. To make it comprehensible, ethers.utils.formatEther converts the balance from Wei to Ether. The resulting balance is stored in the balance state variable, which will be displayed within the app's interface.

Transitioning to the fetchGreeting function, its role is to retrieve the greeting message stored in the smart contract. This function comes into play when MetaMask is successfully connected. Using the ethers.Contract class, we create a connection to the smart contract. By calling the contract's greet function, we retrieve the greeting message, which is then stored in the currentGreeting state variable.

Let's move on to the intriguing setGreeting function. Triggered by clicking the "Set Greeting" button, this function starts by verifying if a message has been entered, if the Ethereum wallet is connected, and if there's an active account. When these conditions are met, the function connects to MetaMask. It uses the wallet's private key to sign transactions. An instance of the contract is established using ethers.Contract. Interaction with the smart contract's setGreeting function updates the blockchain. After confirmation, the displayed greeting and balance are both updated.

When MetaMask hasn't been connected yet, the app provides a convenient "Connect with MetaMask" button. Activating this button triggers the requestAccount function. This function uses MetaMask's Ethereum provider to ask for permission to access Ethereum accounts. Once granted, the user's account address is stored in the account state variable, indicating successful connection.

Finally, let's talk about the app's end result. Upon successful connection, the user's Ethereum account address is displayed. The interface showcases buttons to fetch and set greeting messages. An input field allows users to input a new message. Notably, the current account balance in Ether is also displayed, along with the currently uploaded greeting message.


## Getting Started 

```shell

git clone repo_url
cd repo
npm i
npm install --save-dev hardhat
npx hardhat compile
npx hardhat node
node scripts/sample-script.js
npx hardhat help

```
