
import { ethers } from "ethers";
import DecentralizedVoting from "../../contracts/DecentralizedVoting.sol";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { candidateId } = req.query;

    // Connect to Ethereum provider
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    // Connect to the smart contract
    const contract = new ethers.Contract(
      "YOUR_CONTRACT_ADDRESS",
      DecentralizedVoting.abi,
      provider
    );

    // Retrieve candidate information
    try {
      const candidate = await contract.candidates(candidateId);
      res.status(200).json(candidate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
