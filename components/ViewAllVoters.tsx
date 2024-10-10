
"use client";

import { useState, useEffect } from "react";
import web3 from "../utils/web3";
import { Button } from "@/components/ui/button";
import Voting from "../contracts/Voting.json"; // Assuming ABI is available
import "../components/styles/ViewAllVoters.css";

export default function ViewAllVoters() {
  const [voters, setVoters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVoters = async () => {
      const contract = new web3.eth.Contract(Voting.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3"); // Replace with your contract address
      try {
        const voterList = await contract.methods.getAllVoters().call();
        setVoters(voterList);
      } catch (error) {
        console.error("Error fetching voters:", error);
        setError("Error fetching voters. See console for details.");
      }
    };

    fetchVoters();
  }, []);

  return (
    <div className="container">
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
