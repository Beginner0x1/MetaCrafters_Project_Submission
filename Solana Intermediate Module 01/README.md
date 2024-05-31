# Introduction To Solana Native Contract

Solana Native Contracts, known as programs, are decentralized applications executed directly on the Solana blockchain. These programs leverage Solana's high-throughput, low-latency architecture to deliver scalable, performant, and cost-effective on-chain functionalities. Written in Rust or C, Solana programs are designed to optimize resource usage and ensure security, making them suitable for complex financial operations, decentralized finance (DeFi) platforms, non-fungible tokens (NFTs), and other blockchain-based applications. 

# Project Objective

Write a simple contract in Rust for Solana that acts as a calculator and stores the final result of the operation in a program account.

# Solana Contract Structure

```rust
│ ├─ lib.rs -> registering modules

│ ├─ entrypoint.rs -> entrypoint to the program

│ ├─ instruction.rs -> program API, (de)serializing instruction data

│ ├─ processor.rs -> program logic

│ ├─ state.rs -> program objects, (de)serializing state

│ ├─ error.rs -> program specific errors
```

1. Someone calls the _**entrypoint**_
2. The entrypoint forwards the arguments to the processor
3. The processor asks `instruction.rs` to decode the `instruction_data` argument from the _**entrypoint**_ function.
4. Using the decoded data, the processor will now decide which processing function to use to process the request.
5. The processor may use `state.rs` to encode state into or decode the state of an **account** which has been passed into the entrypoint.

# Contract Explanation

```rust
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};
use std::convert::TryInto;

/// Define the type of state stored in accounts
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct CalculatorAccount {
    /// The result of the operation
    pub result: f64,
}

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Calculator Rust program entrypoint");

    let accounts_iter = &mut accounts.iter();

    let account = next_account_info(accounts_iter)?;

    // Create the program account if it doesn't exist
    if account.owner != program_id {
        msg!("Creating calculator account");
        let data = &mut account.data.borrow_mut();
        let calculator_account = CalculatorAccount { result: 0.0 };
        calculator_account
            .serialize(&mut &mut data[..])
            .map_err(|_| ProgramError::InvalidAccountData)?;
        msg!("Calculator account created");
    }

    let mut calculator_account = {
        let data = account.data.borrow();
        CalculatorAccount::try_from_slice(&data[..])?
    };

    // Decode the instruction data to determine the operation
    if instruction_data.len() < 1 {
        msg!("Invalid instruction data");
        return Err(ProgramError::InvalidInstructionData);
    }

    let operation = instruction_data[0];

    // Handle the operation based on user input
    match operation {
        0 => {
            // Addition operation
            msg!("Performing addition");
            if instruction_data.len() < 17 {
                msg!("Invalid instruction data");
                return Err(ProgramError::InvalidInstructionData);
            }
            let num1_bytes = &instruction_data[1..9];
            let num2_bytes = &instruction_data[9..17];
            let num1 = f64::from_le_bytes(num1_bytes.try_into().unwrap());
            let num2 = f64::from_le_bytes(num2_bytes.try_into().unwrap());
            calculate_sum(&mut calculator_account, num1, num2);
        }
        1 => {
            // Subtraction operation
            msg!("Performing subtraction");
            if instruction_data.len() < 17 {
                msg!("Invalid instruction data");
                return Err(ProgramError::InvalidInstructionData);
            }
            let num1_bytes = &instruction_data[1..9];
            let num2_bytes = &instruction_data[9..17];
            let num1 = f64::from_le_bytes(num1_bytes.try_into().unwrap());
            let num2 = f64::from_le_bytes(num2_bytes.try_into().unwrap());
            calculate_difference(&mut calculator_account, num1, num2);
        }
        _ => {
            msg!("Invalid operation");
            return Err(ProgramError::InvalidInstructionData);
        }
    }

    calculator_account.serialize(&mut &mut account.data.borrow_mut()[..])?;

    Ok(())
}

// Sum function
pub fn calculate_sum(account: &mut CalculatorAccount, num1: f64, num2: f64) {
    account.result = num1 + num2;
}

// Difference function
pub fn calculate_difference(account: &mut CalculatorAccount, num1: f64, num2: f64) {
    account.result = num1 - num2;
}
```
This Rust code defines a simple Solana program that acts as a calculator, performing addition and subtraction operations and storing the result in a program account. The CalculatorAccount struct, which includes a single field result of type f64, is used to store the calculation result. The program's entrypoint function, process_instruction, handles the incoming instruction data, which specifies the operation (addition or subtraction) and the operands.

The program deserializes the instruction data to determine the operation type and operands, performs the calculation, updates the CalculatorAccount with the result, and serializes the updated state back into the account data. This ensures that the result of the calculation is persistently stored on the Solana blockchain. The borsh library is used for serializing and deserializing the CalculatorAccount state, while the Solana program library provides the necessary infrastructure for interacting with the blockchain.


