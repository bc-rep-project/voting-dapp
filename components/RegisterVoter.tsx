
"use client";

import { useState } from "react";
import web3 from "../utils/web3";
import { Button } from "@/components/ui/button";
import "@/components/RegisterVoter.css"; // Import custom CSS
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Voting from "../contracts/Voting.json"; // Assuming ABI is available
import Link from "next/link"; // Import Link

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
     <form onSubmit={registerVoter} className="register-voter-form">
       <h2 className="register-voter-title">Register Voter</h2>
       
       <div className="space-y-2">
         <Label htmlFor="voterAddress" className="register-voter-label">Voter Address</Label>
         <Input
           id="voterAddress"
           name="voterAddress"
           required
           value={voterAddress}
           onChange={(e) => setVoterAddress(e.target.value)}
           className="register-voter-input"
         />
       </div>
       
       <Button type="submit" className="register-voter-button">Register</Button>
     <div className="register-voter-nav">
         <Link href="/components/connect-wallet">
           <Button className="register-voter-nav-button back">Back</Button>
         </Link>
         <Link href="/components/voting-interface">
           <Button className="register-voter-nav-button next">Next</Button>
         </Link>
      </div>
    </form>
  );
}
