
import VotingInterface from "@/components/VotingInterface";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VotingInterfacePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <VotingInterface />

    </div>
  );
}
