const { ethers } = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/Cyberhack.sol/Cyberhack.json");
require("dotenv").config();
const tokenABI = tokenContractJSON.abi;

async function main() {

  const networkAddress =
    "https://eth-goerli.g.alchemy.com/v2/Bh22s-iYGmFwy-9Dq3New4jIpUES9xZt";
  const privateKey = process.env.PRIVATEKEY;
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  const wallet = new ethers.Wallet(privateKey, provider);

  const [signer] = await ethers.getSigners();

  const NFT = await ethers.getContractFactory("Cyberhack");
  const nft = await NFT.attach("0x505cB6002a23F3090E14cC9F72768FBBD1b919da");

  const fxRootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
  const fxRoot = await ethers.getContractAt(fxRootContractABI, fxRootAddress);

  const tokenIds = [1, 2, 3, 4, 5];

  const approveTx = await nft
    .connect(signer)
    .setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();
  console.log("Congrats! Approval confirmed");

  for (let i = 0; i < tokenIds; i++) {
    const depositTx = await fxRoot
      .connect(signer)
      .deposit(nft.address, wallet.address, tokenIds[i], "0x6566");


    await depositTx.wait();
  }
  

  console.log("Approved and deposited to the destination address of your Next-Gen Hacker NFT");

  
  const balance = await nft.balanceOf(wallet.address);

  
  console.log("Current NFT wallet", wallet.address,"is: ", balance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });