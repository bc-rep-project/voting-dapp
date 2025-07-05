
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import "@/components/styles/DisplayResults.css";
import web3 from "../utils/web3";
import Voting from "../contracts/Voting.json";
import { CONTRACT_ADDRESS } from "@/config";

export default function DisplayResults() {
  const [results, setResults] = useState<{ candidate: string; votes: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const tallyVotes = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(Voting.abi, CONTRACT_ADDRESS);
      await contract.methods.tallyVotes().send({ from: accounts[0] });
      const ids = (await contract.methods.getAllCandidates().call()) as string[];
      const resultsData = await Promise.all(
        ids.map(async (id) => {
          const info = (await contract.methods.getCandidateInfo(id).call()) as [string, string, string];
          const count = await contract.methods.voteCounts(id).call();
          return { candidate: info[0], votes: Number(count) };
        })
      );
      setResults(resultsData);
    } catch (error) {
      console.error("Error tallying votes:", error);
      setError("Error tallying votes. See console for details.");
    }
  };

  return (
    <div className="glass-container container">
      <h2 className="title">Election Results</h2>

      {error && <div className="error-message">{error}</div>}
      <Button onClick={tallyVotes} className="button tally-button" style={{ marginBottom: '20px' }}>Tally Votes</Button>
      {results.length > 0 && (
        <ul className="results-list">
          {results.map((item, idx) => (
            <li key={idx} className="result-item">
              {item.candidate}: {item.votes}
            </li>
          ))}
        </ul>
      )}
      <div className="button-container">
        <Link href="/components/voting-interface">
          <Button className="back-button tally-button">Back</Button>
        </Link>
        <Link href="/components">
          <Button className="dashboard-button tally-button">Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
