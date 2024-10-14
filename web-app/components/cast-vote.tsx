
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export default function CastVote() {
  const [voterId, setVoterId] = useState("");
  const [encryptedVote, setEncryptedVote] = useState("");

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/cast-vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voterId, encryptedVote }),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Success",
          description: "Your vote has been cast successfully!",
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
    <form onSubmit={handleVote} className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Cast Vote</h2>
      
      <div className="space-y-2">
        <Label htmlFor="voterId">Voter ID</Label>
        <Input id="voterId" name="voterId" required value={voterId} onChange={(e) => setVoterId(e.target.value)} />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="encryptedVote">Encrypted Vote</Label>
        <Input id="encryptedVote" name="encryptedVote" required value={encryptedVote} onChange={(e) => setEncryptedVote(e.target.value)} />
      </div>
      
      <Button type="submit" className="w-full">Cast Vote</Button>
    </form>
  );
}
