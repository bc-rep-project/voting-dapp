
import React, { useState, useEffect } from 'react';

const ResultsPage = ({ contract }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const candidateCount = await contract.methods.candidatesCount().call();
      const resultsList = [];
      for (let i = 0; i < candidateCount; i++) {
        const candidate = await contract.methods.candidates(i).call();
        resultsList.push(candidate);
      }
      setResults(resultsList);
    };

    fetchResults();
  }, [contract]);

  return (
    <div>
      <h2>Voting Results</h2>
      <ul>
        {results.map((candidate) => (
          <li key={candidate.id}>
            {candidate.name}: {candidate.voteCount} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPage;
