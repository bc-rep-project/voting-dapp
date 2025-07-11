
"use client";

import { useState, useEffect } from "react";
import web3 from "../utils/web3";
import Voting from "../contracts/Voting.json"; // Assuming ABI is available
import { CONTRACT_ADDRESS } from "@/config";
import "../components/styles/ViewAllVoters.css";

export default function ViewAllVoters() {
  const [voters, setVoters] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoters = async () => {
      const contract = new web3.eth.Contract(Voting.abi, CONTRACT_ADDRESS);
      try {
        const voterList = (await contract.methods.getAllVoters().call()) as string[];
        setVoters(voterList);
      } catch (error) {
        console.error("Error fetching voters:", error);
        setError("Error fetching voters. See console for details.");
      }
    };

    fetchVoters();
  }, []);

  return (
    <div className="view-all-voters-container">
      <h2 className="title">Registered Voters</h2>
      {error && <div className="error-message">{error}</div>}
      <ul className="voter-list">
        {voters.map((voter, index) => (
          <li key={index} className="voter-item">
            {voter}
          </li>
        ))}
      </ul>
    </div>
  );
}
