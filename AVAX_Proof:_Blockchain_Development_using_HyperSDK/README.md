## Project Introduction: Building blockchain using HyperSDK

Our project challenge is we need to create a custom virtual machine to enable users to mint and transfer tokens. The HyperSDK provides a powerful solution for this task by allowing you to build a custom blockchain tailored to your specific needs. With the HyperSDK, you can define the rules and functionality of your chain, including the ability to create and transfer tokens and manage order books for trading assets.

### What is tokenevm?

Metacrafters teams created to **tokenvm** to showcase how to use the hypersdk in an application most readers are already familiar with, token minting and token trading. The tokenvm lets anyone create any asset, mint more of their asset, modify the metadata of their asset (if they reveal some info), and burn their asset. Additionally, there is an embedded on-chain exchange that allows anyone to create orders and fill (partial) orders of anyone else. To make this example easy to play with, the tokenvm also bundles a powerful CLI tool and serves RPC requests for trades out of an in-memory order book it maintains by syncing blocks.


## Features: Tokenevm

**Arbitrary Token Minting**

The basis of the tokenvm is the ability to create, mint, and transfer user-generated tokens with ease. When creating an asset, the owner is given "admin control" of the asset functions and can later mint more of an asset, update its metadata (during a reveal for example), or transfer/revoke ownership (if rotating their key or turning over to their community).

Assets are a native feature of the tokenvm and the storage engine is optimized specifically to support their efficient usage (each balance entry requires only 72 bytes of state = assetID|publicKey=>balance(uint64)). This storage format makes it possible to parallelize the execution of any transfers that don't touch the same accounts. This parallelism will take effect as soon as it is re-added upstream by the hypersdk (no action required in the tokenvm).

**Trade Any 2 Tokens**
What good are custom assets if you can't do anything with them? To showcase the raw power of the hypersdk, the tokenvm also provides support for fully on-chain trading. Anyone can create an "offer" with a rate/token they are willing to accept and anyone else can fill that "offer" if they find it interesting. The tokenvm also maintains an in-memory order book to serve over RPC for clients looking to interact with these orders.

Orders are a native feature of the tokenvm and the storage engine is optimized specifically to support their efficient usage (just like balances above). Each order requires only 152 bytes of state = orderID=>inAsset|inTick|outAsset|outTick|remaining|owner. This storage format also makes it possible to parallelize the execution of any fills that don't touch the same order (there may be hundreds or thousands of orders for the same pair, so this stil allows parallelization within a single pair unlike a pool-based trading mechanism like an AMM). This parallelism will take effect as soon as it is re-added upstream by the hypersdk (no action required in the tokenvm).

**In-Memory Order Book**
To make it easier for clients to interact with the tokenvm, it comes bundled with an in-memory order book that will listen for orders submitted on-chain for any specified list of pairs (or all if you prefer). Behind the scenes, this uses the hypersdk's support for feeding accepted transactions to any hypervm (where the tokenvm, in this case, uses the data to keep its in-memory record of order state up to date). The implementation of this is a simple max heap per pair where we arrange best on the best "rate" for a given asset (in/out).

## Steps To Reproduce (Initial Step) 
```
- Clone the initial repository
- Inside your project folder, run go mod tidy to normalize all the dependencies
- Configure your project constants
- Go to consts/consts.go and add the missing parts.
- Register the Create_Asset and Mint_Assest actions in registry/registry.go
- Run your VM locally
- Make sure Go is on your path, defined on your terminal, if not you can do so by running export PATH=$PATH:$(go env GOPATH)/bin
- If this path doesn’t work, you can also try export PATH=$PATH:/usr/local/go/bin
- Run MODE="run-single" ./scripts/run.sh
- Run ./scripts/build.sh

If you get a permissions denied error, try running these scripts with the bash command (i.e.bash ./scripts/run.sh)
Load the demo private key included on the project ./build/token-cli key import demo.pk and ./build/token-cli chain import-anr
```

## Creating & Mint Asset 

#### Step 1: Create Your Asset
First up, let's create our own asset. You can do so by running the following
command from this location:
```bash
./build/token-cli action create-asset
```

