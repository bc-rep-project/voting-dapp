
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export default function RegisterVoter() {
  const [voterAddress, setVoterAddress] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register-voter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voterAddress }),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Success",
          description: `Voter registered with ID: ${data.voterId}`,
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Register Voter</h2>
      
      <div className="space-y-2">
        <Label htmlFor="voterAddress">Ethereum Address</Label>
        <Input id="voterAddress" name="voterAddress" required value={voterAddress} onChange={(e) => setVoterAddress(e.target.value)} />
      </div>
      
      <Button type="submit" className="w-full">Register</Button>
    </form>
  );
}
