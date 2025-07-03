
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
    mapping(string => uint256) public candidateVotes; // Tracks vote count for each candidate
    string[] public candidateIds; // Keep track of all candidate IDs for tallying

    event VoterRegistered(bytes32 voterId);
    event VoteCast(bytes32 voterId, bytes32 vote);
    event ResultsAnnounced(string candidateId, uint256 voteCount);

    function addCandidate(string memory _candidateId, string memory _name, string memory _description, string memory _imageUrl) public {
        candidates[_candidateId] = Candidate(_candidateId, _name, _description, _imageUrl);
        candidateIds.push(_candidateId);
        candidateVotes[_candidateId] = 0;
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

        string memory candidateId = bytes32ToString(encryptedVote);
        candidateVotes[candidateId] += 1;
        emit VoteCast(voterId, encryptedVote);
    }

    function bytes32ToString(bytes32 _bytes32) internal pure returns (string memory) {
        uint8 i = 0;
        while(i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for(uint8 j = 0; j < i; j++) {
            bytesArray[j] = _bytes32[j];
        }
        return string(bytesArray);
    }

    function tallyVotes() public {
        for (uint256 i = 0; i < candidateIds.length; i++) {
            string memory id = candidateIds[i];
            emit ResultsAnnounced(id, candidateVotes[id]);
        }
    }

    function getCandidateInfo(string memory candidateId) public view returns (string memory, string memory, string memory) {
        Candidate memory candidate = candidates[candidateId];
        return (candidate.name, candidate.description, candidate.imageUrl);
    }
}
