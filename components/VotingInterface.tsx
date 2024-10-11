
"use client";

import { useState } from "react";
import web3 from "../utils/web3";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Voting from "../contracts/Voting.json"; // Assuming ABI is available
import "../components/styles/VotingInterface.css";
import Link from "next/link";

const candidates = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

export default function VotingInterface() {
  const [selectedCandidate, setSelectedCandidate] = useState("");

  const castVote = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(Voting.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3"); // Replace with your contract address

    try {
      const voterId = web3.utils.keccak256(accounts[0]);
      const encryptedVote = web3.utils.asciiToHex(selectedCandidate);
      await contract.methods.castVote(voterId, encryptedVote).send({ from: accounts[0] });
      console.log("Vote cast successfully by:", accounts[0]);
      console.log("Selected candidate:", selectedCandidate);
      alert(`Vote cast successfully!\nVoter: ${accounts[0]}\nCandidate: ${selectedCandidate}`);
    } catch (error) {
      console.error("Error casting vote:", error);
      alert("Error casting vote. See console for details.");
    }
  };

  return (
      <form onSubmit={castVote} className="form">
      <h2 className="title">Cast Your Vote</h2>
      
      <div className="space-y-2">
        <Select onValueChange={(value) => setSelectedCandidate(value)}>
        <SelectTrigger className="select-trigger">
          <SelectValue placeholder="Select a candidate" />
        </SelectTrigger>
        <SelectContent className="select-content">
          {candidates.map((candidate) => (
            <SelectItem key={candidate.id} value={candidate.id} className="select-item">
              {candidate.name}
            </SelectItem>
          ))}
        </SelectContent>
        </Select>
      </div>
      
       <Button type="submit" className="button">Vote</Button>
 
     <div className="voting-interface-nav">
         <Link href="/components/register-voter">
           <Button className="voting-interface-button back button-spacing">Back</Button>
         </Link>
         <Link href="/components/display-results">
           <Button className="voting-interface-button next">Next</Button>
         </Link>
      </div>
    </form>
  );
}
