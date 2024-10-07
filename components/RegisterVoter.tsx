
"use client";

import { useState } from "react";
import web3 from "../utils/web3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Voting from "../contracts/Voting.json"; // Assuming ABI is available

export default function RegisterVoter() {
  const [voterAddress, setVoterAddress] = useState("");

  const registerVoter = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(Voting.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3"); // Replace with your contract address

    try {
      await contract.methods.registerVoter(voterAddress).send({ from: accounts[0] });
      alert("Voter registered successfully!");
    } catch (error) {
      console.error("Error registering voter:", error);
      alert("Error registering voter. See console for details.");
    }
  };

  return (
    <form onSubmit={registerVoter} className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Register Voter</h2>
      
      <div className="space-y-2">
        <Label htmlFor="voterAddress">Voter Address</Label>
        <Input
          id="voterAddress"
          name="voterAddress"
          required
          value={voterAddress}
          onChange={(e) => setVoterAddress(e.target.value)}
        />
      </div>
      
      <Button type="submit" className="w-full">Register</Button>
    </form>
  );
}
