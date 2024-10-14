
import React, { useState, useEffect } from 'react';

const VotingPage = ({ contract, accounts }) => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      const candidateCount = await contract.methods.candidatesCount().call();
      const candidatesList = [];
      for (let i = 0; i < candidateCount; i++) {
        const candidate = await contract.methods.candidates(i).call();
        candidatesList.push(candidate);
      }
      setCandidates(candidatesList);
    };

    fetchCandidates();
  }, [contract]);

  const handleVote = async (e) => {
    e.preventDefault();
    try {
      await contract.methods.vote(selectedCandidate).send({ from: accounts[0] });
      alert('Vote cast successfully!');
    } catch (error) {
      console.error('Error casting vote:', error);
      alert('Error casting vote.');
    }
  };

  return (
    <form onSubmit={handleVote}>
      <div>
        <label>Select Candidate:</label>
        <select
          value={selectedCandidate}
          onChange={(e) => setSelectedCandidate(e.target.value)}
          required
        >
          <option value="" disabled>Select a candidate</option>
          {candidates.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Vote</button>
    </form>
  );
};

export default VotingPage;
