
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./openzeppelin/access/Ownable.sol";
import "./openzeppelin/utils/cryptography/ECDSA.sol";

contract Voting is Ownable {
    using ECDSA for bytes32;

    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    struct Voter {
        bool registered;
        bool voted;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => Voter) public voters;
    uint256 public candidatesCount;
    bool public votingOpen;

    event VoterRegistered(address voter);
    event VoteCast(address voter, uint256 candidateId);
    event VotingStarted();
    event VotingEnded();

    modifier onlyWhenVotingOpen() {
        require(votingOpen, "Voting is not open");
        _;
    }

    function startVoting() external onlyOwner {
        votingOpen = true;
        emit VotingStarted();
    }

    function endVoting() external onlyOwner {
        votingOpen = false;
        emit VotingEnded();
    }

    function registerCandidate(string memory name) external onlyOwner {
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
        candidatesCount++;
    }

    function registerVoter(address voter) external onlyOwner {
        require(!voters[voter].registered, "Voter is already registered");
        voters[voter] = Voter(true, false);
        emit VoterRegistered(voter);
    }

    function vote(uint256 candidateId) external onlyWhenVotingOpen {
        require(voters[msg.sender].registered, "You are not registered to vote");
        require(!voters[msg.sender].voted, "You have already voted");
        require(candidateId < candidatesCount, "Invalid candidate ID");

        voters[msg.sender].voted = true;
        candidates[candidateId].voteCount++;
        emit VoteCast(msg.sender, candidateId);
    }
}
