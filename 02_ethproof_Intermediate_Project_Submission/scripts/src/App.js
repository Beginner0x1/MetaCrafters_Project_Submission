import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import "./App.css";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [message, setMessage] = useState("");
  const [currentGreeting, setCurrentGreeting] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
  
    async function init() {
    
      if (window.ethereum) {
        setEthWallet(new ethers.providers.Web3Provider(window.ethereum));

        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
          }
        } catch (error) {
          console.log("Error connecting with MetaMask:", error);
        }
      }
    }
    init();
  }, []);

  async function fetchGreeting() {
  
    if (ethWallet) {
    
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);

      try {
        const data = await contract.greet();
        setCurrentGreeting(data);
      } catch (error) {
        console.log("Error fetching greeting:", error);
      }
    }
  }

  async function setGreeting() {
    if (!message || !ethWallet || !account) return;

    const signer = ethWallet.getSigner();
    const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);

    try {
      const transaction = await contract.setGreeting(message);
      await transaction.wait();
      fetchGreeting();
    } catch (error) {
      console.log("Error setting greeting:", error);
    }
  }

  const requestAccount = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
      }
    } catch (error) {
      console.log("Error connecting with MetaMask:", error);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <header>
          <h1>Welcome to Hipo Hipo World</h1>
        </header>
        {!isConnected ? (
          <button onClick={requestAccount}>Connect with MetaMask</button>
        ) : (
          <div>
            <p>Your Account: {account}</p>
            <div className="description">
              <div className="custom-buttons">
                <button onClick={fetchGreeting} style={{ backgroundColor: "green" }}>
                  Fetch Greeting
                </button>
                <button onClick={setGreeting} style={{ backgroundColor: "red" }}>
                  Set Greeting
                </button>
              </div>
              <input
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Set Greeting Message"
              />
              <h2 className="greeting">Uploaded Message: {currentGreeting}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
