## Project Objective 

For this challenge, let's review structs, which you learned about in the last module. Deploy a new contract that has a Struct of your choosing inside of it (must be different than Profile). Create a dictionary or array that contains the Struct you defined. Create a function to add to that array/dictionary. Add a transaction to call that function in step 3. Add a script to read the Struct you defined. Post your code on GitHub.

## Contract: Introduction 

```solidity
pub contract CryptoCoinRecord {

    pub var coin: {Address: Record}

    pub struct Record {

        pub let token_name: String
        pub let token_owner: String
        pub let token_id: String
        pub let token_value: Int
        pub let account: Address

        init(_token_name: String, _token_owner: String, _token_id: String, _token_value: Int, _account: Address) {

            self.token_name = _token_name
            self.token_owner = _token_owner
            self.token_id = _token_id
            self.token_value = _token_value
            self.account = _account
        }
    }

    pub fun newRecord(token_name: String, token_owner: String, token_id: String, token_value: Int, account: Address) {
        let newcoin = Record(_token_name: token_name, _token_owner: token_owner, _token_id: token_id, _token_value: token_value, _account: account)
        self.coin[account] = newcoin
    }

    init() {
        self.coin = {}
    }
}
```

The CryptoCoinRecord contract introduces a structured record-keeping mechanism for cryptocurrency-related information. The contract employs a struct named Record that encapsulates essential details about a token, including its name, owner, ID, value, and associated account address. The contract maintains a public dictionary called coin, where each entry is identified by an address and corresponds to a specific Record instance.

Additionally, the contract provides a constructor to initialize the coin dictionary, ensuring an empty state upon deployment. It also includes a public function newRecord, allowing users to add new cryptocurrency records by specifying the token's attributes. This function creates a new Record instance and associates it with the provided account address in the coin dictionary.

In summary, the CryptoCoinRecord contract serves as a decentralized ledger for tracking and managing cryptocurrency-related data, providing a flexible and transparent approach to record-keeping within a blockchain environment.


## Script: Introduction 

```solidity
import CryptoCoinRecord from 0x05

pub fun main(account: Address): CryptoCoinRecord.Record {
    return CryptoCoinRecord.coin[account]!
}
```
The code snippet imports the CryptoCoinRecord contract from address 0x05 and defines a main function that takes an account address as an argument. The main function retrieves and returns the cryptocurrency record associated with the provided account address from the CryptoCoinRecord contract's coin dictionary. This simple yet crucial functionality enables users to access specific cryptocurrency records stored on the blockchain, providing a convenient means of retrieving essential information about a particular token within the system.

## Transactions: Introduction 

```solidity
import CryptoCoinRecord from 0x05

transaction(token_name: String, token_owner: String, token_id: String, token_value: Int, account: Address)
{
    prepare(signer:AuthAccount)
    {

    }
    execute
    {
        CryptoCoinRecord.newRecord(token_name: token_name, sector: token_owner, token_id: token_id, token_value: token_value, account: account)
        log("Details Stored")
    }
}
```

The provided code snippet features a transaction that interacts with the CryptoCoinRecord contract deployed at address 0x05. This transaction is designed to facilitate the addition of a new cryptocurrency record to the ledger. The transaction accepts parameters such as token_name, token_owner, token_id, token_value, and account.

Within the prepare block, it specifies that the transaction must be prepared by the signer, which is identified by the AuthAccount. The execute block contains the logic for creating a new cryptocurrency record using the CryptoCoinRecord.newRecord function, passing the provided parameters. Additionally, a log statement is included to record the successful storage of details.

In essence, this transaction allows users to store essential information about a cryptocurrency, contributing to the decentralized and transparent ledger maintained by the CryptoCoinRecord contract at the specified address.


## Steps To Reproduce 

```
Open Flow Playground and go to Flow Playground.
Connect to a wallet, either the default Flow Emulator wallet or another provider.
Deploy the CryptoCoinRecord contract by pasting its code into the playground and assigning it an address (e.g., 0x05).
Navigate to the "Transactions" tab on the left sidebar.
Click "Create New" to start a new transaction.
Update the contract address to match the deployed CryptoCoinRecord.
Set values for token_name, token_owner, token_id, token_value, and account.
Click "Run Transaction" to execute the transaction.
Check the console for any errors and ensure the log statement confirms "Details Stored."
```










