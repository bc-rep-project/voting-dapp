
"use client";

import { useState } from "react";
import web3 from "../utils/web3";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Voting from "../contracts/Voting.json"; // Assuming ABI is available
import "@/components/styles/VotingInterface.css";
import Link from "next/link";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

const candidates = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

export default function VotingInterface() {
  const [selectedCandidate, setSelectedCandidate] = useState("");

  const castVote = async (event: React.FormEvent) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(
      Voting.abi,
      CONTRACT_ADDRESS
    );

    try {
      const voterId = web3.utils.soliditySha3({ type: "address", value: accounts[0] });
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
      
      <div className="spacing">
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
      
      <Button type="submit" className="button spacing">Vote</Button>
  
      <div className="voting-interface-nav">
        <Link href="/components/register-voter">
          <Button className="voting-interface-button">Back</Button>
        </Link>
        <Link href="/components/display-results">
          <Button className="voting-interface-button">Next</Button>
        </Link>
      </div>
    </form>
  );
}
