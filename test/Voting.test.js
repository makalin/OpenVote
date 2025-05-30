const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting", function () {
  let voting;
  let owner;
  let voter1;
  let voter2;

  beforeEach(async function () {
    [owner, voter1, voter2] = await ethers.getSigners();

    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy();
    await voting.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await voting.owner()).to.equal(owner.address);
    });

    it("Should start with voting closed", async function () {
      expect(await voting.votingOpen()).to.equal(false);
    });

    it("Should start with zero candidates", async function () {
      expect(await voting.candidateCount()).to.equal(0);
    });
  });

  describe("Candidate Management", function () {
    it("Should allow owner to add candidates", async function () {
      await voting.addCandidate("Candidate 1");
      const candidate = await voting.getCandidate(1);
      expect(candidate.name).to.equal("Candidate 1");
      expect(candidate.voteCount).to.equal(0);
    });

    it("Should not allow non-owner to add candidates", async function () {
      await expect(
        voting.connect(voter1).addCandidate("Candidate 1")
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should not allow adding candidates when voting is open", async function () {
      await voting.setVotingStatus(true);
      await expect(
        voting.addCandidate("Candidate 1")
      ).to.be.revertedWith("Cannot add candidates while voting is open");
    });
  });

  describe("Voting", function () {
    beforeEach(async function () {
      await voting.addCandidate("Candidate 1");
      await voting.addCandidate("Candidate 2");
      await voting.setVotingStatus(true);
    });

    it("Should allow voters to cast votes", async function () {
      await voting.connect(voter1).castVote(1);
      const candidate = await voting.getCandidate(1);
      expect(candidate.voteCount).to.equal(1);
    });

    it("Should not allow voting when closed", async function () {
      await voting.setVotingStatus(false);
      await expect(
        voting.connect(voter1).castVote(1)
      ).to.be.revertedWith("Voting is not open");
    });

    it("Should not allow voting for invalid candidates", async function () {
      await expect(
        voting.connect(voter1).castVote(3)
      ).to.be.revertedWith("Invalid candidate");
    });

    it("Should not allow double voting", async function () {
      await voting.connect(voter1).castVote(1);
      await expect(
        voting.connect(voter1).castVote(2)
      ).to.be.revertedWith("Already voted");
    });
  });

  describe("Voter Status", function () {
    beforeEach(async function () {
      await voting.addCandidate("Candidate 1");
      await voting.setVotingStatus(true);
    });

    it("Should track voter status correctly", async function () {
      await voting.connect(voter1).castVote(1);
      const [hasVoted, votedFor] = await voting.getVoterStatus(voter1.address);
      expect(hasVoted).to.equal(true);
      expect(votedFor).to.equal(1);
    });

    it("Should show correct status for non-voters", async function () {
      const [hasVoted, votedFor] = await voting.getVoterStatus(voter1.address);
      expect(hasVoted).to.equal(false);
      expect(votedFor).to.equal(0);
    });
  });
}); 