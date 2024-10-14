
import { ethers } from "ethers";
import DecentralizedVoting from "../../contracts/DecentralizedVoting.sol";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { voterAddress } = req.body;

    // Connect to Ethereum provider
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    const signer = provider.getSigner();

    // Connect to the smart contract
    const contract = new ethers.Contract(
      "YOUR_CONTRACT_ADDRESS",
      DecentralizedVoting.abi,
      signer
    );

    // Generate a unique voterId
    const voterId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(voterAddress));

    // Register the voter
    try {
      const tx = await contract.registerVoter(voterId);
      await tx.wait();
      res.status(200).json({ voterId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
