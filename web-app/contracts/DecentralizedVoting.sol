
pragma solidity ^0.8.0;

contract DecentralizedVoting {
    struct Voter {
        bytes32 voterId;
        bool hasVoted;
        bytes32 vote;
    }

    struct Candidate {
        string candidateId;
        string ipfsHash;
    }

    mapping(bytes32 => Voter) public voters;
    mapping(string => Candidate) public candidates;
    address public admin;

    event VoterRegistered(bytes32 voterId);
    event VoteCast(bytes32 voterId);
    event VotesTallied(string[] candidateIds, uint[] voteCounts);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerVoter(bytes32 _voterId) public onlyAdmin {
        require(voters[_voterId].voterId == 0, "Voter already registered");
        voters[_voterId] = Voter(_voterId, false, 0);
        emit VoterRegistered(_voterId);
    }

    function castVote(bytes32 _voterId, bytes32 _encryptedVote) public {
        require(voters[_voterId].voterId != 0, "Voter not registered");
        require(!voters[_voterId].hasVoted, "Voter has already voted");
        voters[_voterId].vote = _encryptedVote;
        voters[_voterId].hasVoted = true;
        emit VoteCast(_voterId);
    }

    function tallyVotes(string[] memory _candidateIds) public onlyAdmin {
        uint[] memory voteCounts = new uint[](_candidateIds.length);
        for (uint i = 0; i < _candidateIds.length; i++) {
            voteCounts[i] = 0;
        }

        for (uint i = 0; i < _candidateIds.length; i++) {
            for (uint j = 0; j < _candidateIds.length; j++) {
                if (voters[keccak256(abi.encodePacked(_candidateIds[j]))].vote == keccak256(abi.encodePacked(_candidateIds[i]))) {
                    voteCounts[i]++;
                }
            }
        }

        emit VotesTallied(_candidateIds, voteCounts);
    }
}
