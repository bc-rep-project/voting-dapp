
import { expect } from "chai";
import hardhat from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import solc from "solc";
const { ethers } = hardhat;

describe("Voting Contract", function () {
  let voting;
  let owner;
  let addr1;
  let addr2;

  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  function compileContract() {
    const source = fs.readFileSync(path.join(__dirname, "../contracts/Voting.sol"), "utf8");
    const input = {
      language: "Solidity",
      sources: {
        "Voting.sol": { content: source },
      },
      settings: {
        outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } },
      },
    };
    function findImports(importPath) {
      const p = path.join("node_modules", importPath);
      if (fs.existsSync(p)) {
        return { contents: fs.readFileSync(p, "utf8") };
      }
      return { error: "File not found" };
    }
    const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
    const contract = output.contracts["Voting.sol"].Voting;
    return { abi: contract.abi, bytecode: "0x" + contract.evm.bytecode.object };
  }

  beforeEach(async function () {
    const { abi, bytecode } = compileContract();
    [owner, addr1, addr2] = await ethers.getSigners();
    const factory = new ethers.ContractFactory(abi, bytecode, owner);
    voting = await factory.deploy();
    await voting.deployed();
  });

  it("Should register a voter", async function () {
    await voting.registerVoter(addr1.address);
    const voterId = ethers.utils.solidityKeccak256(["address"], [addr1.address]);
    const [returnedAddr, hasVoted] = await voting.getVoterDetails(addr1.address);
    expect(returnedAddr).to.equal(addr1.address);
    expect(hasVoted).to.equal(false);
  });

  it("Should not allow non-owner to register a voter", async function () {
    await expect(
      voting.connect(addr1).registerVoter(addr2.address)
    ).to.be.reverted;
  });

  it("Should add a candidate", async function () {
    await expect(
      voting.addCandidate(
        "1",
        "Alice",
        "Description of Alice",
        "http://example.com/alice.jpg"
      )
    )
      .to.emit(voting, "CandidateAdded")
      .withArgs("1");
    const candidate = await voting.candidates("1");
    expect(candidate.candidateId).to.equal("1");
    expect(candidate.name).to.equal("Alice");
    expect(candidate.description).to.equal("Description of Alice");
    expect(candidate.imageUrl).to.equal("http://example.com/alice.jpg");
  });

  it("Should not allow non-owner to add a candidate", async function () {
    await expect(
      voting.connect(addr1).addCandidate("2", "Bob", "Desc", "http://example.com/bob.jpg")
    ).to.be.reverted;
  });

  it("Should restrict tallyVotes to owner", async function () {
    await expect(voting.connect(addr1).tallyVotes()).to.be.reverted;
    await expect(voting.tallyVotes()).to.not.be.reverted;
  });

  it("Should return all registered voters", async function () {
    await voting.registerVoter(addr1.address);
    await voting.registerVoter(addr2.address);
    const voters = await voting.getAllVoters();
    expect(voters).to.deep.equal([addr1.address, addr2.address]);
  });

  it("Should return all candidates", async function () {
    await voting.addCandidate("1", "Alice", "Desc", "url1");
    await voting.addCandidate("2", "Bob", "Desc", "url2");
    const candidates = await voting.getAllCandidates();
    expect(candidates).to.deep.equal(["1", "2"]);
  });

  it("Should allow a voter to cast a vote", async function () {
    await voting.registerVoter(addr1.address);
    const voterId = ethers.utils.solidityKeccak256(["address"], [addr1.address]);
    await voting
      .connect(addr1)
      .castVote(voterId, ethers.utils.formatBytes32String("1"));
    const voter = await voting.voters(voterId);
    expect(voter.hasVoted).to.equal(true);
    expect(voter.vote).to.equal(ethers.utils.formatBytes32String("1"));
  });

  it("Should not allow a voter to vote twice", async function () {
    await voting.registerVoter(addr1.address);
    const voterId = ethers.utils.solidityKeccak256(["address"], [addr1.address]);
    await voting
      .connect(addr1)
      .castVote(voterId, ethers.utils.formatBytes32String("1"));
    await expect(
      voting
        .connect(addr1)
        .castVote(voterId, ethers.utils.formatBytes32String("2"))
    ).to.be.revertedWith("Voter has already voted.");
  });

  it("Should not allow a different account to vote using another voterId", async function () {
    await voting.registerVoter(addr1.address);
    const voterId = ethers.utils.solidityKeccak256(["address"], [addr1.address]);
    await expect(
      voting.connect(addr2).castVote(voterId, ethers.utils.formatBytes32String("1"))
    ).to.be.revertedWith("Sender not authorized");
  });

  it("Should tally votes correctly", async function () {
    await voting.addCandidate("1", "Alice", "Desc", "url1");
    await voting.addCandidate("2", "Bob", "Desc", "url2");
    await voting.registerVoter(addr1.address);
    await voting.registerVoter(addr2.address);
    const id1 = ethers.utils.solidityKeccak256(["address"], [addr1.address]);
    const id2 = ethers.utils.solidityKeccak256(["address"], [addr2.address]);
    await voting
      .connect(addr1)
      .castVote(id1, ethers.utils.formatBytes32String("1"));
    await voting
      .connect(addr2)
      .castVote(id2, ethers.utils.formatBytes32String("2"));
    await voting.tallyVotes();
    expect(await voting.voteCounts("1")).to.equal(1);
    expect(await voting.voteCounts("2")).to.equal(1);
  });

  it("Should not allow unregistered voter to vote", async function () {
    const voterId = ethers.utils.solidityKeccak256(["address"], [addr1.address]);
    await expect(voting.castVote(voterId, ethers.utils.formatBytes32String("1"))).to.be.revertedWith("Voter is not registered.");
  });

  it("Should get voter details for registered voter", async function () {
    await voting.registerVoter(addr1.address);
    const [returnedAddr, hasVoted, vote] = await voting.getVoterDetails(addr1.address);
    expect(returnedAddr).to.equal(addr1.address);
    expect(hasVoted).to.equal(false);
    expect(vote).to.equal(ethers.constants.HashZero);
  });

  it("Should revert when getting details for unregistered voter", async function () {
    await expect(voting.getVoterDetails(addr2.address)).to.be.revertedWith("Voter is not registered.");
  });
});
