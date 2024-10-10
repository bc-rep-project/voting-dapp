
"use client";

import { useState } from "react";
import web3 from "../utils/web3";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Voting from "../contracts/Voting.json"; // Assuming ABI is available
import "../components/styles/VotingInterface.css";

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
    <form onSubmit={castVote} className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Cast Your Vote</h2>
      
      <div className="space-y-2">
        <Select onValueChange={(value) => setSelectedCandidate(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a candidate" />
          </SelectTrigger>
          <SelectContent>
            {candidates.map((candidate) => (
              <SelectItem key={candidate.id} value={candidate.id}>
                {candidate.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button type="submit" className="w-full">Vote</Button>

      <div className="nav-buttons">
        <button type="button">Back</button>
        <button type="button">Next</button>
      </div>
    </form>
  );
}
