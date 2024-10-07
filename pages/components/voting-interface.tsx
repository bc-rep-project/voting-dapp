
import VotingInterface from "@/components/VotingInterface";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VotingInterfacePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <VotingInterface />
      <div className="flex justify-between w-full">
        <Link href="/components/register-voter">
          <Button className="px-6 py-3 text-lg">Back</Button>
        </Link>
        <Link href="/components/display-results">
          <Button className="px-6 py-3 text-lg">Next</Button>
        </Link>
      </div>
    </div>
  );
}
