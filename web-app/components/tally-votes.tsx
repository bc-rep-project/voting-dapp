
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function TallyVotes() {
  const [results, setResults] = useState([]);

  const handleTally = async () => {
    try {
      const response = await fetch("/api/tally-votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ candidateIds: ["candidate-1", "candidate-2"] }), // Example candidate IDs
      });
      const data = await response.json();
      if (response.ok) {
        setResults(data.results);
        toast({
          title: "Success",
          description: "Votes have been tallied successfully!",
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Tally Votes</h2>
      <Button onClick={handleTally} className="w-full">Tally Votes</Button>
      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Results</h3>
          <ul className="space-y-2">
            {results.map((result) => (
              <li key={result.candidateId} className="flex justify-between">
                <span>{result.candidateId}</span>
                <span>{result.voteCount}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
