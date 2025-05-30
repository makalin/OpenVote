// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Voting is Ownable, ReentrancyGuard {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    struct Voter {
        bool hasVoted;
        uint256 votedFor;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => Voter) public voters;
    uint256 public candidateCount;
    bool public votingOpen;

    event VoteCast(address indexed voter, uint256 candidateId);
    event VotingStatusChanged(bool isOpen);
    event CandidateAdded(uint256 indexed candidateId, string name);

    modifier onlyWhenVotingOpen() {
        require(votingOpen, "Voting is not open");
        _;
    }

    constructor() {
        votingOpen = false;
        candidateCount = 0;
    }

    function addCandidate(string memory _name) public onlyOwner {
        require(!votingOpen, "Cannot add candidates while voting is open");
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
        emit CandidateAdded(candidateCount, _name);
    }

    function castVote(uint256 _candidateId) public onlyWhenVotingOpen nonReentrant {
        require(!voters[msg.sender].hasVoted, "Already voted");
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate");

        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedFor = _candidateId;
        candidates[_candidateId].voteCount++;

        emit VoteCast(msg.sender, _candidateId);
    }

    function setVotingStatus(bool _isOpen) public onlyOwner {
        votingOpen = _isOpen;
        emit VotingStatusChanged(_isOpen);
    }

    function getCandidate(uint256 _candidateId) public view returns (Candidate memory) {
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate");
        return candidates[_candidateId];
    }

    function getVoterStatus(address _voter) public view returns (bool hasVoted, uint256 votedFor) {
        Voter memory voter = voters[_voter];
        return (voter.hasVoted, voter.votedFor);
    }
} 