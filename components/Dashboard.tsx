
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import "@/components/styles/Dashboard.css";

import { useState } from "react";

export default function Dashboard() {
  const [loading, setLoading] = useState({
    connectWallet: false,
    registerVoter: false,
    votingInterface: false,
    displayResults: false,
    viewVoter: false,
    viewAllVoters: false,
  });

  const handleClick = (button: string) => {
    setLoading((prevState) => ({ ...prevState, [button]: true }));
  };

  return (
    <div className="dashboard-container glass-card">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="button-grid">
        <Link href="/components/connect-wallet">
          <Button className="dashboard-button" onClick={() => handleClick("connectWallet")}>
            {loading.connectWallet ? "Loading..." : "Connect Wallet"}
          </Button>
        </Link>
        <Link href="/components/register-voter">
          <Button className="dashboard-button" onClick={() => handleClick("registerVoter")}>
            {loading.registerVoter ? "Loading..." : "Register Voter"}
          </Button>
        </Link>
        <Link href="/components/voting-interface">
          <Button className="dashboard-button" onClick={() => handleClick("votingInterface")}>
            {loading.votingInterface ? "Loading..." : "Voting Interface"}
          </Button>
        </Link>
        <Link href="/components/display-results">
          <Button className="dashboard-button" onClick={() => handleClick("displayResults")}>
            {loading.displayResults ? "Loading..." : "Display Results"}
          </Button>
        </Link>
        <Link href="/components/view-voter">
          <Button className="dashboard-button" onClick={() => handleClick("viewVoter")}>
            {loading.viewVoter ? "Loading..." : "View Voter"}
          </Button>
        </Link>
        <Link href="/components/view-all-voter">
          <Button className="dashboard-button" onClick={() => handleClick("viewAllVoters")}>
            {loading.viewAllVoters ? "Loading..." : "View All Voters"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
