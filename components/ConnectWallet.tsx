
"use client";

import { useState } from "react";
import web3 from "../utils/web3";
import "@/components/connect-wallet.css";
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
        <Button onClick={connectWallet} className="button">
            {account ? `Connected: ${account}` : "Connect Wallet"}
        </Button>
        {account && <div className="account">Connected: {account}</div>}
    </div>
  );
}
