
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

  it("Should not allow non-owner to add a candidate", async function () {
    await expect(
      voting.connect(addr1).addCandidate("2", "Bob", "Desc", "http://example.com/bob.jpg")
    ).to.be.reverted;
  });

  it("Should restrict tallyVotes to owner", async function () {
    await expect(voting.connect(addr1).tallyVotes()).to.be.reverted;
    await expect(voting.tallyVotes()).to.not.be.reverted;
  });

  it("Should allow a voter to cast a vote", async function () {
    await voting.registerVoter(addr1.address);
    const voterId = ethers.utils.solidityKeccak256(["address"], [addr1.address]);
    await voting.castVote(voterId, ethers.utils.formatBytes32String("1"));
    const voter = await voting.voters(voterId);
    expect(voter.hasVoted).to.equal(true);
    expect(voter.vote).to.equal(ethers.utils.formatBytes32String("1"));
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
