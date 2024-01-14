## Project Introduction 

This project aims to enhance an existing NFT smart contract by introducing a new function called borrowAuthNFT. This function will be designed to provide public access to read the metadata of NFTs stored on the blockchain. The project involves setting up accounts, minting NFTs, and creating scripts to demonstrate the functionality.

## Features:

**borrowAuthNFT Function:**

The borrowAuthNFT function will be added to the existing smart contract.
It allows external users to access and read the metadata of NFTs by providing a specific NFT ID.

**Public Accessibility:**

The smart contract will be modified to ensure that the borrowAuthNFT function is publicly accessible.
Proper access controls will be implemented to manage permissions and prevent unauthorized access.

**Script for NFT Metadata Display:**

A script will be developed to interact with the smart contract and demonstrate the functionality of borrowAuthNFT.
Users can input a specific NFT ID, and the script will display the associated metadata.
Transaction Setup:

Smart contract deployment transactions will be included in the project to set up the required accounts and initialize the NFT contract.

## Contract Code Introduction 

```cadence
import NonFungibleToken from 0x05
pub contract CryptoPoops: NonFungibleToken {
  pub var totalSupply: UInt64

  pub event ContractInitialized()
  pub event Withdraw(id: UInt64, from: Address?)
  pub event Deposit(id: UInt64, to: Address?)

  pub resource NFT: NonFungibleToken.INFT {
    pub let id: UInt64

    pub let name: String
    pub let favouriteFood: String
    pub let luckyNumber: Int

    init(_name: String, _favouriteFood: String, _luckyNumber: Int) {
      self.id = self.uuid

      self.name = _name
      self.favouriteFood = _favouriteFood
      self.luckyNumber = _luckyNumber
    }
  }

  pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic {
    pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}
    

    pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
        let nft <- self.ownedNFTs.remove(key: withdrawID) 
                ?? panic("This NFT does not exist in this Collection.")
        emit Withdraw(id: nft.id, from: self.owner?.address)
        return <- nft
    }

    pub fun deposit(token: @NonFungibleToken.NFT) {
        let nft <- token as! @NFT
        emit Deposit(id: nft.id, to: self.owner?.address)
        self.ownedNFTs[nft.id] <-! nft
    }

    pub fun getIDs(): [UInt64] {
        return self.ownedNFTs.keys
    }

    pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
        return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
    }

    pub fun borrowAuthNFT(id: UInt64): &NFT {
      let ref = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
      return ref as! &NFT
    }

    init() {
      self.ownedNFTs <- {}      
    }

    destroy() {
      destroy self.ownedNFTs
    }
  }

  pub fun createEmptyCollection(): @NonFungibleToken.Collection {
    return <- create Collection()
  }

  pub resource Minter {

    pub fun createNFT(name: String, favouriteFood: String, luckyNumber: Int): @NFT {
      return <- create NFT(_name: name, _favouriteFood: favouriteFood, _luckyNumber: luckyNumber)
    }

    pub fun createMinter(): @Minter {
      return <- create Minter()
    }

  }

  init() {
    self.totalSupply = 0
    emit ContractInitialized()
    self.account.save(<- create Minter(), to: /storage/Minter)
  }
}
```
A smart contract named CryptoPoops inheriting from the 0x05 version of NonFungibleToken. This contract introduces an NFT resource with properties like name, favorite food, and lucky number. Additionally, it includes a collection resource to manage ownership of NFTs, enabling withdrawal, deposit, and retrieval of NFTs by ID. The contract incorporates a Minter resource for NFT creation and Minter instantiation. Notably, the borrowAuthNFT function provides authenticated access to owned NFTs. Upon initialization, the contract sets total supply to zero, emits a ContractInitialized event, and saves a Minter instance to storage. Overall, the contract establishes a flexible NFT framework with access control and comprehensive functionalities

## Transactions & Scripts: How they play a major Role

the transaction and script play pivotal roles in the interaction with the CryptoPoops smart contract, which utilizes the NonFungibleToken standard from version 0x05. Let's break down their roles:

**Transaction:**
The transaction is responsible for minting a new NFT and depositing it into the recipient's collection. It imports the necessary contracts, including NonFungibleToken and CryptoPoops. The prepare block, executed by the signer (authenticated account), fetches the Minter resource from storage and the public reference to the recipient's collection. It then creates a new NFT using the Minter's createNFT function with the provided parameters. Finally, the transaction deposits the newly minted NFT into the recipient's collection using the deposit function of the public reference. The execute block logs a message indicating the successful minting and deposit.

**Script:**
The script plays a crucial role in retrieving information from the blockchain. In this case, the script is designed to retrieve the IDs of NFTs owned by a specific account. It imports the required contracts, and the main function takes an account address as a parameter. Inside the function, it borrows the public reference to the CryptoPoops collection associated with the provided address. Using this reference, the script calls the getIDs function, which returns an array of UInt64 representing the IDs of NFTs owned by the specified account. This script provides a simple yet essential way to query and display the NFT IDs associated with a particular account.
