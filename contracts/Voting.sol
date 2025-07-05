
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

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

contract Voting is Ownable {
    constructor() Ownable(msg.sender) {}
    mapping(bytes32 => Voter) public voters; // Mapping voterId to Voter struct
    mapping(string => Candidate) public candidates; // Mapping candidateId to Candidate struct
    address[] private voterAddresses; // Track all registered voter addresses
    string[] private candidateIds; // Track all candidate identifiers
    mapping(string => uint256) public voteCounts; // Track vote count per candidate

    event VoterRegistered(bytes32 voterId);
    event VoteCast(bytes32 voterId, bytes32 vote);
    event CandidateAdded(string candidateId);
    event ResultsAnnounced(string candidateId, uint256 voteCount);

    function addCandidate(string memory _candidateId, string memory _name, string memory _description, string memory _imageUrl) public onlyOwner {
        require(bytes(candidates[_candidateId].candidateId).length == 0, "Candidate already exists");
        candidates[_candidateId] = Candidate(_candidateId, _name, _description, _imageUrl);
        candidateIds.push(_candidateId);
        emit CandidateAdded(_candidateId);
    }

    function registerVoter(address _voterAddress) public onlyOwner {
        bytes32 voterId = keccak256(abi.encodePacked(_voterAddress));
        require(voters[voterId].voterId == bytes32(0), "Voter is already registered.");
        voters[voterId] = Voter(voterId, false, bytes32(0));
        voterAddresses.push(_voterAddress);
        emit VoterRegistered(voterId);
    }

    function castVote(bytes32 voterId, bytes32 encryptedVote) public {
        require(voters[voterId].voterId != 0, "Voter is not registered.");
        require(
            keccak256(abi.encodePacked(msg.sender)) == voterId,
            "Sender not authorized"
        );
        require(!voters[voterId].hasVoted, "Voter has already voted.");
        voters[voterId].vote = encryptedVote;
        voters[voterId].hasVoted = true;
        emit VoteCast(voterId, encryptedVote);
    }

    function tallyVotes() public onlyOwner {
        // Reset previous counts
        for (uint256 i = 0; i < candidateIds.length; i++) {
            voteCounts[candidateIds[i]] = 0;
        }

        // Count votes from all registered voters
        for (uint256 i = 0; i < voterAddresses.length; i++) {
            bytes32 voterId = keccak256(abi.encodePacked(voterAddresses[i]));
            Voter memory voter = voters[voterId];
            if (voter.hasVoted) {
                string memory candidateId = _bytes32ToString(voter.vote);
                voteCounts[candidateId] += 1;
            }
        }

        // Emit event with results for each candidate
        for (uint256 i = 0; i < candidateIds.length; i++) {
            emit ResultsAnnounced(candidateIds[i], voteCounts[candidateIds[i]]);
        }
    }

    function getAllVoters() public view returns (address[] memory) {
        return voterAddresses;
    }

    function getAllCandidates() public view returns (string[] memory) {
        return candidateIds;
    }

    function _bytes32ToString(bytes32 _bytes32) internal pure returns (string memory) {
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
