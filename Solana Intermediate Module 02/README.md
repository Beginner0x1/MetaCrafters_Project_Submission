# Project Objective 

The primary objective of this project is to enhance the existing testing framework of our final module by incorporating two new tests that specifically target the increment and decrement instructions. These tests will ensure that the module handles these operations correctly and that the internal state changes as expected. Additionally, the project aims to add detailed logging to the actual program to monitor how data changes during the execution of these instructions.

# Anchor Framework Introduction 

An anchor framework is a foundational structure designed to provide stability and consistency within a complex system, acting as a reference point for various components to align with. It serves as a core set of guidelines, standards, and best practices that ensure coherence and interoperability across different parts of the system. By establishing a clear and consistent foundation, an anchor framework facilitates seamless integration, enhances reliability, and supports scalability, allowing diverse elements to work together harmoniously towards achieving the system's overall objectives.

# Counter Program Introduction 
A counter program in an Anchor Solana contract is a smart contract designed to maintain and manipulate a simple count value on the Solana blockchain using the Anchor framework. Anchor simplifies the process of writing Solana programs by providing a robust framework for building, deploying, and interacting with on-chain programs. The counter program typically includes functionalities to initialize a counter, increment it, and potentially decrement it, with each operation securely recorded on the blockchain.

```rust
#[program]
pub mod counter_program {
    use super::*;

    pub fn create_counter(ctx: Context<CreateCounter>) -> Result<()> {
        ctx.accounts.counter.authority = ctx.accounts.authority.key();
        ctx.accounts.counter.count = 0; // 0 
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        ctx.accounts.counter.count += 1; // 1 
        Ok(())
    }

    pub fn decrement(ctx: Context<Decrement>) -> Result<()> {
        ctx.accounts.counter.count -= 1; // 0 
        Ok(())
    }
```

This code defines a Solana smart contract using the Anchor framework, encapsulated within the counter_program module. The #[program] macro specifies that this module contains the program's core logic. The module includes three primary functions: create_counter, increment, and decrement. The create_counter function initializes a new counter, setting its authority to the provided account and initializing the count to 0. The increment and decrement functions adjust the counter's value by adding or subtracting 1, respectively.

Each function uses context structs to manage and validate the required accounts. For instance, CreateCounter ensures that the counter's authority and initial value are set correctly, while Increment and Decrement operate on an existing counter to modify its count. By leveraging Anchor's context and account handling, this code ensures secure and efficient manipulation of on-chain data, providing a robust framework for managing a simple counter on the Solana blockchain.

## Test Contract Introduction 

```rust
// Test case to increment the Counter
  it("Increment Counter!", async () => {
    // Call the increment method of the program
    const tx = await program.methods
      .increment()
      .accounts({
        counter: counter.publicKey,
        authority: provider.wallet.publicKey,
      })
      .rpc();

    const myCounterAccount = await program.account.counter.fetch(
      counter.publicKey
    );

    assert.ok(myCounterAccount.count.toString() === "1");

    return {
      message: "Counter incremented",
      newCount: myCounterAccount.count.toString(),
      transactionSignature: tx,
    };
  });

  // Test case to decrement the Counter
  it("Decrement Counter!", async () => {
    // Call the decrement method of the program
    const tx = await program.methods
      .decrement()
      .accounts({
        counter: counter.publicKey,
        authority: provider.wallet.publicKey,
      })
      .rpc();

    const myCounterAccount = await program.account.counter.fetch(
      counter.publicKey
    );

    assert.ok(myCounterAccount.count.toString() === "0");

    return {
      message: "Counter decremented",
      newCount: myCounterAccount.count.toString(),
      transactionSignature: tx,
    };
  });
```

These test cases validate the functionality of the increment and decrement methods in the Solana smart contract using the Anchor framework. The first test case, "Increment Counter!", calls the increment method of the program, specifying the counter account and the authority that owns the counter. After executing the transaction, it fetches the updated counter account to verify that the count has been incremented to 1. If successful, it asserts the new count and returns a message indicating the counter has been incremented, along with the new count and the transaction signature.

The second test case, "Decrement Counter!", follows a similar process for the decrement method. It calls the decrement method, passing the necessary accounts, and executes the transaction. The updated counter account is then fetched to confirm that the count has been decremented back to 0. The test case asserts the new count and returns a message indicating the counter has been decremented, the new count, and the transaction signature. These tests ensure that the contract's increment and decrement functionalities work as expected and that the counter's value is accurately updated on the blockchain.
