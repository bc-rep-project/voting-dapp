
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export default function CandidateInfo() {
  const [candidateId, setCandidateId] = useState("");
  const [candidateInfo, setCandidateInfo] = useState(null);

  const handleRetrieve = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/get-candidate-info?candidateId=${candidateId}`);
      const data = await response.json();
      if (response.ok) {
        setCandidateInfo(data);
        toast({
          title: "Success",
          description: "Candidate information retrieved successfully!",
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
    <div className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Candidate Info</h2>
      
      <form onSubmit={handleRetrieve} className="space-y-2">
        <Label htmlFor="candidateId">Candidate ID</Label>
        <Input id="candidateId" name="candidateId" required value={candidateId} onChange={(e) => setCandidateId(e.target.value)} />
        <Button type="submit" className="w-full">Retrieve Info</Button>
      </form>
      
      {candidateInfo && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">{candidateInfo.name}</h3>
          <p>{candidateInfo.description}</p>
          <img src={candidateInfo.imageUrl} alt="Candidate Image" className="mt-4" />
        </div>
      )}
    </div>
  );
}
