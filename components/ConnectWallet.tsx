
"use client";

import { useState } from "react";
import web3 from "../utils/web3";
import "@/components/styles/ConnectWallet.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ConnectWallet() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };

  return (
    <div className="container">
        <div className="message">
            <h2>Why should you have MetaMask? 🤔</h2>
            <p>Wallet Connection: MetaMask allows users to connect their Ethereum wallet to the application. This is essential for interacting with the Ethereum blockchain, such as sending transactions and signing messages.</p>
            <p>Account Management: MetaMask manages users' Ethereum accounts and provides a secure way to access and manage their private keys. This is crucial for performing actions like voting, registering voters, and tallying votes in a decentralized application.</p>
            <p>Transaction Signing: MetaMask enables users to sign transactions securely. This is important for ensuring that only authorized users can perform actions like casting votes or registering voters.</p>
            <p>Blockchain Interaction: MetaMask provides an interface for interacting with smart contracts deployed on the Ethereum blockchain. This allows the application to execute functions on the smart contracts, such as casting votes or tallying results.</p>
            <p>In summary, MetaMask is needed to provide a secure and user-friendly way for users to interact with the Ethereum blockchain and perform various actions in the voting DApp.</p>
        </div>
        <Button onClick={connectWallet} className="button">
            {account ? `Connected: ${account}` : "Connect Wallet"}
        </Button>
        {account && <div className="account">Connected: {account}</div>}
        <Link href="/components/register-voter">
          <div className="next-button-container">
<Button className="button">Next</Button>
          </div>
        </Link>

    </div>
  );
}
