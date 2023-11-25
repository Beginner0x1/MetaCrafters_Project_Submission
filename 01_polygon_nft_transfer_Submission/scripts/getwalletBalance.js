const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/Cyberhack.sol/Cyberhack.json");

const tokenAddress = "0xd3Fe70425477347BfA4D1B36aa27649521f03482"; 
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0x3180631c1A6Ffdd26589aeaA989CE5DDA028Bf00"; 

async function main() {
    
    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

    console.log("You now have a total number of: " + await token.balanceOf(walletAddress) + " tokens in the wallet.");
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
