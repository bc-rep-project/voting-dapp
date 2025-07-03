
pragma solidity ^0.8.0;

struct Voter {
    bytes32 voterId; // Unique identifier (hashed for anonymity)
    bool hasVoted;    // Flag to track voting status
    bytes32 vote;     // Encrypted vote choice (bytes32 for flexibility)
}

struct Candidate {
    string candidateId; // Unique identifier for the candidate
    string name;        // Candidate's name
    string description; // Brief description of the candidate
    string imageUrl;    // URL of the candidate's image (can be IPFS hash later)
}

contract Voting {
    mapping(bytes32 => Voter) public voters; // Mapping voterId to Voter struct
    mapping(string => Candidate) public candidates; // Mapping candidateId to Candidate struct

    event VoterRegistered(bytes32 voterId);
    event VoteCast(bytes32 voterId, bytes32 vote);
    event ResultsAnnounced(string candidateId, uint256 voteCount);

    function addCandidate(string memory _candidateId, string memory _name, string memory _description, string memory _imageUrl) public {
        candidates[_candidateId] = Candidate(_candidateId, _name, _description, _imageUrl);
    }

    function registerVoter(address _voterAddress) public {
        bytes32 voterId = keccak256(abi.encodePacked(_voterAddress));
        require(voters[voterId].voterId == bytes32(0), "Voter is already registered.");
        voters[voterId] = Voter(voterId, false, bytes32(0));
        emit VoterRegistered(voterId);
    }

    function castVote(bytes32 voterId, bytes32 encryptedVote) public {
        require(voters[voterId].voterId != 0, "Voter is not registered.");
        require(!voters[voterId].hasVoted, "Voter has already voted.");
        voters[voterId].vote = encryptedVote;
        voters[voterId].hasVoted = true;
        emit VoteCast(voterId, encryptedVote);
    }

    function tallyVotes() public {
        // Placeholder for tallying votes
        // Decryption and counting logic to be implemented
        // Emit ResultsAnnounced event for each candidate
    }

    function getCandidateInfo(string memory candidateId) public view returns (string memory, string memory, string memory) {
        Candidate memory candidate = candidates[candidateId];
        return (candidate.name, candidate.description, candidate.imageUrl);
    }

    function getVoterDetails(address _voterAddress) public view returns (address, bool, bytes32) {
        bytes32 voterId = keccak256(abi.encodePacked(_voterAddress));
        Voter memory voter = voters[voterId];
        require(voter.voterId != bytes32(0), "Voter is not registered.");
        return (_voterAddress, voter.hasVoted, voter.vote);
    }
}
