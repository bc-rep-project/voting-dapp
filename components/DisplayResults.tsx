
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import "@/components/styles/DisplayResults.css";

export default function DisplayResults() {
  const [results, setResults] = useState<{ candidate: string; votes: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const tallyVotes = async () => {

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
      setError("Error tallying votes. See console for details.");
    }
  };

  return (
    <div className="container">
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
