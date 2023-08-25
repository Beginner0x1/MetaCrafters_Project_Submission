import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [ownerError, setOwnerError] = useState(false);
  const [timestamp, setTimestamp] = useState(undefined);
  const [ownershipStatus, setOwnershipStatus] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const getCurrentTimestamp = async () => {
    if (atm) {
      const timestamp = await atm.getCurrentTimestamp();
      setTimestamp(timestamp.toNumber());
    }
  }

  const checkOwnership = async () => {
    if (atm && account) {
      try {
        const isOwner = await atm.isOwner(account);
        setOwnershipStatus(isOwner);
      } catch (error) {
        console.error("Error checking ownership:", error);
      }
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }

  const transferOwnership = async (newOwner) => {

    if (atm && newOwner) {
      try {
        let tx = await atm.transferOwnership(newOwner);
        await tx.wait();
        alert(`Ownership transferred to ${newOwner}`);
      } catch (error) {
        setOwnerError(true);
        setTimeout(() => {
          setOwnerError(false);
        }, 5000);
      }
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    if (timestamp === undefined) {
      getCurrentTimestamp();
    }

    checkOwnership();

    return (
      
      <div>
        <p>Your ATM Account Address: {account}</p>
        <p>Your ATM Balance: {balance} ETH</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>

        <button
          onClick={() => {
            const newOwner = prompt("Enter the new owner address:");
            transferOwnership(newOwner);
          }}
        >
          Change Owner
        </button>
        {ownerError && <p className="error">Error: Unable to change the Owner</p>}
        {ownershipStatus ? (
          <p>You are the owner of the contract.</p>
        ) : (
          <p>You are not the owner of the contract.</p>
        )}
        <p>Current Timestamp: {timestamp}</p>
        <button onClick={checkOwnership}>Check Ownership</button>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}
