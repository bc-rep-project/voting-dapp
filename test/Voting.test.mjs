
import { expect } from "chai";
import hardhat from "hardhat";
const { ethers } = hardhat;

describe("Voting Contract", function () {
  let Voting;
  let voting;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    Voting = await ethers.getContractFactory("Voting");
[owner, addr1, addr2] = await ethers.getSigners();
    voting = await Voting.deploy();
    await voting.deployed();
  });

  it("Should register a voter", async function () {
    await voting.registerVoter(addr1.address);
    const voterId = ethers.utils.solidityKeccak256(["address"], [addr1.address]);
    const voter = await voting.voters(voterId);
    expect(voter.voterId).to.equal(voterId);
    expect(voter.hasVoted).to.equal(false);
  });

  it("Should add a candidate", async function () {
    await voting.addCandidate("1", "Alice", "Description of Alice", "http://example.com/alice.jpg");
    const candidate = await voting.candidates("1");
    expect(candidate.candidateId).to.equal("1");
    expect(candidate.name).to.equal("Alice");
    expect(candidate.description).to.equal("Description of Alice");
    expect(candidate.imageUrl).to.equal("http://example.com/alice.jpg");
  });

  it("Should allow a voter to cast a vote", async function () {
    await voting.registerVoter(addr1.address);
    const voterId = ethers.utils.solidityKeccak256(["address"], [addr1.address]);
    await voting.castVote(voterId, ethers.utils.formatBytes32String("1"));
    const voter = await voting.voters(voterId);
    expect(voter.hasVoted).to.equal(true);
    expect(voter.vote).to.equal(ethers.utils.formatBytes32String("1"));
  });

  it("Should increment candidate vote count", async function () {
    await voting.addCandidate("1", "Alice", "Desc", "img");
    await voting.registerVoter(addr1.address);
    const voterId = ethers.utils.solidityKeccak256(["address"], [addr1.address]);
    await voting.castVote(voterId, ethers.utils.formatBytes32String("1"));
    const count = await voting.candidateVotes("1");
    expect(count).to.equal(1);
  });

  it("Should emit ResultsAnnounced events with totals", async function () {
    await voting.addCandidate("1", "Alice", "Desc", "img");
    await voting.addCandidate("2", "Bob", "Desc", "img");
    await voting.registerVoter(addr1.address);
    await voting.registerVoter(addr2.address);

    const id1 = ethers.utils.solidityKeccak256(["address"], [addr1.address]);
    const id2 = ethers.utils.solidityKeccak256(["address"], [addr2.address]);

    await voting.castVote(id1, ethers.utils.formatBytes32String("1"));
    await voting.castVote(id2, ethers.utils.formatBytes32String("2"));

    const tx = await voting.tallyVotes();
    const receipt = await tx.wait();

    const results = receipt.events
      .filter((e) => e.event === "ResultsAnnounced")
      .map((e) => [e.args.candidateId, e.args.voteCount.toNumber()]);

    expect(results).to.deep.include.members([
      ["1", 1],
      ["2", 1],
    ]);
  });

  it("Should not allow a voter to vote twice", async function () {
    await voting.registerVoter(addr1.address);
    const voterId = ethers.utils.solidityKeccak256(["address"], [addr1.address]);
    await voting.castVote(voterId, ethers.utils.formatBytes32String("1"));
    await expect(
      voting.castVote(voterId, ethers.utils.formatBytes32String("2"))
    ).to.be.revertedWith("Voter has already voted.");
  });

  it("Should not allow unregistered voter to vote", async function () {
    const voterId = ethers.utils.solidityKeccak256(["address"], [addr1.address]);
    await expect(voting.castVote(voterId, ethers.utils.formatBytes32String("1"))).to.be.revertedWith("Voter is not registered.");
  });
});