When you are done, the output should look something like this:
```
database: .token-cli
address: token1rvzhmceq997zntgvravfagsks6w0ryud3rylh4cdvayry0dl97nsjzf3yp
chainID: Em2pZtHr7rDCzii43an2bBi1M2mTFyLN33QP1Xfjy7BcWtaH9
metadata (can be changed later): MarioCoin
continue (y/n): y
✅ txID: 27grFs9vE2YP9kwLM5hQJGLDvqEY9ii71zzdoRHNGC4Appavug
```

_`txID` is the `assetID` of your new asset._

The "loaded address" here is the address of the default private key (`demo.pk`). We
use this key to authenticate all interactions with the `tokenvm`.

#### Step 2: Mint Your Asset
After we've created our own asset, we can now mint some of it. You can do so by
running the following command from this location:
```bash
./build/token-cli action mint-asset
```

When you are done, the output should look something like this (usually easiest
just to mint to yourself).
```
database: .token-cli
address: token1rvzhmceq997zntgvravfagsks6w0ryud3rylh4cdvayry0dl97nsjzf3yp
chainID: Em2pZtHr7rDCzii43an2bBi1M2mTFyLN33QP1Xfjy7BcWtaH9
assetID: 27grFs9vE2YP9kwLM5hQJGLDvqEY9ii71zzdoRHNGC4Appavug
metadata: MarioCoin supply: 0
recipient: token1rvzhmceq997zntgvravfagsks6w0ryud3rylh4cdvayry0dl97nsjzf3yp
amount: 10000
continue (y/n): y
✅ txID: X1E5CVFgFFgniFyWcj5wweGg66TyzjK2bMWWTzFwJcwFYkF72
```

#### Step 3: View Your Balance
Now, let's check that the mint worked right by checking our balance. You can do
so by running the following command from this location:
```bash
./build/token-cli key balance
```

When you are done, the output should look something like this:
```
database: .token-cli
address: token1rvzhmceq997zntgvravfagsks6w0ryud3rylh4cdvayry0dl97nsjzf3yp
chainID: Em2pZtHr7rDCzii43an2bBi1M2mTFyLN33QP1Xfjy7BcWtaH9
assetID (use TKN for native token): 27grFs9vE2YP9kwLM5hQJGLDvqEY9ii71zzdoRHNGC4Appavug
metadata: MarioCoin supply: 10000 warp: false
balance: 10000 27grFs9vE2YP9kwLM5hQJGLDvqEY9ii71zzdoRHNGC4Appavug
```

## Transfer Assets
Unlike the mint and trade demo, the AWM demo only requires running a single
command. You can kick off a transfer between the 2 Subnets you created by
running the following command from this location:
```bash
./build/token-cli action export
```

When you are done, the output should look something like this:
```
database: .token-cli
address: token1rvzhmceq997zntgvravfagsks6w0ryud3rylh4cdvayry0dl97nsjzf3yp
chainID: Em2pZtHr7rDCzii43an2bBi1M2mTFyLN33QP1Xfjy7BcWtaH9
✔ assetID (use TKN for native token): TKN
balance: 997.999988891 TKN
recipient: token1rvzhmceq997zntgvravfagsks6w0ryud3rylh4cdvayry0dl97nsjzf3yp
amount: 10
reward: 0
available chains: 1 excluded: [Em2pZtHr7rDCzii43an2bBi1M2mTFyLN33QP1Xfjy7BcWtaH9]
0) chainID: cKVefMmNPSKmLoshR15Fzxmx52Y5yUSPqWiJsNFUg1WgNQVMX
destination: 0
swap on import (y/n): n
continue (y/n): y
✅ txID: 24Y2zR2qEQZSmyaG1BCqpZZaWMDVDtimGDYFsEkpCcWYH4dUfJ
perform import on destination (y/n): y
22u9zvTa8cRX7nork3koubETsKDn43ydaVEZZWMGcTDerucq4b to: token1rvzhmceq997zntgvravfagsks6w0ryud3rylh4cdvayry0dl97nsjzf3yp source assetID: TKN output assetID: 2rST7KDPjRvDxypr6Q4SwfAwdApLwKXuukrSc42jA3dQDgo7jx value: 10000000000 reward: 10000000000 return: false
✔ switch default chain to destination (y/n): y
```

_The `export` command will automatically run the `import` command on the
destination. If you wish to import the AWM message using a separate account,
you can run the `import` command after changing your key._

