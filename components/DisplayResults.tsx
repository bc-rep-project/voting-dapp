
"use client";

import { useState } from "react";
import web3 from "../utils/web3";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import "@/components/styles/DisplayResults.css";
import Voting from "../contracts/Voting.json"; // Assuming ABI is available

export default function DisplayResults() {
  const [results, setResults] = useState([]);

  const tallyVotes = async () => {
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(Voting.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3"); // Replace with your contract address

    try {
      // Placeholder for tallying votes
      // Decryption and counting logic to be implemented
      // For now, we will mock the results
      const mockResults = [
        { candidate: "Alice", votes: 10 },
        { candidate: "Bob", votes: 5 },
        { candidate: "Charlie", votes: 3 },
      ];
      setResults(mockResults);
    } catch (error) {
      console.error("Error tallying votes:", error);
      alert("Error tallying votes. See console for details.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Election Results</h2>
      
      <Button onClick={tallyVotes} className="button">Tally Votes</Button>
      <Link href="/components/voting-interface">
        <Button className="back-button">Back</Button>
      </Link>
    </div>
  );
}
