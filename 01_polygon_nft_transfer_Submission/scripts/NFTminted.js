const { ethers } = require("hardhat"); 
require("dotenv").config();

async function main() {

  const privateKey = process.env.PRIVATEKEY;

  const networkAddress =
    "https://eth-goerli.g.alchemy.com/v2/Bh22s-iYGmFwy-9Dq3New4jIpUES9xZt";

  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  const signer = new ethers.Wallet(privateKey, provider);

  const contractAddress = "0x505cB6002a23F3090E14cC9F72768FBBD1b919da"; // Deployed Contract Address 

  const OneNFT = await ethers.getContractFactory("Cyberhack", signer);
  const contract = await OneNFT.attach(contractAddress);

  await contract.mint(5);

  console.log("successfully NFT minted ('5' tokens.)");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 