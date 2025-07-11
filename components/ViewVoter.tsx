
"use client";

import { useState } from "react";
import web3 from "../utils/web3";
import { Button } from "@/components/ui/button";
import Voting from "../contracts/Voting.json"; // Assuming ABI is available
import { CONTRACT_ADDRESS } from "@/config";
import "@/components/styles/ViewVoter.css";

export default function ViewVoter() {
  const [voterAddress, setVoterAddress] = useState("");
  const [voterDetails, setVoterDetails] = useState<{
    address: string;
    hasVoted: boolean;
    vote: string;
  } | null>(null);

  const fetchVoterDetails = async () => {
    const contract = new web3.eth.Contract(Voting.abi, CONTRACT_ADDRESS);
    try {
      const details = (await contract.methods.getVoterDetails(voterAddress).call()) as {
        address: string;
        hasVoted: boolean;
        vote: string;
      };
      setVoterDetails(details);
    } catch (error) {
      console.error("Error fetching voter details:", error);
      alert("Error fetching voter details. See console for details.");
    }
  };

  return (
     <div className="view-voter-container">
      <h2 className="text-2xl font-bold text-center mb-6">View Voter Details</h2>
      <input
        type="text"
        value={voterAddress}
        onChange={(e) => setVoterAddress(e.target.value)}
        placeholder="Enter Voter Address"
         className="view-voter-input"
       />
       <Button onClick={fetchVoterDetails} className="view-voter-button">Fetch Details</Button>
       {voterDetails && (
         <div className="view-voter-details">
           <h3>Voter Details:</h3>
           <p>Address: {voterDetails.address}</p>
           <p>Voted: {voterDetails.hasVoted ? "Yes" : "No"}</p>
           <p>Vote: {voterDetails.vote}</p>
         </div>
       )}
     </div>
  );
}
