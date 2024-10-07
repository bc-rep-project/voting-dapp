
import RegisterVoter from "@/components/RegisterVoter";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegisterVoterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <RegisterVoter />
      <div className="flex justify-between w-full">
        <Link href="/components/connect-wallet">
          <Button className="px-6 py-3 text-lg">Back</Button>
        </Link>
        <Link href="/components/voting-interface">
          <Button className="px-6 py-3 text-lg">Next</Button>
        </Link>
      </div>
    </div>
  );
}
